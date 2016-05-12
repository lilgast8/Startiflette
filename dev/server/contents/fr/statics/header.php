<?php



class HeaderContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->fb			= new stdClass();
		
		$d->fb->title	= "Titre Facebook";
		$d->fb->desc	= "Desc Facebook";
		
		
		$d->gp			= new stdClass();
		
		$d->gp->title	= "Titre Google+";
		$d->gp->desc	= "Desc Google+";
		
		
		$d->tw			= new stdClass();
		
		$d->tw->title	= "Titre Twitter";
		$d->tw->desc	= "Desc Twitter";
		
		
		
		$this->datas = $d;
	}
	
}



?>