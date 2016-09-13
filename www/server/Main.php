<?php



require 'vendor/autoload.php';


include_once 'server/core/configs/Config.php';
include_once 'server/core/configs/Device.php';
include_once 'server/core/configs/Lang.php';
include_once 'server/core/configs/Path.php';

include_once 'server/core/routes/Router.php';

include_once 'server/core/controllers/PagesController.php';
include_once 'server/core/controllers/Page.php';

include_once 'server/core/utils/Helpers.php';
include_once 'server/core/utils/Strings.php';
include_once 'server/core/utils/TwigHelpers.php';



class Main
{
	
	protected static $instance;
	
	private $config				= null;
	private $device				= null;
	private $path				= null;
	private $lang				= null;
	private $router				= null;
	private $pagesController	= null;
	
	
	protected function __construct()
	{
		$this->setWhoops();
		$this->setConfig();
		$this->setDevice();
		$this->setPath();
		$this->setLang();
		$this->setRoutes();
		$this->setPagesController();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setWhoops()
	{
		$whoops = new \Whoops\Run;
		$whoops->pushHandler( new \Whoops\Handler\PrettyPageHandler );
		$whoops->register();
	}
	
	
	private function setConfig()
	{
		$this->config = Config::getInstance();
	}
	
	
	private function setDevice()
	{
		$this->device = Device::getInstance();
	}
	
	
	private function setPath()
	{
		$this->path = Path::getInstance();
	}
	
	
	private function setLang()
	{
		$this->lang = Lang::getInstance();
	}
	
	
	private function setRoutes()
	{
		$this->router = Router::getInstance();
		$this->router->init();
	}
	
	
	private function setPagesController()
	{
		$this->pagesController	= PagesController::getInstance();
		$this->pagesController->init();
	}
	
	
	public function displayView()
	{
		$this->pagesController->displayView();
	}
	
}



?>