<?php



class Path
{
	
	protected static $instance;
	
	static $URL			= null;
	static $FILE		= null;
	static $PAGE_URL	= null;
	static $LINK		= null;
	
	private $deviceDir	= null;
	
	
	protected function __construct()
	{
		$this->setDeviceDir();
		$this->setPaths();
	}
	
	
	public static function getInstance()
	{
		if (!isset(self::$instance))
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	private function setDeviceDir()
	{
		if (!Config::$HAS_MOBILE_VERSION)
			$this->deviceDir = 'desktop/';
		else if (Config::$HAS_MOBILE_VERSION && (Config::$DEVICE == 'desktop' || Config::$DEVICE == 'tablet'))
			$this->deviceDir = 'desktop/';
		else if (Config::$HAS_MOBILE_VERSION && Config::$DEVICE == 'mobile')
			$this->deviceDir = 'mobile/';
	}
	
	
	private function setPaths()
	{
		// url paths
		self::$URL			= new stdClass();
		
		self::$URL->base	= Config::$BASE_URL_DEV;
		self::$URL->assets	= self::$URL->base . 'assets/';
		self::$URL->css		= self::$URL->assets . 'css/';
		self::$URL->img		= self::$URL->assets . 'img/';
		self::$URL->js		= self::$URL->assets . 'js/';
		self::$URL->json	= self::$URL->assets . 'json/';
		self::$URL->routes	= self::$URL->json . 'routes/';
		self::$URL->server	= self::$URL->base . 'server/';
		
		
		// file paths
		self::$FILE					= new stdClass();
		
		self::$FILE->assets			= 'assets/';
		self::$FILE->css			= self::$FILE->assets . 'css/';
		self::$FILE->img			= self::$FILE->assets . 'img/';
		self::$FILE->js				= self::$FILE->assets . 'js/';
		self::$FILE->json			= self::$FILE->assets . 'json/';
		self::$FILE->routes			= self::$FILE->json . 'routes/';
		self::$FILE->server			= 'server/';
		self::$FILE->shared			= self::$FILE->server . 'shared/';
		self::$FILE->views			= self::$FILE->server . 'views/';
		self::$FILE->viewsPage		= self::$FILE->views . $this->deviceDir . 'pages/';
		self::$FILE->viewsPartials	= self::$FILE->views . $this->deviceDir . 'partials/';
		self::$FILE->viewsAlt		= self::$FILE->views . 'alt/';
		
		
		
		// page url paths
		self::$PAGE_URL				= new stdClass();
		
		self::$PAGE_URL->full		= $this->getFullPageUrl();
		self::$PAGE_URL->params		= $this->getParamsPageUrl();
		self::$PAGE_URL->aParams	= explode('/', self::$PAGE_URL->params);
	}
	
	
	private function getFullPageUrl()
	{
		$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? 'https://' : 'http://';
		
		return $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	}
	
	
	private function getParamsPageUrl()
	{
		$paramsPageUrl = str_replace(self::$URL->base, '', self::$PAGE_URL->full);
		
		if (substr($paramsPageUrl, 0, 1) == '/') // if / is first character, remove it
			$paramsPageUrl = substr($paramsPageUrl, 1);
		
		if (substr($paramsPageUrl, -1, 1) == '/') // if / is last character, remove it
			$paramsPageUrl = substr($paramsPageUrl, 0, -1);
		
		// remove ?params
		$aParamsPageUrl	= explode('?', $paramsPageUrl);
		$paramsPageUrl	= $aParamsPageUrl[0];
		
		
		return $paramsPageUrl;
	}
	
	
	public function setCurrentPageUrl()
	{
		self::$PAGE_URL->current	= $this->getCurrentPageUrl();
		self::$PAGE_URL->aCurrent	= explode('/', self::$PAGE_URL->current);
	}
	
	
	private function getCurrentPageUrl()
	{
		$currentPageUrl = preg_replace('/' . Lang::$LANG . '/', '', self::$PAGE_URL->params, 1);
		
		if (substr($currentPageUrl, 0, 1) == '/') // if / is first character, remove it
			$currentPageUrl = substr($currentPageUrl, 1);
		
		
		return $currentPageUrl;
	}
	
	
	public function setLinks()
	{
		self::$LINK = new stdClass();
		
		foreach (RoutesController::$ROUTES as $routesGroup => $pages) { // parse all routes group
			
			self::$LINK->$routesGroup = new stdClass();
			
			foreach ($pages as $pageId => $pageParams) { // parse all pages
				
				if ($pageId !== 'error404' && $pageId == 'home')
					self::$LINK->$routesGroup->$pageId = self::$URL->base . Lang::$LANG_LINK_ROOT . $pageParams->{Lang::$LANG}->url;
				
				else if ($pageId !== 'error404')
					self::$LINK->$routesGroup->$pageId = self::$URL->base . Lang::$LANG_LINK . $pageParams->{Lang::$LANG}->url;
				
			}
			
		}
	}
	
}



?>