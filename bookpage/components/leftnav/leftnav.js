"use strict";
console.log("component leftnav.js");

console.log("Vue Version " +Vue.version );
Vue.config.devtools = true;

Vue.component("ltdc-leftnav", {
  template: '#v-leftnav__templ',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false,
      hidden: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  },
  mounted: function(){
	if( this.model.name === "level0" ){
		this.open = true;
		this.hidden = true;
	}
  }
})

// boot up the v-leftnav__id
var vleftnav__id = new Vue({
  el: '#v-leftnav__id',
  data: {
    ltdc_leftnav__hier: ltdc_leftnav__hier
  }
})
