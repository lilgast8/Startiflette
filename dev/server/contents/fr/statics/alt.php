<?php



class AltContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->noJS		= new stdClass();
		
		$d->noJS->title	= "JavaScript est désactivé.";
		$d->noJS->desc	= "Pour visionner ce site, veuillez activer JavaScript dans les préférences de votre navigateur. <br/>Une fois JavaScript activé veuillez recharger la page.";
		
		
		$d->oldB		= new stdClass();
		
		$d->oldB->title	= "Votre navigateur est obsolète.";
		$d->oldB->desc	= "Veuillez le mettre à jour gratuitement, afin d'améliorer ses performances <br />et ainsi avoir un meilleur confort de navigation.";
		$d->oldB->dl	= "Télécharger";
		
		
		
		$this->data = $d;
	}
	
}



?>