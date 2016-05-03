<?php



class StaticGlobalContent
{
	
	
	public function getDatas()
	{
		$staticGl = new stdClass();
		
		
		$staticGl->metas = new stdClass();
		
		$staticGl->metas->author		= "Gaston Bouchayer";
		$staticGl->metas->designer		= "Gaston Bouchayer";
		
		$staticGl->metas->fbType		= "website";
		$staticGl->metas->twSiteId		= "@LilGast8";
		$staticGl->metas->twCreatorId	= "@LilGast8";
		
		
		
		return $staticGl;
	}
	
}



?>