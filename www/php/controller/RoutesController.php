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
	
	
	protected function __construct()
	{
		$this->set();
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
	
	
	private function set()
	{
		$this->config	= Config::getInstance();
		$this->path		= Path::getInstance();
		
		$this->setPagesInfos();
		$this->setUrl();
		$this->setRootPageName();
		$this->setPageInfos();
		$this->setAltUrl();
	}
	
	
	private function setPagesInfos()
	{
		$this->pagesInfos = $this->config->pages->{ Config::$LANG };
	}
	
	
	private function setUrl()
	{
		$i = 0;
		
		foreach($this->pagesInfos as $pageUrl => $infosPage) {
			$infosPage = (object) $infosPage;
			
			if($i == 0)
				$this->url[ $infosPage->file ] = $this->path->url->base . Config::$LG_LINK_ROOT;
			else
				$this->url[ $infosPage->file ] = $this->path->url->base . Config::$LG_LINK . $pageUrl;
			
			$this->url[ $infosPage->file.'Id' ] = $pageUrl;
			
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
		$pageUrl = str_replace($this->path->url->base, '', $this->path->url->current);
		
		// remove language if exist
		if(Config::$MULTI_LANG && substr($pageUrl, 0, 2) == Config::$LANG)
			$pageUrl = preg_replace('/'.Config::$LANG.'/', '', $pageUrl, 1);
		
		// remove first slash if exist
		if(substr($pageUrl, 0, 1) == '/')
			$pageUrl = preg_replace('/\//', '', $pageUrl, 1);
		
		// get the url parts
		$urlParts = explode('/', $pageUrl);
		
		// set page name
		if($urlParts[0] === '')
			$pageName = $this->rootPageName;
		else
			$pageName = $urlParts[0];
		
		
		$this->urlParts		= $urlParts;
		$this->pageName		= $pageName;
		$this->viewName		= $this->pagesInfos->{ $this->pageName }->file;
		$this->titlePage	= $this->pagesInfos->{ $this->pageName }->title;
		$this->descPage		= $this->pagesInfos->{ $this->pageName }->desc;
	}
	
	
	private function setAltUrl()
	{
		$this->altUrl = array();
		
		foreach($this->config->pages as $lang => $infosAllPages) { // parse languages
			
			if($lang != Config::$LANG) { // if not current language
				
				foreach($infosAllPages as $pageUrl => $infosPage) { // parse pages
					$infosPage = (object) $infosPage;
					
					if($infosPage->file == $this->viewName) { // if file match with view name
						$urlPageAlt = $this->pageName == $this->rootPageName ? '' : '/'.$pageUrl;
						$urlAlt = $lang == Config::$ALL_LANG[0] && $this->pageName == $this->rootUrlName ? $this->path->url->base : $this->path->url->base.$lang.$urlPageAlt;
						
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