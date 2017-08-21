console.log("component reveal.js");
var ltdc_reveal = {
  aRevAct: 0, aRevX: 0, sRevId: "", eRev: 0, eRevScrim: 0,
  "init" : function() {
    aRevX = document.getElementsByClassName( "close-reveal-modal" );
    for (var i = 0, ln = aRevX.length; i < ln; i++) {
        aRevX[i].addEventListener("click", ltdc_reveal.close, false);
    }
    aRevAct = document.querySelectorAll( "[data-reveal-id]" );
    for (var i = 0, ln = aRevAct.length; i < ln; i++) {
        aRevAct[i].addEventListener("click", ltdc_reveal.open, false);
    }
    eRevScrim = document.getElementById( "id-reveal__scrim" );
  },
  "open" : function( e ){
    sRevId = this.getAttribute( "data-reveal-id" );
    if( sRevId ){
      eRevScrim.classList.add( "reveal__scrim" );
      eRev = document.getElementById( sRevId );
      eRev.classList.add( "reveal__box" );
      eRev.setAttribute("style", "top: "+ (window.pageYOffset+84) +"px;");
      eRev.setAttribute("aria-hidden", "false");
      e.preventDefault();
    }
    return false;
  },
  "close" : function( e ){
    eRevScrim.classList.remove( "reveal__scrim" );
    eRev.classList.remove( "reveal__box" );
    eRev.setAttribute("aria-hidden", "true");
    e.preventDefault();
  }
};
ltdc_reveal.init();
