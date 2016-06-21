<?php



class HomeContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Accueil — Startiflette";
		$d->metas->desc		= "Accueil — Startiflette";
		
		
		$d->title = "— Accueil —";
		
		
		
		$this->datas = $d;
	}
	
}



?>