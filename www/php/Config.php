<?php



class Config
{
	
	protected static $instance;
	
	const PROD				= false;
	// const PROD				= true;
	
	static $LOCALHOST		= null;
	static $DEVICE			= null;
	static $DEVICE_FOLDER	= null;
	static $FOLDER			= null;
	
	static $MULTI_LANG		= null;
	static $ALT_LANG		= null;
	static $ALL_LANG		= null;
	static $LANG			= null;
	
	static $LG_LINK			= null;
	static $LG_LINK_ROOT	= null;
	
	static $IS_AJAX			= false;
	static $IS_ALT_CONTENT	= false;
	
	private $path			= null;
	
	public $pages			= null;
	public $projects		= null;
	
	
	protected function __construct()
	{
		$this->setEnv();
		$this->setErrors();
		$this->setDevice();
	}
	
	
	public static function getInstance()
	{
		if(!isset(self::$instance))
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	private function setEnv()
	{
		self::$LOCALHOST = $_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_PORT'] == '8888' ? true : false;
	}
	
	
	private function setErrors()
	{
		if(self::$LOCALHOST || !self::PROD) {
			error_reporting(E_ALL);
			ini_set('display_errors', '1');
		}
	}
	
	
	private function setDevice()
	{
		$detect = new Mobile_Detect();
		$mobile = $detect->isMobile() ? true : false;
		$tablet = $detect->isTablet() ? true : false;
		$desktop = !$mobile && !$tablet ? true : false;
		// if(preg_match('/Firefox/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
		// if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) $mobile = true;
		// if(preg_match('/Chrome/i', $_SERVER['HTTP_USER_AGENT'])) { $mobile = true; $tablet = true; }
		
		// set device
		if($mobile && !$tablet)
			$device = 'mobile';
		else if($tablet)
			$device = 'tablet';
		else if($desktop)
			$device = 'desktop';
		
		// set device path
		if($device == 'desktop' || $device == 'tablet')
			$devicePath = 'desktop';
		else if($device == 'mobile')
			$devicePath = 'mobile';
		
		
		self::$DEVICE			= $device;
		self::$DEVICE_FOLDER	= $devicePath.DS;
		self::$FOLDER			= 'pages'.DS;
	}
	
	
	public function init()
	{
		$this->path = Path::getInstance();
		
		$this->getConfig();
		$this->setAllLang();
		$this->setMultiLang();
		$this->setAltLang();
		$this->setLang();
		$this->checkLang();
		$this->setLinksLang();
	}
	
	
	private function getConfig()
	{
		// pages config
		if(!file_exists($this->path->file->pagesConfig))
			throw new ErrorException('Pages config file is missing!');
		
		$pages = file_get_contents($this->path->file->pagesConfig);
		$this->pages = json_decode($pages);
		
		
		// projects config
		$projectsConfig = $this->path->file->json . 'projects.json';
		if(!file_exists($projectsConfig))
			throw new ErrorException('Projects config file is missing!');
		
		$projects = file_get_contents($projectsConfig);
		$this->projects = json_decode($projects);
	}
	
	
	private function setAllLang()
	{
		self::$ALL_LANG = array();
		
		foreach($this->pages as $lang => $page)
			array_push(self::$ALL_LANG, $lang);
	}
	
	
	private function setMultiLang()
	{
		if(count(self::$ALL_LANG) == 1)
			self::$MULTI_LANG = false;
		else
			self::$MULTI_LANG = true;
	}
	
	
	private function setAltLang()
	{
		if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
			$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
			
			if($lang != 'fr' && $lang != 'en')
				self::$ALT_LANG = 'en';
			else
				self::$ALT_LANG = $lang;
		}
		else
			self::$ALT_LANG = 'en';
	}
	
	
	private function setLang()
	{
		$current = $this->path->url->current;
		$pageUrl = str_replace($this->path->url->base, '', $current);
		
		if(!Config::$MULTI_LANG || strlen($pageUrl) == 0)
			self::$LANG = self::$ALL_LANG[0];	
		else
			self::$LANG = substr($pageUrl, 0, 2);
	}
	
	
	private function checkLang()
	{
		if(!in_array(self::$LANG, self::$ALL_LANG))
			echo 'Show 404';
	}
	
	
	private function setLinksLang()
	{
		self::$LG_LINK		= self::$MULTI_LANG ? self::$LANG.'/' : '';
		self::$LG_LINK_ROOT	= self::$LANG == self::$ALL_LANG[0] ? '' : self::$LANG;
	}
	
	
	public function manageAjax($pageUrl)
	{
		if(strrpos($pageUrl, 'ajax-content/') !== false) {
			$pageUrl = str_replace('ajax-content/', '', $pageUrl);
			
			self::$IS_AJAX = true;
		}
		
		return $pageUrl;
	}
	
	
	public function manageAltContent($pageUrl)
	{
		if(strrpos($pageUrl, 'alt-content/') !== false) {
			$pageUrl = str_replace('alt-content/', '', $pageUrl);
			
			self::$IS_ALT_CONTENT	= true;
			self::$DEVICE_FOLDER	= 'alt'.DS;
			self::$FOLDER			= '';
		}
		
		return $pageUrl;
	}
	
}



?>