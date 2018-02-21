

STF.AbstractPagesController = ( function( window ) {


class AbstractPagesController extends STF.CustomEvent {
	
	
	constructor() {
		super();
		
		this.LOADING_MODE			= 'byPageStatic'; // can be allStatic, byPageStatic, byPageDynamic
		this.DYNAMIC_IMG_TO_LOAD	= 'img'; // used when LOADING_MODE == 'byPageDynamic', can be img.class for selective preload
		this.IS_HIDE_INIT			= true; // set to true if need a different behavior when hide loader on init
		
		this.pages					= {};
		this.page					= null;
		this.prevPageInfos			= {};
		this.pageInfos				= {};
		
		this.isFirstLoad			= true;
		this.isPageChange			= true;
		this.isContentLoaded		= false;
		this.isAssetsLoaded			= false;
		this.isPageHidden			= false;
		this.isPageShown			= false;
		this.isMainLoaderShown		= false;
		this.isMainLoaderHidden		= false;
		
		this.data					= null;
	}
	
	
	init() {
		this.initPages();
		this.initEl();
	}
	
	
	initPages() {
		this.pages = {
			'error-404':		STF.Views.Pages.Error404,
			'legal-notices':	STF.Views.Pages.LegalNotices,
			'home':				STF.Views.Pages.Home,
			// 'about':			STF.Views.Pages.About,
			'projects':			STF.Views.Pages.Projects,
			'project':			STF.Views.Pages.Project,
		};
	}
	
	
	initEl() {
		this.assetsModel = STF.Models.Assets;
		this.assetsModel.init();
		
		this.mainLoader = STF.Views.Statics.MainLoader;
	}
	
	
	initFirstPage() {
		this.bindEvents();
		this._setPageInfos();
		this.manageMenuLinks();
		this._loadAssets();
	}
	
	
	bindEvents() {
		this.mainLoader.bind( this.mainLoader.E.FILE_LOAD, this._onFileLoad, this );
		this.mainLoader.bind( this.mainLoader.E.COMPLETE, this._onAssetsLoaded, this );
	}
	
	
	_setPageId( url ) {
		const path	= STF.Router.URL.path === '' ? 'index' : STF.Router.URL.path;
		let id		= STF.Config.JS_VIEWS_ID[ path ];
		
		if ( id === undefined )
			id = 'error-404';
		
		this.prevPageInfos.id	= this.pageInfos.id;
		this.pageInfos.id		= id;
	}
	
	
	_setPageInfos() {
		const $page	= $( document.getElementById( 'page' ) );
		const id	= $page[0].getAttribute( 'data-js-id' );
		const title	= $page[0].getAttribute( 'data-title' );
		
		if ( !STF.Config.NEED_PAGE_ID )
			this.prevPageInfos.id	= this.pageInfos.id;
		this.prevPageInfos.title	= this.pageInfos.title;
		
		this.pageInfos.id			= id;
		this.pageInfos.title		= title;
		
		this._setPage();
		
		STF.Router.setAltLangUrl( $page );
	}
	
	
	_setPage() {
		if ( this.pages[ this.pageInfos.id ] === undefined) {
			if ( !STF.Config.IS_PROD )
				console.warn( 'PagesController: no specific page view for the "' + this.pageInfos.id + '" ID. If you need one, create it and then set the view in the PagesController.pages object.' );
			
			this.page = new STF.AbstractPageView();
		}
		else
			this.page = new this.pages[ this.pageInfos.id ]();
	}
	
	
	initPageChangeValues() {
		this.isContentLoaded	= false;
		this.isAssetsLoaded		= false;
		this.isPageHidden		= false;
		this.isPageShown		= false;
		this.isMainLoaderShown	= false;
		this.isMainLoaderHidden	= false;
	}
	
	
	_loadAssets() {
		const aAssetsToLoad = this.assetsModel.getAssetsToLoad( this.pageInfos.id, this.isFirstLoad, this.LOADING_MODE );
		
		this.mainLoader.loadAssets( aAssetsToLoad );
	}
	
	
	_onFileLoad( e ) {
		if ( e.item.type == 'image' )
			this._onImgLoaded( e );
		else if ( e.item.type == 'json' )
			this.assetsModel.setJsonData( e.item.id, e.result );
	}
	
	
	_onImgLoaded( e ) {
		const $imgs = $( 'img' ).filter( '[ data-src="' + e.item.src + '" ]' );
		this._setImages( $imgs, e.item.src, 'preloaded' );
	}
	
	
	_setImages( $imgs, src, dataSrc ) {
		for ( let i = 0; i < $imgs.length; i++ ) {
			const $img	= $imgs[ i ];
			$img.src	= src !== null ? src : $img.getAttribute( 'data-src' );
			
			$img.offsetHeight; // jshint ignore:line
			$img.setAttribute( 'data-src', dataSrc );
		}
	}
	
	
	_onAssetsLoaded() {
		this._showNonLoadedImages();
		
		
		// first load
		if ( this.isFirstLoad ) {
			STF.MainView.initAfterAssetsLoaded();
			
			this.page.init();
			
			this.page.bind( this.page.E.SHOWN, this.onPageShown, this );
			this.page.show();
			
			this.mainLoader.bind( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
			
			if ( this.IS_HIDE_INIT )
				this.mainLoader.hideInit();
			else
				this.mainLoader.hide();
		}
		
		
		// page change load
		else if ( !this.isFirstLoad && ( this.LOADING_MODE == 'byPageStatic' || this.LOADING_MODE == 'byPageDynamic' ) ) {
			this.isAssetsLoaded = true;
			
			this.checkPageHiding();
		}
	}
	
	
	_showNonLoadedImages() {
		const $imgsCont	= this.isFirstLoad ? STF.MainView.$body : STF.MainView.$pageCont;
		
		const $allImgs	= $imgsCont.find( 'img' );
		const $imgs		= $allImgs.filter( key => $allImgs[ key ].getAttribute( 'data-lazyload' ) != 'true' && $allImgs[ key ].getAttribute( 'data-src' ) != 'preloaded' );
		
		this._setImages( $imgs, null, 'non-preloaded' );
	}
	
	
	changePage( url ) {
		STF.Router.updateGA();
		
		if ( STF.Config.NEED_PAGE_ID )
			this._setPageId( url );
		
		this._disablePageChange();
		this.initPageChangeValues();
		
		if ( this.LOADING_MODE == 'allStatic' )
			this.isAssetsLoaded = true;
		
		this._loadContent( url );
		
		this.managePageHidingTransitions();
	}
	
	
	changeSearch() {
		this.page.updateSearch();
	}
	
	
	changeHash() {
		this.page.updateHash();
	}
	
	
	_loadContent( url ) {
		// setTimeout( () => { // simulate a very slow connection = very long load
		
		$.ajax({
			context:	this,
			url:		url,
			type:		'POST',
			data:		{
							// useful if need differents behavior on PHP file when AJAX load
							// can be got with $_POST['ajax'] & $_POST['type']
							ajax: 'true',
							type: 'pageChange'
						},
			dataType:	'html',
			success:	this._onContentLoaded,
			error:		this._onContentError
		});
		
		// }, 3000 ); // simulate a very slow connection = very long load
	}
	
	
	_onContentLoaded( data ) {
		this.data = data;
		
		this.isContentLoaded = true;
		this.checkPageHiding();
	}
	
	
	_onContentError( e ) {
		console.warn( 'Ajax loading error', e );
		
		if ( e.status == 404 )
			this._force404Load();
	}
	
	
	_force404Load() {
		const lang	= STF.Lang.MULTI_LANG ? STF.Lang.LANG + '/' : '';
		const url	= STF.Path.URL.base + lang + '404';
		
		this._loadContent( url );
	}
	
	
	managePageHidingTransitions() {
		this.page.bind( this.page.E.HIDDEN, this.onPageHidden, this );
		this.page.hide();
		
		this.mainLoader.bind( this.mainLoader.E.SHOWN, this.onMainLoaderShown, this );
		this.mainLoader.show();
	}
	
	
	onPageHidden() {
		this.page.unbind( this.page.E.HIDDEN, this.onPageHidden, this );
		
		this._destroyPage();
		
		this.isPageHidden = true;
		this.checkPageHiding();
	}
	
	
	_destroyPage() {
		this.page.destroy();
		this.page = null;
	}
	
	
	onMainLoaderShown() {
		this.mainLoader.unbind( this.mainLoader.E.SHOWN, this.onMainLoaderShown, this );
		
		this.isMainLoaderShown = true;
		this.checkPageHiding();
	}
	
	
	checkPageHiding() {
		if ( this. LOADING_MODE == 'allStatic' &&
			 this.isContentLoaded && this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ) {
			
			this.setContent();
			this.showPage();
		}
		
		else if ( ( this. LOADING_MODE == 'byPageStatic' || this. LOADING_MODE == 'byPageDynamic' ) &&
				  this.isContentLoaded && !this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ) {
			
			this.setContent();
		}
		
		else if ( ( this. LOADING_MODE == 'byPageStatic' || this. LOADING_MODE == 'byPageDynamic' ) &&
				  this.isContentLoaded && this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ) {
			
			this.showPage();
		}
	}
	
	
	setContent() {
		STF.MainView.$pageCont[0].innerHTML = this.data;
		
		this._setPageInfos();
		
		if ( this.LOADING_MODE != 'allStatic' ) {
			STF_resetImgs( STF.MainView.$pageCont.find( 'img' ) );
			setTimeout( () => this._loadAssets(), 0 );
		}
		
		this.data = null;
	}
	
	
	showPage() {
		this.manageMenuLinks();
		this._updateTitle();
		
		this.page.init();
		
		this.managePageShowingTransitions();
	}
	
	
	managePageShowingTransitions() {
		this.page.bind( this.page.E.SHOWN, this.onPageShown, this );
		this.page.show();
		
		this.mainLoader.bind( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
		this.mainLoader.hide();
	}
	
	
	onPageShown() {
		this.page.unbind( this.page.E.SHOWN, this.onPageShown, this );
		
		this.isPageShown = true;
		this.checkPageShowing();
	}
	
	
	onMainLoaderHidden() {
		this.mainLoader.unbind( this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this );
		
		this.isMainLoaderHidden = true;
		this.checkPageShowing();
	}
	
	
	checkPageShowing() {
		if ( this.isPageShown && this.isMainLoaderHidden )
			this.enablePageChange();
	}
	
	
	manageMenuLinks() {
		
	}
	
	
	updateMenuLinks( $link ) {
		const $linkToInactivate	= $link.filter( '.active' );
		const $linkToActivate	= $link.filter( '[ data-link-id="' + this.pageInfos.id + '" ]' );
		
		if ( $linkToInactivate.length > 0 )
			STF_dom_removeClass( $linkToInactivate[0], 'active' );
		if ( $linkToActivate.length )
			STF_dom_addClass( $linkToActivate[0], 'active' );
	}
	
	
	manageLangLinks() {
		
	}
	
	
	changeLangLinks( $links ) {
		for ( let i = 0; i < $links.length; i++ ) {
			const $link	= $links[ i ];
			$link.href	= STF.Router.ALT_LANG_URL[ $link.getAttribute( 'data-lang' ) ];
		}
	}
	
	
	_updateTitle() {
		document.title = this.pageInfos.title;
	}
	
	
	enablePageChange() {
		this.isPageChange = false;
		
		if ( this.isFirstLoad )
			this.isFirstLoad = false;
		
		STF.Router.checkUrlCorrespondence();
	}
	
	
	_disablePageChange() {
		this.isPageChange = true;
	}
	
	
}


return AbstractPagesController;


} ) ( window );

