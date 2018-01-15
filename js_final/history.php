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
                        <div id="history_wrapper">
							<div id="show_history_layout">
								<div id="list">
<?php
	$conn = mysql_connect("localhost", "root", "");
	mysql_select_db("js_final");
	mysql_query("set names utf8");
	$result = mysql_query("SELECT *, date(s_time) as a_d FROM activity ORDER BY a_d ASC");
	while($row = mysql_fetch_array($result)){
		echo "<span>";
		echo $row['a_d'];
		echo "</br>　";
		echo $row['a_name'];
		echo " @ ";
		echo $row['location'];
		echo "</br></br></span>";
	}
?>
								</div>	
							</div>
                        </div> 
                </div>
        </div>
    </div>
</body>
</html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/all.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
    