"use strict";
console.log("component HeadNav.js");

console.log("Vue Version " +Vue.version );
Vue.config.devtools = true;

/*
Optim Book Axios - New Type Ahead | SCK
Lakeside prod enter 141893 then execute this snippet
*/

var vTA = new Vue({
	el: "#c_headnavtype__id",
	data: {
		ta_data: "",
		ta_response: {}
	},
	watch: {
	 ta_data: function( e ){
	   console.log("WATCH | " + this.ta_data);
	
	   if( isNumeric( this.ta_data ) && (this.ta_data.length > 5)){
	      axios.get( 'https://www.lakeside.com/common/includes/inc_search_type_ahead.jsp?q=1418930&limit=12&timestamp=1504554461655&environment=typeAhead_queries&sort=alpha&searchFrom=&Ntt=1418930*&_=1504554389332' )
	      .then(function (response) {
	        this.ta_response = response;
	        console.log(response);
	      })
	      .catch(function (error) {
	        console.log(error);
	      }); 
	   }
	
	 }
	},
	methods: {
		keyup: function( e ){

		}
	}
}); 


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}