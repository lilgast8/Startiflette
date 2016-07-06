<?php



class ProjectsContent extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Projects - ex";
		$d->metas->desc		= "Projects - ex";
		
		
		$d->title = "— Projects-ex —";
		
		
		
		$this->data = $d;
	}
	
}



?>