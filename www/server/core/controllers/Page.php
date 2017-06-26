<?php



class Page
{
	
	protected static $instance;
	
	public $exist		= null;
	public $id			= null;
	public $js			= null;
	public $twig		= null;
	public $ctrl		= null;
	public $alias		= null;
	public $dynamic		= null;
	public $urls		= null;
	public $available	= null;
	
	public $params		= null;
	
	
	protected function __construct()
	{
		
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	public function init()
	{
		$this->exist		= false;
		$this->id			= null;
		$this->js			= null;
		$this->twig			= null;
		$this->ctrl			= null;
		$this->alias		= null;
		$this->dynamic		= null;
		$this->urls			= null;
		$this->available	= true;
	}
	
	
	public function setParams()
	{
		$this->params				= new stdClass();
		
		$this->params->exist		= $this->exist;
		$this->params->id			= $this->id;
		$this->params->js			= $this->js;
		$this->params->twig			= $this->twig;
		$this->params->ctrl			= $this->ctrl;
		$this->params->alias		= $this->alias;
		$this->params->dynamic		= $this->dynamic;
		$this->params->urls			= $this->urls;
		$this->params->available	= $this->available;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
}



?>