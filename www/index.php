<?php



/* -------- Init -------- */
include_once('init.php');



/* -------- Texts -------- */
include_once(SITE_ROOT.'php/contents/'.LG.'/texts.php');



/* -------- Load JSON -------- */
include_once(SITE_ROOT.'php/functions/load-pages-infos.php');



/* -------- Set root page name -------- */
foreach($pages as $url => $infosPage) {
	$rootUrlName = $url;
	
	break;
}



/* -------- Set pages name -------- */
$urlPart1 = '';
$urlPart2 = '';
$urlPart3 = '';
$urlPart4 = '';

if(isset($_GET['urlPart1'])) $urlPart1 = $_GET['urlPart1'];
if(isset($_GET['urlPart2'])) $urlPart2 = $_GET['urlPart2'];
if(isset($_GET['urlPart3'])) $urlPart3 = $_GET['urlPart3'];
if(isset($_GET['urlPart4'])) $urlPart4 = $_GET['urlPart4'];



/* -------- Set page name if undefined -------- */
if(!$urlPart1)
	$urlPart1 = $rootUrlName;



/* -------- Set page id -------- */
/*for($i=0; $i<count($pages); $i++) {
	if($pages[$i]['url'] == $pageName)
		$pageId = $i;
}*/
/*
$i = 0;
foreach($pages as $key => $value) {
	if($key == $pageName) {
		echo $i.'<br />';
		$pageId = $i;
		
		break;
	}
	
	$i++;
}
*/



/* -------- Titles/metas of the page -------- */
$titlePage = '';
$descPage = '';

$titlePage = $pages[$urlPart1]['title'];
$descPage = $pages[$urlPart1]['desc'];
$file = $pages[$urlPart1]['file'];

if($file == 'project') {
	$url = $urlPart1.'/'.$urlPart2.'/'.$urlPart3;
	
	for($i=0; $i<count($projects); $i++) {
		$project = $projects[$i];
		
		if($project['url'] == $url) {
			$titlePage = $project['name'].' - '.$pages[$urlPart1]['title'];
			$descPage = $project['name'].' - '.$pages[$urlPart1]['title'];
			
			break;
		}
	}
}



/* -------- Show page -------- */
if(MOBILE && !TABLET) { // mobile
	include_once(SITE_ROOT.'php/views/mobile/partials/header.php');
	include_once(SITE_ROOT.'php/views/mobile/pages/'.$file.'.php');
	include_once(SITE_ROOT.'php/views/mobile/partials/footer.php');
} else { // desktop & tablette
	include_once(SITE_ROOT.'php/views/desktop/partials/header.php');
	include_once(SITE_ROOT.'php/views/desktop/pages/'.$file.'.php');
	include_once(SITE_ROOT.'php/views/desktop/partials/footer.php');
}



?>