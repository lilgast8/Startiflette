<?php



function getContents() {
	
	include_once 'global.php';
	include_once 'alt.php';
	
	$contents = new stdClass();
	
	$contents->global	= getGlobal();
	$contents->alt		= getAlt();
	
	
	return $contents;
	
}



?>