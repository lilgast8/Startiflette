<?php



class Device
{
	
	protected static $instance;
	
	const BROWSERS_FILE_PATH		= 'configs/browsers.json';
	
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
	static $TARGETED_VERSION	= null;
	
	private $whichBrowser		= null;
	private $config				= null;
	
	private $params				= null;
	
	
	protected function __construct()
	{
		$this->whichBrowser = new WhichBrowser\Parser( getallheaders(), [ 'detectBots' => false ] );
		
		$this->getConfig();
		$this->setDevice();
		$this->setBrowser();
		$this->setTargetedVersion();
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
		$oldBrowser				= $this->getIsBrowserOld();
		self::$IS_OLD_BROWSER	= self::$IS_DESKTOP && $oldBrowser ? true : false;
		self::$IS_IE			= $this->whichBrowser->isBrowser( 'Internet Explorer' );
		self::$IS_EDGE			= $this->whichBrowser->isBrowser( 'Edge' );
	}
	
	
	private function getIsBrowserOld()
	{
		$devices		= $this->getBrowsersFile();
		
		$isBrowserOld	= false;
		
		foreach ( $devices as $browser => $version ) {
			if ( $this->whichBrowser->isBrowser( $browser, '<', $version ) )
				$isBrowserOld = true;
		}
		
		
		return $isBrowserOld;
	}
	
	
	private function getBrowsersFile()
	{
		if ( !file_exists( self::BROWSERS_FILE_PATH ) )
			throw new ErrorException( 'Browser file is missing! "' . self::BROWSERS_FILE_PATH . '" not found' );
		
		$browsers = file_get_contents( self::BROWSERS_FILE_PATH );
		$browsers = json_decode( $browsers );
		
		
		return $browsers;
	}
	
	
	private function setTargetedVersion()
	{
		if ( !self::$HAS_MOBILE_VERSION ||
			 self::$HAS_MOBILE_VERSION && self::$IS_DESKTOP ||
			 self::$HAS_MOBILE_VERSION && self::$IS_TABLET && self::$TABLET_VERSION == 'desktop' )
			self::$TARGETED_VERSION = 'desktop';
		
		else if ( self::$HAS_MOBILE_VERSION && self::$IS_MOBILE ||
				  self::$HAS_MOBILE_VERSION && self::$IS_TABLET && self::$TABLET_VERSION == 'mobile' )
			self::$TARGETED_VERSION = 'mobile';
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