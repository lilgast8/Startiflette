<?php



class Proj1Content extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Project 1";
		$d->metas->desc		= "Project 1";
		
		
		$d->title = "— Project 1 —";
		
		
		
		$this->data = $d;
	}
	
}



?>