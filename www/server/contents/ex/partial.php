<?php



class PartialContent
{
	
	public function getDatas()
	{
		
		$partial = new stdClass();
		
		
		$partial->menu = new stdClass();
		
		$partial->menu->home		= "Home";
		$partial->menu->about		= "About";
		$partial->menu->projects	= "Projects";
		$partial->menu->legals		= "Legals";
				
		
		
		return $partial;
		
	}
	
}



?>