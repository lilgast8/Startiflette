<?php



class Lang
{
	
	protected static $instance;
	
	static $ALL_LANG		= null;
	static $MULTI_LANG		= null;
	static $DEFAULT_LANG	= null;
	static $LANG			= null;
	
	static $LANG_LINK		= null;
	static $LANG_LINK_ROOT	= null;
	
	
	protected function __construct()
	{
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
		
		$this->setGlobalInfos();
		
		// $this->setAllLang();
		// $this->setDefaultLang();
		// $this->setMultiLang();
		
		// $this->getLang();
		
		// $this->setAltLang();
		$this->setCurrentLang();
		$this->checkCurrentLang();
		$this->setLinksLang();
	}
	
	
	// private function getLang()
	// {
	// 	self::$ALL_LANG = Config::$ALL_LANG;
		
	// 	echo '<pre>';
	// 	var_dump(self::$ALL_LANG);
	// 	echo '</pre>';
	// }
	
	
	private function setGlobalInfos()
	{
		// all lang
		self::$ALL_LANG = Config::$ALL_LANG;
		
		// default lang
		self::$DEFAULT_LANG = self::$ALL_LANG[0];
		
		
		// multi-lang
		if (count(self::$ALL_LANG) == 1)
			self::$MULTI_LANG = false;
		else
			self::$MULTI_LANG = true;
	}
	
	
	/*private function setDefaultLang()
	{
		self::$DEFAULT_LANG = self::$ALL_LANG[0];
	}
	
	
	private function setMultiLang()
	{
		if (count(self::$ALL_LANG) == 1)
			self::$MULTI_LANG = false;
		else
			self::$MULTI_LANG = true;
	}*/
	
	
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
	
	
	private function setCurrentLang()
	{
		$currentUrl = Path::$URL->current;
		$currentUrl = str_replace(Path::$URL->base, '', $currentUrl);
		
		if (substr($currentUrl, 0, 1) == '/') // if / is first character, remove it
			$currentUrl = substr($currentUrl, 1);
		
		if (substr($currentUrl, -1, 1) == '/') // if / is last character, remove it
			$currentUrl = substr($currentUrl, 0, -1);
		
		$aCurrentUrl = explode('/', $currentUrl);
		
		
		if (!self::$MULTI_LANG || strlen($currentUrl) == 0)
			self::$LANG = self::$DEFAULT_LANG;
		else
			self::$LANG = $aCurrentUrl[0];
	}
	
	
	private function checkCurrentLang()
	{
		if (!in_array(self::$LANG, self::$ALL_LANG)) {
			self::$LANG		= self::$DEFAULT_LANG;
			
			header("Status: 404 NOT FOUND", false, 404);
			
			// self::$IS_404	= true;
			
			echo 'Show 404 - Language not available';
		}
	}
	
	
	private function setLinksLang()
	{
		self::$LANG_LINK		= self::$MULTI_LANG ? self::$LANG.'/' : '';
		self::$LANG_LINK_ROOT	= self::$LANG == self::$DEFAULT_LANG ? '' : self::$LANG;
	}
	
}



?>