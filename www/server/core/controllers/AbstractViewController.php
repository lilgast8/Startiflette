<?php



class AbstractViewController
{
	
	private $id					= null;
	private $alias				= null;
	private $type				= null;
	
	private $pagesController	= null;
	private $page				= null;
	
	private $staticViewsInfos	= null;
	private $content			= array();
	private $template			= null;
	private $view				= null;
	
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
		$this->callAPI();
		
		
		return $this->response->pageExist;
	}
	
	
	public function init( $twig )
	{
		$this->setStaticViewsInfos();
		$this->setParams();
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			$this->getStaticViewsData();
		
		$this->getGlobalData();
		$this->getPageViewData();
		
		if ( $this->page->dynamic != null )
			$this->getPageViewDynamicData();
		
		$this->initExtras();
		
		$this->setTemplate( $twig );
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
		$this->getParamsFromClass( 'Page' );
	}
	
	
	private function getStaticViewsData()
	{
		foreach ( $this->staticViewsInfos as $viewInfos )
			$this->addContent( $viewInfos->phpFilePath, $viewInfos->phpSharedFilePath, $viewInfos->contentClassName );
	}
	
	
	private function getGlobalData()
	{
		$phpFilePath		= Path::$FILE->contentsLang . 'global.php';
		$phpSharedFilePath	= Path::$FILE->contentsShared . 'global.php';
		$contentClassName	= 'GlobalContent';
		
		$this->addContent( $phpFilePath, $phpSharedFilePath, $contentClassName );
	}
	
	
	protected function getPageViewData()
	{
		$phpFilePath		= Path::$FILE->contentsLang . $this->type . 's/' . $this->id . '.php';
		$phpSharedFilePath	= Path::$FILE->contentsShared . $this->type . 's/' . $this->id . '.php';
		$contentClassName	= Strings::titleCase( $this->id ) . 'Content';
		
		$this->addContent( $phpFilePath, $phpSharedFilePath, $contentClassName );
		
		if ( $this->alias !== null ) {
			$phpFilePath		= Path::$FILE->contentsLang . $this->type . 's/' . $this->alias . '.php';
			$phpSharedFilePath	= Path::$FILE->contentsShared . $this->type . 's/' . $this->alias . '.php';
			$contentClassName	= Strings::titleCase( $this->alias ) . 'Content';
			
			$this->addContent( $phpFilePath, $phpSharedFilePath, $contentClassName );
		}
	}
	
	
	protected function callAPI()
	{
		
	}
	
	
	private function getPageViewDynamicData()
	{
		$this->addData( $this->response->data );
	}
	
	
	protected function initExtras()
	{
		
	}
	
	
	private function setTemplate( $twig )
	{
		$this->template = $twig->loadTemplate( $this->page->twig . '.twig' );
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
		
		$this->addData( $params );
	}
	
	
	private function addContent( $phpFilePath, $phpSharedFilePath, $contentClassName )
	{
		if ( !file_exists( $phpFilePath ) )
			$phpFilePath = $phpSharedFilePath;
		
		if ( file_exists( $phpFilePath ) ) {
			include_once $phpFilePath;
			
			$contentClass	= new $contentClassName();
			$data			= $contentClass->getData();
			
			$this->addData( $data );
		}
	}
	
	
	protected function addData( $data )
	{
		$data			= json_decode( json_encode( $data ), true );
		
		$this->content	= array_merge_recursive( $this->content, (array) $data );
	}
	
	
	public function getContent()
	{
		return $this->content;
	}
	
}



?>