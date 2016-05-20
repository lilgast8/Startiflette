<?php



class ProjectContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Project - ex";
		$d->metas->desc		= "Project - ex";
		
		
		$d->title = "— Project-ex —";
		
		
		
		$this->datas = $d;
	}
	
}



?>