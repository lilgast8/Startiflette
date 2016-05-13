<?php



class AbstractViewController
{
	
	private $content = array();
	
	
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
	}
	
	
	private function getParams()
	{
		$this->getParamsFromClass( 'Config' );
		$this->getParamsFromClass( 'Path' );
		$this->getParamsFromClass( 'Lang' );
		$this->getParamsFromClass( 'Router' );
		
		$this->content = json_decode( json_encode( $this->content ), true );
	}
	
	
	private function getParamsFromClass( $className )
	{
		$class				= $className::getInstance();
		$params				= new stdClass();
		$params->$className	= $class->getParams();
		
		$this->content		=  array_merge ( $this->content, (array) $params );
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
		
		if ( $this->id == 'footer' ) {
			$phpFilePath		= Path::$FILE->contentsShared . 'alt.php';
			$contentClassName	= 'AltContent';
			
			$this->getContent( $phpFilePath, $contentClassName );
		}
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