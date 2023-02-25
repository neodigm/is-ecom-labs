"use strict";
console.log("component quickerview.js");

var ltdc_quickerview_options = {
  "button_minus_id" : "js-qty-step__minus--id",
  "button_plus_id"  : "js-qty-step__plus--id",
  "button_a2c_id"   : "js-qv__button-a2c--id",
  "qty_input_id"    : "js-qty__input--id"
};

var ltdc_quickerview = (function( doc, Opt ) {
  var nQty = 1;
  //  Below is non-reactive proto code that needs to be replaced
  doc.getElementById( Opt.qty_input_id ).addEventListener("change", function(){
      nQty = doc.getElementById( Opt.qty_input_id ).value;
  });
  doc.getElementById( Opt.button_minus_id ).addEventListener("click", function(){
      if( nQty > 0){
        doc.getElementById( Opt.qty_input_id ).value = (--nQty);
      }
  });
  doc.getElementById( Opt.button_plus_id ).addEventListener("click", function(){
      doc.getElementById( Opt.qty_input_id ).value = (++nQty);
  });

  doc.getElementById( Opt.button_a2c_id ).addEventListener("click", function(){
    var eQty = doc.getElementById( "js-qty__input--id" );
    //var eSel = doc.getElementById( "js-person-select--id" );
var eSel = {"value":"Steelers"};

    if( eQty && (eQty.value > 0) ){
  	    ltdc_snackbar.q( eSel.value + "|" + nQty + " item(s) added to your shopping cart." );
        nQty = 1;
        doc.getElementById( Opt.qty_input_id ).value = 1;
    }
  });
  return {
    addToCart: function(){
    }
  }
})( document, ltdc_quickerview_options );
