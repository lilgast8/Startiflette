<?php



/* -------- Prod -------- */
define('PROD', false);
//define('PROD', true);



/* -------- Localhost -------- */
$localhost = strpos($_SERVER['HTTP_HOST'], 'localhost') !== false ? true : false;
define('LOCALHOST', $localhost);



/* -------- Assets -------- */
$assets = PROD ? 'assets/' : 'src/';
define('ASSETS', $assets);



/* -------- Racines -------- */
define('SITE_URL', 'http://www.SITE_URL.COM');
define('SITE_ROOT', realpath(dirname(__FILE__)).'/');
//define('WEB_ROOT', substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], substr($_SERVER['SCRIPT_FILENAME'], strlen(SITE_ROOT)))));
$web_root = LOCALHOST ? '/Web/Gaston/Starter/root-project/www/' : SITE_URL.'/';
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



/* -------- Erreur -------- */
if(LOCALHOST) error_reporting(E_ALL);



?>