<?php



/* -------- Init -------- */
include_once('init.php');



/* -------- Texts -------- */
include_once(SITE_ROOT.'php/contents/texts-'.LG.'.php');



/* -------- Load JSON -------- */
include_once(SITE_ROOT.'php/functions/load-json.php');



/* -------- Get pages name -------- */
$pageName = '';
$subPageName = '';
$partName = '';
$subPartName = '';

if(isset($_GET['page'])) $pageName = $_GET['page'];
if(isset($_GET['subPage'])) $subPageName = $_GET['subPage'];
if(isset($_GET['part'])) $partName = $_GET['part'];
if(isset($_GET['subPart'])) $subPartName = $_GET['subPart'];



/* -------- Set page name if undefined -------- */
if(!$pageName) {
	for($i=0; $i<count($pages); $i++) {
		if($i == 0)
			$pageName = $pages[$i]['url'];
	}
}



/* -------- Set page id -------- */
for($i=0; $i<count($pages); $i++) {
	if($pages[$i]['url'] == $pageName)
		$pageId = $i;
}



/* -------- Titles/metas of the page -------- */
$titlePage = '';
$descPage = '';

$titlePage = $pages[$pageId]['title'];
$descPage = $pages[$pageId]['desc'];
$file = $pages[$pageId]['file'];

if($file == 'project') {
	$url = $pageName.'/'.$subPageName.'/'.$partName;
	
	for($i=0; $i<count($projects); $i++) {
		$project = $projects[$i];
		
		if($project['url'] == $url) {
			$titlePage = $project['name'].' - '.$pages[$pageId]['title'];
			$descPage = $project['name'].' - '.$pages[$pageId]['title'];
			
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