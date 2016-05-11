<?php



class HomeContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d					= new stdClass();
		
		
		$d->title			= "— Accueil —";
		
		$d->infos			= new stdClass();
		$d->infos->title	= 'Titre infos';
		$d->infos->desc		= 'Description infos';
		
		
		
		$this->datas = $d;
	}
	
}



?>