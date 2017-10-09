"use strict";
console.log("component refinesort.js");

var MAIN_CONSTANTS = {
	sku : {
		color : "Color", size : "Size", gender : "Gender", type : "Type"
	},
	sku_color: "Color",	sku_size: "Size", sku_gender: "Gender",	sku_type: "Type",
	departmentLTD : "Department", departmentLS: "Department",
	ratingsLTD : "Ratings", ratingsLS : "Ratings", pageNumber : "Page Number"
};

var ltdc_refnsrt = {
	aDrop: [], dropdown__a: null, dropdown__ul: null,
	portal__bottom_nav: null, portal__bottom_content: null, portal__bottom: null, portal_cnt: 0,
	sNBase: "", aUNVal: "",
	aNVal: [], aElemChecked: [],
	"init" : function() {
		this.aDrop = document.getElementsByClassName( "js-dropdown_show" );
		for(var i = 0, ln = ltdc_refnsrt.aDrop.length; i < ln; i++) {
			ltdc_refnsrt.aDrop[i].addEventListener("click", ltdc_refnsrt.portal_open, false);
		}
		ltdc_refnsrt.aElemChecked = document.querySelectorAll("[data-display-name]");
		ltdc_refnsrt.isNotChecked( document.querySelectorAll("[data-add-action]") );
		ltdc_refnsrt.isPreChecked( ltdc_refnsrt.aElemChecked );
		this.aDrop = document.getElementsByClassName( "portal__bottom--nav" );
		for(var i = 0, ln = ltdc_refnsrt.aDrop.length; i < ln; i++) {
			ltdc_refnsrt.aDrop[i].addEventListener("click", ltdc_refnsrt.toggle_drawer, false);
		}
		document.getElementById("js-portal-cancel__id").addEventListener("click", ltdc_refnsrt.portal_cancel, false);
		document.getElementById("js-portal-done__id").addEventListener("click",   ltdc_refnsrt.portal_done,   false);
	},
	"portal_open" : function( e ){  //  Open top level container
		ltdc_refnsrt.dropdown__ul = this.nextElementSibling;
		ltdc_refnsrt.dropdown__a = this;
		ltdc_refnsrt.dropdown__ul.classList.remove("hidden");
		ltdc_refnsrt.dropdown__a.setAttribute("aria-expanded", "true");
		ltdc_refnsrt.dropdown__ul.setAttribute("aria-hidden", "false");
		window.addEventListener("click", ltdc_refnsrt.portal_close, true);
	},
	"portal_close" : function( e ){  //  Close top level container
		var eTarget = e.target, bExcept = false;
		while( eTarget.tagName !== "HTML" ){  //  Disregard clicks from within unless Done / Cancel
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
	"portal_done" : function( e ){  //  Build URI
		e.preventDefault();
		var aChecked = document.querySelectorAll(".criterion__li input:checked");
		for(var i = 0, ln = aChecked.length; i < ln; i++) {
			ltdc_refnsrt.getNVal( aChecked[i].parentNode.parentNode.dataset.addAction );
		}
		window.location.pathname = ltdc_refnsrt.uriNVal( ltdc_refnsrt.aNVal );
	},
	"portal_cancel" : function( e ){
			ltdc_refnsrt.portal_close( e );
	},
	"toggle_drawer" : function( e ){  //  Toggle secondary container(s)
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
		}else{  //  Leave secondary open
			ltdc_refnsrt.portal__bottom.classList.add("portal_expanded");
		}
	},
	"getNVal": function( sN ){  //  Generate array of unique N values
		var sNVal = this.delItem(this.getNString( "Z"+sN ).split("Z"), this.sNBase).pop();
		this.aNVal.push( sNVal );
		this.aNVal = makeUniq( this.aNVal );
		return this.aNVal;
	},
	"uriNVal": function( aNValues ){  //  Return new URL respecting existing GET params
		var aURI = window.location.pathname.split("/"), sURI = aURI.pop();
		if( aNValues.length > 0){
			var sPath = aNValues.filter(function(v){  return v != "";  }).join("Z");
			aURI.push( "N-"+aNValues.join("Z")+"Z"+this.sNBase );
		}else{ // Nothing checked
			sURI = sURI.split("Z").pop();
			sURI =  String("N-"+sURI).replace(new RegExp("N-N-", "g"), "N-");
			aURI.push( sURI );
		}
		return aURI.join("/");
	},
	"isPreChecked": function( aPreChck ){  //  Move existing checked to top
		if( aPreChck.length > 0 ){
			document.getElementById("js-refinement__id").text = "Edit Refinements";
			for( var i = (aPreChck.length-1); i >= 0; i-- ){
				var sName = aPreChck[i].getAttribute("data-dimension-name").replace(new RegExp("-","g"), ".");
				var sNameAlias = aPreChck[i].getAttribute("data-dimension-name").replace(new RegExp("-","g"), "_");
				var eParnt = document.querySelector("[data-dim-name='"+ sName +"']"); // nav
				if( !eParnt ){  //  Generate secondary container (all have been selected)
					var sTmplMU = document.getElementById("js-templ-2nd-cont__id").innerHTML;
					sTmplMU = sTmplMU.replace(new RegExp("dim_name", "g"), sName);
					sTmplMU = sTmplMU.replace(new RegExp("dim_desc", "g"), MAIN_CONSTANTS[ sNameAlias ] );
					var ePortl = document.querySelector("aside.portal__bottom");
					ePortl.insertBefore( document.createElement("section"), ePortl.childNodes[0]  );
					ePortl.firstElementChild.outerHTML = "<section class='portal__bottom--content'><ul></ul></section>";
					ePortl.insertBefore( document.createElement("nav"), ePortl.childNodes[0]  );
					ePortl.firstElementChild.outerHTML = sTmplMU;
					eParnt = document.querySelector("[data-dim-name='"+ sName +"']"); // nav
				}
				eParnt.classList.remove("portal__bottom--closed");	
				eParnt.classList.add("portal__bottom--opened");				
				eParnt = eParnt.nextElementSibling;  //  aside
				eParnt.classList.remove("hidden");
				eParnt = eParnt.firstElementChild;  //  ul
				eParnt.insertBefore( aPreChck[i], eParnt.childNodes[0] ); 
				document.querySelector("#js-"+ sName +"__id").innerHTML++;
				for(var i2 = 0, ln = this.aUNVal.length; i2 < ln; i2++) { // Gen data-add-action of checked
					if( aPreChck[i].dataset.addAction.indexOf( this.aUNVal[i2] ) === -1 ){
						aPreChck[i].dataset.addAction = "N-"+this.aUNVal[i2]+"Z"+this.sNBase+"?"; break;
					}
				}
			}			
		}
	},
	"isNotChecked": function( aNotChck ){  //  Gen standard data-add attrib
		this.aUNVal = this.getNString( window.location.pathname ).split("/").pop().split("Z"), this.sNBase = this.aUNVal.pop();
		if( aNotChck.length > 0 && ltdc_refnsrt.aElemChecked.length > 0 ){
			for(var i = 0, ln = aNotChck.length; i < ln; i++) { 
				if( !aNotChck[i].getAttribute("data-display-name") ){
					for(var i2 = 0; i2 < this.aUNVal.length; i2++) { // Gen data-add-action of unchecked
						aNotChck[i].dataset.addAction = aNotChck[i].dataset.addAction.replace( this.aUNVal[i2], "Z").replace( new RegExp("ZZ", "g"), "");			
					}
				}
			}
		}
	},
	"getNString": function( sN ){  //  Extract N values string
		sN+="?";
		var nPs = (sN.indexOf("N-")+2);
		return sN.substr( nPs, (sN.indexOf("?")-nPs));
	},
	"delItem": function( aNVal, sDel ){
		return aNVal.filter(function(item){
			return (item == sDel) ? false : true;
		});
	}
};
ltdc_refnsrt.init();

var ltdc_mutx = {
	naMutx: [],
	"init": function(){
		this.naMutx = document.querySelectorAll("[data-mutex]");
		for(var i = 0, ln = ltdc_mutx.naMutx.length; i < ln; i++) {
			ltdc_mutx.naMutx[i].addEventListener("click", ltdc_mutx.clickMutx, false);
		}
	},
	"clickMutx": function( e ){
		if( this.nodeName === "LI"){
			for(var i = 0, ln = ltdc_mutx.naMutx.length; i < ln; i++) {
				if( this != ltdc_mutx.naMutx[i]){
					ltdc_mutx.naMutx[i].firstElementChild.firstElementChild.checked = false;
				}
			}
		}
	}
};
ltdc_mutx.init();

function makeUniq(a) { // Dedupe
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