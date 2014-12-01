<?php

$aPages = array();

for($i=0; $i<count($aLg); $i++) {
	$lgTemp = $aLg[$i];
	$jsonPagesTemp = file_get_contents(SITE_ROOT.ASSETS.'json/'.$lgTemp.'/pages.json');
	$pagesTemp = json_decode($jsonPagesTemp, true);
	
	$aPages[ $lgTemp ] = $pagesTemp;
}

$pages = $aPages[LG];

//$jsonPages = file_get_contents(SITE_ROOT.ASSETS.'json/pages-'.LG.'.json');
//$pages = json_decode($jsonPages, true);

$jsonProjects = file_get_contents(SITE_ROOT.ASSETS.'json/'.LG.'/projects.json');
$projects = json_decode($jsonProjects, true);

?>