<?php
	
	/* 	
		WILL World information liberty links
		Mansincal Patrick stanislas - 2017
		Systéme de centralisation de l'information
		permet de collecter et de sauvgarder une informations 
	*/
	
	define( 'FILEPATH', 								'./' );
	define( 'THEMES' , 				FILEPATH			. 'themes/');
		define( 'DEFAUT_THEME' , 		THEMES			. 'will/');
			define( 'IMAGES' , 				DEFAUT_THEME		. 'images/');
			define( 'CORE' , 				DEFAUT_THEME		. 'core/');
			define( 'JS' , 					DEFAUT_THEME		. 'js/');
			define( 'CSS' , 				DEFAUT_THEME		. 'css/');	
	define( 'DATA' , 				FILEPATH			. 'data\\');

	//print_r(get_loaded_extensions());
	
	echo file_get_contents( DEFAUT_THEME . 'principal.html');
	
?>