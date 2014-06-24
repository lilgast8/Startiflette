<?php



/* -------- Init -------- */
include_once('init.php');



/* -------- Mobile Detect -------- */
include_once(SITE_ROOT.'includes/lib/Mobile_Detect.php');
$detect = new Mobile_Detect();
$mobile = $detect->isMobile() ? true : false;
$tablet = $detect->isTablet() ? true : false;
//if(preg_match('/Firefox/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
//if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
//if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) { $mobile = true; $tablet = true; }



/* -------- Texts -------- */
include_once(SITE_ROOT.'includes/content/texts-'.LG.'.php');



/* -------- Load JSON -------- */
include_once(SITE_ROOT.'includes/func/load-json.php');



/* -------- Get page name -------- */
$page = '';
$subPage = '';
$part = '';
$subPart = '';

if(isset($_GET['page'])) $page = $_GET['page'];
if(isset($_GET['subPage'])) $subPage = $_GET['subPage'];
if(isset($_GET['part'])) $part = $_GET['part'];
if(isset($_GET['subPart'])) $subPart = $_GET['subPart'];

if(!$page) {
	if(LG == 'fr') $page = 'accueil';
	else if(LG == 'en') $page = 'home';
}



/* -------- Infos titles/metas of the page -------- */
$title = '';
$desc = '';

$title = $infosPages[$page]['title'];
$desc = $infosPages[$page]['desc'];
$file = $infosPages[$page]['file'];



/* -------- Show page -------- */
if($mobile && !$tablet) { // mobile
	include_once(SITE_ROOT.'includes/partial/header-mobile.php');
	include_once(SITE_ROOT.'pages/mobile/'.$file.'.php');
	include_once(SITE_ROOT.'includes/partial/footer-mobile.php');
} else { // desktop & tablette
	include_once(SITE_ROOT.'includes/partial/header.php');
	include_once(SITE_ROOT.'pages/desktop/'.$file.'.php');
	include_once(SITE_ROOT.'includes/partial/footer.php');
}



?>