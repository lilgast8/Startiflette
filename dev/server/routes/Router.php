<?php



class Router
{
	
	protected static $instance;
	
	static $ROUTES				= null;
	static $PAGE_URL			= null;
	static $ALT_LANG_URL		= null;
	static $LINK				= null;
	
	static $CONTENT_TYPE		= null;
	
	private $pageId				= null;
	private $pageParams			= null;
	
	private $is404				= null;
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
		$this->setContentInfos();
	}
	
	
	private function setContentType()
	{
		if ( isset( $_POST['ajax'] ) && $_POST['ajax'] == 'true' && isset( $_POST['type'] ) && $_POST['type'] == 'alt' )
			self::$CONTENT_TYPE = 'alt';
		else if ( isset( $_POST['ajax'] ) && $_POST['ajax'] == 'true' )
			self::$CONTENT_TYPE = 'ajax';
		else
			self::$CONTENT_TYPE = 'default';
	}
	
	
	private function setContentInfos()
	{
		if ( self::$CONTENT_TYPE == 'default' ) { // first load
			$this->checkLangExistence();
			$this->checkPageExistence();
			$this->setLinks();
		}
		
		else if ( self::$CONTENT_TYPE == 'ajax' ) // ajax load
			echo 'other (ajax) load';
		
		else if ( self::$CONTENT_TYPE == 'alt' ) { // alternative content
			$this->checkLangExistence();
			$this->pagesController->setPageInfos( null, self::$PAGE_URL->current, null, null );
		}
	}
	
	
	private function checkLangExistence()
	{
		if ( !in_array( Lang::$LANG, Lang::$ALL_LANG ) ) {
			$this->lang->forceDefaultLang();
			
			$this->set404( '<b>Show 404 - Language not available</b> <br><br>' );
		}
	}
	
	
	private function checkPageExistence()
	{
		$doesPageExist = false;
		
		foreach ( self::$ROUTES as $routesGroup ) { // parse all routes group
			
			foreach ( $routesGroup as $pageId => $pageParams ) { // parse all pages
				
				if ( $pageParams->{ Lang::$LANG }->url == self::$PAGE_URL->current ) { // if url exist
					$doesPageExist = true;
					
					break; // break second foreach
				}
				
			}
			
			if ( $doesPageExist )
				break; // break first foreach
			
		}
		
		
		if ( !$doesPageExist )
			$this->set404( '<b>Show 404 - Page not available</b> <br><br>' );
		else
			$this->setPage( $pageId, $pageParams );
	}
	
	
	private function set404( $status )
	{
		echo $status; // $status param to remove
		
		// header( 'Status: 404 NOT FOUND', false, 404 ); -> to confirm
		
		// self::$IS_404 = true;
		// $this->is404 = true;
	}
	
	
	private function setPage( $pageId, $pageParams )
	{
		$this->setPageInfos( $pageId, $pageParams );
		$this->setIsHomepage();
		$this->setAltLangUrl();
		
		$this->pagesController->setPageInfos( $pageId, $pageParams->phpView, $pageParams->{ Lang::$LANG }->title, $pageParams->{ Lang::$LANG }->desc );
	}
	
	
	private function setPageInfos( $pageId, $pageParams )
	{
		$this->pageId		= $pageId;
		$this->pageParams	= $pageParams;
	}
	
	
	private function setIsHomepage()
	{
		$this->isHomepage = $this->pageId == 'home' ? true : false;
	}
	
	
	private function setAltLangUrl()
	{
		foreach ( Lang::$ALL_LANG as $lang ) {
			
			if ( $lang !== Lang::$LANG ) {
				$currentUrl = $this->pageParams->$lang->url;
				
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