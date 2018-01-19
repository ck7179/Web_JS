var express = require('express');
var app = express();
var bodyParser = require('body-parser');//抓表單資料
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//是否讓使用者修改內容
var user_name;
//var nodemailer = require('nodemailer');
app.use(session({
    secret: '1q3rrwefsgdh54uu5h56', 
    cookie: { maxAge: 1000 * 1000 }
  }));


//#####  express  ######
var engine = require('ejs-locals');
var path = require('path');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//##### mysql #####
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "js_final"
  });

  con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});

app.use(express.static(path.join(__dirname, 'image')));

//#####  router  ######

var room_id;//使用者所在chatroom的id
var user_id;//使用者登入後的id
var user_name;//使用者登入後的名字

//首頁(index)連進來
app.get('/', function (req, res) {
    console.log("User calling index.");
    user_id = null;
    user_name = null;
    room_id = null;
    res.render('index',{title: '3姑6婆聊天室',UserID: req.session.user_name})
});

//前往登入
app.get('/login',function(req,res){
	var r = 0;
	if(req.session.user_id != null){
		console.log(req.session.user_id);
		r = 1;
	}
    console.log("login page.");
    res.render('login',{title:'3姑6婆登入', redir: r})
});

//登入
app.post('/signin', function (req, res) {  
    console.log('登入正常');
    var account=req.body.account;
    var pwd=req.body.pwd;
    var sql ='SELECT * FROM user WHERE u_account="'+account+'" and u_pwd="'+pwd+'"'
    con.query(sql,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }
        console.log('資料抓取正常');
        console.log(result);
        
        // res.render('votepage',{ name: result[0].name ,endtime:result[0].endtime ,Option1:result[0].Option1 ,Option2:result[0].Option2})
        if(result[0] != null){
        if(result[0].u_account==account && result[0].u_pwd==pwd){
            
            //req.session.userid= result[0].u_id;
            req.session.user_id = result[0].u_no;
            req.session.user_name = result[0].u_name;
            user_id = req.session.user_id;
            user_name = req.session.user_name;
            console.log(req.session.user_id);
            console.log(req.session.user_name);
            console.log('成功登入');
            res.redirect('http://140.127.220.149:3005/room_list')
        }
        else{
            console.log('失敗登入');
            res.send("帳密有錯")
        }
        }else{
        	res.redirect("/login");
        }	
    });
 })

//前往註冊
app.get('/newadd',function(req,res){
	var r = 0;
	if(req.session.user_id != null){
		console.log(req.session.user_id);
		r = 1;
	}
    console.log('newcoming add info.');
    res.render('newadd',{title: '3姑6婆註冊', redir: r})
});

//註冊
app.get('/signup', function (req, res) {   
    console.log('newcoming app.js get info.');
     var cname = req.query.cname;
     var email = req.query.email;
     var id = req.query.id;
     var account = req.query.account;
     var pwd = req.query.pwd;
     var ff=new Array()
     var sql = 'select * from user where u_id= "'+id+'"'
     con.query(sql,function(error, result, fields){
        if(error){console.log('讀取失敗！');throw error;}
        console.log('讀取成功!');
        ff=result;
        //console.log(ff.length+"ssads");
        res.redirect('http://140.127.220.149:3005/gotomysql?length='+ff.length)
    })
    console.log(ff.length)

//轉寫到資料庫
app.get('/gotomysql', function (req, res){  
    console.log('newcoming info go to mysql.')
    var length =req.query.length
    if(length>0){
        res.send('wrong')
    }else{
        var sql2 = 'insert INTO user (u_name,u_id,u_account,u_pwd,u_email) values ("'+cname+'","'+id+'","'+account+'","'+pwd+'","'+email+'" )'
        con.query(sql2,function(error){if(error){console.log('寫入資料失敗！');throw error;}});
        console.log('info success save in mysql.');
        // res.send("asas")
        //req.session.userid= result[0].u_id;
        res.redirect('http://140.127.220.149:3005/login')
    }
    });
})

//忘記密碼
app.get('/pwdmiss', function (req, res) {
    var email = req.body.email;

    // var transporter = nodemailer.createTestAccount({
    //     service: 'Gmail',
    //     auth:{
    //         user:'jackywu526@gmail.com',
    //         pass:'asdf123456'
    //     }
    // });
    // var mailOptions = {
    //     from: '"3姑6婆"',
    //     to: req.body.email ,
    //     subject: '3姑6婆密碼確認信',
    //     text: '密碼內容'
    // }
    // transporter.sendMail(mailOptions,function(error,info){
    //     if(error){
    //         return console.log('mail error');
    //     }
    //     res.redirect('/pwdmiss2');
    // })
    console.log("password missing");
    res.render('pwdmiss',{title: '忘記密碼'})
});

//忘記密碼2
app.get('/pwdmiss2', function (req, res) {
    console.log("password missing");
    res.render('pwdmiss2',{title: '寄出密碼信件'})
});



//聊天頁(chatroom)連進來
app.get('/chatroom', function (req, res) {
    console.log("User calling chatroom.");
    var id = req.query.id;
    if(id == null) res.status(404).send('抱歉，此聊天室不存在');
    // user_id = 8;
    // user_name = "宋美華";
    // room_id = 5;
    room_id = id;
    var select_roomName='SELECT c_name, c_type FROM chatroom WHERE c_id="'+room_id+'"';
    var select_getMessage=' SELECT u.u_name,m.m_content,m.time FROM user u, message m WHERE u.u_no = m.u_no AND m.c_id = "'+room_id+'" ORDER BY m.time';
    con.query(select_getMessage,function(error, result, fields){
        if(error){
            console.log('資料讀取失敗！');
            throw error;
        }else{
        	con.query(select_roomName,function(error, result2, fields){
	        if(error){
	            console.log('資料讀取失敗！');
	            throw error;
	        }else{
	        	console.log(result2);
	        	res.render('chatroom',{title: '3姑6婆 - 聊天室',UserID: req.session.user_name,chatroomName: result2,message: result}) 
	        }	
        	});
        }
    });
    
});

