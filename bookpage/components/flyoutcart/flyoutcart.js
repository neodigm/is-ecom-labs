"use strict";
console.log("component flyoutcart.js");

var ltdc_flyoutcart = (function( doc, eID ) {
  var nWidthAdj = doc.documentElement.clientWidth;
	if ( nWidthAdj >= 980 ) { // Position horz if large
    doc.getElementById( eID ).style.right = ( ((nWidthAdj - 980) / 2) + 212 + "px" );
	}
  //  wire close ancher
  return {
    open: function(){
      doc.getElementById( eID ).style.right = "546px"; // assumes that QV is open
      doc.getElementById( eID ).style.top = document.documentElement.scrollTop + "px"; // assumes that QV is open
      doc.getElementById( eID ).classList.remove("hidden");
      setTimeout( this.close, 2800 );
    },
    close: function(){
      doc.getElementById( eID ).classList.add("hidden");
    }
  }
})( document, "js-flyoutcart__id" );
