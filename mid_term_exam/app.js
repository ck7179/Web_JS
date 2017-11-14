//===模組載入與設定===
var express = require('express');//載入express模組
var app = express();
var bodyParser = require('body-parser');//抓表單資料
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//是否讓使用者修改內容

//#####  firebase  ######
var admin = require("firebase-admin");//載入firebase-admin模組
var serviceAccount = require("./midtermexam-a1bf6-firebase-adminsdk-6bcqa-65c224f173.json");//載入金鑰檔案存放位置
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://midtermexam-a1bf6.firebaseio.com"
});

//#####  express  ######
var engine = require('ejs-locals');//載入ejs-locals模組
var path = require('path');//載入path模組
app.engine('ejs', engine);//設定網頁引擎
app.set('views', path.join(__dirname, 'views'));//設定網頁資料夾路徑
app.set('view engine', 'ejs');

//#####  router  ######

var user_name=null;//使用者名字

//首頁get進來
app.get('/', function (req, res) {  
    res.render('index',{title: '哀傷der存錢桶'});   
});


//首頁get進來
app.get('/money', function (req, res) {
    if(user_name != null){//判斷是否已輸入名稱
        admin.database().ref('moneytube').child('myName').child(user_name).once('value', function (snapshot) {
            var data = snapshot.val();
            res.render('money',{title: user_name+'der存錢筒',name:user_name,data:data}); 
        }); 
    }else{
        res.redirect('/');//轉址
    }            
     
});

//首頁post進來
app.post('/getName', function (req, res) {
    var input_name = req.body.name;//使用者輸入之name
    admin.database().ref('moneytube').push({myName:input_name},function(error){
        if (error){
            //錯誤
        }
        else{
            user_name = input_name;
            res.redirect('/money');//轉址
        }
    });
    
});

//首頁post進來
app.post('/saveMoney', function (req, res) {
    var input_money = req.body.money;//使用者輸入之name
    admin.database().ref('moneytube').once('value', function (snapshot) {
            var data = snapshot.val();
            for(item in data){
                if(data[item].myName == user_name){//確認該明稱已存在資料庫
                    admin.database().ref('moneytube').child('myName').child(user_name).push({money:input_money});
                    break;
                }
            }
            res.redirect('/money');   //轉址     
    });     
});

//#####  設定port  #####
app.listen(process.env.PORT || 8080);