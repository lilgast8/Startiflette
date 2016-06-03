<?php



class Lang
{
	
	protected static $instance;
	
	static $ALL_LANG		= null;
	static $MULTI_LANG		= null;
	static $DEFAULT_LANG	= null;
	static $LANG			= null;
	static $LANG_EXIST		= null;
	
	static $LANG_LINK_ROOT	= null;
	static $LANG_LINK		= null;
	
	private $router			= null;
	private $path			= null;
	
	private $params			= null;
	
	
	protected function __construct()
	{
		$this->router	= Router::getInstance();
		$this->path		= Path::getInstance();
		
		$this->setGlobalInfos();
		$this->router->setUrl();
		$this->setCurrentLang();
		$this->checkDefaultLang();
		$this->router->setPageUrl();
		$this->setLangLinks();
		
		$this->path->setFileLangVar();
		
		$this->setParams();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setGlobalInfos()
	{
		// all lang
		self::$ALL_LANG = Config::$ALL_LANG;
		
		// default lang
		self::$DEFAULT_LANG = self::$ALL_LANG[0];
		
		// multi-lang
		if ( count( self::$ALL_LANG ) == 1 )
			self::$MULTI_LANG = false;
		else
			self::$MULTI_LANG = true;
	}
	
	
	private function setCurrentLang()
	{
		if ( !self::$MULTI_LANG || strlen( Router::$URL->path ) == 0 )
			self::$LANG = self::$DEFAULT_LANG;
		else
			self::$LANG = Router::$URL->pathParams[0];
	}
	
	
	private function checkDefaultLang()
	{
		self::$LANG_EXIST = true;
		
		if ( !in_array( self::$LANG, self::$ALL_LANG ) ) {
			$this->forceDefaultLang();
			
			self::$LANG_EXIST = false;
		}
	}
	
	
	private function forceDefaultLang()
	{
		self::$LANG = self::$DEFAULT_LANG;
	}
	
	
	private function setLangLinks()
	{
		self::$LANG_LINK_ROOT	= self::$LANG == self::$DEFAULT_LANG ? '' : self::$LANG;
		self::$LANG_LINK		= self::$MULTI_LANG ? self::$LANG . '/' : '';
	}
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->ALL_LANG			= self::$ALL_LANG;
		$this->params->MULTI_LANG		= self::$MULTI_LANG;
		$this->params->DEFAULT_LANG		= self::$DEFAULT_LANG;
		$this->params->LANG				= self::$LANG;
		
		$this->params->LANG_LINK_ROOT	= self::$LANG_LINK_ROOT;
		$this->params->LANG_LINK		= self::$LANG_LINK;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
}



?>