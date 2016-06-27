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
		
		if ( Lang::$LANG_EXIST && $page->exist ) { // page exist
			$this->setIsHomepage( $page->id );
			$this->setAltLangUrl( $page->urls );
			
			if ( !Lang::$MULTI_LANG && self::$URL->pathParams[0] == Lang::$DEFAULT_LANG ||
				 $this->isHomepage && self::$URL->pathParams[0] == Lang::$DEFAULT_LANG )
				$this->redirectToFullPathWithoutLang();
			
			$this->pagesController->setPageInfos( $page );
		}
		else { // 404
			$page->id	= 'error-404';
			$page->urls	= self::$ROUTES->{ $page->id };
			
			$this->setAltLangUrl( self::$ROUTES->home->{ 'url-page' } );
			
			header( $_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found' );
			
			$this->pagesController->setPageInfos( $page );
		}
	}
	
	
	private function getPageInfos()
	{
		$page				= new stdClass();
		$page->exist		= false;
		$page->id			= null;
		$page->js			= null;
		$page->twig			= null;
		$page->ctrl			= null;
		$page->alias		= null;
		$page->urls			= null;
		$page->available	= true;
		
		foreach ( self::$ROUTES as $pageId => $pageParams ) { // parse all pages
			
			$path = self::$URL->page == '' && Lang::$LANG == Lang::$DEFAULT_LANG ?
					$path = Path::$URL->base :
					String::removeLastSpecificChar( Path::$URL->base . self::$URL->path, '/' );
			
			$searchPath = $pageId == 'home' ?
						  $searchPath = Path::$URL->base . Lang::$LANG_LINK_ROOT . $pageParams->{ 'url-page' }->{ Lang::$LANG } :
						  Path::$URL->base . Lang::$LANG_LINK . $pageParams->{ 'url-page' }->{ Lang::$LANG };
			
			/* unique page */
			if ( $path == $searchPath ) {
				$page->exist	= true;
				$page->id		= $pageId;
				$page->urls		= $pageParams->{ 'url-page' };
				
				$page			= $this->setSpecificOptions( $page, $pageParams );
				
				break; // break first foreach
			}
			
			/* multiple page */
			else if ( strpos( $path, $searchPath ) !== false && $pageId != 'home' ) {
				
				if ( isset( $pageParams->{ 'url-alias' } ) ) {
					
					foreach ( $pageParams->{ 'url-alias' } as $aliasId => $alias ) {
						
						if ( $searchPath . '/' . $alias->{ Lang::$LANG } == $path ) {
							$page->exist	= true;
							$page->id		= $pageId;
							$page->alias	= $aliasId;
							$page->urls		= $this->getAltPageUrl( $pageParams->{ 'url-page' }, $alias );
							
							$page			= $this->setSpecificOptions( $page, $pageParams );
							
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
		
		
		return $page;
	}
	
	
	private function getAltPageUrl( $page, $alias )
	{
		$urls = new stdClass();
		
		foreach ( Lang::$ALL_LANG as $lang )
			$urls->$lang = $page->$lang . '/' . $alias->$lang;
		
		
		return $urls;
	}
	
	
	private function setSpecificOptions( $page, $pageParams )
	{
		$page->js	= isset( $pageParams->js ) ? $pageParams->js : null;
		$page->twig	= isset( $pageParams->twig ) ? $pageParams->twig : null;
		$page->ctrl	= isset( $pageParams->ctrl ) ? $pageParams->ctrl : null;
		
		
		return $page;
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
	
	
	private function setAltLangUrl( $urls )
	{
		foreach ( Lang::$ALL_LANG as $lang ) {
			
			if ( $lang !== Lang::$LANG ) {
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
			
			if ( !isset( $routeParams->{ 'url-alias' } ) ) {
				$pageName = String::camelCase( $pageId );
				
				if ( $pageName !== 'error404' && $pageId == 'home' )
					self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK_ROOT . $routeParams->{ 'url-page' }->{ Lang::$LANG };
				
				else if ( $pageId !== 'error404' )
					self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK . $routeParams->{ 'url-page' }->{ Lang::$LANG };
			}
			
			else {
				foreach ( $routeParams->{ 'url-alias' } as $aliasId => $alias ) {
					$pageName = String::camelCase( $aliasId );
					
					self::$LINK->$pageName = Path::$URL->base . Lang::$LANG_LINK . $routeParams->{ 'url-page' }->{ Lang::$LANG } . '/' . $alias->{ Lang::$LANG };
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