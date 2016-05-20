<?php



class ProjectsContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Projets";
		$d->metas->desc		= "Projets";
		
		
		$d->title = "— Projets —";
		
		
		
		$this->datas = $d;
	}
	
}



?>