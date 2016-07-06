<?php



class HomeContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Accueil — Startiflette";
		$d->metas->desc		= "Accueil — Startiflette";
		
		
		$d->title = "— Accueil —";
		
		
		
		$this->data = $d;
	}
	
}



?>