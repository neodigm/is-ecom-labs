"use strict";
console.log("component headtop.js");

//console.log("Vue Version " +Vue.version );
//Vue.config.devtools = true;
/*
var c_headtop = new Vue({
  el: "#js-headtop",
  data: {
    isOpen__menu: false,
    isOpen__scrim: false,
  },
  methods: {
    toggle: function( e ){
      this.isOpen__menu = !this.isOpen__menu;
      this.isOpen__scrim = !this.isOpen__scrim;
  }
}
});
*/
var ltdc_headtop = {
  eHB: null, eMenu: null, eScrim: null, bOpen: false,
  "init" : function() {
    ltdc_headtop.eHB = document.getElementById( "js-headtop-hb__id" );
    ltdc_headtop.eMenu = document.getElementById( "js-headtop-menu__id" );
    ltdc_headtop.eScrim = document.getElementById( "js-headtop-scrim__id" );

    ltdc_headtop.eHB.addEventListener("click", ltdc_headtop.toggle, false);
    ltdc_headtop.eScrim.addEventListener("click", ltdc_headtop.toggle, false);
  },
  "toggle" : function( e ){
    ltdc_headtop.autoToggle();
    e.preventDefault();
  },
  "autoToggle" : function(){
    if( ltdc_headtop.bOpen ){
      ltdc_headtop.eMenu.classList.remove("isOpen__menu");
      ltdc_headtop.eScrim.classList.remove("isOpen__scrim");
    }else{
      ltdc_headtop.eMenu.classList.add("isOpen__menu");
      ltdc_headtop.eScrim.classList.add("isOpen__scrim");
    }
    ltdc_headtop.bOpen = !ltdc_headtop.bOpen;
  }
};
ltdc_headtop.init();
