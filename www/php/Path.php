<?php



class Path
{
	
	protected static $instance;
	
	const SITE_URL			= 'http://www.SITE-URL.com';
	
	public $url		= null;
	public $file	= null;
	
	
	protected function __construct()
	{
		$this->set();
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
	
	
	private function set()
	{
		$assets_folder		= Main::PROD ? 'assets' : 'src';
		$script_filename	= $_SERVER['SCRIPT_FILENAME'];
		
		
		// url path
		$this->url			= new stdClass();
		
		$this->url->base	= str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);
		$this->url->current	= $_SERVER['REQUEST_URI'];
		$this->url->assets	= $this->url->base . $assets_folder.'/';
		
		
		// file path
		$this->file						= new stdClass();
		
		$this->file->base				= str_replace('index.php', '', $script_filename);
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
		$this->file->json				= $this->file->assets . 'json'.DS;
		$this->file->pagesConfig		= $this->file->json . 'pages.json';
		
		// files config path
		// $this->config			= new stdClass();
		// $this->config->pages	= $this->file->json . 'pages.json';
	}
	
}



?>