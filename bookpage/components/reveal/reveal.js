"use strict";
console.log("component reveal.js");

var ltdc_reveal = {
  aRevAct: 0, aRevX: 0, sRevId: "", eRev: 0, eRevScrim: 0,
  "init" : function() {
    ltdc_reveal.aRevX = document.getElementsByClassName( "close-reveal-modal" );
    for (var i = 0, ln = ltdc_reveal.aRevX.length; i < ln; i++) {
        ltdc_reveal.aRevX[i].addEventListener("click", ltdc_reveal.close, false);
    }
    ltdc_reveal.aRevAct = document.querySelectorAll( "[data-reveal-id]" );
    for (var i = 0, ln = ltdc_reveal.aRevAct.length; i < ln; i++) {
        ltdc_reveal.aRevAct[i].addEventListener("click", ltdc_reveal.open, false);
    }
    ltdc_reveal.eRevScrim = document.getElementById( "id-reveal__scrim" );
  },
  "open" : function( e ){
    ltdc_reveal.sRevId = this.getAttribute( "data-reveal-id" );
    if( ltdc_reveal.sRevId ){
      ltdc_reveal.eRevScrim.classList.add( "reveal__scrim" );
      ltdc_reveal.eRev = document.getElementById( ltdc_reveal.sRevId );
      ltdc_reveal.eRev.classList.add( "reveal__box" );
      ltdc_reveal.eRev.parentElement.classList.remove( "reveal__init" );
        ltdc_reveal.eRev.style.top = String( window.pageYOffset + 84 ) + "px";
        ltdc_reveal.eRev.style.visibility = "visible";
      ltdc_reveal.eRev.setAttribute("aria-hidden", "false");
      e.preventDefault();
    }
    return false;
  },
  "close" : function( e ){
    ltdc_reveal.eRevScrim.classList.remove( "reveal__scrim" );
    ltdc_reveal.eRev.classList.remove( "reveal__box" );
    ltdc_reveal.eRev.parentElement.classList.add( "reveal__init" );
    ltdc_reveal.eRev.setAttribute( "aria-hidden", "true" );
    if( e ){ e.preventDefault(); }
  }
};
ltdc_reveal.init();
