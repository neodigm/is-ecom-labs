"use strict";
console.log("component leftnav.js");

console.log("Vue Version " +Vue.version );
Vue.config.devtools = true;

/*
		<ltdc-leftnav-l1 v-bind:desc="desc" href="">Home Decore</ltdc-leftnav-l1>
			<ltdc-leftnav-l2 desc="" href="">Furniture</ltdc-leftnav-l2>
				<ltdc-leftnav-l3 desc="" href="">Room Accents</ltdc-leftnav-l3>
				<ltdc-leftnav-l3 desc="" href="">Outdoor</ltdc-leftnav-l3>
			<ltdc-leftnav-l2 desc="" href="">Slip Covers</ltdc-leftnav-l2>
		<ltdc-leftnav-l1 v-bind:desc="desc" href="">Garden + Outdoors</ltdc-leftnav-l1>
			<ltdc-leftnav-l2 desc="" href="">Outdoor Decore</ltdc-leftnav-l2>
*/

var data = {
  name: 'level0',
  children: [
    { name: 'Home Decore',
    children: [
	    { name: 'Furniture',
	    children: [
			{ name: 'Room Accents' },
			{ name: 'Outdoors' }
	    ] },
	    { name: 'Slipcovers' }
    ] },
    { name: 'Garden + Outdoors' }
  ]
};

// define the item component
Vue.component('item', {
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
    treeData: data
  }
})
