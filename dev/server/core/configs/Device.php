<?php



class Device
{
	
	protected static $instance;
	
	static $HAS_MOBILE_VERSION	= null;
	static $FORCE_DEVICE		= null;
	
	static $DEVICE				= null;
	static $IS_DESKTOP			= null;
	static $IS_TABLET			= null;
	static $IS_MOBILE			= null;
	static $VERSION				= null;
	static $IS_OLD_BROWSER		= null;
	
	private $config				= null;
	
	private $params				= null;
	
	
	protected function __construct()
	{
		$this->getConfig();
		$this->setDevice();
		$this->setVersion();
		$this->setOldBrowser();
		
		$this->config = Config::getInstance();
		$this->config->init();
		
		$this->setParams();
	}
	
	
	public static function getInstance()
	{
		if ( !isset( self::$instance ) )
			self::$instance = new self;
		
		return self::$instance;
	}
	
	
	private function getConfig()
	{
		self::$HAS_MOBILE_VERSION	= Config::$HAS_MOBILE_VERSION;
		self::$FORCE_DEVICE			= Config::$FORCE_DEVICE;
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
	
	
	private function setVersion()
	{
		if ( !Device::$HAS_MOBILE_VERSION )
			self::$VERSION = 'desktop';
		else if ( Device::$HAS_MOBILE_VERSION && ( Device::$IS_DESKTOP || Device::$IS_TABLET ) )
			self::$VERSION = 'desktop';
		else if ( Device::$HAS_MOBILE_VERSION && Device::$DEVICE == 'mobile' )
			self::$VERSION = 'mobile';
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
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->HAS_MOBILE_VERSION	= self::$HAS_MOBILE_VERSION;
		$this->params->FORCE_DEVICE			= self::$FORCE_DEVICE;
		
		$this->params->DEVICE				= self::$DEVICE;
		$this->params->IS_DESKTOP			= self::$IS_DESKTOP;
		$this->params->IS_TABLET			= self::$IS_TABLET;
		$this->params->IS_MOBILE			= self::$IS_MOBILE;
		$this->params->IS_OLD_BROWSER		= self::$IS_OLD_BROWSER;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
}



?>