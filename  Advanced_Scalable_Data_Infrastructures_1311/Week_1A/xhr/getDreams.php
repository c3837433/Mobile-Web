<?php
    $cb = $_GET["callback"]; // Retrieve the value of the url
	$responce = $cb . "(" . $json . ")";
	echo $responce; // returns info
?>
