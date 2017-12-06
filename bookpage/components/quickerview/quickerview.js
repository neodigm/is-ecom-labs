"use strict";
console.log("component quickerview.js");

document.getElementById("js-qv__button-a2c--id").addEventListener("click", function(){
  var eQty = document.getElementById( "js-qty__input--id" );
  var eSel = document.getElementById( "js-person-select--id" );
  if( eQty && (eQty.value > 0) ){
	    ltdc_snackbar.q(eSel.value+"|"+eQty.value + " item(s) added to your shopping cart.");  
  }
});
