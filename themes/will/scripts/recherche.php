<?php

$chr	=	filter_input(	INPUT_POST,		'chr',		FILTER_SANITIZE_STRING);


//ini_set('html_errors', 0);
include_once 'central.php';

$mysqlix = cfg_mysql();


if (mysqli_connect_errno()) {
	header('Content-Type: application/json');
	echo json_encode(array("err"));
    exit();
}

$chr	=	substr($mysqlix->real_escape_string($chr),0,100);

$gen_data = array();
$query = "SELECT * FROM `articles` WHERE `TITRE` LIKE '%" . $chr . "%' ;";
if ($result = $mysqlix->query($query)) {
	while($row = $result->fetch_row()) {
		//$gen_data[] = array_map('utf8_encode',$row);
		$row[1] = rawurldecode($row[1]);
		$gen_data[] = $row;
	}
}

$mysqlix->close();


//var_dump($gen_data);

header('Content-Type: application/json');
echo json_encode($gen_data);


?>