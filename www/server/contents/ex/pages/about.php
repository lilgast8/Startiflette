<?php



class AboutContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "About - ex";
		$d->metas->desc		= "About - ex";
		
		
		$d->title = "— About-ex —";
		
		
		
		$this->datas = $d;
	}
	
}



?>