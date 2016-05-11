<?php



class AbstractViewController
{
	
	protected static $instance;
	
	// static $STATIC = null;
	
	
	// protected function __construct()
	public function __construct( $id )
	{
		$this->id = $id;
		
		$this->getStaticDatas();
		$this->getDynamicDatas();
		$this->getTemplate();
		$this->renderView();
	}
	
	
	/*protected function __clone()
	{
		
	}*/
	
	
	/*public static function getInstance()
	{
		if ( !isset(self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}*/
	
	
	protected function getStaticDatas()
	{
		$this->staticDatas = 'null';
		
		// print_r( Path::$FILE );
		// $file = Path::$FILE->contents . Lang::$LANG . '/pages/' . PagesController::$PAGE_INFOS->phpView . '.php';
		include_once Path::$FILE->contents . Lang::$LANG . '/pages/' . PagesController::$PAGE_INFOS->phpView . '.php';
		
		$contentClassName	= ucfirst( PagesController::$PAGE_INFOS->phpView ) . 'Content';
		$contentClass		= new $contentClassName();
		
		$this->content		= $contentClass->getDatas();
		
		// print_r( $this->content );
		// echo '<pre>';
		// var_dump( $this->content );
		// echo '</pre>';
		// echo $content;
		
		/*
		$file = $path->getLocalPath() . "page/" . $this->route->model;
		$this->local = json_decode(file_get_contents($file));
		$this->local->id = $this->id;
		$this->local->urls = Route::getInstance()->urls;
		
		$this->local->getPage = function ($data, \Mustache_LambdaHelper $helper) {
			$page = $helper->render($data);
			return \app\Path::getInstance()->getPageUrl($page);
		};
		
		$this->local->isProd = (string)\Main::getInstance()->config->env->name === "dist" ? true : null;
		$this->local = $this->controller->setDynamicData($this->local, $this->params);
		*/
	}
	
	
	protected function getDynamicDatas()
	{
		
	}
	
	
	protected function getTemplate()
	{
		// require_once '/path/to/lib/Twig/Autoloader.php';
		// Twig_Autoloader::register();

		// $loader	= new Twig_Loader_Filesystem( Path::$FILE->contents );
		$loader	= new Twig_Loader_Filesystem( Path::$FILE->viewsPage );
		$this->twig	= new Twig_Environment( $loader, array(
			// 'debug' => true,
			// 'cache' => '/path/to/compilation_cache',
			// 'cache' => Path::$FILE->viewsPage . 'pages-cache/'
		) );
	}
	
	
	protected function renderView()
	{
		// print_r( Path::$FILE );
		$template = $this->twig->loadTemplate( 'home.html.twig' );
		
		
		$lang = array (
			'ALL_LANG'		=> LANG::$ALL_LANG,
			'MULTI_LANG'	=> LANG::$MULTI_LANG,
			'DEFAULT_LANG'	=> LANG::$DEFAULT_LANG,
			'LANG'			=> LANG::$LANG,
		);
		
		echo $template->render( array( 'title' => 'Homepage', 'lang' => $lang ) );
		// echo $template->render( array( 'title' => 'Title', 'lang' => $lang ) );
		// $template->display( array( 'title' => 'Title', 'test' => 'title') );
	}
	
}



?>