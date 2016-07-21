<?php



class Router
{
	
	protected static $instance;
	
	static $ROUTES				= null;
	static $URL					= null;
	static $ALT_LANG_URL		= null;
	static $LINK				= null;
	static $JS_VIEW				= null;
	
	static $CONTENT_TYPE		= null;
	
	private $page				= null;
	private $lang				= null;
	private $pagesController	= null;
	
	private $isHomepage			= null;
	
	private $params				= null;
	
	
	protected function __construct()
	{
		$this->setRoutes();
		$this->setPage();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setRoutes()
	{
		$filePath = Path::$FILE->routesFile;
		
		if ( !file_exists( $filePath ) )
			throw new ErrorException( 'Routes file is missing!' );
		
		$routes			= file_get_contents( $filePath );
		self::$ROUTES	= json_decode( $routes );
	}
	
	
	private function setPage()
	{
		$this->page	= Page::getInstance();
		$this->page->init();
	}
	
	
	public function setUrl()
	{
		self::$URL				= new stdClass();
		
		self::$URL->full		= $this->getFullUrl();
		self::$URL->path		= $this->getPath();
		self::$URL->pathParams	= explode( '/', self::$URL->path );
		self::$URL->page		= null;
		self::$URL->pageParams	= null;
		self::$URL->fullGa		= $this->getFullGaUrl();
	}
	
	
	private function getFullUrl()
	{
		$protocol = ( !empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443 ) ? 'https://' : 'http://';
		
		
		return $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	}
	
	
	private function getPath()
	{
		$path		= str_replace( Path::$URL->base, '', self::$URL->full );
		
		// remove ?search
		$pathParams	= explode( '?', $path );
		$path		= $pathParams[0];
		
		String::removeFirstSpecificChar( $path, '/' );
		String::removeLastSpecificChar( $path, '/' );
		
		
		return $path;
	}
	
	
	private function getFullGaUrl()
	{
		$fullGA = str_replace( Path::$URL->base, '', self::$URL->full );
		
		
		return $fullGA;
	}
	
	
	public function setPageUrl()
	{
		self::$URL->page		= $this->getPageUrl();
		self::$URL->pageParams	= explode( '/', self::$URL->page );
	}
	
	
	private function getPageUrl()
	{
		$pageUrl = preg_replace( '/' . Lang::$LANG . '/', '', self::$URL->path, 1 );
		
		$pageUrl = String::removeFirstSpecificChar( $pageUrl, '/' );
		$pageUrl = String::removeLastSpecificChar( $pageUrl, '/' );
		
		
		return $pageUrl;
	}
	
	
	public function init()
	{
		$this->lang				= Lang::getInstance();
		$this->pagesController	= PagesController::getInstance();
		
		$this->setContentType();
		$this->setCurrentPage();
		$this->setLinks();
		if ( Config::$MULTIPLE_TRANS && self::$CONTENT_TYPE == 'firstLoad' )
			$this->setJsView();
		
		$this->setParams();
	}
	
	
	private function setContentType()
	{
		if ( isset( $_POST['ajax'] ) && $_POST['ajax'] == 'true' && isset( $_POST['type'] ) && $_POST['type'] == 'pageChange' )
			self::$CONTENT_TYPE = 'pageChange';
		else
			self::$CONTENT_TYPE = 'firstLoad';
	}
	
	
	private function setCurrentPage()
	{
		$aliasParams	= null;
		
		foreach ( self::$ROUTES as $pageId => $pageParams ) { // parse all pages
			
			$path		= self::$URL->page == '' && Lang::$LANG == Lang::$DEFAULT_LANG ?
						  $path = Path::$URL->base :
						  String::removeLastSpecificChar( Path::$URL->base . self::$URL->path, '/' );
			
			$searchPath	= $pageId == 'home' ?
						  $searchPath = Path::$URL->base . Lang::$LANG_LINK_ROOT . $pageParams->{ 'url-page' }->{ Lang::$LANG } :
						  Path::$URL->base . Lang::$LANG_LINK . $pageParams->{ 'url-page' }->{ Lang::$LANG };
			
			// unique page
			if ( $path == $searchPath && !isset( $pageParams->subs ) && !isset( $pageParams->params ) )
				$this->setUniquePage( $pageId, $pageParams );
			
			// multiple-static page
			else if ( strpos( $path, $searchPath ) !== false && $pageId != 'home' && isset( $pageParams->subs ) )
				$this->setMultipleStaticPage( $path, $searchPath, $pageId, $pageParams );
			
			// multiple-dynamic page
			else if ( strpos( $path, $searchPath ) !== false && $pageId != 'home' && isset( $pageParams->params ) )
				$this->setMultipleDynamicPage( $path, $searchPath, $pageId, $pageParams );
			
			if ( $this->page->exist ) {
				$this->page->available = $this->getPageAvailability( $pageParams, $aliasParams );
				
				break;
			}
			
		}
		
		
		if ( Lang::$LANG_EXIST && $this->page->exist ) // page exist
			$this->setPageView();
		else // 404
			$this->set404();
	}
	
	
	private function setUniquePage( $pageId, $pageParams )
	{
		$this->page->exist	= true;
		$this->page->id		= $pageId;
		$this->page->urls	= $pageParams->{ 'url-page' };
		
		$this->page			= $this->setSpecificOptions( $this->page, $pageParams, null );
	}
	
	
	private function setMultipleStaticPage( $path, $searchPath, $pageId, $pageParams )
	{
		foreach ( $pageParams->subs as $aliasId => $aliasParams ) {
			
			if ( $searchPath . '/' . $aliasParams->{ 'url-alias' }->{ Lang::$LANG } == $path ) {
				$this->page->exist	= true;
				$this->page->id		= $pageId;
				$this->page->alias	= $aliasId;
				$this->page->urls	= $this->getAltPageUrl( $pageParams->{ 'url-page' }, $aliasParams->{ 'url-alias' } );
				
				$this->page			= $this->setSpecificOptions( $this->page, $pageParams, $aliasParams );
				
				break;
			}
		}
	}
	
	
	private function setMultipleDynamicPage( $path, $searchPath, $pageId, $pageParams )
	{
		$dynamicUrl = String::removeFirstSpecificChar( str_replace( $searchPath, '', $path ), '/' );
		
		if ( $dynamicUrl != '' ) {
			$dynamicUrlParams	= explode( '/', $dynamicUrl );
			
			$dynamicUrls		= new stdClass();
			
			foreach ( $pageParams->params as $key => $paramId )
				if ( isset( $dynamicUrlParams[ $key ] ) )
					$dynamicUrls->$paramId = $dynamicUrlParams[ $key ];
			
			$this->page->exist		= true;
			$this->page->id			= $pageId;
			$this->page->dynamic	= $dynamicUrls;
			
			$this->page				= $this->setSpecificOptions( $this->page, $pageParams, null );
		}
	}
	
	
	private function setSpecificOptions( $page, $pageParams, $aliasParams )
	{
		$page->js	= isset( $pageParams->js ) ? $pageParams->js : null;
		$page->twig	= isset( $pageParams->twig ) ? $pageParams->twig : null;
		$page->ctrl	= isset( $pageParams->ctrl ) ? $pageParams->ctrl : null;
		
		if ( $aliasParams ) {
			$page->js	= isset( $aliasParams->js ) ? $aliasParams->js : $page->js;
			$page->twig	= isset( $aliasParams->twig ) ? $aliasParams->twig : $page->twig;
			$page->ctrl	= isset( $aliasParams->ctrl ) ? $aliasParams->ctrl : $page->ctrl;
		}
		
		
		return $page;
	}
	
	
	private function getAltPageUrl( $page, $alias )
	{
		$urls = new stdClass();
		
		foreach ( Lang::$ALL_LANG as $lang )
			$urls->$lang = $page->$lang . '/' . $alias->$lang;
		
		
		return $urls;
	}
	
	
	private function getPageAvailability( $pageParams, $aliasParams )
	{
		$pageAvailability = true;
		
		if ( isset( $pageParams->device ) )
			if ( isset( $pageParams->device->{ Device::$DEVICE } ) )
				if ( !$pageParams->device->{ Device::$DEVICE } )
					$pageAvailability = false;
		
		if ( $aliasParams !== null )
			if ( isset( $aliasParams->device ) )
				if ( isset( $aliasParams->device->{ Device::$DEVICE } ) )
					if ( !$aliasParams->device->{ Device::$DEVICE } )
						$pageAvailability = false;
		
		
		return $pageAvailability;
	}
	
	
	private function setPageView()
	{
		$this->setIsHomepage( $this->page->id );
		
		if ( $this->page->dynamic == null )
			$this->setAltLangUrl( $this->page->urls );
		
		if ( !Lang::$MULTI_LANG && self::$URL->pathParams[0] == Lang::$DEFAULT_LANG ||
			 $this->isHomepage && self::$URL->pathParams[0] == Lang::$DEFAULT_LANG )
			$this->redirectToFullPathWithoutLang();
		
		$this->pagesController->setPageInfos( $this->page );
	}
	
	
	private function set404()
	{
		$this->page->id	= 'error-404';
		
		$this->setAltLangUrl( self::$ROUTES->home->{ 'url-page' } );
		
		if ( Router::$CONTENT_TYPE == 'firstLoad' )
			header( $_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found' );
		
		$this->pagesController->setPageInfos( $this->page );
	}
	
	
	private function setIsHomepage( $pageId )
	{
		$this->isHomepage = $pageId == 'home' ? true : false;
	}
	
	
	private function setAltLangUrl( $urls )
	{
		foreach ( Lang::$ALL_LANG as $lang ) {
			$currentUrl = $urls->$lang;
			
			if ( $this->isHomepage && $lang == Lang::$DEFAULT_LANG )
				$urlPart = '';
			else if ( $this->isHomepage )
				$urlPart = $lang;
			else
				$urlPart = $lang . '/' . $currentUrl;
			
			$altLangUrl = Path::$URL->base . $urlPart;
			
			self::$ALT_LANG_URL[ $lang ] = $altLangUrl;
		}
	}
	
	
	private function redirectToFullPathWithoutLang()
	{
		$fullPath = str_replace( Path::$URL->base . Lang::$LANG, '', self::$URL->full );
		$fullPath = String::removeFirstSpecificChar( $fullPath, '/' );
		
		header( 'Status: 301 Moved Permanently', true, 301 );
		header( 'Location: ' . Path::$URL->base . $fullPath );
		exit();
	}
	
	
	private function setLinks()
	{
		self::$LINK = new stdClass();
			
		foreach ( Router::$ROUTES as $pageId => $routeParams ) { // parse all pages
			$pageName	= String::camelCase( $pageId );
			
			/* unique page */
			if ( !isset( $routeParams->subs ) ) {
				if ( $pageId == 'home' )
					self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK_ROOT . $routeParams->{ 'url-page' }->{ Lang::$LANG };
				
				else
					self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK . $routeParams->{ 'url-page' }->{ Lang::$LANG };
			}
			
			/* multiple page */
			else {
				self::$LINK->$pageName = new stdClass();
				
				foreach ( $routeParams->subs as $aliasId => $alias ) {
					$aliasName	= String::camelCase( $aliasId );
					
					self::$LINK->$pageName->$aliasName = Path::$URL->base . Lang::$LANG_LINK . $routeParams->{ 'url-page' }->{ Lang::$LANG } . '/' . $alias->{ 'url-alias' }->{ Lang::$LANG };
				}
			}
		}
		
		// echo '<pre>';
		// print_r( self::$LINK );
		// echo '</pre>';
	}
	
	
	private function setJsView()
	{
		self::$JS_VIEW = new stdClass();
		
		foreach ( Router::$ROUTES as $pageId => $routeParams ) { // parse all pages
			// echo $pageId.'<br>';
			/*echo '<pre>';
			print_r( $routeParams );
			echo '</pre>';
			echo '⚡️ SLP ⚡️';*/
			
			// $pageName	= String::camelCase( $pageId );
			
			// unique page
			if ( !isset( $routeParams->subs ) && !isset( $routeParams->params ) ) {
				// echo '🐣 <br>';
				$jsId = !isset( $routeParams->js ) ? $pageId : $routeParams->js;
				
				if ( $pageId == 'home' ) {
					// self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK_ROOT . $routeParams->{ 'url-page' }->{ Lang::$LANG };
					
					$path = Lang::$LANG_LINK_ROOT . $routeParams->{ 'url-page' }->{ Lang::$LANG } == '' ? 'index' :
							Lang::$LANG_LINK_ROOT . $routeParams->{ 'url-page' }->{ Lang::$LANG };
					// self::$JS_VIEW->$path = $pageId;
				}
					
				
				else {
					// self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK . $routeParams->{ 'url-page' }->{ Lang::$LANG };
					$path = Lang::$LANG_LINK . $routeParams->{ 'url-page' }->{ Lang::$LANG };
					// self::$JS_VIEW->$path = $pageId;
				}
				
				self::$JS_VIEW->$path = $jsId;
			}
			
			// multiple static page
			else if ( isset( $routeParams->subs ) ) {
				// echo '🐥 <br>';
				// self::$LINK->$pageName = new stdClass();
				
				foreach ( $routeParams->subs as $aliasId => $alias ) {
					// echo '⚡️ SLP ⚡️'. $aliasId .' <br />';
					// echo '<pre>';
					// print_r( $aliasId );
					// print_r( $alias );
					// echo '</pre>';
					
					$jsId = !isset( $routeParams->js ) ? $pageId : $routeParams->js;
					$jsId = !isset( $alias->js ) ? $jsId : $alias->js;
					
					$path = Lang::$LANG_LINK . $routeParams->{ 'url-page' }->{ Lang::$LANG } . '/' . $alias->{ 'url-alias' }->{ Lang::$LANG };
					echo '⚡️ '.$path.' ⚡️ <br />';
					
					/*$aliasName	= String::camelCase( $aliasId );
					
					self::$LINK->$pageName->$aliasName = Path::$URL->base . Lang::$LANG_LINK . $routeParams->{ 'url-page' }->{ Lang::$LANG } . '/' . $alias->{ 'url-alias' }->{ Lang::$LANG };*/
					
					self::$JS_VIEW->$path = $jsId;
				}
			}
			
			// multiple dynamic page
			else if ( isset( $routeParams->params ) ) {
				// echo '🐓 <br>';
				$jsId = !isset( $routeParams->js ) ? $pageId : $routeParams->js;
				
				$dynamicSubPath = $this->getDynamicSubPath();
				// echo '<pre>';
				// print_r( $dynamicSubPath );
				// print_r( $dynamicSubPath->$pageId );
				// echo '</pre>';
				
				// foreach ( $dynamicSubPath->$pageId as $subPath ) {
				foreach ( $dynamicSubPath->$pageId->{ Lang::$LANG } as $subPath ) {
					echo '🐶 '.$subPath.'<br>';
					
					$url = Lang::$LANG_LINK . $routeParams->{ 'url-page' }->{ Lang::$LANG } . '/' . $subPath;
					
					self::$JS_VIEW->$url = $jsId;
				}
			}
		}
		
		
		echo '<pre>';
		print_r( self::$JS_VIEW );
		echo '</pre>';
		// exit();
	}
	
	
	private function getDynamicSubPath()
	{
		// $getDynamicSubPath = array( 'proj-1', 'proj-2', 'proj-3' );
		
		// return $getDynamicSubPath;
		
		
		// echo '<pre>';
		// print_r( scandir( 'configs/dynamic-url' ) );
		// echo '</pre>';
		
		
		$dynamicSubPath = new stdClass();
		
		foreach ( scandir( Path::$FILE->dynamicSubPath ) as $fileName ) {
			if ( strpos( $fileName, '.json' ) !== false ) {
				// echo $fileName.' ⚡️ SLP ⚡️ <br />';
				
				$id = str_replace( '.json', '', $fileName );
				// echo $id.' ⚡️ SLP ⚡️ <br />';
				
				$json = file_get_contents( Path::$FILE->dynamicSubPath . $fileName );
				$json = json_decode( $json );
				
				$dynamicSubPath->$id = $json;
			}
		}
		
		// echo '<pre>';
		// print_r( $dynamicUrl );
		// echo '</pre>';
		
		// exit();
		
		
		
		/*if ( !file_exists( self::JS_VIEW_FILE_PATH ) )
			throw new ErrorException( 'Dynamic-url file is missing!' );
		
		$dynamicUrl = file_get_contents( self::JS_VIEW_FILE_PATH );
		$dynamicUrl = json_decode( $dynamicUrl );*/
		
		
		return $dynamicSubPath;
	}
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->URL			= self::$URL;
		$this->params->ALT_LANG_URL	= self::$ALT_LANG_URL;
		$this->params->LINK			= self::$LINK;
		$this->params->JS_VIEW		= self::$JS_VIEW;
		
		$this->params->CONTENT_TYPE	= self::$CONTENT_TYPE;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
	
	public function updateFurtherToAPIResponse( $response )
	{
		if ( $response->pageExist ) {
			$this->setAltLangUrl( $response->urls );
			$this->setParams();
		}
		else {
			$this->page->init();
			
			$this->set404();
			$this->setParams();
			
			$this->pagesController->init();
		}
	}
	
}



?>