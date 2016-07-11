<?php



class AboutContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "About - ex";
		$d->metas->desc		= "About - ex";
		
		
		$d->title = "— About-ex —";
		
		
		
		$this->data = $d;
	}
	
}



?>