<?php



class ProjectsContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Projets";
		$d->metas->desc		= "Projets";
		
		
		$d->title = "— Projets —";
		
		
		
		$this->data = $d;
	}
	
}



?>