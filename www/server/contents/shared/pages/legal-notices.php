<?php



class LegalNoticesContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Mentions légales";
		$d->metas->desc		= "Mentions légales";
		
		
		$d->title = "— Mentions légales —";
		
		
		
		$this->datas = $d;
	}
	
}



?>