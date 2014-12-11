<?php



/* ---------------------- */
/* -------- Prod -------- */
/* ---------------------- */

define('PROD', false);
//define('PROD', true);





/* --------------------------- */
/* -------- Localhost -------- */
/* --------------------------- */

$localhost = $_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_PORT'] == '8888' ? true : false;
define('LOCALHOST', $localhost);





/* ------------------------ */
/* -------- Errors -------- */
/* ------------------------ */

if(LOCALHOST || !PROD) {
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
}





/* ------------------------ */
/* -------- Assets -------- */
/* ------------------------ */

$assets = PROD ? 'assets/' : 'src/';
define('ASSETS', $assets);





/* ----------------------- */
/* -------- Roots -------- */
/* ----------------------- */

define('SITE_URL', 'http://www.SITE_URL.COM');
define('SITE_ROOT', realpath(dirname(__FILE__)).'/');
$web_root = LOCALHOST ? substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], substr($_SERVER['SCRIPT_FILENAME'], strlen(SITE_ROOT)))) : SITE_URL.'/';
define('WEB_ROOT', $web_root);





/* --------------------------- */
/* -------- Languages -------- */
/* --------------------------- */

$allLg = array('fr', 'en', 'ex');
// $allLg = array('en');

$multilingual = count($allLg) > 1 ? true : false;

/* Language */
if(isset($_GET['lg'])) // if get lg
	$lg = $_GET['lg'];
else // if don't get lg
	$lg = $allLg[0];

/* Alternative language */
if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
	$altLg = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
	if($lg != 'fr' && $lg != 'en') $altLg = 'en';
	else $altLg = $lg;
}
else $altLg = 'en';


$lgLink = $multilingual ? $lg.'/' : '';
$lgLinkRoot = $lg == $allLg[0] ? '' : $lg;

// define('LG', $lg);
define('MULTI_LG', $multilingual);
define('LG_LINK', $lgLink);
define('LG_LINK_ROOT', $lgLinkRoot);
define('ALT_LG', $altLg);





/* ------------------------------- */
/* -------- Mobile Detect -------- */
/* ------------------------------- */

include_once(SITE_ROOT.'php/libs/Mobile_Detect.php');
$detect = new Mobile_Detect();
$mobile = $detect->isMobile() ? true : false;
$tablet = $detect->isTablet() ? true : false;
$desktop = !$mobile && !$tablet ? true : false;
//if(preg_match('/Firefox/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
//if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
//if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) { $mobile = true; $tablet = true; }
define('DESKTOP', $desktop);
define('TABLET', $tablet);
define('MOBILE', $mobile);



?>