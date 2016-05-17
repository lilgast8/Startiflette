<?php



require 'vendor/autoload.php';


include_once 'server/configs/Config.php';
include_once 'server/configs/Device.php';
include_once 'server/configs/Lang.php';
include_once 'server/configs/Path.php';

include_once 'server/routes/Router.php';

include_once 'server/controllers/PagesController.php';

include_once 'server/utils/Helpers.php';



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
		$this->pagesController = PagesController::getInstance();
		$this->pagesController->setContoller();
	}
	
	
	public function renderView()
	{
		$this->pagesController->renderView();
	}
	
}



?>