<?php



class Router
{
	
	protected static $instance;
	
	static $ROUTES				= null;
	static $PAGE_URL			= null;
	static $ALT_LANG_URL		= null;
	static $LINK				= null;
	
	static $CONTENT_TYPE		= null;
	
	private $isHomepage			= null;
	
	private $lang				= null;
	private $pagesController	= null;
	
	
	protected function __construct()
	{
		$this->setRoutes();
	}
	
	
	protected function __clone()
	{
		
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
	
	
	public function setPageUrl()
	{
		self::$PAGE_URL				= new stdClass();
		
		self::$PAGE_URL->full		= $this->getFullPageUrl();
		self::$PAGE_URL->params		= $this->getParamsPageUrl();
		self::$PAGE_URL->aParams	= explode( '/', self::$PAGE_URL->params );
		self::$PAGE_URL->current	= null;
		self::$PAGE_URL->aCurrent	= null;
	}
	
	
	private function getFullPageUrl()
	{
		$protocol = ( !empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443 ) ? 'https://' : 'http://';
		
		
		return $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	}
	
	
	private function getParamsPageUrl()
	{
		$paramsPageUrl = str_replace( Path::$URL->base, '', self::$PAGE_URL->full );
		
		if ( substr( $paramsPageUrl, 0, 1 ) == '/' ) // if / is first character, remove it
			$paramsPageUrl = substr( $paramsPageUrl, 1 );
		
		if ( substr( $paramsPageUrl, -1, 1 ) == '/' ) // if / is last character, remove it
			$paramsPageUrl = substr( $paramsPageUrl, 0, -1 );
		
		// remove ?params
		$aParamsPageUrl	= explode( '?', $paramsPageUrl );
		$paramsPageUrl	= $aParamsPageUrl[0];
		
		
		return $paramsPageUrl;
	}
	
	
	public function setCurrentPageUrl()
	{
		self::$PAGE_URL->current	= $this->getCurrentPageUrl();
		self::$PAGE_URL->aCurrent	= explode( '/', self::$PAGE_URL->current );
	}
	
	
	private function getCurrentPageUrl()
	{
		$currentPageUrl = preg_replace( '/' . Lang::$LANG . '/', '', self::$PAGE_URL->params, 1 );
		
		if ( substr( $currentPageUrl, 0, 1 ) == '/' ) // if / is first character, remove it
			$currentPageUrl = substr( $currentPageUrl, 1 );
		
		
		return $currentPageUrl;
	}
	
	
	public function init()
	{
		$this->lang				= Lang::getInstance();
		$this->pagesController	= PagesController::getInstance();
		
		$this->setContentType();
		$this->setPageInfos();
		$this->setLinks();
	}
	
	
	private function setContentType()
	{
		if ( isset( $_POST['ajax'] ) && $_POST['ajax'] == 'true' && isset( $_POST['type'] ) && $_POST['type'] == 'oldBrowser' )
			self::$CONTENT_TYPE = 'oldBrowser';
		else if ( isset( $_POST['ajax'] ) && $_POST['ajax'] == 'true' && isset( $_POST['type'] ) && $_POST['type'] == 'pageChange' )
			self::$CONTENT_TYPE = 'pageChange';
		else
			self::$CONTENT_TYPE = 'firstLoad';
	}
	
	
	private function setPageInfos()
	{
		$langExist	= $this->getLangExistence();
		$page		= $this->getPageInfos();
		
		if ( $langExist && $page->exist ) { // page exist
			$this->setIsHomepage( $page->id );
			$this->setAltLangUrl( $page->params );
			
			if ( $this->isHomepage && self::$PAGE_URL->params == Lang::$DEFAULT_LANG )
				$this->redirectToRoot();
			else if ( !Lang::$MULTI_LANG && self::$PAGE_URL->aParams[0] == Lang::$DEFAULT_LANG )
				$this->redirectToPageWithoutLang();
			
			$this->pagesController->setPageInfos( $page->id, $page->params->phpView, $page->params->{ Lang::$LANG }->title, $page->params->{ Lang::$LANG }->desc );
		}
		else if ( self::$CONTENT_TYPE == 'oldBrowser' ) {
			$page->id				= 'alt';
			$page->params			= new stdClass();
			$page->params->phpView	= 'old-browser';
			
			$this->pagesController->setPageInfos( $page->id, $page->params->phpView, '', '' );
		}
		else { // 404
			$page->id		= 'error404';
			$page->params	= self::$ROUTES->statics->error404;
			
			header( $_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found' );
			
			$this->pagesController->setPageInfos( $page->id, $page->params->phpView, $page->params->{ Lang::$LANG }->title, $page->params->{ Lang::$LANG }->desc );
		}
	}
	
	
	private function getLangExistence()
	{
		$langExist = true;
		
		if ( !in_array( Lang::$LANG, Lang::$ALL_LANG ) ) {
			$this->lang->forceDefaultLang();
			
			$langExist = false;
		}
		
		
		return $langExist;
	}
	
	
	private function getPageInfos()
	{
		$page = new stdClass();
		$page->exist	= false;
		$page->id		= null;
		$page->params	= null;
		
		foreach ( self::$ROUTES as $routesGroupName ) { // parse all routes group
			
			foreach ( $routesGroupName as $pageId => $pageParams ) { // parse all pages
				
				if ( $pageParams->{ Lang::$LANG }->url == self::$PAGE_URL->current ) { // if url exist
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
		header( 'Location: ' . Path::$URL->base . self::$PAGE_URL->current );
		exit();
	}
	
	
	private function setLinks()
	{
		self::$LINK = new stdClass();
		
		foreach ( Router::$ROUTES as $routesGroup => $pages ) { // parse all routes group
			
			self::$LINK->$routesGroup = new stdClass();
			
			foreach ( $pages as $pageId => $pageParams ) { // parse all pages
				
				if ( $pageId !== 'error404' && $pageId == 'home' )
					self::$LINK->$routesGroup->$pageId = Path::$URL->base . Lang::$LANG_LINK_ROOT . $pageParams->{ Lang::$LANG }->url;
				
				else if ( $pageId !== 'error404' )
					self::$LINK->$routesGroup->$pageId = Path::$URL->base . Lang::$LANG_LINK . $pageParams->{ Lang::$LANG }->url;
				
			}
			
		}
	}
	
}



?>