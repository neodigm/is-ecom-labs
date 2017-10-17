"use strict";
console.log("component productcard.js");

(function(){
  var ltdc_productcard = {
    eQV: null, eMenu: null, eScrim: null,
    "init": function(){
      ltdc_productcard.eMenu = document.getElementById( "js-drawerright__menu" );
      ltdc_productcard.eScrim = document.getElementById( "js-drawerrignt__scrim" );
      ltdc_productcard.eScrim.addEventListener("click", ltdc_productcard.close, false);
      ltdc_productcard.eQV = document.getElementsByClassName( "QQQQjs-productcard__a--qv" );
      for (var i = 0, ln = ltdc_productcard.eQV.length; i < ln; i++) {
          ltdc_productcard.eQV[i].addEventListener("click", ltdc_productcard.open, false);
      }
    },
    "open": function(){
      ltdc_productcard.eMenu.classList.add("isOpenR__menu");
      ltdc_productcard.eScrim.classList.add("isOpenR__scrim");
    },
    "close": function(){
      ltdc_productcard.eMenu.classList.remove("isOpenR__menu");
      ltdc_productcard.eScrim.classList.remove("isOpenR__scrim");
    }
  };
  ltdc_productcard.init();
})();

function doaction(var1, var2, var3, var4, var5, var6, showSoldOut) {
console.log("doaction | ");
console.log( this );
  return true;
}

/*
var c_productcard = new Vue({
  el: "#js-productcard",
  data: {
    isOpenR__menu: false,
    isOpenR__scrim: false,
  },
  methods: {
    toggle: function( e ){
      console.log("quick view click");
      this.isOpenR__menu = !this.isOpenR__menu;
      this.isOpenR__scrim = !this.isOpenR__scrim;
    }
  }
});
*/
