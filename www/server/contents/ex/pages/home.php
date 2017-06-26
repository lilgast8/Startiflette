<?php



class HomeContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Home - ex — Startiflette";
		$d->metas->desc		= "Home - ex — Startiflette";
		
		
		$d->title = "— Home-ex —";
		
		
		
		$this->data = $d;
	}
	
}



?>