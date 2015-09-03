<?php



function getContents() {
	
	include_once Lang::$LANG . '/global.php';
	include_once Lang::$LANG . '/alt.php';
	
	include_once Lang::$LANG . '/home.php';
	include_once Lang::$LANG . '/about.php';
	include_once Lang::$LANG . '/projects.php';
	include_once Lang::$LANG . '/project.php';
	
	
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