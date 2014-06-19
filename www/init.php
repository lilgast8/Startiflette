<?php


/* -------- Prod -------- */
define('PROD', 'false');
//define('PROD', 'true');


/* -------- Local -------- */
$localhost = $_SERVER['HTTP_HOST'] != 'localhost:8888' ? 'false' : 'true';
define('LOCALHOST', $localhost);


/* -------- Racines -------- */
define('RACINE_SITE', realpath(dirname(__FILE__)).'/');
if(LOCALHOST == 'false') define('RACINE_WEB', substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], substr($_SERVER['SCRIPT_FILENAME'], strlen(RACINE_SITE)))));
else {
	$racineWebTemp = substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], substr($_SERVER['SCRIPT_FILENAME'], strlen(RACINE_SITE))));
	$posFinRacineWeb = strrpos($racineWebTemp, '/root/www/')+10;
	define('RACINE_WEB', substr($racineWebTemp, 0, $posFinRacineWeb));
}


/* -------- Langue -------- */
define('LG', $lg);
//if(isset($_SESSION['lg'])) define('LG', $_SESSION['lg']);
//else define('LG', 'fr');

/*
if(isset($_GET['lg'])) define('LG', $_GET['lg']);
else if(isset($_SERVER['HTTP_REFERER'])){
	if(stripos($_SERVER['HTTP_REFERER'], '/fr/') > 0) define('LG', 'fr');
	else define('LG', 'en');
}
*/


/* -------- Erreur -------- */
if(LOCALHOST == 'true') error_reporting(E_ALL);


?>