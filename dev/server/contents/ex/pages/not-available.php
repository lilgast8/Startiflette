<?php



class NotAvailableContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Not available — Title";
		$d->metas->desc		= "Not available — Description";
		
		
		$d->title = "— Not available  / ex —";
		
		
		
		$this->datas = $d;
	}
	
}



?>