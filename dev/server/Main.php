<?php



include_once 'server/vendors/Mobile_Detect.php';
include_once 'server/configs/Config.php';
include_once 'server/configs/Lang.php';
include_once 'server/configs/Path.php';
include_once 'server/routes/Router.php';



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
		$this->setRoutes();
		$this->setContents();
	}
	
	
	protected function __clone()
	{
		
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
		$this->routes = Router::getInstance();
		$this->routes->init();
	}
	
	
	private function initRoutes()
	{
		$this->routes->init();
	}
	
	
	private function initLang()
	{
		$this->lang->init();
	}
	
	
	private function setContents()
	{
		$this->contents = getContents();
	}
	
	
	public function renderView()
	{
		$viewPath = $this->getViewPath();
		
		if ( !Router::$IS_ALT_CONTENT )
			include_once Path::$FILE->viewsPartials . 'header.php';
		
		include_once $viewPath . Router::$PHP_VIEW . '.php';
		
		if ( !Router::$IS_ALT_CONTENT )
			include_once Path::$FILE->viewsPartials . 'footer.php';
	}
	
	
	private function getViewPath()
	{
		$viewPath = !Router::$IS_ALT_CONTENT ?
					Path::$FILE->viewsPage :
					Path::$FILE->viewsAlt;
		
		return $viewPath;
	}
	
}



?>