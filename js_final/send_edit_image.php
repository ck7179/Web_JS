<?php
	$text = $_POST['input_write'];
	$img_o = $_POST['input_type'];
	$width = 20;
	$height = 20;
	$x = 30;
	$y = 100;
	$im = imagecreatetruecolor($width, $height);
	$im = imagecreatefromjpeg($img_o);
	$text_color = imagecolorallocate($im, 240, 73, 25);
	$word = $text;
	$font_size = 36;
	imagettftext($im, $font_size, 0, $x, $y, $text_color, "fonts/msjh.ttc", $word);
	ob_start();
	imagepng($im);
	$output = base64_encode(ob_get_clean());
	imagedestroy($im);
	echo '<img src="data:image/png;base64,' . $output . '" />';
?>