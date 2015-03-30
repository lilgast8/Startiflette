<?php



function getContents() {
	
	include_once Config::$LANG . DS . 'global.php';
	include_once Config::$LANG . DS . 'alt.php';
	
	
	$contents = new stdClass();
	
	$contents->global	= getGlobal();
	$contents->alt		= getAlt();
	
	
	
	return $contents;
	
}



?>