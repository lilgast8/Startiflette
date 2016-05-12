<?php



class AbstractViewController
{
	
	protected static $instance;
	
	// static $STATIC = null;
	
	
	// protected function __construct()
	public function __construct( $id, $type )
	{
		$this->id	= $id;
		$this->type	= $type;
		
		$this->pagesController	= PagesController::getInstance();
		
		$this->content			= array();
		
		$this->getStaticGlobalDatas();
		$this->getGlobalDatas();
		$this->getStaticDatas();
		$this->getDynamicDatas();
		$this->getTemplate();
		$this->renderView();
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
		include_once Path::$FILE->contents . Lang::$LANG . '/global.php';
		
		$contentClass	= new GlobalContent();
		
		$this->content	=  array_merge ( $this->content, (array) $contentClass->getDatas() );
	}
	
	
	private function getStaticDatas()
	{
		// include_once Path::$FILE->contents . Lang::$LANG . '/pages/' . PagesController::$PAGE_INFOS->phpView . '.php';
		// echo Path::$FILE->contents . Lang::$LANG . '/' . $this->type . 's/' . $this->id . '.php <br>';
		include_once Path::$FILE->contents . Lang::$LANG . '/' . $this->type . 's/' . $this->id . '.php';
		
		// $contentClassName	= ucfirst( PagesController::$PAGE_INFOS->phpView ) . 'Content';
		$contentClassName	= ucfirst( $this->id ) . 'Content';
		$contentClass		= new $contentClassName();
		
		$this->content		=  array_merge ( $this->content, (array) $contentClass->getDatas() );
		
		// print_r( $this->content );
		// exit();
	}
	
	
	private function getDynamicDatas()
	{
		
	}
	
	
	private function getTemplate()
	{
		// $template = $this->twig->loadTemplate( 'home.html.twig' );
		// echo $this->id.'<br>';
		// $this->template = $this->pagesController->twig->loadTemplate( 'home.twig' );
		$this->template = $this->pagesController->twig->loadTemplate( $this->id . '.twig' );
	}
	
	
	private function renderView()
	{
		$this->view = $this->template->render( $this->content );
		
		// echo $this->view;
	}
	
	
	public function displayView()
	{
		echo $this->view;
	}
	
}



?>