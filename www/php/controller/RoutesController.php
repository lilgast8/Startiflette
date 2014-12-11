<?php



/* -------- Init -------- */
include_once('../../init.php');



/* -------- Texts -------- */
// include_once(SITE_ROOT.'php/contents/'.LG.'/texts.php');



/* -------- Load JSON -------- */
// include_once(SITE_ROOT.'php/functions/load-pages-infos.php');





echo '- routes controller -'. '<br><br><br><br><br>';


// echo WEB_ROOT.'<br>';
// echo $_SERVER['REQUEST_URI'].'<br>';



$ramon = WEB_ROOT;
$url = $_SERVER['REQUEST_URI'];


$endBaseUrl = strrpos($url, WEB_ROOT) + strlen(WEB_ROOT);
$endUrl = strrpos($url, '?') ? strrpos($url, '?') : strlen($url);
$urlLength = $endUrl-$endBaseUrl;

// echo 'end base url : '.$endBaseUrl.'<br>';
// echo 'end url : '.$endUrl.'<br>';
// echo $urlLength.'<br>';


// set page url
$pageUrl = substr($url, $endBaseUrl, $urlLength);
$lastCharPos = strlen($url)-1;

if(substr($pageUrl, strlen($pageUrl)-1, 1) == '/')
	$pageUrl = substr($pageUrl, 0, strlen($pageUrl)-1);

// echo $pageUrl.'<br>';





// set language
$lg = null;
if(strlen(explode('/', $pageUrl)[0]) == 2) {
	for($i=0; $i<count($allLg); $i++) {
		if($allLg[$i] == explode('/', $pageUrl)[0]) {
			$lg = $allLg[$i];
			
			break;
		}
	}
}

if($lg == null && $pageUrl == '') // if language not set
	$lg = $allLg[0];
	// header('Location: '.WEB_ROOT);
	// echo 'NULL';

// echo $pageUrl.'<br />';
if($lg == null) // if language does not exist
	header('Location: '.WEB_ROOT);
else
	define('LG', $lg);




// print_r(explode('/', $pageUrl));
// echo explode('/', $pageUrl)[0];
// if(isset(explode('/', $pageUrl)[1])) echo 'STRING';
if(explode('/', $pageUrl)[0] == LG) { // remove language if it's in the url
	if(!isset(explode('/', $pageUrl)[1])) // if we are at the root
		$pageUrl = '';
		// echo 'ramon';
	else
		// echo 'pute';
		$pageUrl = substr($pageUrl, 3, strlen($pageUrl));
}

echo $pageUrl.'<br>';





/* -------- Titles/metas of the page -------- */
// $titlePage = '';
// $descPage = '';

// $titlePage = $pages[$pageUrl]['title'];
// $descPage = $pages[$pageUrl]['desc'];
// $file = $pages[$pageUrl]['file'];
$file = $pageUrl;


echo $file.'.php<br />';

/*
var endBaseUrl = url.indexOf(APP.Config.WEB_ROOT)+APP.Config.WEB_ROOT.length;
var endUrl = url.indexOf('?') < 0 ? url.length : url.indexOf('?');


// set page url
this.pageUrl = url.substring(endBaseUrl, endUrl);
var lastCharPos = this.pageUrl.length-1;

if(this.pageUrl[lastCharPos] == '/')
	this.pageUrl = this.pageUrl.substring(0, lastCharPos);

if(this.pageUrl.split('/')[0] == LG) { // remove language if it's in the url
	if(this.pageUrl.split('/')[1] === undefined) // if we are at the root
		this.pageUrl = '';
	else
		this.pageUrl = this.pageUrl.substring(3, this.pageUrl.length);
}

if(this.pageUrl === '')
	this.pageUrl = this.rootUrlName;


// set page name
this.pageName = this.pageUrl.split('/')[0];


// set view name
this.viewName = APP.Model.Global.json.pages[this.pageName].file;
*/





/* -------- Show page -------- */
if(MOBILE && !TABLET) { // mobile
	include_once(SITE_ROOT.'php/views/mobile/partials/header.php');
	include_once(SITE_ROOT.'php/views/mobile/pages/'.$file.'.php');
	include_once(SITE_ROOT.'php/views/mobile/partials/footer.php');
} else { // desktop & tablet
	include_once(SITE_ROOT.'php/views/desktop/partials/header.php');
	include_once(SITE_ROOT.'php/views/desktop/pages/'.$file.'.php');
	include_once(SITE_ROOT.'php/views/desktop/partials/footer.php');
}

// include_once(SITE_ROOT.'php/views/'.DEVICE.'/partials/header.php');
// include_once(SITE_ROOT.'php/views/'.DEVICE.'/pages/'.$file.'.php');
// include_once(SITE_ROOT.'php/views/'.DEVICE.'/partials/footer.php');



?>