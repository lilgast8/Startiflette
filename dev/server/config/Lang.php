<?php



class Lang
{
	
	protected static $instance;
	
	// const CONFIG_FILE_PATH = 'src/json/config/config.json';
	/*const PROD				= false;
	// const PROD				= true;
	const DEFAULT_LANG		= 'fr';
	const GA_ID				= 'UA-XXXXXXXX-XX';*/
	
	static $ALL_LANG	= null;
	static $MULTI_LANG	= null;
	static $LANG		= null;
	
	
	protected function __construct()
	{
		echo 'Lang <br>';
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
		$this->path = Path::getInstance();
		
		// $this->getConfig();
		$this->setAllLang();
		$this->setMultiLang();
		// $this->setAltLang();
		// $this->setLang();
		// $this->checkLang();
		// $this->setLinksLang();
	}
	
	
	private function setAllLang()
	{
		self::$ALL_LANG = Config::$ALL_LANG;
		
		echo '<pre>';
		var_dump(self::$ALL_LANG);
		echo '</pre>';
	}
	
	
	private function setMultiLang()
	{
		if (count(self::$ALL_LANG) == 1)
			self::$MULTI_LANG = false;
		else
			self::$MULTI_LANG = true;
	}
	
	
	/*private function setAltLang()
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
	}*/
	
	
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
	}
	
}



?>