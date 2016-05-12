<?php



class StaticContent
{
	
	public function getDatas()
	{
		
		$static = new stdClass();
		
		
		$static->fb = new stdClass();
		
		$static->fb->title	= "Titre Facebook";
		$static->fb->desc	= "Desc Facebook";
		
		
		$static->gp = new stdClass();
		
		$static->gp->title	= "Titre Google+";
		$static->gp->desc	= "Desc Google+";
		
		
		$static->tw = new stdClass();
		
		$static->tw->title		= "Titre Twitter";
		$static->tw->desc		= "Desc Twitter";
		
		
		
		return $static;
		
	}
	
}



?>