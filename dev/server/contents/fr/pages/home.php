<?php



class HomeContent extends AbstractContent
{
	
	protected function setData()
	{
		$author	= $this->getContent( 'author' );
		
		
		$d		= new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Accueil — Startiflette";
		$d->metas->desc		= "Accueil — Startiflette";
		
		
		$d->mainTitle	= "Startiflette by " . $author->name;
		$d->title		= "— Accueil —";
		
		
		
		$this->data = $d;
	}
	
}



?>