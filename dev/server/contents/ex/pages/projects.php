<?php



class ProjectsContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Projects - ex";
		$d->metas->desc		= "Projects - ex";
		
		
		$d->title = "— Projects-ex —";
		
		
		
		$this->datas = $d;
	}
	
}



?>