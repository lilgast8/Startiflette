<?php

$aAltUrl = array();
$viewName = $aPages[LG][$urlPart1]['file'];

foreach($aPages as $lgTemp => $infosAllPages) { // parse languages
	if($lgTemp != LG) { // if not current language
		
		foreach($infosAllPages as $pageUrl => $infosPage) { // parse page
			$infosPage = (object) $infosPage;
			
			if($infosPage->file == $viewName) { // if file match with view name
				$urlPageAlt = $urlPart1 == $rootUrlName ? '' : '/'.$pageUrl;
				$urlAlt = $lgTemp == $allLg[0] && $urlPart1 == $rootUrlName ? WEB_ROOT : WEB_ROOT.$lgTemp.$urlPageAlt;
				
				$aAltUrl[$lgTemp] = $urlAlt;
				
			//	echo '<link rel="alternate" href="'.$urlAlt.'" hreflang="'.$lgTemp.'" />'."\n\t";
			}
			
		}
		
	}
	
}

?>