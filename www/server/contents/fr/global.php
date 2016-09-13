<?php



class GlobalContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->menu			= new stdClass();
		
		$d->menu->home		= "Accueil";
		$d->menu->about		= "À propos";
		$d->menu->projects	= "Projets";
		$d->menu->legals	= "Mentions légales";
		
		$d->author			= new stdClass();
		$d->author->name	= "LilGast8";
		
		
		
		$this->data = $d;
	}
	
}



?>