console.log("component headlogo.js");
console.log("Vue Version " +Vue.version );
Vue.config.devtools = true;

var c_headlogo = new Vue({
  el: "#js-headlogo",
  data: {
    isOpen__menu: false,
    isOpen__scrim: false,
  },
  methods: {
    hb_menu: function( e ){
      this.isOpen__menu = !this.isOpen__menu;
      this.isOpen__scrim = !this.isOpen__scrim;
      console.log("hb menu click");
      //document.getElementsByTagName("body")[0].setAttribute("data-brand", "lsc");
    }
  }
});
