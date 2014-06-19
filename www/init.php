<?php



/* -------- Prod -------- */
define('PROD', false);
//define('PROD', true);



/* -------- Local -------- */
$localhost = $_SERVER['HTTP_HOST'] != 'localhost:8888' ? false : true;
define('LOCALHOST', $localhost);



/* -------- Racines -------- */
define('URL_SITE', 'http://www.URL-DU-SITE.COM');
define('RACINE_SITE', realpath(dirname(__FILE__)).'/');
define('RACINE_WEB', substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], substr($_SERVER['SCRIPT_FILENAME'], strlen(RACINE_SITE)))));



/* -------- Langue -------- */
define('LG', $lg);



/* -------- Erreur -------- */
if(LOCALHOST) error_reporting(E_ALL);



?>