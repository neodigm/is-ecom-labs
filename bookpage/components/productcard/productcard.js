console.log("component productcard.js");
Vue.config.devtools = true;

var c_productcard = new Vue({
  el: "#js-productcard",
  data: {
    isOpen__menu: false,
    isOpen__scrim: false,
  },
  methods: {
    toggle: function( e ){
      console.log("quick view click");
      this.isOpen__menu = !this.isOpen__menu;
      this.isOpen__scrim = !this.isOpen__scrim;
    }
  }
});
