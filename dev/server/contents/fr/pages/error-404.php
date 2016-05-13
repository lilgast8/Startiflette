<?php



class Error404Content extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->title	= "Erreur 404";
		
		$d->txt		= "La page que vous cherchez n'est pas disponible ou n'existe plus.";
		$d->back	= "Retour à l'accueil";
		
		
		
		$this->datas = $d;
	}
	
}



?>