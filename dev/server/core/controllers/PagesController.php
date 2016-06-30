<?php



include_once 'server/core/controllers/AbstractViewController.php';

include_once 'server/contents/AbstractContent.php';


// use stf\core\utils\Helpers;



class PagesController
{
	
	protected static $instance;
	
	static $PAGE_INFOS			= null;
	
	private $headerController	= null;
	private $footerController	= null;
	private $pageController		= null;
	
	public $params				= null;
	
	
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
		
		if ( Config::$ENV != 'preprod-local' && Config::$ENV != 'preprod' && Config::$ENV != 'prod' ) {
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
		$this->twig->addGlobal( 'Helpers', new Helpers() );
		
		// $this->twig->addExtension( new Twig_Extensions_Extension_Text() );
		// $this->twig->addExtension( new Twig_Extensions_Extension_I18n() );
		// $this->twig->addExtension( new Twig_Extensions_Extension_Intl() );
		// $this->twig->addExtension( new Twig_Extensions_Extension_Array() );
		// $this->twig->addExtension( new Twig_Extensions_Extension_Date() );
	}
	
	
	public function setPageInfos( $page )
	{
		self::$PAGE_INFOS			= new stdClass();
		
		self::$PAGE_INFOS->id		= $page->available ? $page->id : 'not-available';
		self::$PAGE_INFOS->name		= String::camelCase( self::$PAGE_INFOS->id );
		if ( $page->available ) {
			self::$PAGE_INFOS->js		= $page->js === null ? $page->id : $page->js;
			self::$PAGE_INFOS->twig		= $page->twig === null ? $page->id : $page->twig;
			self::$PAGE_INFOS->ctrl		= $page->ctrl === null ? $page->id : $page->ctrl;
			self::$PAGE_INFOS->alias	= $page->alias;
		}
		else {
			self::$PAGE_INFOS->js		= self::$PAGE_INFOS->id;
			self::$PAGE_INFOS->twig		= self::$PAGE_INFOS->id;
			self::$PAGE_INFOS->ctrl		= self::$PAGE_INFOS->id;
			self::$PAGE_INFOS->alias	= null;
		}
	}
	
	
	public function init()
	{
		$this->setParams();
		
		$this->setPageViewController();
	}
	
	
	private function setPageViewController()
	{
		$controllerClassName	= String::titleCase( self::$PAGE_INFOS->ctrl );
		
		$phpFilePath			= 'server/core/controllers/pages/' . $controllerClassName . '.php';
		
		if ( !file_exists( $phpFilePath ) ) {
			$controllerClassName	= 'AbstractViewController';
			$phpFilePath			= 'server/core/controllers/AbstractViewController.php';
		}
		
		include_once $phpFilePath;
		
		$this->pageController = new $controllerClassName( self::$PAGE_INFOS->ctrl, self::$PAGE_INFOS->alias, 'page' );
	}
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->PAGE_INFOS = self::$PAGE_INFOS;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
	
	public function displayView()
	{
		$this->pageController->displayView();
	}
	
}



?>