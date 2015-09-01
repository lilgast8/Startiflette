<?php



class Config
{
	
	protected static $instance;
	
	const CONFIG_FILE_PATH		= 'assets/json/config/config.json';
	
	static $ENV					= null;
	static $LOCALHOST			= null;
	static $BASE_URL_DEV		= null;
	static $BASE_URL_PREPROD	= null;
	static $BASE_URL_PROD		= null;
	static $BASE_URL_PROD_ALT	= null;
	static $ROUTES_FILES		= null;
	static $ALL_LANG			= null;
	static $HAS_LANG_LANDING	= null;
	static $HAS_MOBILE_VERSION	= null;
	static $FORCE_DEVICE		= null;
	static $HAS_AJAX			= null;
	static $GA_ID				= null;
	
	static $DEVICE				= null;
	static $DEVICE_FOLDER		= null;
	
	/*
	static $LG_LINK			= null;
	static $LG_LINK_ROOT	= null;
	
	static $IS_AJAX			= false;
	static $IS_ALT_CONTENT	= false;
	
	private $path			= null;
	
	public $pages			= null;
	public $projects		= null;
	*/
	
	
	protected function __construct()
	{
		/*$this->getConfig();
		$this->setEnv();
		$this->setErrors();
		$this->setDevice();*/
		
		$this->init();
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
	
	
	private function init()
	{
		$this->getConfig();
		$this->setConfig();
		// $this->setEnv();
		$this->setDevice();
	}
	
	
	private function getConfig()
	{
		if ( !file_exists(self::CONFIG_FILE_PATH) )
			throw new ErrorException('Config file is missing!');
		
		$config			= file_get_contents(self::CONFIG_FILE_PATH);
		$this->config	= json_decode($config);
		
		// echo '<pre>';
		// var_dump($this->config);
		// echo '</pre>';
	}
	
	
	private function setConfig()
	{
		foreach ($this->config as $key => $value)
			self::${$key} = $value;
		
		// echo '<pre>';
		// var_dump($this);
		// echo '</pre>';
	}
	
	
	/*private function setEnv()
	{
		self::$ENV			= $this->config->ENV;
		
		self::$LOCALHOST	= $this->config->LOCALHOST;
	}*/
	
	
	private function setDevice()
	{
		
		self::$HAS_MOBILE_VERSION	= $this->config->HAS_MOBILE_VERSION;
		self::$FORCE_DEVICE			= $this->config->FORCE_DEVICE;
		
		
		$detect		= new Mobile_Detect();
		$mobile		= $detect->isMobile() ? true : false; // mobile device: phones or tablets
		$tablet		= $detect->isTablet() ? true : false; // tablet device
		$desktop	= !$mobile && !$tablet ? true : false; // desktop device
		
		
		// set device
		if (self::$FORCE_DEVICE)
			$device = self::$FORCE_DEVICE;
		else if ($mobile && !$tablet)
			$device = 'mobile';
		else if ($tablet)
			$device = 'tablet';
		else if ($desktop)
			$device = 'desktop';
		
		
		// set device folder
		if (!self::$HAS_MOBILE_VERSION)
			$deviceFolder = 'desktop';
		else if (self::$HAS_MOBILE_VERSION && ($device == 'desktop' || $device == 'tablet'))
			$deviceFolder = 'desktop';
		else if (self::$HAS_MOBILE_VERSION && $device == 'mobile')
			$deviceFolder = 'mobile';
		
		
		self::$DEVICE			= $device;
		self::$DEVICE_FOLDER	= $deviceFolder . '/';
	}
	
	
	/*public function init()
	{
		$this->path = Path::getInstance();
		
		$this->getConfig();
		$this->setAllLang();
		$this->setMultiLang();
		$this->setAltLang();
		$this->setLang();
		$this->checkLang();
		$this->setLinksLang();
	}*/
	
	
	/*private function getConfig()
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
	}*/
	
	
	/*private function setAllLang()
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
			self::$LANG = self::DEFAULT_LANG;
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
		self::$LG_LINK_ROOT	= self::$LANG == self::DEFAULT_LANG ? '' : self::$LANG;
	}*/
	
	
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
	
	
	public function listJsFiles($listName)
	{
		$listFiles = '';
		
		$jsonJsFiles	= file_get_contents($this->path->file->jsFilesFile);
		$jsFiles		= json_decode($jsonJsFiles, true);
		
		if (!self::PROD) {
			$files = $jsFiles[ $listName ]['files'];
			
			for ($i = 0; $i < count($files); $i++) {
				if (is_array($files[$i])) {
					$listFiles .= '<!--[if lt IE 9]><script src="' . $this->path->url->js . $files[$i][1] . '"></script><![endif]-->' . "\n";
					$listFiles .= '<!--[if (gte IE 9) | !(IE)]><!--><script src="' . $this->path->url->js . $files[$i][0] . '"></script><!--<![endif]-->' . "\n";
				}
				else
					$listFiles .= '<script src="' . $this->path->url->js . $files[$i] . '"></script>' . "\n";
			}
		}
		else {
			$files	= $jsFiles[ $listName ]['name'];
			$dest	= $jsFiles[ $listName ]['dest'];
			
			if ( is_array( $files ) ) {
					$listFiles .= '<!--[if lt IE 9]><script src="' . $this->path->url->js . $files[1] . '"></script><![endif]-->' . "\n";
					$listFiles .= '<!--[if (gte IE 9) | !(IE)]><!--><script src="' . $this->path->url->js . $files[0] . '"></script><!--<![endif]-->' . "\n";
				}
				else
					$listFiles .= '<script src="' . $this->path->url->js . $dest . $files . '"></script>' . "\n";
		}
		
		
		return $listFiles;
	}
	
}



?>