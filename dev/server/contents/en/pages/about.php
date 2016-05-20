<?php



class AboutContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "About";
		$d->metas->desc		= "About";
		
		
		$d->title = "— About —";
		
		
		
		$this->datas = $d;
	}
	
}



?>