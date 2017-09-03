console.log("component productcard.js");
Vue.config.devtools = true;

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
