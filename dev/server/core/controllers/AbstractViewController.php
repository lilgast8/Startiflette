<?php



class AbstractViewController
{
	
	private $id					= null;
	private $alias				= null;
	private $type				= null;
	
	private $pagesController	= null;
	private $page				= null;
	private $content			= array();
	private $staticViewsInfos	= null;
	
	public $response			= null;
	
	
	public function __construct( $id, $alias, $type )
	{
		$this->id		= $id;
		$this->alias	= $alias;
		$this->type		= $type;
		
		$this->pagesController	= PagesController::getInstance();
		$this->page				= Page::getInstance();
	}
	
	
	public function getPageExistence()
	{
		$this->getPageViewDynamicInfos();
		
		
		return $this->response->pageExist;
	}
	
	
	public function init()
	{
		$this->setStaticViewsInfos();
		$this->setParams();
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			$this->getStaticViewsDatas();
		
		$this->getGlobalDatas();
		$this->getPageViewDatas();
		
		if ( $this->page->dynamic != null )
			$this->getPageViewDynamicDatas();
		
		$this->getTemplate();
		$this->renderView();
	}
	
	
	private function setStaticViewsInfos()
	{
		$this->staticViewsInfos = new stdClass();
		
		$this->staticViewsInfos->staticGlobal						= new stdClass();
		$this->staticViewsInfos->staticGlobal->contentClassName		= 'StaticGlobalContent';
		$this->staticViewsInfos->staticGlobal->phpFilePath			= Path::$FILE->contentsShared . 'static-global.php';
		$this->staticViewsInfos->staticGlobal->phpSharedFilePath	= null;
		
		$this->staticViewsInfos->header						= new stdClass();
		$this->staticViewsInfos->header->contentClassName	= 'HeaderContent';
		$this->staticViewsInfos->header->phpFilePath		= Path::$FILE->contentsStatics . 'header.php';
		$this->staticViewsInfos->header->phpSharedFilePath	= null;
		
		$this->staticViewsInfos->footer						= new stdClass();
		$this->staticViewsInfos->footer->contentClassName	= 'FooterContent';
		$this->staticViewsInfos->footer->phpFilePath		= Path::$FILE->contentsStatics . 'footer.php';
		$this->staticViewsInfos->footer->phpSharedFilePath	= null;
		
		$this->staticViewsInfos->alt					= new stdClass();
		$this->staticViewsInfos->alt->contentClassName	= 'AltContent';
		$this->staticViewsInfos->alt->phpFilePath		= Path::$FILE->contentsStatics . 'alt.php';
		$this->staticViewsInfos->alt->phpSharedFilePath	= Path::$FILE->contentsSharedStatics . 'alt.php';
	}
	
	
	private function setParams()
	{
		$this->getParamsFromClass( 'Config' );
		$this->getParamsFromClass( 'Device' );
		$this->getParamsFromClass( 'Path' );
		$this->getParamsFromClass( 'Lang' );
		$this->getParamsFromClass( 'Router' );
		// $this->getParamsFromClass( 'PagesController' );
		$this->getParamsFromClass( 'Page' );
		
		$this->content = json_decode( json_encode( $this->content ), true );
	}
	
	
	private function getStaticViewsDatas()
	{
		foreach ( $this->staticViewsInfos as $viewInfos )
			$this->getContent( $viewInfos->phpFilePath, $viewInfos->phpSharedFilePath, $viewInfos->contentClassName );
	}
	
	
	private function getGlobalDatas()
	{
		$phpFilePath		= Path::$FILE->contentsLang . 'global.php';
		$phpSharedFilePath	= Path::$FILE->contentsShared . 'global.php';
		$contentClassName	= 'GlobalContent';
		
		$this->getContent( $phpFilePath, $phpSharedFilePath, $contentClassName );
	}
	
	
	protected function getPageViewDatas()
	{
		$phpFilePath		= Path::$FILE->contentsLang . $this->type . 's/' . $this->id . '.php';
		$phpSharedFilePath	= Path::$FILE->contentsShared . $this->type . 's/' . $this->id . '.php';
		$contentClassName	= String::titleCase( $this->id ) . 'Content';
		
		$this->getContent( $phpFilePath, $phpSharedFilePath, $contentClassName );
		
		if ( $this->alias !== null ) {
			$phpFilePath		= Path::$FILE->contentsLang . $this->type . 's/' . $this->alias . '.php';
			$phpSharedFilePath	= Path::$FILE->contentsShared . $this->type . 's/' . $this->alias . '.php';
			$contentClassName	= String::titleCase( $this->alias ) . 'Content';
			
			$this->getContent( $phpFilePath, $phpSharedFilePath, $contentClassName );
		}
	}
	
	
	protected function getPageViewDynamicInfos()
	{
		
	}
	
	
	private function getPageViewDynamicDatas()
	{
		if ( $this->response->pageExist )
			$this->content = array_merge_recursive ( $this->content, (array) $this->response->datas );
	}
	
	
	private function getTemplate()
	{
		$this->template = $this->pagesController->twig->loadTemplate( $this->page->twig . '.twig' );
	}
	
	
	private function renderView()
	{
		$this->view = $this->template->render( $this->content );
	}
	
	
	public function displayView()
	{
		echo $this->view;
	}
	
	
	private function getParamsFromClass( $className )
	{
		$class				= $className::getInstance();
		$params				= new stdClass();
		$params->$className	= $class->getParams();
		
		$this->content		= array_merge ( $this->content, (array) $params );
	}
	
	
	private function getContent( $phpFilePath, $phpSharedFilePath, $contentClassName )
	{
		if ( !file_exists( $phpFilePath ) )
			$phpFilePath = $phpSharedFilePath;
		
		if ( file_exists( $phpFilePath ) ) {
			include_once $phpFilePath;
			
			$contentClass	= new $contentClassName();
			$datas			= $contentClass->getDatas();
			
			$this->content	= array_merge_recursive ( $this->content, (array) $datas );
		}
	}
	
}



?>