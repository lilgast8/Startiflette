(function() {



/*******************************/
/* -------- Variables -------- */
/*******************************/


/* -------- Mise en page -------- */
var $window,
	$body,
	
	$conteneurSite,
	$header,
	$conteneurPage,
	$page,
	
	largBody = 0,
	hautWindow = 0,
	hautBody = 0;





/****************************/
/* -------- Global -------- */
/****************************/


var global = {
	
	idPage : null,
	transitionPage : false,
	loaderAffiche : false,
	
	init : function() {
		var _this = this;
		
		
		/* -------- Resize -------- */
		$window.resize(function() {
			_this.resize();
		});
		
		
		/* -------- Init -------- */
		$window.load(function() {
			global.preload.init();
			
		//	_this.initPage();
			_this.resize();
		});
	},
	
	initPage : function() {
		var _this = this;
		$page = $(document.getElementById('page'));
		_this.idPage = $page[0].getAttribute('data-page');
		
		if (_this.idPage == 'accueil') accueil.init();
		else if(_this.idPage == '_page') _page.init();
	},
	
	resize : function() {
		var _this = this;
		
		/* Mise en page */
		largBody = $body.width();
		hautWindow = $window.height() < 600 ? 600 : $window.height();
		
		/* Resize */
		if(_this.idPage == 'accueil') accueil.resize();
		else if(_this.idPage == '_page') _page.resize();
	},
	
	afficherLoader : function() {
		var _this = this;
		
		global.loaderAffiche = true;
	},
	
	masquerLoader : function() {
		var _this = this;
		
		_this.loaderAffiche = false;
		
		global.autoriserTransPage();
	},
	
	autoriserTransPage : function() {
		var _this = this;
		
		_this.transitionPage = false;
		_this.adresse.verifUrlPage();
	}
	
};





/*****************************/
/* -------- Adresse -------- */
/*****************************/


global.adresse = {
	
	init : true,
	state : window.history.pushState !== undefined,
	adrState : _racineWeb.substr(0, _racineWeb.length-1),
	premierChargement : true,
	urlActive : null,
	nomPage : null,
	nomSousPage : null,
	nomPagePrec : null,
	nomSousPagePrec : null,
	textes : {
		"fr" : {
			"erreur" : "Une erreur s'est produite. Merci de recharcher la page."
		},
		"en" : {
			"erreur" : "An error occured. Please try to reload the page."
		}
	},
	
	init : function() {
		var _this = this;
		
		if(!Modernizr.history) {
		//	global.preload.finirPreloadInit();
			return false;
		}
		
		$.address.state(_this.adrState).change(function(fct) {
			_this.nomPagePrec = _this.nomPage;
			_this.nomSousPagePrec = _this.nomSousPage;
			_this.nomPage = fct.pathNames[0];
			_this.nomSousPage = fct.pathNames[1];
			_this.nomPartie = fct.pathNames[2];
			_this.nomSousPartie = fct.pathNames[3];
			
			_this.majMenu();
			
			if(_this.state && _this.init) {
				_this.init = false;
				
				global.preload.finirPreloadInit();
			}
			else {
				if(global.transitionPage) return false;
				else {
					global.transitionPage = true;
					_this.urlActive = $.address.path();
				}
				
				global.afficherLoader();
				
				var page = _this.nomPage;
				var urlPage = _this.adrState+'/pages-contenu/'+page+'/';
				_this.majTitrePage();
				
				$.ajax({
					url: urlPage,
					type: 'POST',
					data: { Page: urlPage},
					dataType: 'html',
					success: function(data) {
						$conteneurPage[0].innerHTML = data;
						global.initPage($('.page')[0].id);
					},
					error: function(XMLHttpRequest, textStatus, errorThrows){
						alert(_this.textes[_lg].erreur);
						global.autoriserTransPage();
					}
				});
			}
			
			
			
		});
	},
	
	majMenu : function() {
		var _this = this;
		
	},
	
	majTitrePage : function() {
		var _this = this;
		
		var titrePage = '';
		
		$.address.title(titrePage);
	},
	
	verifUrlPage : function() {
		var _this = this;
		if(_this.premierChargement) _this.premierChargement = false;
		else if(_this.urlActive != $.address.path()) $.address.update();
	}
	
};





/*****************************/
/* -------- Préload -------- */
/*****************************/


global.preload = {
	
	nbPreload : 0,
	tabImgsACharger : null,
	nbImgsACharger : null,
	nbImgChargees : null,
	
	init : function() {
		var _this = this;
		
		_this.tabImgsACharger = {
			"global" : [
				// Background
			//	'img/bgs/liste-image.png'
				'img/bgs/pattern_noir_transparent.png',
				// Boutons
				// Divers
				// Logos
				'img/logos/navs/nav_chrome.png',
				'img/logos/navs/nav_firefox.png',
				'img/logos/navs/nav_internet_explorer.png',
				'img/logos/navs/nav_opera.png',
				'img/logos/navs/nav_safari.png'
			]
		};
		
		_this.loaderImg('global', null, null);
	},
	
	loaderImg : function(id, tabImg, fct) {
		var _this = this;
		
		var tabImgsACharger = id !== null ? _this.tabImgsACharger[id] : tabImg;
		_this.nbImgsACharger = tabImgsACharger.length;
		_this.nbImgChargees = 0;
		
	//	console.log('nb imgs à charger : '+nbImgsACharger);
		
		for(var i=0; i<_this.nbImgsACharger; i++) {
			$('<img/>').load(_this.checkerFinChargement(id, fct)).attr('src', tabImgsACharger[i]);
		}
	},
	
	checkerFinChargement : function(id, fct) {
		var _this = this;
	//	console.log(i+' : '+this.src);
		_this.nbImgChargees++;
		if(_this.nbImgsACharger == _this.nbImgChargees) {
		//	console.log('fin chargement');
			if(id == 'global') global.preload.finirPreloadInit();
			else {
			//	console.log('action fin loader');
				fct();
			}
		}
	},
	
	finirPreloadInit : function() {
		var _this = this;
		
	//	_this.nbPreload++;
	//	if(_this.nbPreload == 3) {
			global.initPage();
	//	}
	}
	
};





/*****************************/
/* -------- Accueil -------- */
/*****************************/


var accueil = {
	
	init : function() {
		var _this = this;
		
	},
	
	resize : function() {
		var _this = this;
		
	}
	
};





/****************************/
/* -------- jQuery -------- */
/****************************/


$(function(){
	
	/* -------- Mise en page -------- */
	$window = $(window);
	$body = $(document.body);
	
	$conteneurSite = $(document.getElementById('conteneurSite'));
	$header = $(document.getElementById('header'));
	$conteneurPage = $(document.getElementById('conteneurPage'));
	
	
	/* -------- Init -------- */
	global.init();
	
});



})();