<?php



include_once 'server/core/controllers/AbstractViewController.php';

include_once 'server/contents/AbstractContent.php';



class PagesController
{
	
	protected static $instance;
	
	private $twig				= null;
	
	private $pageController		= null;
	
	private $page				= null;
	private $router				= null;
	
	
	protected function __construct()
	{
		$this->setTwig();
		$this->setTwigExtensions();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setTwig()
	{
		$loader	= new Twig_Loader_Filesystem( array(
			Path::$FILE->views,
			Path::$FILE->viewsPages,
			Path::$FILE->viewsPartials,
			Path::$FILE->viewsStatics,
			Path::$FILE->viewsShared,
			Path::$FILE->svgSprite
		) );
		
		if ( Config::$IS_DEV ) {
			$this->twig	= new Twig_Environment( $loader, array(
				'debug' => true
			) );
			$this->twig->addExtension( new Twig_Extension_Debug() );
		}
		else
			$this->twig	= new Twig_Environment( $loader );
	}
	
	
	private function setTwigExtensions()
	{
		$this->twig->addGlobal( 'Helpers', new TwigHelpers() );
		
		// $this->twig->addExtension( new Twig_Extensions_Extension_Text() );
		// $this->twig->addExtension( new Twig_Extensions_Extension_I18n() );
		// $this->twig->addExtension( new Twig_Extensions_Extension_Intl() );
		// $this->twig->addExtension( new Twig_Extensions_Extension_Array() );
		// $this->twig->addExtension( new Twig_Extensions_Extension_Date() );
	}
	
	
	public function setPageInfos( $page )
	{
		$this->page = Page::getInstance();
		
		$this->page->id		= $page->available ? $page->id : 'not-available';
		$this->page->name	= Strings::camelCase( $this->page->id );
		if ( $page->available ) {
			$this->page->js			= $page->js === null ? $page->id : $page->js;
			$this->page->twig		= $page->twig === null ? $page->id : $page->twig;
			$this->page->ctrl		= $page->ctrl === null ? $page->id : $page->ctrl;
			$this->page->alias		= $page->alias;
			$this->page->dynamic	= $page->dynamic;
		}
		else {
			$this->page->js		= $this->page->id;
			$this->page->twig	= $this->page->id;
			$this->page->ctrl	= $this->page->id;
			$this->page->alias	= null;
		}
	}
	
	
	public function init()
	{
		$this->router = Router::getInstance();
		
		$this->page->setParams();
		
		$this->setPageViewController();
		$this->initPageController();
	}
	
	
	private function setPageViewController()
	{
		$controllerClassName	= Strings::titleCase( $this->page->ctrl );
		
		$phpFilePath			= 'server/core/controllers/pages/' . $controllerClassName . '.php';
		
		if ( !file_exists( $phpFilePath ) ) {
			$controllerClassName	= 'AbstractViewController';
			$phpFilePath			= 'server/core/controllers/AbstractViewController.php';
		}
		
		include_once $phpFilePath;
		
		$this->pageController = new $controllerClassName( $this->page->ctrl, $this->page->alias, 'page' );
	}
	
	
	private function initPageController()
	{
		/* static page */
		if ( $this->page->dynamic == null )
			$this->pageController->init( $this->twig );
		
		/* dynamic page */
		else {
			$pageExist = $this->pageController->getPageExistence();
			
			if ( $pageExist ) {
				$this->router->updateFurtherToAPIResponse( $this->pageController->response );
				$this->pageController->init( $this->twig );
			}
			else {
				$this->router->updateFurtherToAPIResponse( $this->pageController->response );
				
				return;
			}
		}
	}
	
	
	public function displayView()
	{
		$this->pageController->displayView();
	}
	
	
	public function getPageController()
	{
		return $this->pageController;
	}
	
}



?>