console.log("component reveal.js");
Vue.config.devtools = true;

var QQQQc_footer2 = new Vue({
  el: "#QQQQjs-footer2",
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
