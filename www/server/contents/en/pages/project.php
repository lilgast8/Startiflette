<?php



class ProjectContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Projet";
		$d->metas->desc		= "Projet";
		
		
		$d->title = "— Project —";
		
		
		
		$this->datas = $d;
	}
	
}



?>