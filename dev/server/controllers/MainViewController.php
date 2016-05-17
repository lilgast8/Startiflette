<?php



include_once 'server/controllers/AbstractViewController.php';
include_once 'server/contents/AbstractContent.php';



class MainViewController
{
	
	protected static $instance;
	
	static $PAGE_INFOS			= null;
	
	private $headerController	= null;
	private $footerController	= null;
	private $pageController		= null;
	
	
	protected function __construct()
	{
		$this->setTwig();
	}
	
	
	public static function getInstance()
	{
		if ( !isset(self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setTwig()
	{
		$loader	= new Twig_Loader_Filesystem( array(
			Path::$FILE->viewsPages,
			Path::$FILE->viewsPartials,
			Path::$FILE->viewsStatics,
			Path::$FILE->viewsAlt,
			Path::$FILE->viewsShared,
			Path::$FILE->svgSprite
		) );
		
		if ( Config::$ENV == 'dev' ) {
			$this->twig	= new Twig_Environment( $loader, array(
				'debug' => true
			) );
			$this->twig->addExtension( new Twig_Extension_Debug() );
		}
		else
			$this->twig	= new Twig_Environment( $loader );
	}
	
	
	public function setPageInfos( $pageId, $phpView, $title, $desc )
	{
		self::$PAGE_INFOS			= new stdClass();
		
		self::$PAGE_INFOS->id		= $pageId;
		self::$PAGE_INFOS->phpView	= $phpView;
		self::$PAGE_INFOS->title	= $title;
		self::$PAGE_INFOS->desc		= $desc;
	}
	
	
	public function setContoller()
	{
		$this->setStaticViewController();
		$this->setPageViewController();
	}
	
	
	private function setStaticViewController()
	{
		// Header
		$this->headerController = new AbstractViewController( 'header', 'static' );
		
		// Footer
		$this->footerController = new AbstractViewController( 'footer', 'static' );
	}
	
	
	private function setPageViewController()
	{
		$controllerClassName	= ucfirst( self::$PAGE_INFOS->phpView );
		
		$phpFilePath			= 'server/controllers/pages/' . $controllerClassName . '.php';
		
		if ( !file_exists( $phpFilePath ) ) {
			$controllerClassName	= 'AbstractViewController';
			$phpFilePath			= 'server/controllers/AbstractViewController.php';
		}
		
		include_once $phpFilePath;
		
		$this->pageController = new $controllerClassName( self::$PAGE_INFOS->phpView, 'page' );
	}
	
	
	public function renderView()
	{
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			$this->headerController->displayView();
		
		$this->pageController->displayView();
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			$this->footerController->displayView();
	}
	
}



?>