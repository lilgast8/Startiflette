<?php



class RoutesController
{
	
	protected static $instance;
	
	static $ROUTES			= null;
	static $PAGE_URL		= null;
	static $ALT_LANG_URL	= null;
	
	static $PHP_VIEW		= null;
	static $TITLE			= null;
	static $DESC			= null;
	
	private $path			= null;
	
	private $pageId			= null;
	private $pageParams		= null;
	
	private $is404			= null;
	private $isHomepage		= null;
	
	
	protected function __construct()
	{
		$this->path = Path::getInstance();
		
		$this->setRoutes();
		$this->checkLangExistence();
		$this->checkPageExistence();
		
		$this->path->setLinks();
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	public static function getInstance()
	{
		if (!isset(self::$instance))
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setRoutes()
	{
		self::$ROUTES = new stdClass();
		
		foreach (Config::$ROUTES_FILES as $fileName) {
			$filePath = Path::$FILE->routes . $fileName . '.json';
			
			if ( !file_exists($filePath) )
				throw new ErrorException('Routes file is missing!');
			
			$routes	= file_get_contents($filePath);
			$routes	= json_decode($routes);
			
			self::$ROUTES->$fileName = new stdClass();
			self::$ROUTES->$fileName = $routes;
		}
	}
	
	
	private function checkLangExistence()
	{
		if (!in_array(Lang::$LANG, Lang::$ALL_LANG)) {
			Lang::$LANG = Lang::$DEFAULT_LANG;
			
			$this->set404('<b>Show 404 - Language not available</b> <br><br>');
		}
	}
	
	
	private function checkPageExistence()
	{
		$doesPageExist = false;
		
		foreach (self::$ROUTES as $routesGroup => $pages) { // parse all routes group
			
			foreach ($pages as $pageId => $pageParams) { // parse all pages
				
				if ($pageParams->{Lang::$LANG}->url == Path::$PAGE_URL->current) { // if url exist
					$doesPageExist = true;
					
					break; // break second foreach
				}
				
			}
			
			if ($doesPageExist)
				break; // break first foreach
			
		}
		
		
		if (!$doesPageExist)
			$this->set404('<b>Show 404 - Page not available</b> <br><br>');
		else {
			$this->setPageInfos($pageId, $pageParams);
			$this->setIsHomepage();
			$this->setAltLangUrl();
		}
	}
	
	
	private function set404($status)
	{
		echo $status; // $status param to remove
		
		// header('Status: 404 NOT FOUND', false, 404);
		
		// self::$IS_404 = true;
		// $this->is404 = true;
	}
	
	
	private function setPageInfos($pageId, $pageParams)
	{
		$this->pageId		= $pageId;
		$this->pageParams	= $pageParams;
		
		self::$PHP_VIEW		= $this->pageParams->phpView;
		self::$TITLE		= $this->pageParams->{Lang::$LANG}->title;
		self::$DESC			= $this->pageParams->{Lang::$LANG}->desc;
	}
	
	
	private function setIsHomepage()
	{
		$this->isHomepage = $this->pageId == 'home' ? true : false;
	}
	
	
	private function setAltLangUrl()
	{
		$ALT_LANG_URL = array();
		
		foreach (Lang::$ALL_LANG as $lang) {
			
			if ($lang !== Lang::$LANG) {
				$currentUrl = $this->pageParams->$lang->url;
				
				if ($this->isHomepage && $lang == Lang::$DEFAULT_LANG)
					$urlPart = '';
				else if ($this->isHomepage)
					$urlPart = $lang;
				else
					$urlPart = $lang . '/' . $this->pageParams->$lang->url;
				
				$altLangUrl = Path::$URL->base . $urlPart;
				
				self::$ALT_LANG_URL[$lang] = $altLangUrl;
			}
			
		}
	}
	
	
	public function getAltLangUrl()
	{
		if (!Lang::$MULTI_LANG)
			return false;
		
		
		$altLangUrlList = '';
		
		foreach (self::$ALT_LANG_URL as $lang => $altLangUrl)
			$altLangUrlList .= '<link rel="alternate" href="' . $altLangUrl . '" hreflang="' . $lang . '" />' . "\n\t";
		
		
		return $altLangUrlList;
	}
	
}



?>