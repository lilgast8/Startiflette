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
		
		$this->pagesController = PagesController::getInstance();
		
		$this->getStaticDatas();
		$this->getDynamicDatas();
		$this->getTemplate();
		$this->renderView();
	}
	
	
	private function getGlobalDatas()
	{
		
	}
	
	
	private function getStaticDatas()
	{
		// include_once Path::$FILE->contents . Lang::$LANG . '/pages/' . PagesController::$PAGE_INFOS->phpView . '.php';
		// echo Path::$FILE->contents . Lang::$LANG . '/' . $this->type . 's/' . $this->id . '.php <br>';
		include_once Path::$FILE->contents . Lang::$LANG . '/' . $this->type . 's/' . $this->id . '.php';
		
		// $contentClassName	= ucfirst( PagesController::$PAGE_INFOS->phpView ) . 'Content';
		$contentClassName	= ucfirst( $this->id ) . 'Content';
		$contentClass		= new $contentClassName();
		
		$this->content		=  (array) $contentClass->getDatas();
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