<?php



class RoutesController {
	
	var $rootUrlName = null;
	var $altUrl = null;
	var $viewName = null;
	var $pageName = null;
	var $pageUrl = null;
	
	function getPageName() {
		echo 'get page name : '.$pageName;
	}
	
	
}

$routes = new RoutesController();


?>