<?php



/* -------- Langue -------- */
if(isset($_GET['lg'])) { // si on a la langue
	$lg = $_GET['lg'];
} else { // si on a pas la langue
	if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
		$lg = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
		if($lg != 'fr' && $lg != 'en') $lg = 'fr';
	}
	else $lg = 'fr';
}



/* -------- Init -------- */
include_once('init.php');



/* -------- Mobile Detect -------- */
include_once(RACINE_SITE.'includes/Mobile_Detect.php');
$detect = new Mobile_Detect();
$mobile = $detect->isMobile() ? true : false;
$tablette = $detect->isTablet() ? true : false;
//if(preg_match('/Firefox/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
//if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
//if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) { $mobile = true; $tablette = true; }



/* -------- Textes -------- */
include_once(RACINE_SITE.'includes/textes-'.LG.'.php');



/* -------- Gestion de l'affichage de la page -------- */
$page = '';
$nomPage = '';
$nomSousPage = '';
$nomPartie = '';
$nomSousPartie = '';

if(isset($_GET['page'])) $page = $_GET['page'];
if(isset($_GET['sousPage'])) $sousPage = $_GET['sousPage'];
if(isset($_GET['partie'])) $partie = $_GET['partie'];
if(isset($_GET['sousPartie'])) $sousPartie = $_GET['sousPartie'];

if(!$page) $page = 'accueil';



/* -------- Récupération des JSON -------- */
if(!PROD) {
	$jsonInfosPages = file_get_contents(RACINE_SITE.'src/json/infos-pages-'.LG.'.json');
	$infosPages = json_decode($jsonInfosPages, true);
} else {
	$jsonInfosPages = file_get_contents(RACINE_SITE.'json/infos-pages-'.LG.'.json');
	$infosPages = json_decode($jsonInfosPages, true);
}



/* -------- Gestion des infos/titres/metas de la page -------- */
$titrePage = '';
$descPage = '';

$titrePage = $infosPages[$page]['title'];
$descPage = $infosPages[$page]['desc'];



/* -------- Affichage de la page -------- */
if($mobile && !$tablette) { // mobile
	include_once(RACINE_SITE.'includes/header-mobile.php');
	include_once(RACINE_SITE.'pages/mobile/'.$page.'.php');
	include_once(RACINE_SITE.'includes/footer-mobile.php');
} else { // desktop & tablette
	include_once(RACINE_SITE.'includes/header.php');
	include_once(RACINE_SITE.'pages/'.$page.'.php');
	include_once(RACINE_SITE.'includes/footer.php');
}



?>