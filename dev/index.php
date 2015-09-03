<?php



include_once 'server/Main.php';

$main = Main::getInstance();
// $main->init();



/*if(!Config::$IS_AJAX)
	include_once $main->path->file->views . Config::$DEVICE_FOLDER . 'partials/header.php';

include_once $main->path->file->views . Config::$DEVICE_FOLDER.Config::$FOLDER .$main->routes->viewName.'.php';

if(!Config::$IS_AJAX)
	include_once $main->path->file->views . Config::$DEVICE_FOLDER . 'partials/footer.php';*/
	

// echo Config::$FOLDER;

// phpinfo();

include_once Path::$FILE->viewsPartials . 'header.php';

// include_once Path::$FILE->views . Config::$DEVICE_FOLDER . 'pages/' . RoutesController::$PHP_VIEW . '.php';
include_once Path::$FILE->viewsPage . RoutesController::$PHP_VIEW . '.php';

include_once Path::$FILE->viewsPartials . 'footer.php';



?>