<?php



class ViewNameContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "View name — Title";
		$d->metas->desc		= "View name — Description";
		
		
		$d->title = "— View name / LANG —";
		
		
		
		$this->datas = $d;
	}
	
}



?>