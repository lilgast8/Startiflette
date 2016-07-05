<?php



class HomeContent extends AbstractContent
{
	
	public function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Home — Startiflette";
		$d->metas->desc		= "Home — Startiflette";
		
		
		$d->title = "— Home —";
		
		
		
		$this->data = $d;
	}
	
}



?>