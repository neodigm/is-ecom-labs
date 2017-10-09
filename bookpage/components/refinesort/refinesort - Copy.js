"use strict";
console.log("component refinesort.js");

var ltdc_refnsrt = {
	aDrop: [], dropdown__a: null, dropdown__ul: null,
	portal__bottom_nav: null, portal__bottom_content: null, portal__bottom: null, portal_cnt: 0,
	aNVal: [], sNVal: "",
	"init" : function() {
		this.aDrop = document.getElementsByClassName( "js-dropdown_show" );
		for (var i = 0, ln = ltdc_refnsrt.aDrop.length; i < ln; i++) {
			ltdc_refnsrt.aDrop[i].addEventListener("click", ltdc_refnsrt.portal_open, false);
		}
		this.aDrop = document.getElementsByClassName( "portal__bottom--nav" );
		for (var i = 0, ln = ltdc_refnsrt.aDrop.length; i < ln; i++) {
			ltdc_refnsrt.aDrop[i].addEventListener("click", ltdc_refnsrt.toggle_drawer, false);
		}
		document.getElementById("js-portal-cancel__id").addEventListener("click", ltdc_refnsrt.portal_cancel, false);
		document.getElementById("js-portal-done__id").addEventListener("click",   ltdc_refnsrt.portal_done,   false);
		if( document.querySelectorAll(".criterion__li input:checked").length > 0 ){
			document.getElementById("js-refinement__id").text = "Edit Refinements";
		}
	},
	"portal_open" : function( e ){ // Open top level container
		ltdc_refnsrt.dropdown__ul = this.nextElementSibling;
		ltdc_refnsrt.dropdown__a = this;
		ltdc_refnsrt.dropdown__ul.classList.remove("hidden");
		ltdc_refnsrt.dropdown__a.setAttribute("aria-expanded", "true");
		ltdc_refnsrt.dropdown__ul.setAttribute("aria-hidden", "false");
		window.addEventListener("click", ltdc_refnsrt.portal_close, true);
	},
	"portal_close" : function( e ){ // Close top level container
		var eTarget = e.target, bExcept = false;
		while( eTarget.tagName !== "HTML" ){ // Disregard clicks from within unless Done / Cancel
			if( eTarget.classList.contains("portal") ){ return true; }
			if( eTarget.classList.contains("portal__top--a") ){ bExcept = true; break; }
			eTarget = eTarget.parentNode;
		}
		ltdc_refnsrt.dropdown__ul.classList.add("hidden");
		ltdc_refnsrt.dropdown__a.setAttribute("aria-expanded", "false");
		ltdc_refnsrt.dropdown__ul.setAttribute("aria-hidden", "true");
		window.removeEventListener("click", ltdc_refnsrt.portal_close, true);
		if( !bExcept ){ e.stopPropagation(); }
	},
	"portal_done" : function( e ){ // Build URL
		e.preventDefault();
		var aChecked = document.querySelectorAll(".criterion__li input:checked");
		if( aChecked.length > 0 ){
			for (var i = 0, ln = aChecked.length; i < ln; i++) {
				ltdc_refnsrt.getNVal( aChecked[i].parentNode.parentNode.dataset.addAction );
			}
			window.location.pathname = ltdc_refnsrt.uriNVal();
		}else{
			ltdc_refnsrt.portal_close( e );
		}
	},
	"portal_cancel" : function( e ){
			ltdc_refnsrt.portal_close( e );
	},
	"toggle_drawer" : function( e ){ // Toggle secondary container(s)
		ltdc_refnsrt.portal__bottom_nav  = this;
		ltdc_refnsrt.portal__bottom  = this.parentElement;
		ltdc_refnsrt.portal__bottom_content  = this.nextElementSibling;
		if( ltdc_refnsrt.portal__bottom_nav.classList.contains("portal__bottom--closed") ){
			ltdc_refnsrt.portal_cnt++;
			ltdc_refnsrt.portal__bottom_nav.classList.remove("portal__bottom--closed");
			ltdc_refnsrt.portal__bottom_nav.classList.add("portal__bottom--opened");
			ltdc_refnsrt.portal__bottom_content.classList.remove("hidden");
		}else{
			ltdc_refnsrt.portal_cnt--;
			ltdc_refnsrt.portal__bottom_nav.classList.remove("portal__bottom--opened");
			ltdc_refnsrt.portal__bottom_nav.classList.add("portal__bottom--closed");
			ltdc_refnsrt.portal__bottom_content.classList.add("hidden");
		}
		if( ltdc_refnsrt.portal_cnt === 0 ){
			ltdc_refnsrt.portal__bottom.classList.remove("portal_expanded");
		}else{
			ltdc_refnsrt.portal__bottom.classList.add("portal_expanded");
		}
	},
	"getNVal" : function( sN ){ // Generate array of unique N values
		var nPos = (sN.indexOf("N-")+2);
		this.aNVal = makeUnique(this.aNVal.concat( sN.substr( nPos, (sN.indexOf("?")-nPos) ).split("Z") ));
		this.sNVal=this.aNVal.pop();
		return this.aNVal;
	},
	"uriNVal": function(){ // Return new URL respecting existing GET params
		var aURI = window.location.pathname.split("/"), sURI = aURI.pop();
		aURI.push( "N-"+this.aNVal.join("Z")+"Z"+this.sNVal );
		return aURI.join("/");
	}
};
ltdc_refnsrt.init();

function makeUnique(a) { // Dedupe
    var exists = {};
    return a.filter(function(i) {
        return exists.hasOwnProperty(i) ? false : (exists[i] = true);
    });
}

// Code To Display Sort/ItemView
var sortItemView = document.getElementById("sort-item-view"),
displaySection = document.getElementsByClassName("l-grid-sort")[0];
sortItemView.classList.remove('hidden');
displaySection.parentNode.replaceChild(sortItemView,displaySection);
