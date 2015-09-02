<?php



class RoutesController
{
	
	protected static $instance;
	
	/*private $config			= null;
	private $path			= null;
	
	public $pagesInfos		= null;
	public $url				= null;
	public $rootPageName	= null;
	public $urlParts		= null;
	public $pageName		= null;
	public $viewName		= null;
	public $titlePage		= null;
	public $descPage		= null;
	public $altUrl			= null;
	
	private $subPages		= array();
	private $isAltContent	= false;*/
	
	// static $ROUTES = array();
	static $ROUTES		= null;
	static $PAGE_URL	= null;
	
	
	protected function __construct()
	{
		// $this->config	= Config::getInstance();
		// $this->path		= Path::getInstance();
		
		$this->setRoutes();
		// $this->setPageUrl();
		
		$this->checkLangExistence();
		$this->checkPageExistence();
		
		$this->setPathLinks();
		
		
		// $this->setPagesInfos();
		// $this->setSubPages();
		// $this->setUrl();
		// $this->setRootPageName();
		// $this->setPageInfos();
		// $this->manageAltUrl();
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
		
		foreach (Config::$ROUTES_FILES as $key => $fileName) {
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
				
				if ($pageParams->{Lang::$LANG}->url == Path::$PAGE_URL->params) { // if url exist
					$doesPageExist = true;
					
					break; // break second foreach
				}
				
			}
			
			if ($doesPageExist)
				break; // break first foreach
			
		}
		
		
		if (!$doesPageExist)
			$this->set404('<b>Show 404 - Page not available</b> <br><br>');
	}
	
	
	private function set404($status)
	{
		echo $status; // $status param to remove
		
		
		// header('Status: 404 NOT FOUND', false, 404);
		
		// self::$IS_404	= true;
	}
	
	
	private function setPathLinks()
	{
		$this->path = Path::getInstance();
		$this->path->setLinks();
	}
	
	
	
	
	
	
	
	
	private function setPagesInfos()
	{
		$this->pagesInfos = $this->config->pages->{ Config::$LANG };
	}
	
	
	private function setSubPages()
	{
		$this->subPages['project'] = $this->config->projects;
	}
	
	
	private function setUrl()
	{
		$i = 0;
		
		foreach($this->pagesInfos as $pageUrl => $pageInfos) {
			$pageInfos	= (object) $pageInfos;
			$viewName	= str_replace('-', '_', $pageInfos->name);
			
			if($i == 0)
				$this->url[ $viewName ] = $this->path->url->base . Config::$LG_LINK_ROOT;
			else
				$this->url[ $viewName ] = $this->path->url->base . Config::$LG_LINK . $pageUrl;
			
			$this->url[ $viewName.'_ID' ] = $pageUrl;
			
			$i++;
		}
		
		$this->url = (object) $this->url;
	}
	
	
	private function setRootPageName()
	{
		foreach($this->pagesInfos as $url => $value) {
			$this->rootPageName = $url;
			
			break;
		}
	}
	
	
	private function setPageInfos()
	{
		$currentUrl	= $this->path->url->current;
		$baseUrl	= $this->path->url->base;
		
		// remove base & parameters if there is one
		$urlBaseEnd	= strrpos($currentUrl, $baseUrl) + strlen($baseUrl);
		$urlEnd		= strrpos($currentUrl, '?') ? strrpos($currentUrl, '?') : strlen($currentUrl);
		$urlLength	= $urlEnd - $urlBaseEnd;
		$pageUrl	= substr($currentUrl, $urlBaseEnd, $urlLength);
		
		// remove language if there is one
		if(Config::$MULTI_LANG && substr($pageUrl, 0, 2) == Config::$LANG)
			$pageUrl = preg_replace('/'.Config::$LANG.'/', '', $pageUrl, 1);
		
		// AJAX management
		$pageUrl = $this->config->manageAjax($pageUrl);
		
		// alternative content management
		$pageUrl = $this->config->manageAltContent($pageUrl);
		
		// remove first slash if there is one
		if(substr($pageUrl, 0, 1) == '/')
			$pageUrl = preg_replace('/\//', '', $pageUrl, 1);
		
		// remove last slash if there is one
		if(substr($pageUrl, strlen($pageUrl)-1, 1) == '/')
			$pageUrl = substr_replace($pageUrl, '', -1);
			// $pageUrl = substr($pageUrl, 0, -1);
		
		// get the url parts
		$urlParts = explode('/', $pageUrl);
		
		// set page name
		if($urlParts[0] === '')
			$pageName = $this->rootPageName;
		else
			$pageName = $urlParts[0];
		
		
		$this->urlParts		= $urlParts;
		$this->pageName		= $pageName;
		if(!Config::$IS_ALT_CONTENT)
			$this->setInfos($pageUrl);
		else
			$this->viewName		= 'old-browser';
	}
	
	
	private function setInfos($activePageUrl)
	{
		$viewName = $this->pagesInfos->{ $this->pageName }->name;
		
		$title	= $this->pagesInfos->{ $this->pageName }->title;
		$desc	= $this->pagesInfos->{ $this->pageName }->desc;
		
		if($title == '' && $desc == '') {
			
			foreach($this->subPages as $viewName => $infosAllSubPages) { // parse subpages
				
				foreach($infosAllSubPages->{ Config::$LANG } as $pageUrl => $pagesInfos) { // parse subpages infos
					
					if($pageUrl == $activePageUrl) { // if page url match
						$title	= $pagesInfos->title;
						$desc	= $pagesInfos->desc;
						
						break;
					}
				}
			}
		}
		
		
		$this->viewName		= $viewName;
		$this->titlePage	= $title;
		$this->descPage		= $desc;
	}
	
	
	private function manageAltUrl()
	{
		$this->altUrl = array();
		
		$this->setAltUrl($this->config->pages, 'page');
		
		foreach($this->subPages as $viewName => $infosAllSubPages) { // parse subpages
			if($this->viewName == $viewName) {
				$this->setAltUrl($infosAllSubPages, 'subpage');
				
				break;
			}
		}
	}
	
	
	private function setAltUrl($infosToParse, $type)
	{
		if($type == 'page')
			$viewName = $this->viewName;
		else if($type == 'subpage')
			$viewName = $this->urlParts[1];
		
		foreach($infosToParse as $lang => $infosAllPages) { // parse object
			
			if($lang != Config::$LANG) { // if not current language
				
				foreach($infosAllPages as $pageUrl => $pageInfos) { // parse pages infos
					$pageInfos = (object) $pageInfos;
					
					if($pageInfos->name == $viewName) { // if name match
						$urlPageAlt = $this->pageName == $this->rootPageName ? '' : '/'.$pageUrl;
						$urlAlt = $lang == 	Config::DEFAULT_LANG && $this->pageName == $this->rootPageName ? 
											$this->path->url->base : $this->path->url->base.$lang.$urlPageAlt;
						
						$this->altUrl[ $lang ] = $urlAlt;
					}
				}
			}
		}
	}
	
	
	public function getAltLink()
	{
		foreach($this->altUrl as $lang => $urlAlt)
			echo '<link rel="alternate" href="'.$urlAlt.'" hreflang="'.$lang.'" />'."\n\t";
	}
	
}



?>