<?php

$aPages = array();

for($i=0; $i<count($allLg); $i++) {
	$lgTemp = $allLg[$i];
	$jsonPagesTemp = file_get_contents(SITE_ROOT.ASSETS.'json/'.$lgTemp.'/pages.json');
	$pagesTemp = json_decode($jsonPagesTemp, true);
	
	$aPages[ $lgTemp ] = $pagesTemp;
}

$pages = $aPages[LG];


$i = 0;
$aPagesLinks = array();
foreach($pages as $pageUrl => $infosPage) {
	$infosPage = (object) $infosPage;
	
	if($i == 0)
		$aPagesLinks[ $infosPage->file ] = WEB_ROOT.LG_LINK_ROOT;
	else
		$aPagesLinks[ $infosPage->file ] = WEB_ROOT.LG_LINK.$pageUrl;
	
	$aPagesLinks[ $infosPage->file.'Id' ] = $pageUrl;
	
	$i++;
}
$aPagesLinks = (object) $aPagesLinks;



$jsonProjects = file_get_contents(SITE_ROOT.ASSETS.'json/'.LG.'/projects.json');
$projects = json_decode($jsonProjects, true);

?>