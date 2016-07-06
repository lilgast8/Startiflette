<?php



class LegalNoticesContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Mentions légales";
		$d->metas->desc		= "Mentions légales";
		
		
		$d->title = "— Mentions légales —";
		
		
		
		$this->data = $d;
	}
	
}



?>