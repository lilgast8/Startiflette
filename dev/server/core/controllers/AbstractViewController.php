<?php



class AbstractViewController
{
	
	private $content			= array();
	private $staticViewsInfos	= null;
	
	
	public function __construct( $id, $type )
	{
		$this->id	= $id;
		$this->type	= $type;
		
		$this->pagesController = PagesController::getInstance();
		
		$this->setStaticViews();
		$this->getParams();
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			$this->getStaticViewsDatas();
		$this->getGlobalDatas();
		$this->getPageViewDatas();
		$this->getPageViewDynamicDatas();
		
		$this->getTemplate();
		$this->renderView();
	}
	
	
	private function setStaticViews()
	{
		$this->staticViewsInfos = new stdClass();
		
		$this->staticViewsInfos->staticGlobal						= new stdClass();
		$this->staticViewsInfos->staticGlobal->contentClassName		= 'StaticGlobalContent';
		$this->staticViewsInfos->staticGlobal->phpFilePath			= Path::$FILE->contentsShared . 'static-global.php';
		$this->staticViewsInfos->staticGlobal->phpSharedFilePath	= null;
		
		$this->staticViewsInfos->header						= new stdClass();
		$this->staticViewsInfos->header->contentClassName	= 'HeaderContent';
		$this->staticViewsInfos->header->phpFilePath		= Path::$FILE->contents . Lang::$LANG . '/statics/' . 'header.php';
		$this->staticViewsInfos->header->phpSharedFilePath	= null;
		
		$this->staticViewsInfos->footer						= new stdClass();
		$this->staticViewsInfos->footer->contentClassName	= 'FooterContent';
		$this->staticViewsInfos->footer->phpFilePath		= Path::$FILE->contents . Lang::$LANG . '/statics/' . 'footer.php';
		$this->staticViewsInfos->footer->phpSharedFilePath	= null;
		
		$this->staticViewsInfos->alt					= new stdClass();
		$this->staticViewsInfos->alt->contentClassName	= 'AltContent';
		$this->staticViewsInfos->alt->phpFilePath		= Path::$FILE->contents . Lang::$LANG . '/alt.php';
		$this->staticViewsInfos->alt->phpSharedFilePath	= Path::$FILE->contentsShared . 'alt.php';
	}
	
	
	private function getParams()
	{
		$this->getParamsFromClass( 'Config' );
		$this->getParamsFromClass( 'Device' );
		$this->getParamsFromClass( 'Path' );
		$this->getParamsFromClass( 'Lang' );
		$this->getParamsFromClass( 'Router' );
		$this->getParamsFromClass( 'PagesController' );
		
		$this->content = json_decode( json_encode( $this->content ), true );
	}
	
	
	private function getParamsFromClass( $className )
	{
		$class				= $className::getInstance();
		$params				= new stdClass();
		$params->$className	= $class->getParams();
		
		$this->content		=  array_merge ( $this->content, (array) $params );
	}
	
	
	private function getContent( $phpFilePath, $phpSharedFilePath, $contentClassName )
	{
		if ( !file_exists( $phpFilePath ) )
			$phpFilePath = $phpSharedFilePath;
		
		if ( file_exists( $phpFilePath ) ) {
			include_once $phpFilePath;
			
			$contentClass	= new $contentClassName();
			
			$this->content	=  array_merge ( $this->content, (array) $contentClass->getDatas() );
		}
	}
	
	
	private function getStaticViewsDatas()
	{
		foreach ( $this->staticViewsInfos as $viewInfos )
			$this->getContent( $viewInfos->phpFilePath, $viewInfos->phpSharedFilePath, $viewInfos->contentClassName );
	}
	
	
	private function getGlobalDatas()
	{
		$phpFilePath		= Path::$FILE->contents . Lang::$LANG . '/global.php';
		$phpSharedFilePath	= Path::$FILE->contentsShared . 'global.php';
		$contentClassName	= 'GlobalContent';
		
		$this->getContent( $phpFilePath, $phpSharedFilePath, $contentClassName );
	}
	
	
	protected function getPageViewDatas()
	{
		$phpFilePath		= Path::$FILE->contents . Lang::$LANG . '/' . $this->type . 's/' . $this->id . '.php';
		$phpSharedFilePath	= Path::$FILE->contentsShared . $this->type . 's/' . $this->id . '.php';
		$contentClassName	= Helpers::titleCase( $this->id ) . 'Content';
		
		$this->getContent( $phpFilePath, $phpSharedFilePath, $contentClassName );
	}
	
	
	protected function getPageViewDynamicDatas()
	{
		
	}
	
	
	private function getTemplate()
	{
		$this->template = $this->pagesController->twig->loadTemplate( $this->type . '.twig' );
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