<?php



class RoutesController
{
	
	protected static $instance;
	
	private $config		= null;
	private $path		= null;
	
	public $pagesInfos	= null;
	public $url			= null;
	public $rootUrlName	= null;
	public $urlName		= null;
	public $viewName	= null;
	public $titlePage	= null;
	public $descPage	= null;
	public $altUrl		= null;
	
	
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
		
		// print_r($this->config);
		
		// if(!file_exists($this->path->file->pagesConfig))
		// 	throw new ErrorException('Pages config file is missing!');
		
		// $pages = file_get_contents($this->path->file->pagesConfig);
		// $this->pages = json_decode($pages);
		
		
		$this->setPagesInfos();
		$this->setUrl();
		$this->setRootUrlName();
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
		$this->url = array();
		
		foreach($this->pagesInfos as $pageUrl => $infosPage) {
			$infosPage = (object) $infosPage;
			
			if($i == 0)
				$this->url[ $infosPage->file ] = $this->path->url->base . Config::$LG_LINK_ROOT;
			else
				$this->url[ $infosPage->file ] = $this->path->url->base . Config::$LG_LINK_ROOT . $pageUrl;
			
			$i++;
		}
	}
	
	
	private function setRootUrlName()
	{
		foreach($this->pagesInfos as $url => $value) {
			$this->rootUrlName = $url;
			
			break;
		}
	}
	
	
	private function setPageInfos()
	{
		$current = $this->path->url->current;
		$pageUrl = str_replace($this->path->url->base, '', $current);
		
		// remove language if exist
		if(substr($pageUrl, 0, 2) == Config::$LANG)
			$pageUrl = preg_replace('/'.Config::$LANG.'/', '', $pageUrl, 1);
		
		// remove first slash if exist
		if(substr($pageUrl, 0, 1) == '/')
			$pageUrl = preg_replace('/\//', '', $pageUrl, 1);
		
		// set page url if empty (if root)
		if($pageUrl === '')
			$pageUrl = $this->rootUrlName;
		
		
		$this->urlName		= $pageUrl;
		$this->viewName		= $this->pagesInfos->{ $this->urlName }->file;
		$this->titlePage	= $this->pagesInfos->{ $this->urlName }->title;
		$this->descPage		= $this->pagesInfos->{ $this->urlName }->desc;
	}
	
	
	private function setAltUrl()
	{
		$this->altUrl = array();
		
		foreach($this->config->pages as $lang => $infosAllPages) { // parse languages
			
			if($lang != Config::$LANG) { // if not current language
				
				foreach($infosAllPages as $pageUrl => $infosPage) { // parse pages
					$infosPage = (object) $infosPage;
					
					if($infosPage->file == $this->viewName) { // if file match with view name
						$urlPageAlt = $this->urlName == $this->rootUrlName ? '' : '/'.$pageUrl;
						$urlAlt = $lang == Config::$ALL_LANG[0] && $this->urlName == $this->rootUrlName ? $this->path->url->base : $this->path->url->base.$lang.$urlPageAlt;
						
						$this->altUrl[ $lang ] = $urlAlt;
					}
				}
			}
		}
	}
	
	
	public function getAltUrl()
	{
		foreach($this->altUrl as $lang => $urlAlt)
			echo '<link rel="alternate" href="'.$urlAlt.'" hreflang="'.$lang.'" />'."\n\t";
	}
	
}



?>