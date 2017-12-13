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

var vleftnav__id = new Vue({
  el: "#v-leftnav__id",
  data: {
    ltdc_leftnav__hier: ltdc_leftnav
  },
  methods: {
    parseJSONCat: function(){
      var oPush={}, nLvl=0, sName="", sHref="", nL2Ct = -1;
      for (var key in jsnCat) {
          nLvl=1;
          if(typeof( jsnCat[key].level2CategoryUrl ) !== "undefined"){ nLvl=2; }
          if(typeof( jsnCat[key].level3CategoryUrl ) !== "undefined"){ nLvl=3; }
          sName=jsnCat[key]["level"+nLvl+"DisplayName"];
          sHref=jsnCat[key]["level"+nLvl+"CategoryUrl"];
          switch( nLvl ){
            case 1:
              oPush={name: sName, href: sHref};
              ltdc_leftnav.children.push( oPush );
              nL2Ct = -1;
            break;
            case 2:
              if(typeof( oPush.children )=="undefined"){ oPush.children=[]; }
              oPush.children.push( {name: sName, href: sHref} );
              nL2Ct++;
            break;
            case 3:
              if(typeof( oPush.children[nL2Ct] )!="undefined"){
                if(typeof( oPush.children[nL2Ct].children )=="undefined"){
                    oPush.children[nL2Ct].children=[];
                }
                  oPush.children[nL2Ct].children.push( {name: sName, href: sHref} );
              }
          }
      }
    }
  },
  created: function(){
    this.parseJSONCat();
  }
})

var vleftnav2Column__id = new Vue({
  el: "#v-leftnav2Column__id",
  data: {
    ltdc_leftnav__hier: ltdc_leftnav
  },
  methods: {
    "openCurrent" : function( sURI ){ // Open current category folder
      var oTop = this.$children[0], bTog = false;
      sURI = sURI.toLowerCase();
      var aL1 = oTop.$children.filter( function( child ){
        if( sURI.indexOf( child.model.href.toLowerCase() ) != -1 ){
          bTog = true;
        }
        if( child.$children.length >= 1){
          var aL2 = child.$children.filter( function( grandchild ){
            if( sURI.indexOf( grandchild.model.href.toLowerCase() ) != -1 ){
              grandchild.toggle();
              bTog = true;
            }
          } );
        }
        if( bTog ){ child.toggle(); bTog = false; }
      } );
    }
  }
})

vleftnav2Column__id.openCurrent( location.href );
