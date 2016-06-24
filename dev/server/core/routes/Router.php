<?php



class Router
{
	
	protected static $instance;
	
	static $ROUTES				= null;
	static $URL					= null;
	static $ALT_LANG_URL		= null;
	static $LINK				= null;
	
	static $CONTENT_TYPE		= null;
	
	private $isHomepage			= null;
	
	private $lang				= null;
	private $pagesController	= null;
	
	private $params				= null;
	
	
	protected function __construct()
	{
		$this->setRoutes();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setRoutes()
	{
		$filePath = Path::$FILE->routes . 'statics.json';
		
		if ( !file_exists( $filePath ) )
			throw new ErrorException( 'Routes file is missing!' );
		
		$routes			= file_get_contents( $filePath );
		self::$ROUTES	= json_decode( $routes );
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
		$this->setPageInfos();
		$this->setLinks();
		
		$this->setParams();
	}
	
	
	private function setContentType()
	{
		if ( isset( $_POST['ajax'] ) && $_POST['ajax'] == 'true' && isset( $_POST['type'] ) && $_POST['type'] == 'pageChange' )
			self::$CONTENT_TYPE = 'pageChange';
		else
			self::$CONTENT_TYPE = 'firstLoad';
	}
	
	
	private function setPageInfos()
	{
		$page = $this->getPageInfos();
		echo '<pre>';
		print_r( $page );
		echo '</pre>';
		// exit();
		
		if ( Lang::$LANG_EXIST && $page->exist ) { // page exist
			$this->setIsHomepage( $page->id );
			$this->setAltLangUrl( $page->urls );
			
			if ( !Lang::$MULTI_LANG && self::$URL->pathParams[0] == Lang::$DEFAULT_LANG ||
				 $this->isHomepage && self::$URL->pathParams[0] == Lang::$DEFAULT_LANG )
				$this->redirectToFullPathWithoutLang();
			
			$this->pagesController->setPageInfos( $page->id, $page->urls, $page->available );
		}
		else { // 404
			$page->id	= 'error-404';
			// $page->urls	= self::$ROUTES->statics->{ $page->id };
			$page->urls	= self::$ROUTES->{ $page->id };
			
			// $this->setAltLangUrl( self::$ROUTES->statics->home );
			$this->setAltLangUrl( self::$ROUTES->home );
			
			header( $_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found' );
			
			$this->pagesController->setPageInfos( $page->id, $page->urls, $page->available );
		}
	}
	
	
	private function getPageInfos()
	{
		$page = new stdClass();
		$page->exist		= false;
		$page->id			= null;
		$page->alias		= null;
		$page->urls			= null;
		$page->available	= true;
		
		$path				= String::removeLastSpecificChar( Path::$URL->base . self::$URL->path, '/' );
		
		foreach ( self::$ROUTES as $pageId => $pageParams ) { // parse all pages
			
			$searchPath	= Path::$URL->base . Lang::$LANG . '/' . $pageParams->url->{ Lang::$LANG };
			// echo '<b>'.$pageId. ':</b> '.$path. ' ——— '. $searchPath.' ——— ' . strpos( $path, $searchPath ) . '<br>';
			
			/* unique page */
			if ( $path == $searchPath ) {
				$page->exist	= true;
				$page->id		= $pageId;
				$page->urls		= $pageParams->url;
				
				break; // break first foreach
			}
			
			/* multiple page */
			else if ( strpos( $path, $searchPath ) !== false && $pageId != 'home' ) {
				
				if ( isset( $pageParams->alias ) ) {
					
					foreach ( $pageParams->alias as $aliasId => $alias ) {
						
						if ( $searchPath . '/' . $alias->{ Lang::$LANG } == $path ) {
							$page->exist	= true;
							$page->id		= $pageId;
							$page->alias	= $aliasId;
							$page->urls		= $this->getAltPageUrl( $pageParams->url, $alias );
							
							break; // break second foreach
						}
					}
				}
			}
			
			if ( $page->exist ) {
				$page->available = $this->getPageAvailability( $pageParams );
				
				break; // break first foreach
			}
			
		}
		
		
		
		/*foreach ( self::$ROUTES as $routesGroup ) { // parse all routes group
			
			foreach ( $routesGroup as $pageId => $pageParams ) { // parse all pages
				
				if ( $pageParams->url->{ Lang::$LANG } == self::$URL->page ) { // if url exist
					$page->exist	= true;
					$page->id		= $pageId;
					$page->urls		= $pageParams->url;
					
					break; // break second foreach
				}
				
			}
			
			if ( $page->exist ) {
				$page->available = $this->getPageAvailability( $pageParams );
				
				break; // break first foreach
			}
			
		}*/
		
		
		return $page;
	}
	
	
	private function getAltPageUrl( $page, $alias )
	{
		$urls = new stdClass();
		
		foreach ( Lang::$ALL_LANG as $lang )
			$urls->$lang = $page->$lang . '/' . $alias->$lang;
		
		
		return $urls;
	}
	
	
	private function getPageAvailability( $pageParams )
	{
		$pageAvailability = true;
		
		if ( isset( $pageParams->device ) )
			if ( isset( $pageParams->device->{ Device::$DEVICE } ) )
				if ( !$pageParams->device->{ Device::$DEVICE } )
					$pageAvailability = false;
		
		
		return $pageAvailability;
	}
	
	
	private function setIsHomepage( $pageId )
	{
		$this->isHomepage = $pageId == 'home' ? true : false;
	}
	
	
	private function setAltLangUrl( $pageParams )
	{
		foreach ( Lang::$ALL_LANG as $lang ) {
			
			if ( $lang !== Lang::$LANG ) {
				$currentUrl = $pageParams->$lang;
				
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
			
			if ( !isset( $routeParams->alias ) ) {
				$pageName = String::camelCase( $pageId );
				
				if ( $pageName !== 'error404' && $pageId == 'home' )
					self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK_ROOT . $routeParams->url->{ Lang::$LANG };
				
				else if ( $pageId !== 'error404' )
					self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK . $routeParams->url->{ Lang::$LANG };
			}
			
			else {
				foreach ( $routeParams->alias as $aliasId => $alias ) {
					$pageName = String::camelCase( $aliasId );
					
					self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK . $routeParams->url->{ Lang::$LANG } . '/' . $alias->{ Lang::$LANG };
				}
			}
		}
	}
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->URL			= self::$URL;
		$this->params->ALT_LANG_URL	= self::$ALT_LANG_URL;
		$this->params->LINK			= self::$LINK;
		
		$this->params->CONTENT_TYPE	= self::$CONTENT_TYPE;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
}



?>