<?php

error_reporting(E_ALL);
define ('RACINE_SITE', realpath(dirname(__FILE__)).'/');
define ('RACINE_WEB', substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], substr($_SERVER['SCRIPT_FILENAME'], strlen(RACINE_SITE)))));
define('LG', $_SESSION['lg']);

?>