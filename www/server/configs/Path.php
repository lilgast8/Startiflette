<?php



class Path
{
	
	protected static $instance;
	
	static $URL			= null;
	static $FILE		= null;
	
	private $deviceDir	= null;
	
	
	protected function __construct()
	{
		$this->config = Config::getInstance();
		
		$this->setDeviceDir();
		$this->setPaths();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	private function setDeviceDir()
	{
		if ( !Config::$HAS_MOBILE_VERSION )
			$this->deviceDir = 'desktop/';
		else if ( Config::$HAS_MOBILE_VERSION && ( Config::$DEVICE == 'desktop' || Config::$DEVICE == 'tablet' ) )
			$this->deviceDir = 'desktop/';
		else if ( Config::$HAS_MOBILE_VERSION && Config::$DEVICE == 'mobile' )
			$this->deviceDir = 'mobile/';
	}
	
	
	private function setPaths()
	{
		// url paths
		self::$URL			= new stdClass();
		
		self::$URL->base	= Config::$ENVS->{ Config::$ENV }->base_url;
		self::$URL->assets	= self::$URL->base		. 'assets/';
		self::$URL->css		= self::$URL->assets	. 'css/';
		self::$URL->img		= self::$URL->assets	. 'img/';
		self::$URL->js		= self::$URL->assets	. 'js/';
		self::$URL->json	= self::$URL->assets	. 'json/';
		self::$URL->routes	= self::$URL->json		. 'routes/';
		self::$URL->configs	= self::$URL->base		. 'configs/';
		self::$URL->server	= self::$URL->base		. 'server/';
		
		
		// file paths
		self::$FILE					= new stdClass();
		
		self::$FILE->assets			= 'assets/';
		self::$FILE->css			= self::$FILE->assets	. 'css/';
		self::$FILE->img			= self::$FILE->assets	. 'img/';
		self::$FILE->js				= self::$FILE->assets	. 'js/';
		self::$FILE->json			= self::$FILE->assets	. 'json/';
		self::$FILE->configs		= 'configs/';
		self::$FILE->jsFilesFile	= self::$FILE->configs	. 'config/js-files.json';
		self::$FILE->contentsFile	= self::$FILE->configs	. 'config/contents.json';
		self::$FILE->routes			= self::$FILE->configs	. 'routes/';
		self::$FILE->server			= 'server/';
		self::$FILE->shared			= self::$FILE->server	. 'shared/';
		self::$FILE->contents		= self::$FILE->server	. 'contents/';
		self::$FILE->views			= self::$FILE->server	. 'views/';
		self::$FILE->viewsPage		= self::$FILE->views	. $this->deviceDir . 'pages/';
		self::$FILE->viewsPartials	= self::$FILE->views	. $this->deviceDir . 'partials/';
		self::$FILE->viewsAlt		= self::$FILE->views	. 'alt/';
	}
	
	
	public function getAltLangUrlMeta()
	{
		if ( !Lang::$MULTI_LANG || !Router::$ALT_LANG_URL )
			return false;
		
		
		$altLangUrlList = '';
		
		foreach ( Router::$ALT_LANG_URL as $lang => $altLangUrl )
			$altLangUrlList .= '<link rel="alternate" href="' . $altLangUrl . '" hreflang="' . $lang . '" />' . "\n\t";
		
		
		return $altLangUrlList;
	}
	
	
	public function getJsFilesUrl( $listName )
	{
		$jsFiles	= $this->config->getJsFilesFile();
		$listFiles	= '';
		
		if ( Config::$ENV == 'dev' ) {
			$files = $jsFiles->$listName->files;
			
			foreach ( $files as $filePath ) {
				
				if ( is_array( $filePath ) ) {
					$listFiles .= '<!--[if lt IE 9]><script src="' . self::$URL->js . $filePath[1] . '"></script><![endif]-->' . "\n";
					$listFiles .= '<!--[if (gte IE 9) | !(IE)]><!--><script src="' . self::$URL->js . $filePath[0] . '"></script><!--<![endif]-->' . "\n";
				}
				else
					$listFiles .= '<script src="' . self::$URL->js . $filePath . '"></script>' . "\n";
			}
		}
		else {
			$fileName	= $jsFiles->$listName->name;
			$fileDest	= $jsFiles->$listName->dest;
			
			if ( is_array( $fileName ) ) {
					$listFiles .= '<!--[if lt IE 9]><script src="' . self::$URL->js . $fileName[1] . '"></script><![endif]-->' . "\n";
					$listFiles .= '<!--[if (gte IE 9) | !(IE)]><!--><script src="' . self::$URL->js . $fileName[0] . '"></script><!--<![endif]-->' . "\n";
				}
				else
					$listFiles .= '<script src="' . self::$URL->js . $fileDest . $fileName . '"></script>' . "\n";
		}
		
		
		return $listFiles;
	}
	
}



?>