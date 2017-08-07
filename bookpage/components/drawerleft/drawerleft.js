console.log("component drawerleft.js");
Vue.config.devtools = true;

var c_ltdc_drawerleft = Vue.component("ltdc-drawerleft", {
  template: "#ltdc-drawerleft__template",
  data: function(){
    return {
      isOpen: false,
    }
  },
  methods: {
    open: function(){
      this.isOpen = true;
    },
    close: function(){
      this.isOpen = false;
    },
    toggle: function(){
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  }
});

var c_ltdc_drawerleft__container = new Vue({
  el: "#ltdc-drawerleft__container"
});

console.log( c_ltdc_drawerleft );
console.log( c_ltdc_drawerleft__container );
