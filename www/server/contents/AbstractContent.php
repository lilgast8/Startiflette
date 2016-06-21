<?php



class AbstractContent
{
	
	protected $datas = null;
	
	
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