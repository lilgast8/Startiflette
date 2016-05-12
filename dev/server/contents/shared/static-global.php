<?php



class StaticGlobalContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas				= new stdClass();
		
		$d->metas->author		= "Gaston Bouchayer";
		$d->metas->designer		= "Gaston Bouchayer";
		
		$d->metas->fbType		= "website";
		$d->metas->twSiteId		= "@LilGast8";
		$d->metas->twCreatorId	= "@LilGast8";
		
		
		
		$this->datas = $d;
	}
	
}



?>