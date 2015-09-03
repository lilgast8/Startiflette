<?php



include_once 'server/Main.php';
include_once 'server/contents/contents.php';

$main = Main::getInstance();
// $main->init();

$contents = getContents();



// if (!Config::$IS_AJAX)
	include_once Path::$FILE->viewsPartials . 'header.php';

include_once Path::$FILE->viewsPage . RoutesController::$PHP_VIEW . '.php';

// if(!Config::$IS_AJAX)
	include_once Path::$FILE->viewsPartials . 'footer.php';



?>