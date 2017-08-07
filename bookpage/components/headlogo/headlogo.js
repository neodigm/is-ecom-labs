console.log("component headlogo.js");
console.log("Vue Version " +Vue.version );
Vue.config.devtools = true;

Vue.component('drawerleft-slideout', {
  template: '#drawerleft-slideout',
  data: function(){
    return {
      openerText: 'Open',
      isOpen: false,
      menu: [ 'Home', 'Work', 'Contact' ],
      smallMenu: [ 'Tips', 'Resources', 'Shenanigans' ]
    }
  },
  methods: {
    open: function(){
      this.openerText = 'Close';
      this.isOpen = true;
    },
    close: function(){
      this.openerText = 'Open';
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

var c_headlogo = new Vue({
  el: "#js-headlogo",
  data: {
    duck: 333
  },
  methods: {
    hb_menu: function( e ){
      alert("hb menu click");
      console.log("hb menu click");
      document.getElementsByTagName("body")[0].setAttribute("data-brand", "lsc");
    }
  }
});

new Vue({
  el: "#duck"
});
