console.log("component footer2.js");
Vue.config.devtools = true;

var c_footer2 = new Vue({
  el: "#js-footer2",
  data: {
    isOpenR__menu: false,
    isOpenR__scrim: false,
  },
  methods: {
    toggle: function( e ){
      console.log("Reveal Clicked");
      this.isOpenR__menu = !this.isOpenR__menu;
      this.isOpenR__scrim = !this.isOpenR__scrim;
    }
  }
});
