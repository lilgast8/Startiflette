<?php



class Error404Content
{
	
	public function getDatas()
	{
		
		$error404 = new stdClass();
		
		
		$error404->title	= "404 error";
		
		$error404->txt		= "The page you are looking for is not available or no longer exists.";
		$error404->back		= "Back to home";
		
		
		
		return $error404;
		
	}
	
}



?>