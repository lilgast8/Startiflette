<?php



class CookiesPolicyContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->cookies			= new stdClass();
		$d->cookies->txt	= 'Ce site utilise des <a href="https://fr.wikipedia.org/wiki/Cookie_(informatique)" target="_blank">cookies</a> pour vous garantir une meilleure expérience.<br>En continuant à l\'utiliser, nous considérerons que vous acceptez leur utilisation.';
		$d->cookies->close	= "Fermer";
		
		
		
		$this->data = $d;
	}
	
}



?>