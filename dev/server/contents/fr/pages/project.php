<?php



class ProjectContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Projet";
		$d->metas->desc		= "Projet";
		
		
		$d->title = "— Projet —";
		
		
		
		$this->datas = $d;
	}
	
}



?>