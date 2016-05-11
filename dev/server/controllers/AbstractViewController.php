<?php



class AbstractViewController
{
	
	protected static $instance;
	
	// static $STATIC = null;
	
	
	// protected function __construct()
	public function __construct( $id )
	{
		$this->id = $id;
		
		$this->pagesController = PagesController::getInstance();
		
		$this->getStaticDatas();
		$this->getDynamicDatas();
		$this->getTemplate();
		$this->renderView();
	}
	
	
	protected function getStaticDatas()
	{
		$this->staticDatas = 'null';
		
		include_once Path::$FILE->contents . Lang::$LANG . '/pages/' . PagesController::$PAGE_INFOS->phpView . '.php';
		
		$contentClassName	= ucfirst( PagesController::$PAGE_INFOS->phpView ) . 'Content';
		$contentClass		= new $contentClassName();
		
		$this->content		=  (array) $contentClass->getDatas();
	}
	
	
	protected function getDynamicDatas()
	{
		
	}
	
	
	protected function getTemplate()
	{
		// $template = $this->twig->loadTemplate( 'home.html.twig' );
		$this->template = $this->pagesController->twig->loadTemplate( 'home.html.twig' );
	}
	
	
	protected function renderView()
	{
		$this->view = $this->template->render( $this->content );
		
		echo $this->view;
	}
	
}



?>