//接收ajax傳送訊息進行處裡的虛擬router
//使用者傳送訊息，透過client端ajax訊息過來
app.post('/send', function (req, res) {
	
    console.log("User calling send with ajax.");
    //由client端ajax來的文字
    var message = req.body.text;
    //將message進行安全檢查
    message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    console.log("User send:"+message);
    if(message != ""){ //由後端確認非空值
        //時間格式
        var d = new Date();
        var vYear = d.getFullYear();
        var vMon = d.getMonth()+1;
        var vDay = d.getDate();
        var h = d.getHours(); 
        var m = d.getMinutes(); 
        var se = d.getSeconds(); 
        
        var select_sendMessage=" INSERT INTO message VALUES (NULL, '"+room_id+"', '"+req.session.user_id+"', '"+message+"' , '"+vYear+"-"+vMon+"-"+vDay+" "+h+":"+m+":"+se+"')";
    	con.query(select_sendMessage,function(error, result, fields){
	        if(error){
	            console.log('資料讀取失敗！');
	            throw error;
	        }else{
	        	var select_getMessage=' SELECT u.u_name,m.m_content,m.time FROM user u, message m WHERE u.u_no = m.u_no ORDER BY m.time';
 				con.query(select_getMessage,function(error, result, fields){
			        if(error){
			            console.log('資料讀取失敗！');
			            throw error;
			        }else{
			            res.send(result); 
			        }
    			});
	        } 
    	});   
        console.log("Server response");
    } 
});

app.post('/repeat_call', function (req, res) {
	var select_getMessage=' SELECT u.u_name,m.m_content,m.time FROM user u, message m WHERE u.u_no = m.u_no ORDER BY m.time';
 				con.query(select_getMessage,function(error, result, fields){
			        if(error){
			            console.log('資料讀取失敗！');
			            throw error;
			        }else{
			            res.send(result); 
			        }
    			});
});	

app.get('/history', function (req, res) {
	console.log("User calling history.");
	var select_getHistory='SELECT *, date(s_time) as a_d FROM activity ORDER BY a_d ASC';
	con.query(select_getHistory, function(error, result, fields){
		if(error){
			console.log('資料讀取失敗！');
			throw error;
		}else{
			res.render('history', {title: '3姑6婆 - 活動紀錄', history: result, userid: req.session.user_name});
		}
	});	
});

app.get('/room_list', function (req, res) {
	console.log("User calling room list.");
	var select_getRoom='SELECT * FROM chatroom';
	con.query(select_getRoom, function(error, result, fields){
		if(error){
			console.log('資料讀取失敗！');
			throw error;
		}else{
			res.render('room_list', {title: '3姑6婆 - 聊天室列表', room: result, userid: req.session.user_name});
		}
	});	
});

app.get('/create_room', function (req, res) {
	console.log("User calling create_room.");
	res.render('create_room', {title: '3姑6婆 - 創建聊天室', userid: req.session.user_name});
});

app.post('/send_create_room', function (req, res) {
	console.log("User calling send_create_room.");
	var type = req.body.input_type;
	var name = req.body.input_write;
	const insert_new_room = "INSERT INTO chatroom (c_type, c_name, u_no) VALUES ('" + type + "', '" + name + "', -1)";
	con.query(insert_new_room, function(error, result, fields){
		if(error){
			console.log('資料寫入失敗！');
			throw error;
		}else{
			res.redirect('/room_list');
		}
	});
});

app.get('/edit_image', function (req, res) {
	console.log("User calling edit_image.");
	res.render('edit_image', {title: '3姑6婆 - 圖片製作', userid: req.session.user_name});
});

app.get('/logout', function (req, res) {
	console.log("User calling logout.");
	req.session.user_id = null;
	req.session.user_name = null;
	res.redirect('/login');
});

app.get('/active_creat', function (req, res) {
	console.log("User calling active_creat.");
	res.render('active_creat', {title: '3姑6婆 - 創立活動', userid: req.session.user_name});
});

app.post('/send_active_creat', function (req, res) {
	console.log("User calling send_active_creat");
	var type = req.body.a_name;
	var u_id = req.body.userid;
    var c_id = req.body.c_id;
    var u_id = req.body.u_id;
    var allday= req.body.allday;
    var s_tim = req.body.s_tim;
    var e_time = req.body.e_time;
    var location = req.body.location;
    var invite_reply = req.body.invite_reply;
    var alert = req.body.alert;

	const insert_new_active = "INSERT INTO active (a_name, u_id, c_id, allday, s_time, e_time, location, invite_reply, alert) VALUES ('" + a_name + "', '" + u_id + "',  '" + c_id + "', '" + allday + "', '" + s_time + "', '" + e_time + "', '" + location + "', '" + invite_reply + "', '" + alert + "')";
	con.query(insert_new_active, function(error, result, fields){
		if(error){
			console.log('資料寫入失敗！');
			throw error;
		}else{
			res.redirect('/history');
		}
	});
});


app.listen(3005);