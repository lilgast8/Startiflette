<?php



include_once 'server/vendors/Mobile_Detect.php';
include_once 'server/configuration/Config.php';
include_once 'server/configuration/Lang.php';
include_once 'server/configuration/Path.php';
include_once 'server/controller/RoutesController.php';



class Main
{
	
	protected static $instance;
	
	public $path		= null;
	public $config		= null;
	public $routes		= null;
	public $contents	= null;
	
	
	protected function __construct()
	{
		$this->setConfig();
		$this->setPath();
		$this->setLang();
		// $this->config->init();
		$this->setRoutes();
		// $this->setContents();
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	public static function getInstance()
	{
		if (!isset(self::$instance))
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setConfig()
	{
		$this->config = Config::getInstance();
	}
	
	
	private function setLang()
	{
		$this->lang = Lang::getInstance();
	}
	
	
	private function setPath()
	{
		$this->path = Path::getInstance();
	}
	
	
	private function setRoutes()
	{
		$this->routes = RoutesController::getInstance();
	}
	
	
	/*private function setPath()
	{
		$this->path = Path::getInstance();
	}*/
	
	
	/*private function setPath()
	{
		$this->path = Path::getInstance();
	}
	
	
	private function setRoutes()
	{
		$this->routes = RoutesController::getInstance();
	}
	
	
	private function setContents()
	{
		include_once $this->path->file->contents . DS . 'contents.php';
		$this->contents = getContents();
	}*/
	
}



?>