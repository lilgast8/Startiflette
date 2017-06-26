<?php



class StaticGlobalContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas				= new stdClass();
		
		$d->metas->author		= "Gaston Bouchayer";
		$d->metas->designer		= "Gaston Bouchayer";
		
		$d->metas->fbType		= "website";
		$d->metas->twSiteId		= "@LilGast8";
		$d->metas->twCreatorId	= "@LilGast8";
		
		
		
		$this->data = $d;
	}
	
}



?>