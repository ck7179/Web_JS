<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="css/all.css">
    <title>3姑6婆</title>
</head>
<body>
    <div id="wrapper">
        <div id="header">
            <a href="index.html"><span>3姑6婆</span></a>
			<span id="username">使用者名稱</span>
		</div>
        <div id="chatroom_container">
                <div id="chatroom_main">
                        <div id="write_message_wrapper">
							<div id="show_message_layout">
								<div id="list">
									<div class="row">
										<div class="col-md-4 room_type type_selected">
											<img src="https://i.imgur.com/cpVF4fj.png"/>
											<div>
												<span>八點檔</span>
											</div>
										</div>
										<div class="col-md-4 room_type">
											<img src="https://i.imgur.com/cpVF4fj.png"/>
											<div>
												<span>民生</span>
											</div>
										</div>
										<div class="col-md-4 room_type">
											<img src="https://i.imgur.com/cpVF4fj.png"/>
											<div>
												<span>家庭</span>
											</div>
										</div>
										<div class="col-md-4 room_type">
											<img src="https://i.imgur.com/cpVF4fj.png"/>
											<div>
												<span>旅遊</span>
											</div>
										</div>
										<div class="col-md-4 room_type">
											<img src="https://i.imgur.com/cpVF4fj.png"/>
											<div>
												<span>卡通</span>
											</div>
										</div>
										<div class="col-md-4 room_type">
											<img src="https://i.imgur.com/cpVF4fj.png"/>
											<div>
												<span>流行</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<form method="post" action="send_create_room.php">
								<div id="write_layout">
									<input type="text" name="input_type" class="input_type" value="分類1" hidden/>
									<input type="text" name="input_write" id="input_write" class="input_write" placeholder="請輸入聊天室名稱...">
									<input type="submit" hidden/>
								</div>
							</form>
                        </div> 
                </div>
        </div>
    </div>
</body>
</html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/all.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>

<script>
	var room_type;
	$('.room_type').on('click', function() {
		$('.room_type').removeClass('type_selected');
		$(this).addClass('type_selected');
		$('.input_type').val($('.type_selected > div > span').text());
	});
</script>

    