<?php



class HomeContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Home - ex — Startiflette";
		$d->metas->desc		= "Home - ex — Startiflette";
		
		
		$d->title = "— Home-ex —";
		
		
		
		$this->datas = $d;
	}
	
}



?>