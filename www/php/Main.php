<?php



defined('DS') ? null : define('DS', DIRECTORY_SEPARATOR);

include_once 'libs/Mobile_Detect.php';
include_once 'Config.php';
include_once 'Path.php';
include_once 'Path.php';
include_once 'controller/RoutesController.php';
// use controller\RoutesController;



class Main
{
	
	protected static $instance;
	
	public $path		= null;
	public $config		= null;
	public $routes		= null;
	public $contents	= null;
	
	
	protected function __construct()
	{
		
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	public static function getInstance()
	{
		if(!isset(self::$instance))
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	public function init()
	{
		$this->setConfig();
		$this->setPath();
		$this->config->init();
		$this->setRoutes();
		$this->setContents();
	}
	
	
	private function setPath()
	{
		$this->path = Path::getInstance();
	}
	
	
	private function setConfig()
	{
		$this->config = Config::getInstance();
	}
	
	
	private function setRoutes()
	{
		$this->routes = RoutesController::getInstance();
	}
	
	
	private function setContents()
	{
		include_once $this->path->file->contents . Config::$LANG . DS . 'contents.php';
		$this->contents = getContents();
	}
	
}



?>