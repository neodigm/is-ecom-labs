"use strict";
console.log("component dropdown.js");

var ltdc_dropdown_config = {"sID": "js-dropdown-1--id",
"surf_IOpen" : "drop-surface__init--opened",
"surf_IClose": "drop-surface__init--closed",
"surf_SOpen" : "drop-surface__select--opened",
"surf_SClose": "drop-surface__select--closed",
"cont_Open"  : "drop-container--opened",
"cont_Close" : "drop-container--closed"
};

var ltdc_dropdown = (function( doc, Opt ){
	var sID = Opt.sID;
	var _eDrop = doc.getElementById( sID ), _eSurf = _eDrop.firstElementChild, _eCont = _eSurf.nextElementSibling;
	var _bInit = true; // Nothing has ever been selected
	var _bOpen = false;
	var _oSelected = {"sku_pin":"", "display_name":""};

	var _fToggle = function(){
		if( _bOpen ){
			if( _bInit ){
				_eSurf.classList.add( Opt.surf_IOpen );
				_eSurf.classList.remove( Opt.surf_IClose );
			}else{
				_eSurf.classList.add( Opt.surf_SOpen );
				_eSurf.classList.remove( Opt.surf_SClose, Opt.surf_IOpen, Opt.surf_IClose );
			}
			_eCont.classList.add( Opt.cont_Open);
			_eCont.classList.remove( Opt.cont_Close );
		}else{
			if( _bInit ){
				_eSurf.classList.add( Opt.surf_IClose );
				_eSurf.classList.remove( Opt.surf_IOpen );
			}else{
				_eSurf.classList.add( Opt.surf_SClose );
				_eSurf.classList.remove( Opt.surf_SOpen, Opt.surf_IOpen, Opt.surf_IClose );
			}
			_eCont.classList.add( Opt.cont_Close );
			_eCont.classList.remove( Opt.cont_Open);
		}
	};

	_eSurf.addEventListener("click", function( e ){
		_eCont.style.width = _eSurf.offsetWidth + "px";
		_bOpen = !_bOpen;
		_fToggle();
	});
	_eCont.addEventListener("click", function( e ){
		var eTarget = e.target;
		while( eTarget.tagName !== "HTML" ){  //  Disregard clicks from within
			if( eTarget.dataset && eTarget.dataset.skupin ){ break; }
			eTarget = eTarget.parentNode;
		}
		if( eTarget.dataset.skupin ){
			_oSelected.sku_pin = eTarget.dataset.skupin;
			_oSelected.display_name = eTarget.dataset.skupin;
			_eSurf.getElementsByTagName("p")[1].innerHTML = _oSelected.display_name;
			_bOpen = _bInit = false;
			_fToggle();
		}
	});
	return {
		"reset" : function(){
			_bInit = true;
			_bOpen = false;
			_fToggle();
		},
		"getSeleted" : function(){
			return _oSelected;
		}
};
})( document, ltdc_dropdown_config );
