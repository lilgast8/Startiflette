<?php



include_once 'server/controllers/AbstractViewController.php';



class PagesController
{
	
	protected static $instance;
	
	static $PAGE_INFOS = null;
	
	
	protected function __construct()
	{
		
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	public static function getInstance()
	{
		if ( !isset(self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	public function setPageInfos( $pageId, $phpView, $title, $desc )
	{
		self::$PAGE_INFOS = new stdClass();
		
		self::$PAGE_INFOS->id		= $pageId;
		self::$PAGE_INFOS->phpView	= $phpView;
		self::$PAGE_INFOS->title	= $title;
		self::$PAGE_INFOS->desc		= $desc;
		
		
		$this->setController();
	}
	
	
	private function setController()
	{
		$controllerClassName = ucfirst( self::$PAGE_INFOS->phpView );
		
		include_once 'server/controllers/pages/' . $controllerClassName . '.php';
		
		// echo $controllerClass;
		
		// $this->controller = new Home();
		$this->controller = new $controllerClassName( self::$PAGE_INFOS->phpView );
		
		// print_r( $this->controller );
		exit;
		
		// $controllerClass = "controller\\" . ucfirst($this->route->controller->php);
		// $this->controller = new $controllerClass($this->params);
	}
	
}



?>