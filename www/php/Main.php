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
	
	const PROD			= false;
	// const PROD			= true;
	
	static $LOCALHOST	= null;
	static $DEVICE		= null;
	static $DEVICE_PATH	= null;
	
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
		$this->setEnv();
		$this->setErrors();
		$this->setDevice();
		$this->setPath();
		$this->setConfig();
		$this->setRoutes();
		$this->setContents();
	}
	
	
	private function setEnv()
	{
		self::$LOCALHOST = $_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_PORT'] == '8888' ? true : false;
	}
	
	
	private function setErrors()
	{
		if(self::$LOCALHOST || !Main::PROD) {
			error_reporting(E_ALL);
			ini_set('display_errors', '1');
		}
	}
	
	
	private function setDevice()
	{
		$detect = new Mobile_Detect();
		$mobile = $detect->isMobile() ? true : false;
		$tablet = $detect->isTablet() ? true : false;
		$desktop = !$mobile && !$tablet ? true : false;
		// if(preg_match('/Firefox/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
		// if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
		// if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) { $mobile = true; $tablet = true; }
		
		// set device
		if($mobile && !$tablet)
			$device = 'mobile';
		else if($tablet)
			$device = 'tablet';
		else if($desktop)
			$device = 'desktop';
		
		// set device path
		if($device == 'desktop' || $device == 'tablet')
			$devicePath = 'desktop';
		else if($device == 'mobile')
			$devicePath = 'mobile';
		
		
		self::$DEVICE		= $device;
		self::$DEVICE_PATH	= $devicePath.DS;
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