<?php



/* -------- Prod -------- */
define('PROD', false);
//define('PROD', true);



/* -------- Localhost -------- */
$localhost = $_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_PORT'] == '8888' ? true : false;
define('LOCALHOST', $localhost);



/* -------- Assets -------- */
$assets = PROD ? 'assets/' : 'src/';
define('ASSETS', $assets);



/* -------- Roots -------- */
define('SITE_URL', 'http://www.SITE_URL.COM');
define('SITE_ROOT', realpath(dirname(__FILE__)).'/');
//define('WEB_ROOT', substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], substr($_SERVER['SCRIPT_FILENAME'], strlen(SITE_ROOT)))));
//$web_root = LOCALHOST ? 'http://localhost:8888/Documents/Gaston/Web/Starter/root-project/www/' : SITE_URL.'/';
//$web_root = LOCALHOST ? 'http://localhost:8888/Documents/Gaston/Web/Starter/root-project/www/' : SITE_URL.'/';
//$web_root = LOCALHOST ? 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'] : SITE_URL.'/';
$web_root = LOCALHOST ? 'http://'.$_SERVER['HTTP_HOST'].preg_replace('[index.php]', '', $_SERVER['SCRIPT_NAME']) : SITE_URL.'/';
define('WEB_ROOT', $web_root);



/* -------- Language -------- */
if(isset($_GET['lg'])) { // if lg
	$lg = $_GET['lg'];
} else { // if !lg
	if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
		$lg = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
		if($lg != 'fr' && $lg != 'en') $lg = 'fr';
	}
	else $lg = 'fr';
}
define('LG', $lg);
//define('LG', 'fr');



/* -------- Mobile Detect -------- */
include_once(SITE_ROOT.'includes/lib/Mobile_Detect.php');
$detect = new Mobile_Detect();
$mobile = $detect->isMobile() ? true : false;
$tablet = $detect->isTablet() ? true : false;
//if(preg_match('/Firefox/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
//if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
//if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) { $mobile = true; $tablet = true; }
define('MOBILE', $mobile);
define('TABLET', $tablet);



/* -------- Errors -------- */
if(LOCALHOST) error_reporting(E_ALL);



?>