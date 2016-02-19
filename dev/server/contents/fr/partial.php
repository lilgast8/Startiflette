<?php



class PartialContent
{
	
	public function getDatas()
	{
		
		$partial = new stdClass();
		
		
		$partial->menu = new stdClass();
		
		$partial->menu->home		= "Accueil";
		$partial->menu->about		= "À propos";
		$partial->menu->projects	= "Projets";
		$partial->menu->legals		= "Mentions légales";
		
		
		
		return $partial;
		
	}
	
}



?>