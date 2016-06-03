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
		if ( !isset(self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setRoutes()
	{
		self::$ROUTES = new stdClass();
		
		foreach ( Config::$ROUTES_FILES as $fileName ) {
			$filePath = Path::$FILE->routes . $fileName . '.json';
			
			if ( !file_exists( $filePath ) )
				throw new ErrorException('Routes file is missing!');
			
			$routes	= file_get_contents( $filePath );
			$routes	= json_decode( $routes );
			
			self::$ROUTES->$fileName = new stdClass();
			self::$ROUTES->$fileName = $routes;
		}
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
		$paramsUrl	= str_replace( Path::$URL->base, '', self::$URL->full );
		
		// remove ?params
		$aParamsUrl	= explode( '?', $paramsUrl );
		$paramsUrl	= $aParamsUrl[0];
		
		if ( substr( $paramsUrl, 0, 1 ) == '/' ) // if / is first character, remove it
			$paramsUrl = substr( $paramsUrl, 1 );
		
		if ( substr( $paramsUrl, -1, 1 ) == '/' ) // if / is last character, remove it
			$paramsUrl = substr( $paramsUrl, 0, -1 );
		
		
		return $paramsUrl;
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
		$currentUrl = preg_replace( '/' . Lang::$LANG . '/', '', self::$URL->path, 1 );
		
		if ( substr( $currentUrl, 0, 1 ) == '/' ) // if / is first character, remove it
			$currentUrl = substr( $currentUrl, 1 );
		
		if ( substr( $currentUrl, -1, 1 ) == '/' ) // if / is last character, remove it
			$currentUrl = substr( $currentUrl, 0, -1 );
		
		
		return $currentUrl;
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
			$this->setAltLangUrl( $page->params );
			
			if ( $this->isHomepage && self::$URL->path == Lang::$DEFAULT_LANG )
				$this->redirectToRoot();
			else if ( !Lang::$MULTI_LANG && self::$URL->pathParams[0] == Lang::$DEFAULT_LANG )
				$this->redirectToPageWithoutLang();
			
			$this->pagesController->setPageInfos( $page->id, $page->params );
		}
		else { // 404
			$page->id		= 'error-404';
			$page->params	= self::$ROUTES->statics->{ $page->id };
			
			$this->setAltLangUrl( self::$ROUTES->statics->home );
			
			header( $_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found' );
			
			$this->pagesController->setPageInfos( $page->id, $page->params );
		}
	}
	
	
	private function getPageInfos()
	{
		$page = new stdClass();
		$page->exist	= false;
		$page->id		= null;
		$page->params	= null;
		
		foreach ( self::$ROUTES as $routesGroupName ) { // parse all routes group
			
			foreach ( $routesGroupName as $pageId => $pageParams ) { // parse all pages
				
				if ( $pageParams->{ Lang::$LANG }->url == self::$URL->page ) { // if url exist
					$page->exist	= true;
					$page->id		= $pageId;
					$page->params	= $pageParams;
					
					break; // break second foreach
				}
				
			}
			
			if ( $page->exist )
				break; // break first foreach
			
		}
		
		
		return $page;
	}
	
	
	private function setIsHomepage( $pageId )
	{
		$this->isHomepage = $pageId == 'home' ? true : false;
	}
	
	
	private function setAltLangUrl( $pageParams )
	{
		foreach ( Lang::$ALL_LANG as $lang ) {
			
			if ( $lang !== Lang::$LANG ) {
				$currentUrl = $pageParams->$lang->url;
				
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
	
	
	private function redirectToRoot()
	{
		header( 'Status: 301 Moved Permanently', true, 301 );
		header( 'Location: ' . Path::$URL->base );
		exit();
	}
	
	
	private function redirectToPageWithoutLang()
	{
		header( 'Status: 301 Moved Permanently', true, 301 );
		header( 'Location: ' . Path::$URL->base . self::$URL->page );
		exit();
	}
	
	
	private function setLinks()
	{
		self::$LINK = new stdClass();
		
		foreach ( Router::$ROUTES as $routesGroup => $pages ) { // parse all routes group
			
			self::$LINK->$routesGroup = new stdClass();
			
			foreach ( $pages as $pageId => $pageParams ) { // parse all pages
				$pageName = Helpers::camelCase( $pageId );
				
				if ( $pageName !== 'error404' && $pageName == 'home' )
					self::$LINK->$routesGroup->$pageName = Path::$URL->base . Lang::$LANG_LINK_ROOT . $pageParams->{ Lang::$LANG }->url;
				
				else if ( $pageName !== 'error404' )
					self::$LINK->$routesGroup->$pageName = Path::$URL->base . Lang::$LANG_LINK . $pageParams->{ Lang::$LANG }->url;
			}
			
		}
	}
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->ROUTES		= self::$ROUTES;
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