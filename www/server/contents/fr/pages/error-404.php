<?php



class Error404Content
{
	
	public function getDatas()
	{
		
		$error404 = new stdClass();
		
		
		$error404->title	= "Erreur 404";
		
		$error404->txt		= "La page que vous cherchez n'est pas disponible ou n'existe plus.";
		$error404->back		= "Retour à l'accueil";
		
		
		
		return $error404;
		
	}
	
}



?>