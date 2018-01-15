<?php
	$type = $_POST["input_type"];
	$name = $_POST["input_write"];
	$conn = mysql_connect("localhost", "root", "");
	mysql_select_db("js_final");
	mysql_query("set names utf8");
	mysql_query("INSERT INTO chatroom (c_type, c_name, u_no) VALUES ('$type', '$name', -1)");
	header("location: chatroom.html");
?>