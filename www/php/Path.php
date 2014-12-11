<?php



class Path
{
	
	protected static $instance;
	
	public $url = null;
	public $file = null;
	
	
	function __construct()
	{
		$this->set();
	}
	
	
	public static function getInstance()
	{
		if(!isset(self::$instance)) {
			self::$instance = new self;
		}
		
		return self::$instance;
	}
	
	
	private function set()
	{
		// url path
		$asset_folder		= Main::PROD ? 'assets' : 'src';
		
		$this->url			= new stdClass();
		
		$this->url->base	= str_replace('index.php', '', $_SERVER['SCRIPT_NAME']);
		$this->url->current	= $_SERVER['REQUEST_URI'];
		
		$this->url->asset	= $this->url->base . $asset_folder.'/';
		
		
		// file path
		$script_filename				= $_SERVER['SCRIPT_FILENAME'];
		
		$this->file						= new stdClass();
		
		$this->file->base				= str_replace('index.php', '', $script_filename);
		$this->file->php				= $this->file->base . 'php'.DS;
		$this->file->views				= $this->file->php . 'views'.DS;
		$this->file->alt				= $this->file->views . 'alt'.DS;
		$this->file->desktop			= $this->file->views . 'desktop'.DS;
		$this->file->pagesDesktop		= $this->file->desktop . 'pages'.DS;
		$this->file->partialsDesktop	= $this->file->desktop . 'partials'.DS;
		$this->file->mobile				= $this->file->views . 'mobile'.DS;
		$this->file->pagesMobile		= $this->file->mobile . 'pages'.DS;
		$this->file->partialsMobile		= $this->file->mobile . 'partials'.DS;
	}
	
}



?>