<?php



include_once 'server/configs/Config.php';
include_once 'server/configs/Lang.php';
include_once 'server/configs/Path.php';

include_once 'server/routes/Router.php';

include_once 'server/controller/PagesController.php';

include_once 'server/utils/Helpers.php';

include_once 'server/contents/contents.php';

include_once 'server/vendors/Mobile_Detect.php';



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
		$this->setPagesController();
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
		$this->router = Router::getInstance();
		$this->router->init();
	}
	
	
	private function setPagesController()
	{
		$this->pagesController = PagesController::getInstance();
	}
	
	
	private function setContents()
	{
		// $this->contents = getContents();
		$this->contents = Contents::getInstance();
	}
	
	
	public function renderView()
	{
		$viewPath = $this->getViewPath();
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			include_once Path::$FILE->viewsPartials . 'header.php';
		
		include_once $viewPath . PagesController::$PAGE->phpView . '.php';
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			include_once Path::$FILE->viewsPartials . 'footer.php';
	}
	
	
	private function getViewPath()
	{
		$viewPath = Router::$CONTENT_TYPE == 'firstLoad' || Router::$CONTENT_TYPE == 'pageChange' ?
					Path::$FILE->viewsPage :
					Path::$FILE->viewsAlt;
		
		
		return $viewPath;
	}
	
}



?>