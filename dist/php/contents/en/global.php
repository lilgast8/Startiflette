<?php



function getGlobal() {
	
	$global = new stdClass();
	
	
	$global->menu = new stdClass();
	
	$global->menu->home		= "Home";
	$global->menu->about	= "About";
	$global->menu->projects	= "Projects";
	$global->menu->legals	= "Legals";
	
	
	$global->fb = new stdClass();
	
	$global->fb->title	= "Facebook title";
	$global->fb->desc	= "Facebook desc";
	
	
	$global->gp = new stdClass();
	
	$global->gp->title	= "Google+ title";
	$global->gp->desc	= "Google+ desc";
	
	
	$global->tw = new stdClass();
	
	$global->tw->title		= "Twitter title";
	$global->tw->desc		= "Twitter desc";
	$global->tw->id_site	= "@LilGast8";
	$global->tw->id_creator	= "@LilGast8";
	
	
	
	return $global;
	
}



?>