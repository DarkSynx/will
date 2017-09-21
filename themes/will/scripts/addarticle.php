<?php

ini_set('html_errors', 0);

//sleep(1);

$url	=	filter_input(	INPUT_POST,		'aurl',	FILTER_SANITIZE_ENCODED);
$type	=	filter_input(	INPUT_POST,		'atype',	FILTER_SANITIZE_STRING);
$desc	=	filter_input(	INPUT_POST,		'adesc',	FILTER_SANITIZE_STRING);

include_once 'central.php';



$mysqlix = cfg_mysql();


if (mysqli_connect_errno()) {
	header('Content-Type: application/json');
	echo json_encode(array("err"));
    exit();
}

$url	=	$mysqlix->real_escape_string($url);

$query = "SELECT * FROM `articles` WHERE `URL` LIKE '$url' ";
if ($result = $mysqlix->query($query)) {
	
	if($row = $result->fetch_row()) {
		header('Content-Type: application/json');
		echo json_encode(array('no'));
		exit;
	}
	
}

$mysqlix->close();


//$tags = get_meta_tags(rawurldecode($url));
$getpage = @file_get_contents(rawurldecode($url));

if($getpage) {
	
$meta_tags = getMetaTags($getpage);

	
	if(@$meta_tags['og:title']) {
		$titre = $meta_tags['og:title'];
	}
	else if(@$meta_tags['twitter:title']) {
		
		$titre = $meta_tags['twitter:title'];
	}
	else {
		$urlt = parse_url(rawurldecode($url));
		$titre = $urlt['host'];
	}

$tag = @$meta_tags['keywords'];
	
$mysqli = cfg_mysql();;


if (mysqli_connect_errno()) {
	header('Content-Type: application/json');
	echo json_encode(array("err"));
    exit();
}

$date = date('Y-m-d', time());

//INSERT INTO `articles` (`ID`, `DATE`, `TITRE`, `TYPE`, `VUE`, `POSITIF`, `NEGATIF`, `COMPLOT`, `URL`, `TAGS`, `DESCRYPTION`, `BAN`) VALUES (NULL, NOW(), '$titre', '$type', '0', '0', '0', '0', '$url', '$tag', '$desc', '0');

$url	=	$mysqli->real_escape_string($url);
$titre	=	substr($mysqli->real_escape_string($titre),0,60).'...';
$type	=	substr($mysqli->real_escape_string($type),0,12);
$tag	=	substr($mysqli->real_escape_string($tag),0,256);

//description
if($desc == '' or $desc == ' ') {
	$desc	=	substr($mysqli->real_escape_string($meta_tags['description']),0,256);
} else {
	$desc	=	substr($mysqli->real_escape_string($desc),0,256);
}



$query = encodetoutf8("INSERT INTO `articles` (`ID`, `DATE`, `TITRE`, `TYPE`, `VUE`, `POSITIF`, `NEGATIF`, `COMPLOT`, `URL`, `TAGS`, `DESCRYPTION`, `BAN`) VALUES (NULL, '$date', '$titre', '$type', '0', '0', '0', '0', '$url', '$tag', '$desc', '0')");	

$mysqli->query($query);

	$xpath = "../../../data/". $date . '/' . $mysqli->insert_id .'/';
	@mkdir($xpath , 0700, true);

	
if(@$meta_tags['og:image']) {
		

	$ext = strtolower(substr($meta_tags['og:image'],-3));	
	if($ext == 'png') 						{ @copy($meta_tags['og:image'], $xpath . '/tumb.png'); }
	elseif($ext == 'jpg' or $ext == 'peg') 	{ @copy($meta_tags['og:image'], $xpath . '/tumb.jpg'); }
	elseif($ext == 'gif') 					{ @copy($meta_tags['og:image'], $xpath . '/tumb.gif'); }
	else 									{ @copy($meta_tags['og:image'], $xpath . '/tumb.pic'); }
	
} 
else {

	$myurlx1 = @getimage($getpage);
	$myurlx2 = @getimage($getpage,$myurlx1[1]);
	$myurlx3 = @getimage($getpage,$myurlx2[1]);
	$myurlx4 = @getimage($getpage,$myurlx3[1]);


	$mx = array( 	
			getimagesize($myurlx1[0])[1],
			getimagesize($myurlx2[0])[1],
			getimagesize($myurlx3[0])[1],
			getimagesize($myurlx4[0])[1] 
		);
	
	$ks = array_search(max($mx), $mx);
	if($ks == 0) { $myurl = $myurlx1[0]; }
	else if($ks == 1) { $myurl = $myurlx2[0]; }
	else if($ks == 2) { $myurl = $myurlx3[0]; }
	else if($ks == 3) { $myurl = $myurlx4[0]; }
	
	//var_dump echo $myurl;
		
		$ext = strtolower(substr($myurl,-3));	
		if($ext == 'png') 						{ @copy($myurl, $xpath . '/tumb.png'); }
		elseif($ext == 'jpg' or $ext == 'peg') 	{ @copy($myurl, $xpath . '/tumb.jpg'); }
		elseif($ext == 'gif') 					{ @copy($myurl, $xpath . '/tumb.gif'); }
		else 									{ @copy($myurl, $xpath . '/tumb.pic'); }

}

$fp = fopen($xpath . '/cache.txt', 'w');
fwrite($fp, /*gzcompress(*/'"$titre", "$type", "$url", "$tag", "$desc";' . PHP_EOL . $getpage/*,1)*/);
fclose($fp);

$mysqli->close();



//og:image
//og:title
//twitter:title


		header('Content-Type: application/json');
		echo json_encode(array('ok'));
}
else {
header('Content-Type: application/json');	
echo json_encode(array('err'));
}


function getimage($getpage,$pos0 = 0) {
	
	$pos1 = stripos($getpage, '<img',$pos0);
	$pos2 = stripos($getpage, '>',$pos1+4);
		
	$chn_img = substr($getpage,$pos1,$pos2 - $pos1);
	$chn_img = str_ireplace('\'','"',$chn_img);

	$pos3 = stripos($chn_img, 'src="');
	$pos4 = stripos($chn_img, '"',$pos3+5);
	
	$myurl = substr($chn_img,$pos3+5,$pos4 - ($pos3+5));	
	
	$myurlx = array($myurl,$pos2);
	
	if(substr($myurl,0,4) != 'http' /*or substr($myurl,0,2) != '//'*/ ) {
		$myurlx = @getimage($getpage,$pos2);	

	} 

	
	return $myurlx;
}

function encodetoutf8($str) {
return mb_convert_encoding($str, "UTF-8", mb_detect_encoding($str));
}


function getMetaTags($str) {
  $pattern = '
  ~<\s*meta\s

  # using lookahead to capture type to $1
    (?=[^>]*?
    \b(?:name|property|http-equiv)\s*=\s*
    (?|"\s*([^"]*?)\s*"|\'\s*([^\']*?)\s*\'|
    ([^"\'>]*?)(?=\s*/?\s*>|\s\w+\s*=))
  )

  # capture content to $2
  [^>]*?\bcontent\s*=\s*
    (?|"\s*([^"]*?)\s*"|\'\s*([^\']*?)\s*\'|
    ([^"\'>]*?)(?=\s*/?\s*>|\s\w+\s*=))
  [^>]*>

  ~ix';
 
  if(preg_match_all($pattern, $str, $out))
    return array_combine($out[1], $out[2]);
  return array();
}





?>