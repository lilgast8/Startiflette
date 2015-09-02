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
		// Path::getInstance();
		
		$this->setGlobalInfos();
		$this->setCurrentLang();
		// $this->checkCurrentLang();
		$this->setLinksLang();
	}
	
	
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
	
	
	private function setCurrentLang()
	{
		if (!self::$MULTI_LANG || strlen(Path::$PAGE_URL->current) == 0)
			self::$LANG = self::$DEFAULT_LANG;
		else
			self::$LANG = Path::$PAGE_URL->paramsCurrent[0];
	}
	
	
	/* À METTRE DANS LE ROUTES CONTROLLER */
	/*private function checkCurrentLang()
	{
		if (!in_array(self::$LANG, self::$ALL_LANG)) {
			self::$LANG		= self::$DEFAULT_LANG;
			
			header("Status: 404 NOT FOUND", false, 404);
			
			// self::$IS_404	= true;
			
			echo 'Show 404 - Language not available';
		}
	}*/
	
	
	private function setLinksLang()
	{
		self::$LANG_LINK		= self::$MULTI_LANG ? self::$LANG.'/' : '';
		self::$LANG_LINK_ROOT	= self::$LANG == self::$DEFAULT_LANG ? '' : self::$LANG;
	}
	
}



?>