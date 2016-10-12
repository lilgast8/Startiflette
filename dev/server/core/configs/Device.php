<?php



class Device
{
	
	protected static $instance;
	
	static $HAS_MOBILE_VERSION	= null;
	static $TABLET_VERSION		= null;
	static $FORCE_DEVICE		= null;
	
	static $DEVICE				= null;
	static $IS_DESKTOP			= null;
	static $IS_TABLET			= null;
	static $IS_MOBILE			= null;
	static $BROWSER				= null;
	static $BROWSER_VERSION		= null;
	static $BROWSER_ENGINE		= null;
	static $IS_OLD_BROWSER		= null;
	static $IS_IE				= null;
	static $IS_EDGE				= null;
	
	private $whichBrowser		= null;
	private $config				= null;
	
	private $params				= null;
	
	
	protected function __construct()
	{
		$this->whichBrowser = new WhichBrowser\Parser( getallheaders(), [ 'detectBots' => false ] );
		
		$this->getConfig();
		$this->setDevice();
		$this->setBrowser();
		
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
		self::$TABLET_VERSION		= Config::$TABLET_VERSION;
		self::$FORCE_DEVICE			= Config::$FORCE_DEVICE;
	}
	
	
	private function setDevice()
	{
		$mobile		= $this->whichBrowser->isType( 'mobile' ) ? true : false; // mobile device: phones or tablets
		$tablet		= $this->whichBrowser->isType( 'tablet' ) ? true : false; // tablet device
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
	
	
	private function setBrowser()
	{
		self::$BROWSER			= $this->whichBrowser->browser->name;
		self::$BROWSER_VERSION	= $this->whichBrowser->browser->getVersion();
		self::$BROWSER_ENGINE	= $this->whichBrowser->engine->getName();
		
		if ( $this->whichBrowser->isBrowser( 'Internet Explorer', '<', '9' ) ||
			 $this->whichBrowser->isBrowser( 'Firefox', '<', '35' ) ||
			 $this->whichBrowser->isBrowser( 'Opera', '<', '30' ) ||
			 $this->whichBrowser->isBrowser( 'Safari', '<', '6' ) ||
			 $this->whichBrowser->isBrowser( 'Chrome', '<', '30' ) )
			self::$IS_OLD_BROWSER = true;
		else
			self::$IS_OLD_BROWSER = false;
		
		self::$IS_IE	= $this->whichBrowser->isBrowser( 'Internet Explorer' );
		self::$IS_EDGE	= $this->whichBrowser->isBrowser( 'Edge' );
	}
	
	
	private function setParams()
	{
		$this->params = new stdClass();
		
		$this->params->HAS_MOBILE_VERSION	= self::$HAS_MOBILE_VERSION;
		$this->params->TABLET_VERSION		= self::$TABLET_VERSION;
		$this->params->FORCE_DEVICE			= self::$FORCE_DEVICE;
		
		$this->params->DEVICE				= self::$DEVICE;
		$this->params->IS_DESKTOP			= self::$IS_DESKTOP;
		$this->params->IS_TABLET			= self::$IS_TABLET;
		$this->params->IS_MOBILE			= self::$IS_MOBILE;
		$this->params->BROWSER				= self::$BROWSER;
		$this->params->BROWSER_VERSION		= self::$BROWSER_VERSION;
		$this->params->BROWSER_ENGINE		= self::$BROWSER_ENGINE;
		$this->params->IS_OLD_BROWSER		= self::$IS_OLD_BROWSER;
		$this->params->IS_IE				= self::$IS_IE;
		$this->params->IS_EDGE				= self::$IS_EDGE;
	}
	
	
	public function getParams()
	{
		return $this->params;
	}
	
}



?>