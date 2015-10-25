<?php



class AltContent
{
	
	
	public function getDatas()
	{
		$alt = new stdClass();
		
		
		$alt->noJS = new stdClass();
		
		$alt->noJS->title	= "JavaScript est désactivé.";
		$alt->noJS->desc	= "Pour visionner ce site, veuillez activer JavaScript dans les préférences de votre navigateur. <br/>Une fois JavaScript activé veuillez recharger la page.";
		
		
		$alt->oldB = new stdClass();
		
		$alt->oldB->title		= "Votre navigateur est obsolète.";
		$alt->oldB->desc		= "Veuillez le mettre à jour gratuitement, afin d'améliorer ses performances <br />et ainsi avoir un meilleur confort de navigation.";
		$alt->oldB->download	= "Télécharger";
		
		
		
		return $alt;
	}
	
}



?>