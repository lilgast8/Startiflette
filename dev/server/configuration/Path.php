<?php



class Path
{
	
	protected static $instance;
	
	static $URL			= null;
	static $FILE		= null;
	static $PAGE_URL	= null;
	
	
	protected function __construct()
	{
		$this->init();
	}
	
	
	public static function getInstance()
	{
		if (!isset(self::$instance))
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	private function init()
	{
		// url paths
		self::$URL			= new stdClass();
		
		self::$URL->base	= Config::$BASE_URL_DEV;
		self::$URL->assets	= self::$URL->base . 'assets/';
		self::$URL->css		= self::$URL->assets . 'css/';
		self::$URL->img		= self::$URL->assets . 'img/';
		self::$URL->js		= self::$URL->assets . 'js/';
		self::$URL->json	= self::$URL->assets . 'json/';
		self::$URL->routes	= self::$URL->json . 'routes/';
		self::$URL->server	= self::$URL->base . 'server/';
		
		
		// file paths
		self::$FILE			= new stdClass();
		
		self::$FILE->assets	= 'assets/';
		self::$FILE->css	= self::$FILE->assets . 'css/';
		self::$FILE->img	= self::$FILE->assets . 'img/';
		self::$FILE->js		= self::$FILE->assets . 'js/';
		self::$FILE->json	= self::$FILE->assets . 'json/';
		self::$FILE->routes	= self::$FILE->json . 'routes/';
		self::$FILE->server	= 'server/';
		
		
		// page url paths
		self::$PAGE_URL					= new stdClass();
		
		self::$PAGE_URL->fullCurrent	= $this->getFullCurrentUrl();
		self::$PAGE_URL->current		= $this->getCurrentUrl();
		self::$PAGE_URL->paramsCurrent	= explode('/', self::$PAGE_URL->current);
	}
	
	
	private function getFullCurrentUrl()
	{
		$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? 'https://' : 'http://';
		
		return $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	}
	
	
	private function getCurrentUrl()
	{
		$currentUrl = str_replace(Path::$URL->base, '', Path::$PAGE_URL->fullCurrent);
		
		if (substr($currentUrl, 0, 1) == '/') // if / is first character, remove it
			$currentUrl = substr($currentUrl, 1);
		
		if (substr($currentUrl, -1, 1) == '/') // if / is last character, remove it
			$currentUrl = substr($currentUrl, 0, -1);
		
		// remove ?params
		$aCurrentUrl = explode('?', $currentUrl);
		$currentUrl = $aCurrentUrl[0];
		
		
		return $currentUrl;
	}
	
}



?>