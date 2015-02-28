<?php



class Path
{
	
	protected static $instance;
	
	const SITE_URL			= 'http://www.SITE-URL.com';
	
	public $url		= null;
	public $file	= null;
	
	
	protected function __construct()
	{
		$this->init();
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
	
	
	private function init()
	{
		$assets_folder		= Config::PROD ? 'assets' : 'src';
		
		
		// url path
		$this->url			= new stdClass();
		
		// $this->url->base	= str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);
		$this->url->base	= 'http://'.$_SERVER['HTTP_HOST'].str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);
		// $this->url->current	= $_SERVER['REQUEST_URI'];
		$this->url->current	= 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		$this->url->assets	= $this->url->base . $assets_folder.'/';
		$this->url->css		= $this->url->base .'assets/css/';
		$this->url->img		= $this->url->assets .'img/';
		$this->url->js		= $this->url->assets .'js/';
		$this->url->json	= $this->url->assets .'json/';
		
		
		// file path
		$this->file						= new stdClass();
		
		$this->file->base				= str_replace('index.php', '', $_SERVER['SCRIPT_FILENAME']);
		$this->file->php				= $this->file->base . 'php'.DS;
		$this->file->contents			= $this->file->php . 'contents'.DS;
		$this->file->views				= $this->file->php . 'views'.DS;
		$this->file->alt				= $this->file->views . 'alt'.DS;
		$this->file->desktop			= $this->file->views . 'desktop'.DS;
		$this->file->pagesDesktop		= $this->file->desktop . 'pages'.DS;
		$this->file->partialsDesktop	= $this->file->desktop . 'partials'.DS;
		$this->file->mobile				= $this->file->views . 'mobile'.DS;
		$this->file->pagesMobile		= $this->file->mobile . 'pages'.DS;
		$this->file->partialsMobile		= $this->file->mobile . 'partials'.DS;
		$this->file->assets				= $this->file->base . $assets_folder.DS;
		$this->file->js					= $this->file->assets . 'js'.DS;
		$this->file->jsFilesFile		= $this->file->base . $assets_folder.DS.'js'.DS.'js-files.json';
		$this->file->json				= $this->file->assets . 'json'.DS;
		$this->file->pagesConfig		= $this->file->json . 'pages.json';
	}
	
}



?>