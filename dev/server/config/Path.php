<?php



class Path
{
	
	protected static $instance;
	
	static $URL		= null;
	
	
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
		$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? 'https://' : 'http://';
		
		
		self::$URL			= new stdClass();
		
		self::$URL->base	= Config::$BASE_URL_DEV;
		self::$URL->current	= $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		self::$URL->assets	= self::$URL->base . 'assets/';
		self::$URL->css		= self::$URL->assets . 'css/';
		self::$URL->img		= self::$URL->assets . 'img/';
		self::$URL->js		= self::$URL->assets . 'js/';
		self::$URL->json	= self::$URL->assets . 'json/';
		self::$URL->server	= self::$URL->base . 'server/';
		
		echo self::$URL->current.'<br><br>';
		echo '<b>faire une currentUrlShorten ? :</b> <br>'.str_replace(Path::$URL->base, '', self::$URL->current);
	}
	
}



?>