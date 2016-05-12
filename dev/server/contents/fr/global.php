<?php



class GlobalContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->menu			= new stdClass();
		
		$d->menu->home		= "Accueil";
		$d->menu->about		= "À propos";
		$d->menu->projects	= "Projets";
		
		
		
		$this->datas = $d;
	}
	
}



?>