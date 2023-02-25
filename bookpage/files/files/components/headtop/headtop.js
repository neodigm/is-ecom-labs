console.log("component headtop.js");
console.log("Vue Version " +Vue.version );
Vue.config.devtools = true;

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
      console.log("hb menu click");
      //document.getElementsByTagName("body")[0].setAttribute("data-brand", "lsc");
    }
  }
});