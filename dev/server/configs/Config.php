<?php



class Config
{
	
	protected static $instance;
	
	const CONFIG_FILE_PATH		= 'assets/json/config/config.json';
	
	static $ENV					= null;
	static $LOCALHOST			= null;
	static $BASE_URL_DEV		= null;
	static $BASE_URL_PREPROD	= null;
	static $BASE_URL_PROD		= null;
	static $BASE_URL_PROD_ALT	= null;
	static $ROUTES_FILES		= null;
	static $ALL_LANG			= null;
	static $HAS_LANG_LANDING	= null;
	static $HAS_MOBILE_VERSION	= null;
	static $FORCE_DEVICE		= null;
	static $HAS_AJAX			= null;
	static $GA_ID				= null;
	
	static $DEVICE				= null;
	
	private $jsFiles			= null;
	
	
	protected function __construct()
	{
		$this->setConfig();
		$this->setDevice();
	}
	
	
	protected function __clone()
	{
		
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function setConfig()
	{
		$config = $this->getConfigFile();
		
		foreach ( $config as $varName => $value )
			self::${ $varName } = $value;
	}
	
	
	private function getConfigFile()
	{
		if ( !file_exists( self::CONFIG_FILE_PATH ) )
			throw new ErrorException( 'Config file is missing!' );
		
		$config	= file_get_contents( self::CONFIG_FILE_PATH );
		$config	= json_decode( $config );
		
		return $config;
	}
	
	
	private function setDevice()
	{
		$detect		= new Mobile_Detect();
		$mobile		= $detect->isMobile() ? true : false; // mobile device: phones or tablets
		$tablet		= $detect->isTablet() ? true : false; // tablet device
		$desktop	= !$mobile && !$tablet ? true : false; // desktop device
		
		
		if ( self::$FORCE_DEVICE )
			self::$DEVICE = self::$FORCE_DEVICE;
		else if ( $mobile && !$tablet )
			self::$DEVICE = 'mobile';
		else if ( $tablet )
			self::$DEVICE = 'tablet';
		else if ( $desktop )
			self::$DEVICE = 'desktop';
	}
	
	
	public function getJsFilesFile()
	{
		if ( !$this->jsFiles ) { // load file if it wasn't already done
			if ( !file_exists( Path::$FILE->jsFilesFile ) )
				throw new ErrorException( 'JsFilesFile is missing!' );
			
			$this->jsFiles	= file_get_contents( Path::$FILE->jsFilesFile );
			$this->jsFiles	= json_decode( $this->jsFiles );
		}
		
		
		return $this->jsFiles;
	}
	
}



?>