<?php



class Proj1Content extends AbstractContent
{
	
	protected function setData()
	{
		$d = new stdClass();
		
		
		$d->metas			= new stdClass();
		$d->metas->title	= "Projet 1";
		$d->metas->desc		= "Projet 1";
		
		
		$d->title = "— Projet 1 —";
		
		
		
		$this->data = $d;
	}
	
}



?>