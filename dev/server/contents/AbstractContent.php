<?php



class AbstractContent
{
	
	public function __construct()
	{
		$this->setDatas();
	}
	
	
	public function setDatas()
	{
		$d				= new stdClass();
		
		$this->datas	= $d;
	}
	
	
	public function getDatas()
	{
		return $this->datas;
		
	}
	
}



?>