<?php



class AbstractViewController
{
	
	protected static $instance;
	
	// static $STATIC = null;
	private $content = array();
	
	
	// protected function __construct()
	public function __construct( $id, $type )
	{
		$this->id	= $id;
		$this->type	= $type;
		
		$this->pagesController	= PagesController::getInstance();
		
		$this->getParams();
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			$this->getStaticGlobalDatas();
		$this->getGlobalDatas();
		$this->getStaticDatas();
		$this->getDynamicDatas();
		
		$this->getTemplate();
		$this->renderView();
		
		// print_r( $this->content );
	}
	
	
	private function getParams()
	{
		// $configParams = Config::getParams();
		
		$this->config = Config::getInstance();
		$configParams = new stdClass();
		$configParams->Config = $this->config->getParams();
		
		// print_r( $configParams );
		
		$this->content	=  array_merge ( $this->content, (array) $configParams );
	}
	
	
	private function getContent( $phpFilePath, $contentClassName )
	{
		include_once $phpFilePath;
		
		$contentClass	= new $contentClassName();
		
		$this->content	=  array_merge ( $this->content, (array) $contentClass->getDatas() );
	}
	
	
	private function getStaticGlobalDatas()
	{
		$phpFilePath		= Path::$FILE->contentsShared . 'static-global.php';
		$contentClassName	= 'StaticGlobalContent';
		
		$this->getContent( $phpFilePath, $contentClassName );
	}
	
	
	private function getGlobalDatas()
	{
		$phpFilePath		= Path::$FILE->contents . Lang::$LANG . '/global.php';
		$contentClassName	= 'GlobalContent';
		
		$this->getContent( $phpFilePath, $contentClassName );
	}
	
	
	private function getStaticDatas()
	{
		$phpFilePath		= Path::$FILE->contents . Lang::$LANG . '/' . $this->type . 's/' . $this->id . '.php';
		$contentClassName	= ucfirst( $this->id ) . 'Content';
		
		$this->getContent( $phpFilePath, $contentClassName );
	}
	
	
	private function getDynamicDatas()
	{
		
	}
	
	
	private function getTemplate()
	{
		$this->template = $this->pagesController->twig->loadTemplate( $this->id . '.twig' );
	}
	
	
	private function renderView()
	{
		$this->view = $this->template->render( $this->content );
	}
	
	
	public function displayView()
	{
		echo $this->view;
	}
	
}



?>