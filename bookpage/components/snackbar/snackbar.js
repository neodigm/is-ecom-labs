"use strict";
console.log("component snackbar.js");

var ltdc_snackbar = (function( doc, eID ) {
  var _nTimeout = 4800, _aQ = [];
  var _eSb = doc.getElementById( eID ), _eSbText = _eSb.firstElementChild;
  var _fClose = function(){
    _aQ.shift(); // fifo
    _eSb.classList.remove("snackbar__cont--show");
    _eSb.classList.add("snackbar__cont--hide");
    if( _aQ.length != 0 ){ setTimeout( _fOpen, 1200 ); } // If more messages then open again
  };
  var _fOpen = function(){
    _eSbText.innerHTML = _aQ[0].replace("|","<br>");
    _eSb.classList.remove("snackbar__cont--hide");
    _eSb.classList.add("snackbar__cont--show");
    setTimeout( _fClose, _nTimeout );
  };
  return {
    q: function( sMsg ){
      _aQ.push( sMsg ); // fifo
      if( _aQ.length == 1 ){ _fOpen(); } // If first message then init open
    }
  }
})( document, "js-snackbar__id" );
