<?php



class AboutContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "About";
		$d->metas->desc		= "About";
		
		
		$d->title = "— About —";
		
		
		
		$this->data = $d;
	}
	
}



?>