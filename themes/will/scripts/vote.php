<?php
 //INSERT INTO `ipvote` (`IP`, `ID`, `VOTE`) VALUES ('127.0.0.1', '2', '1');

$xid	=	filter_input(	INPUT_POST,		'rid',		FILTER_SANITIZE_NUMBER_INT);
$xvote	=	filter_input(	INPUT_POST,		'vote',		FILTER_SANITIZE_NUMBER_INT);

//ini_set('html_errors', 0);
include_once 'central.php';


$mysqlix = cfg_mysql();


if (mysqli_connect_errno()) {
	header('Content-Type: application/json');
	echo json_encode(array("err"));
    exit();
}

$query = "SELECT * FROM `ipvote` WHERE `IP` LIKE '" . $_SERVER["REMOTE_ADDR"] . "' AND `ID` = '" . $xid . "';";
if ($result = $mysqlix->query($query)) {
	
	if($row = $result->fetch_row()) {
		header('Content-Type: application/json');
		echo json_encode(array('no'));
		exit;
	}
	
}

$mysqlix->close();



$mysqlix = cfg_mysql();

if (mysqli_connect_errno()) {
	header('Content-Type: application/json');
	echo json_encode(array("err"));
    exit();
}

//INSERT INTO `ipvote` (`IP`, `ID`, `VOTE`) VALUES ('" . $_SERVER["REMOTE_ADDR"] . "', '" . $xid . "', '" . $xvote . "');

$gen_data = array();
$query 	= "INSERT INTO `ipvote` (`XID`, `IP`, `ID`, `VOTE`) VALUES (NULL, '" . $_SERVER["REMOTE_ADDR"] . "', '" . $xid . "', '" . $xvote . "');";

	if($xvote == 1) {
		$query .= "UPDATE `articles` SET POSITIF = POSITIF + 1 WHERE id='" . $xid . "';";
	} else if($xvote == 2) { 
		$query .= "UPDATE `articles` SET NEGATIF = NEGATIF + 1 WHERE id='" . $xid . "';";
	} else if($xvote == 3) { 
		$query .= "UPDATE `articles` SET COMPLOT = COMPLOT + 1 WHERE id='" . $xid . "';";
	}


//"UPDATE topics SET nbr_reponses = nbr_reponses + 1 WHERE id='$ip_topic'

$mysqlix->multi_query($query);
$mysqlix->close();




//var_dump($gen_data);

header('Content-Type: application/json');
echo json_encode(array("ok"));

?>