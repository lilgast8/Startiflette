<?php



class AboutContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "À propos";
		$d->metas->desc		= "À propos";
		
		
		$d->title = "— À propos —";
		
		
		
		$this->data = $d;
	}
	
}



?>