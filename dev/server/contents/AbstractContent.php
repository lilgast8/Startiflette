<?php



class AbstractContent
{
	
	protected $data = null;
	
	
	public function __construct()
	{
		$this->setData();
	}
	
	
	public function setData()
	{
		$d				= new stdClass();
		
		$this->data	= $d;
	}
	
	
	public function getData()
	{
		return $this->data;
		
	}
	
}



?>