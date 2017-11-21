"use strict";
console.log("component productcard.js");

//(function(){
  var ltdc_productcard = {
    eQV: null, eMenu: null, eScrim: null, eX: null, eBody: null, ePersInstr: null, bPers: false,
    "init": function(){
      ltdc_productcard.eBody = document.getElementsByTagName("BODY")[0];
      ltdc_productcard.ePersInstr = document.getElementById("js-qv-persinstr__container--id");
      document.getElementById("js-qv-persinstr__handle--id").addEventListener("click", ltdc_productcard.toggle_pers, false);
      ltdc_productcard.eMenu = document.getElementById( "js-drawerright__menu" );
      ltdc_productcard.eScrim = document.getElementById( "js-drawerrignt__scrim" );
      ltdc_productcard.eScrim.addEventListener("click", ltdc_productcard.close, false);
      ltdc_productcard.eX = document.getElementById( "js-drawerright__x" );
      ltdc_productcard.eX.addEventListener("click", ltdc_productcard.close, false);
      ltdc_productcard.eQV = document.getElementsByClassName( "js-productcard__a--qv" );
      for (var i = 0, ln = ltdc_productcard.eQV.length; i < ln; i++) {
          ltdc_productcard.eQV[i].addEventListener("click", ltdc_productcard.open, false);
      }
    },
    "open": function(){
      ltdc_productcard.eBody.classList.add("qv--open");
      //ltdc_productcard.eMenu.classList.add("isOpenR__menu");
    ltdc_productcard.eMenu.style.width = "544px";
    TweenMax.to(document.getElementById("js-drawerright__menu"), .8, {right: 0, ease:Power4.easeInOut});
    ltdc_productcard.eScrim.classList.add("isOpenR__scrim");
    TweenMax.to(ltdc_productcard.ePersInstr, 1, {right: 38, ease:Power4.easeInOut, delay:0.6});
    },
    "close": function(){
      //ltdc_productcard.eMenu.classList.remove("isOpenR__menu");
      ltdc_productcard.bPers = false;
      TweenMax.to(ltdc_productcard.ePersInstr, .3, {right: -560, ease:Power4.easeInOut,
      onComplete:function(){
        TweenMax.to(document.getElementById("js-drawerright__menu"), .6, {right: -580, ease:Power4.easeInOut,
          onComplete:function(){
          ltdc_productcard.eBody.classList.remove("qv--open");
          ltdc_productcard.eScrim.classList.remove("isOpenR__scrim");
        }});
      }});
    },
    "toggle_pers": function(){
      if( ltdc_productcard.bPers ){
        TweenMax.to(ltdc_productcard.ePersInstr, 1, {right: 38, ease:Power4.easeInOut});
      }else{
        TweenMax.to(ltdc_productcard.ePersInstr, 1, {right:  464, ease:Power4.easeInOut});
      }
      ltdc_productcard.bPers = !ltdc_productcard.bPers;
    }
  };
  //ltdc_productcard.init();
//})();

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
