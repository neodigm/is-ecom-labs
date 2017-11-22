"use strict";
console.log("component tabmutex.js");

var ltdc_tabmutex = (function( doc, sSelector ) {
  var naTabs = doc.getElementsByClassName( sSelector );
  if( sSelector && naTabs ){

    return {
      init: function(){
        for(var i = 0, ln = naTabs.length; i < ln; i++) {
          naTabs[i].addEventListener("click", this.selected, true);
        }
      },
      selected: function( e ){
        var eTab = ( e.target.tagName === "LI" ) ? e.target : e.target.parentElement;
        e.preventDefault();
console.dir( eTab );
        for(var i = 0, ln = naTabs.length; i < ln; i++) {
          naTabs[i].classList.remove("tabmutex-tab__selected");
        }
console.log( e.target.tagName );
        eTab.classList.add("tabmutex-tab__selected");
      },
      debug: function(){
        console.dir( this );
      }
    }

  }
})( document, "tabmutex-tab" ).init();
