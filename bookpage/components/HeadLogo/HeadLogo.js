console.log("component headlogo.js");
console.log("Vue Version " +Vue.version );
Vue.config.devtools = true;
var c_headlogo = new Vue({
  el: "#js-headlogo",
  data: {
    duck: 999
  },
  methods: {
    hb_menu: function( e ){
      alert("hb menu click");
      console.log("hb menu click");
      document.getElementsByTagName("body")[0].setAttribute("data-brand", "lsc");
    }
  }
});
