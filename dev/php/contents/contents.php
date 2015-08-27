<?php



function getContents() {
	
	include_once Config::$LANG . DS . 'global.php';
	include_once Config::$LANG . DS . 'alt.php';
	
	include_once Config::$LANG . DS . 'home.php';
	include_once Config::$LANG . DS . 'about.php';
	include_once Config::$LANG . DS . 'projects.php';
	include_once Config::$LANG . DS . 'project.php';
	
	
	$contents = new stdClass();
	
	$contents->global	= getGlobal();
	$contents->alt		= getAlt();
	
	$contents->home		= getHome();
	$contents->about	= getAbout();
	$contents->projects	= getProjects();
	$contents->project	= getProject();
	
	
	
	return $contents;
	
}



?>