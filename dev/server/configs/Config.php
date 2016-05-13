<?php



class Config
{
	
	protected static $instance;
	
	const CONFIG_FILE_PATH		= 'configs/config/config.json';
	
	static $ENV					= null;
	static $ENVS				= null;
	static $ROUTES_FILES		= null;
	static $ALL_LANG			= null;
	static $HAS_LANG_LANDING	= null;
	static $HAS_MOBILE_VERSION	= null;
	static $FORCE_DEVICE		= null;
	static $GA_ID				= null;
	static $CREDITS				= null;
	
	static $DEVICE				= null;
	static $IS_DESKTOP			= null;
	static $IS_TABLET			= null;
	static $IS_MOBILE			= null;
	static $IS_OLD_BROWSER		= null;
	
	private $jsFiles			= null;
	private $params				= null;
	
	
	protected function __construct()
	{
		$this->setConfig();
		$this->setDevice();
		$this->setOldBrowser();
		
		$this->setParams();
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
		
		
		self::$IS_DESKTOP	= self::$DEVICE == 'desktop';
		self::$IS_TABLET	= self::$DEVICE == 'tablet';
		self::$IS_MOBILE	= self::$DEVICE == 'mobile';
	}
	
	
	private function setOldBrowser()
	{
		$whichBrowser = new WhichBrowser\Parser( getallheaders() );
		
		// echo $whichBrowser->browser->name . ' — ' . $whichBrowser->browser->version->value.'<br>';
		
		if ( $whichBrowser->isBrowser( 'Internet Explorer', '<', '9' ) ||
			 $whichBrowser->isBrowser( 'Firefox', '<', '35' ) ||
			 $whichBrowser->isBrowser( 'Opera', '<', '30' ) ||
			 $whichBrowser->isBrowser( 'Safari', '<', '6' ) ||
			 $whichBrowser->isBrowser( 'Chrome', '<', '30' ) )
			self::$IS_OLD_BROWSER = true;
		else
			self::$IS_OLD_BROWSER = false;
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
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->ENV					= self::$ENV;
		$this->params->ENVS					= self::$ENVS;
		$this->params->ROUTES_FILES			= self::$ROUTES_FILES;
		$this->params->ALL_LANG				= self::$ALL_LANG;
		$this->params->HAS_LANG_LANDING		= self::$HAS_LANG_LANDING;
		$this->params->HAS_MOBILE_VERSION	= self::$HAS_MOBILE_VERSION;
		$this->params->FORCE_DEVICE			= self::$FORCE_DEVICE;
		$this->params->GA_ID				= self::$GA_ID;
		$this->params->CREDITS				= self::$CREDITS;
		
		$this->params->DEVICE				= self::$DEVICE;
		$this->params->IS_DESKTOP			= self::$IS_DESKTOP;
		$this->params->IS_TABLET			= self::$IS_TABLET;
		$this->params->IS_MOBILE			= self::$IS_MOBILE;
		$this->params->IS_OLD_BROWSER		= self::$IS_OLD_BROWSER;
		
		
		$this->params = json_decode( json_encode( $this->params ), true );
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
}



?>