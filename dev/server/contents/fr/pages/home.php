<?php



class HomeContent extends AbstractContent
{
	
	protected function setData()
	{
		$metas	= $this->getContent( 'metas' );
		
		
		$d		= new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Accueil — Startiflette";
		$d->metas->desc		= "Accueil — Startiflette";
		
		
		$d->mainTitle	= "Startiflette by " . $metas->author;
		$d->title		= "— Accueil —";
		
		
		
		$this->data = $d;
	}
	
}



?>