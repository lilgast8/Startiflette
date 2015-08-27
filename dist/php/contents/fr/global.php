<?php



function getGlobal() {
	
	$global = new stdClass();
	
	
	$global->menu = new stdClass();
	
	$global->menu->home		= "Accueil";
	$global->menu->about	= "À propos";
	$global->menu->projects	= "Projets";
	$global->menu->legals	= "Mentions légales";
	
	
	$global->fb = new stdClass();
	
	$global->fb->title	= "Titre Facebook";
	$global->fb->desc	= "Desc Facebook";
	
	
	$global->gp = new stdClass();
	
	$global->gp->title	= "Titre Google+";
	$global->gp->desc	= "Desc Google+";
	
	
	$global->tw = new stdClass();
	
	$global->tw->title		= "Titre Twitter";
	$global->tw->desc		= "Desc Twitter";
	$global->tw->id_site	= "@LilGast8";
	$global->tw->id_creator	= "@LilGast8";
	
	
	
	return $global;
	
}



?>