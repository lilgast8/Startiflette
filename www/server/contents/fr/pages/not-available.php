<?php



class NotAvailableContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Pas disponible — Title";
		$d->metas->desc		= "Pas disponible — Description";
		
		
		$d->title	= "Cette page n'est pas disponible sur mobile.";
		$d->txt		= "Le contenu auquel vous tentez d'accéder n'est pas disponible sur la version mobile. <br>
		Vous pouvez accéder à ce contenu depuis votre ordinateur et tablette ou retourner sur la <a href=\"" . Router::$LINK->home . "\">page d'accueil</a> et continuer votre navigation.";
		
		
		
		$this->data = $d;
	}
	
}



?>