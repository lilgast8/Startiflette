<?php



class Error404Content extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->title	= "404 error";
		
		$d->txt		= "The page you are looking for is not available or no longer exists.";
		$d->back	= "Back to home";
		
		
		
		$this->datas = $d;
	}
	
}



?>