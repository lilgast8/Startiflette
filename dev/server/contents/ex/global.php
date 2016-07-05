<?php



class GlobalContent extends AbstractContent
{
	
	public function setData()
	{
		$d = new stdClass();
		
		
		$d->menu			= new stdClass();
		
		$d->menu->home		= "Home-ex";
		$d->menu->about		= "About-ex";
		$d->menu->projects	= "Projects-ex";
		$d->menu->legals	= "Legals-ex";
		
		
		
		$this->data = $d;
	}
	
}



?>