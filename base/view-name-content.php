<?php



class ViewNameContent extends AbstractContent
{
	
	public function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "View name — Title";
		$d->metas->desc		= "View name — Description";
		
		
		$d->title = "— View name / LANG —";
		
		
		
		$this->data = $d;
	}
	
}



?>