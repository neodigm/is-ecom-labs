"use strict";
console.log("component refinesort.js");

var ltdc_refinesort = {
	aDrop: [], dropdown__a: null, dropdown__ul: null,
	portal__bottom_nav: null, portal__bottom_content: null, portal__bottom: null, portal_cnt: 0,
	"init" : function() {
		ltdc_refinesort.aDrop = document.getElementsByClassName( "js-dropdown_show" );
		for (var i = 0, ln = ltdc_refinesort.aDrop.length; i < ln; i++) {
			ltdc_refinesort.aDrop[i].addEventListener("click", ltdc_refinesort.portal_open, false);
		}
		ltdc_refinesort.aDrop = document.getElementsByClassName( "portal__bottom--nav" );
		for (var i = 0, ln = ltdc_refinesort.aDrop.length; i < ln; i++) {
			ltdc_refinesort.aDrop[i].addEventListener("click", ltdc_refinesort.toggle_drawer, false);
		}
		document.getElementById("js-portal-cancel__id").addEventListener("click", ltdc_refinesort.portal_cancel, false);
		document.getElementById("js-portal-done__id").addEventListener("click",   ltdc_refinesort.portal_done,   false);
	},
	"portal_open" : function( e ){
		ltdc_refinesort.dropdown__ul = this.nextElementSibling;
		ltdc_refinesort.dropdown__a = this;
		ltdc_refinesort.dropdown__ul.classList.remove("hidden");
		ltdc_refinesort.dropdown__a.setAttribute("aria-expanded", "true");
		ltdc_refinesort.dropdown__ul.setAttribute("aria-hidden", "false");
		window.addEventListener("click", ltdc_refinesort.portal_close, true);
	},
	"portal_close" : function( e ){
		var eTarget = e.target;
		while( eTarget.tagName !== "HTML" ){
			if( eTarget.classList.contains("portal") ){ return true; }
			eTarget = eTarget.parentNode;
		}
		ltdc_refinesort.dropdown__ul.classList.add("hidden");
		ltdc_refinesort.dropdown__a.setAttribute("aria-expanded", "false");
		ltdc_refinesort.dropdown__ul.setAttribute("aria-hidden", "true");
		window.removeEventListener("click", ltdc_refinesort.portal_close, true);
		e.stopPropagation();
	},
	"portal_done" : function( e ){
		// Implementation:  This submit form
		console.log("portal_done");
	},
	"portal_cancel" : function( e ){
		// Implementation:  This submit form
		console.log("portal_cancel");
	},
	"toggle_drawer" : function( e ){
		ltdc_refinesort.portal__bottom_nav  = this;
		ltdc_refinesort.portal__bottom  = this.parentElement;
		ltdc_refinesort.portal__bottom_content  = this.nextElementSibling;
		if( ltdc_refinesort.portal__bottom_nav.classList.contains("portal__bottom--closed") ){
			ltdc_refinesort.portal_cnt++;
			ltdc_refinesort.portal__bottom_nav.classList.remove("portal__bottom--closed");
			ltdc_refinesort.portal__bottom_nav.classList.add("portal__bottom--opened");
			ltdc_refinesort.portal__bottom_content.classList.remove("hidden");
		}else{
			ltdc_refinesort.portal_cnt--;
			ltdc_refinesort.portal__bottom_nav.classList.remove("portal__bottom--opened");
			ltdc_refinesort.portal__bottom_nav.classList.add("portal__bottom--closed");
			ltdc_refinesort.portal__bottom_content.classList.add("hidden");
		}
		if( ltdc_refinesort.portal_cnt === 0 ){
			ltdc_refinesort.portal__bottom.classList.remove("portal_expanded");
		}else{
			ltdc_refinesort.portal__bottom.classList.add("portal_expanded");
		}
	},
};
ltdc_refinesort.init();
