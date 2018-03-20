<?php



class CookiesPolicyContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->cookies			= new stdClass();
		$d->cookies->txt	= 'This website uses <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank">cookies</a> to provide you a better experience.<br>By continuing to use it, we shall consider that you accept their use.';
		$d->cookies->close	= "Close";
		
		
		
		$this->data = $d;
	}
	
}



?>