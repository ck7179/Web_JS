$(document).ready(function(){
	var input_join = document.getElementById('input_join');
	var input_name = document.getElementById('input_name');	
	//動態調整版面
	$(window).on('resize', function(){
		$(show_message_layout).height($(write_message_wrapper).height()-200);
		$(show_message_layout).width($(write_message_wrapper).width()-80);
		$(write_layout).width($(write_message_wrapper).width()-40);
		$(input_write).width($(write_layout).width()-110);
    }).trigger('resize');
    
    //動畫設定
	input_join.addEventListener('click', function() {
		if(input_name.value != ""){
			$(signin_layout).addClass("animated fadeOut");
			$(tree1).addClass("animated fadeOut");
			$(tree2).addClass("animated fadeOut");
			$(main).addClass("show");
			$(main).addClass("animated zoomIn ");
			$(show_message_layout).scrollTop($(list).height());
		}else{
			alert("麻煩請填寫暱稱喔~")
		} 
	},false);
	$(input_send).hover(function(){
		$(input_send).addClass('animated jello');
	},function(){
		$(input_send).removeClass('animated jello');
	});
});

//firebase
//Initialize Firebase
 	var config = {
	    apiKey: "AIzaSyA6l9lGafCJH1oGIBiEoJda9mXDHPrIh3o",
	    authDomain: "simplechatroom-aca47.firebaseapp.com",
	    databaseURL: "https://simplechatroom-aca47.firebaseio.com",
	    projectId: "simplechatroom-aca47",
	    storageBucket: "simplechatroom-aca47.appspot.com",
	    messagingSenderId: "658173637372"
  	};
	firebase.initializeApp(config);
//	
	var Name = firebase.database().ref('name');
	var Message = firebase.database().ref('message');
	var list = document.getElementById('list');
	var input_join = document.getElementById('input_join');
	var input_name = document.getElementById('input_name');
	var input_write = document.getElementById('input_write');
	var input_send = document.getElementById('input_send');
	var current_user = new Object();
	

	input_join.addEventListener('click', function() { 
		//欄位非空白
		if(input_name.value != ""){
			var d = new Date();
			var vYear = d.getFullYear();
			var vMon = d.getMonth() + 1;
			var vDay = d.getDate();
			var h = d.getHours(); 
			var m = d.getMinutes(); 
			var se = d.getSeconds(); 
			current_user.name = input_name.value;
			Name.push({name:input_name.value});
			Message.push({name:"系統",message:"歡迎『"+input_name.value+"』進入聊天室!",date_time:vMon+"/"+vDay+" "+h+":"+m})
		}		
	});
	input_send.addEventListener('click', function() { 
		//欄位非空白
		if(input_write.value != ""){
			var d = new Date();
			var vYear = d.getFullYear();
			var vMon = d.getMonth() + 1;
			var vDay = d.getDate();
			var h = d.getHours(); 
			var m = d.getMinutes(); 
			var se = d.getSeconds(); 
			Message.push({name:current_user.name,message:input_write.value,date_time:vMon+"/"+vDay+" "+h+":"+m});
			input_write.value = "";
		}		
	});
	$(input_write).keypress(function(e){
  		code = (e.keyCode ? e.keyCode : e.which);
  		if (code == 13){
	  		//欄位非空白
			if(input_write.value != ""){
				var d = new Date();
				var vYear = d.getFullYear();
				var vMon = d.getMonth() + 1;
				var vDay = d.getDate();
				var h = d.getHours(); 
				var m = d.getMinutes(); 
				var se = d.getSeconds(); 
				Message.push({name:current_user.name,message:input_write.value,date_time:vMon+"/"+vDay+" "+h+":"+m});
				input_write.value = "";
			}
  		}
	});
	Message.on('value',function(snapshot){
   		list.innerHTML = '';
    	var str = '';
      	snapshot.forEach(function(data){
      		if(data.val().name=="系統"){
      			str+='<div data-key="'+data.key+'"><span class="name_style_system">'+data.val().name+"："+data.val().message+'</span> <span class="date_time">'+data.val().date_time+'</span>'+'</div>'
      		}else{
      			str+='<div data-key="'+data.key+'"><span class="name_style">'+data.val().name+"：</span>"+data.val().message+' <span class="date_time">'+data.val().date_time+'</span>'+'</div>'
      		}    	
    	})
    	list.innerHTML = str; 
    	$(show_message_layout).scrollTop($(list).height());
	});