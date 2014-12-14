<?php



class RoutesController
{
	
	protected static $instance;
	
	private $config			= null;
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
	private $isAltContent	= false;
	
	
	protected function __construct()
	{
		$this->init();
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	public static function getInstance()
	{
		if(!isset(self::$instance))
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function init()
	{
		$this->config	= Config::getInstance();
		$this->path		= Path::getInstance();
		
		$this->setPagesInfos();
		$this->setSubPages();
		$this->setUrl();
		$this->setRootPageName();
		$this->setPageInfos();
		$this->manageAltUrl();
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
		
		foreach($this->pagesInfos as $pageUrl => $infosPage) {
			$infosPage = (object) $infosPage;
			
			if($i == 0)
				$this->url[ $infosPage->name ] = $this->path->url->base . Config::$LG_LINK_ROOT;
			else
				$this->url[ $infosPage->name ] = $this->path->url->base . Config::$LG_LINK . $pageUrl;
			
			$this->url[ $infosPage->name.'Id' ] = $pageUrl;
			
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
		if(!Config::$IS_ALT_CONTENT) {
			$this->viewName		= $this->pagesInfos->{ $this->pageName }->name;
			$this->titlePage	= $this->pagesInfos->{ $this->pageName }->title;
			$this->descPage		= $this->pagesInfos->{ $this->pageName }->desc;
		}
		else
			$this->viewName		= 'old-browser';
	}
	
	
	private function manageAltUrl()
	{
		$this->altUrl = array();
		
		$this->setAltUrl($this->config->pages, 'page');
		
		foreach($this->subPages as $viewName => $infosAllSubPages) // parse subpages
			if($this->viewName == $viewName)
				$this->setAltUrl($infosAllSubPages, 'subpage');
	}
	
	
	private function setAltUrl($infosToParse, $type)
	{
		if($type == 'page')
			$viewName = $this->viewName;
		else if($type == 'subpage')
			$viewName = $this->urlParts[1];
		
		foreach($infosToParse as $lang => $infosAllPages) { // parse object
			
			if($lang != Config::$LANG) { // if not current language
				
				foreach($infosAllPages as $pageUrl => $infosPage) { // parse pages
					$infosPage = (object) $infosPage;
					
					if($infosPage->name == $viewName) { // if name match
						$urlPageAlt = $this->pageName == $this->rootPageName ? '' : '/'.$pageUrl;
						$urlAlt = $lang == Config::$ALL_LANG[0] && $this->pageName == $this->rootPageName ? $this->path->url->base : $this->path->url->base.$lang.$urlPageAlt;
						
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