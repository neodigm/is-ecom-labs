console.log("component tabmutex.js");

var ltdc_tabmutex = (function( doc, sSelector ) {
  "use strict";

  var naTabs = doc.getElementsByClassName( sSelector ), naPanel =[];
  if( sSelector && naTabs ){

    return {
      init: function(){ // Wire events
        for(var i = 0, ln = naTabs.length; i < ln; i++) {
          naTabs[i].addEventListener("click", this.selected, true);
          naPanel[i] = doc.getElementById( naTabs[i].dataset.panel );
        }
      },
      selected: function( e ){ // A tab has been selected
        var eTab = ( e.target.tagName === "LI" ) ? e.target : e.target.parentElement;
        e.preventDefault();
        for(var i = 0, ln = naTabs.length; i < ln; i++) {
          if( eTab === naTabs[i] ){
            eTab.classList.add("tabmutex-tab__selected");
            eTab.setAttribute("aria-selected", "true");
            naPanel[i].classList.remove("hidden");           
            naPanel[i].setAttribute("aria-hidden", "false");           
          }else{
            naTabs[i].classList.remove("tabmutex-tab__selected");
            naTabs[i].setAttribute("aria-selected", "false");
            naPanel[i].classList.add("hidden");
            naPanel[i].setAttribute("aria-hidden", "true");
          }
        }
      }
    }

  }
})( document, "tabmutex-tab" ).init();
