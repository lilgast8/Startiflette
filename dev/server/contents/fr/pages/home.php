<?php



class HomeContent extends AbstractContent
{
	
	public function setDatas()
	{
		$d = new stdClass();
		
		
		$d->title = "— Accueil —";
		
		
		
		$this->datas = $d;
	}
	
}



?>