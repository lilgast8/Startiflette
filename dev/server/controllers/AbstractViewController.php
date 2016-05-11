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
		
		$this->content = $contentClass->getDatas();
		
		print_r( $this->content );
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
		
	}
	
	
	protected function renderView()
	{
		
	}
	
}



?>