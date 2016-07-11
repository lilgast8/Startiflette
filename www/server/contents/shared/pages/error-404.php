<?php



class Error404Content extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "404 error";
		$d->metas->desc		= "404 error — The page you are looking for is not available or no longer exists.";
		
		
		$d->title	= "404 error";
		
		$d->txt		= "The page you are looking for is not available or no longer exists.";
		$d->back	= "Back to home";
		
		
		
		$this->data = $d;
	}
	
}



?>