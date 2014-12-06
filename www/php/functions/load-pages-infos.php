<?php


/* -------- Pages infos -------- */
$aPages = array();

for($i=0; $i<count($allLg); $i++) {
	$lgTemp = $allLg[$i];
	$jsonPagesTemp = file_get_contents(SITE_ROOT.ASSETS.'json/'.$lgTemp.'/pages.json');
	$pagesTemp = json_decode($jsonPagesTemp, true);
	
	$aPages[ $lgTemp ] = $pagesTemp;
}

$pages = $aPages[LG];



/* -------- Url -------- */
$i = 0;
$aUrl = array();

foreach($pages as $pageUrl => $infosPage) {
	$infosPage = (object) $infosPage;
	
	if($i == 0)
		$aUrl[ $infosPage->file ] = WEB_ROOT.LG_LINK_ROOT;
	else
		$aUrl[ $infosPage->file ] = WEB_ROOT.LG_LINK.$pageUrl;
	
	$aUrl[ $infosPage->file.'Id' ] = $pageUrl;
	
	$i++;
}
$aUrl = (object) $aUrl;


?>