<?php



class AboutContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "À propos";
		$d->metas->desc		= "À propos";
		
		
		$d->title = "— À propos —";
		
		
		
		$this->datas = $d;
	}
	
}



?>