<?php



include_once 'php/Main.php';

$main = Main::getInstance();
$main->init();



include_once $main->path->file->views . Main::$DEVICE_PATH . 'partials'.DS.'header.php';
include_once $main->path->file->views . Main::$DEVICE_PATH . 'pages'.DS.$main->routes->viewName.'.php';
include_once $main->path->file->views . Main::$DEVICE_PATH . 'partials'.DS.'footer.php';



?>