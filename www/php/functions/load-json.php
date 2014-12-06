<?php


/* -------- Projects -------- */
$aPages = array();

for($i=0; $i<count($allLg); $i++) {
	$lgTemp = $allLg[$i];
	$jsonPagesTemp = file_get_contents(SITE_ROOT.ASSETS.'json/'.$lgTemp.'/pages.json');
	$pagesTemp = json_decode($jsonPagesTemp, true);
	
	$aPages[ $lgTemp ] = $pagesTemp;
}

$pages = $aPages[LG];



/* -------- Page url -------- */
$i = 0;
$aPagesUrl = array();

foreach($pages as $pageUrl => $infosPage) {
	$infosPage = (object) $infosPage;
	
	if($i == 0)
		$aPagesUrl[ $infosPage->file ] = WEB_ROOT.LG_LINK_ROOT;
	else
		$aPagesUrl[ $infosPage->file ] = WEB_ROOT.LG_LINK.$pageUrl;
	
	$aPagesUrl[ $infosPage->file.'Id' ] = $pageUrl;
	
	$i++;
}
$aPagesUrl = (object) $aPagesUrl;



/* -------- Projects -------- */
$jsonProjects = file_get_contents(SITE_ROOT.ASSETS.'json/'.LG.'/projects.json');
$projects = json_decode($jsonProjects, true);

?>