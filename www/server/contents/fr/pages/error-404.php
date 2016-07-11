<?php



class Error404Content extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Erreur 404";
		$d->metas->desc		= "Erreur 404 — La page que vous cherchez n'est pas disponible ou n'existe plus.";
		
		
		$d->title	= "Erreur 404";
		
		$d->txt		= "La page que vous cherchez n'est pas disponible ou n'existe plus.";
		$d->back	= "Retour à l'accueil";
		
		
		
		$this->data = $d;
	}
	
}



?>