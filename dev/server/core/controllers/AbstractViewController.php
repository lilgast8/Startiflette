<?php



class AbstractViewController
{
	
	private $content			= array();
	private $staticViewsInfos	= null;
	
	/*private $id					= null;
	private $alias				= null;
	private $type				= null;
	
	private $response			= null;
	
	private $pagesController	= null;
	private $router				= null;*/
	
	
	public function __construct( $id, $alias, $type )
	{
		echo '🎲 '.$id.' — '. get_class( $this ).' <br>';
		
		$this->id		= $id;
		$this->alias	= $alias;
		$this->type		= $type;
		
		$this->response	= null;
		
		$this->pagesController	= PagesController::getInstance();
		$this->router			= Router::getInstance();
		
		
		$this->getPageViewDynamicInfos();
		
		/*echo '<pre>';
		print_r( $this->response );
		echo '</pre>';*/
		// exit();
		
		// echo '🎮<br>';
		
		/* static view */
		if ( PagesController::$PAGE_INFOS->dynamic == null ) {
			echo '🐤<br>';
			$this->init();
		}
		
		/* dynamic view */
		else {
			if ( $this->response->pageExist ) {
				echo '🐬 <br>';
				$this->router->callbackDynamicDatas( $this->response );
				$this->init();
			}
			else {
				echo '🐲 <br>';
				$this->router->callbackDynamicDatas( $this->response );
				return;
				echo '🐲🐲🐲 <br>';
			}
		}
		// exit();
		
		/*if ( PagesController::$PAGE_INFOS->dynamic != null ) {
			if ( $this->response->pageExist ) {
				echo '🐬 <br>';
				$this->router->callbackDynamicDatas( $this->response );
				$this->init();
			}
			else {
				echo '🐲 <br>';
				$this->router->callbackDynamicDatas( $this->response );
				return false;
				echo '🐲🐲🐲 <br>';
			}
		}
		else
			$this->init();*/
		
		// $this->callDynamicDatasApi();
		// echo '🐀🐀🐀 <br>';
		
		
		
		/*$this->setStaticViewsInfos();
		$this->setParams();
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			$this->getStaticViewsDatas();
		$this->getGlobalDatas();
		$this->getPageViewDatas();
		if ( PagesController::$PAGE_INFOS->dynamic != null )
			$this->getPageViewDynamicDatas();
		
		$this->getTemplate();
		$this->renderView();*/
	}
	
	
	private function init()
	{
		echo '🐀🐀🐀 <br>';
		
		
		$this->setStaticViewsInfos();
		$this->setParams();
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			$this->getStaticViewsDatas();
		$this->getGlobalDatas();
		$this->getPageViewDatas();
		if ( PagesController::$PAGE_INFOS->dynamic != null )
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
		$this->getParamsFromClass( 'PagesController' );
		
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
		$this->template = $this->pagesController->twig->loadTemplate( PagesController::$PAGE_INFOS->twig . '.twig' );
	}
	
	
	private function renderView()
	{
		echo '📇 <br>';
		$this->view = $this->template->render( $this->content );
		
		$this->displayView();
	}
	
	
	public function displayView()
	{
		echo '💻 <br>';
		
		/*echo '<pre>';
		print_r( PagesController::$PAGE_INFOS );
		echo '</pre>';*/
		echo '✏️ '.get_class( $this ).'<br>';
		
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