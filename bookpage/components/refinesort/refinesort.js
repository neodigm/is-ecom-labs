"use strict";
console.log("component refinesort.js");

var ltdc_refinesort = {
	aDrop: [], dropdown__a: null, dropdown__ul: null,
	"init" : function() {
		ltdc_refinesort.aDrop = document.getElementsByClassName( "js-dropdown_show" );
		for (var i = 0, ln = ltdc_refinesort.aDrop.length; i < ln; i++) {
			ltdc_refinesort.aDrop[i].addEventListener("click", ltdc_refinesort.open, false);
		}
	},
	"open" : function( e ){
		ltdc_refinesort.dropdown__ul = this.nextElementSibling;
		ltdc_refinesort.dropdown__a = this;
		ltdc_refinesort.dropdown__ul.classList.remove("hidden");
		ltdc_refinesort.dropdown__a.setAttribute("aria-expanded", "true");
		ltdc_refinesort.dropdown__ul.setAttribute("aria-hidden", "false");
		window.addEventListener("click", ltdc_refinesort.close, true);
	},
	"close" : function( e ){
		var eTarget = e.target;
		while( eTarget.tagName !== "HTML" ){
			if( eTarget.classList.contains("portal") ){
				e.stopPropagation();
				return true;
			}
			eTarget=eTarget.parentNode;
		}
		ltdc_refinesort.dropdown__ul.classList.add("hidden");
		ltdc_refinesort.dropdown__a.setAttribute("aria-expanded", "false");
		ltdc_refinesort.dropdown__ul.setAttribute("aria-hidden", "true");
		window.removeEventListener("click", ltdc_refinesort.close, true);
		e.stopPropagation();
	}
};
ltdc_refinesort.init();