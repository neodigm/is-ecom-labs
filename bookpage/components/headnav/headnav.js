"use strict";
console.log("component HeadNav.js");

console.log("Vue Version " +Vue.version );
Vue.config.devtools = true;

/*
Optim Book Axios - New Type Ahead | SCK
Lakeside prod enter 143210 (lsc) then execute this snippet

sudo curl -o /Users/neodigm/2016/is-ecom-labs/ta.json "https://www.lakeside.com/common/includes/inc_search_type_ahead.jsp?q=1418930&limit=12&timestamp=1504554461655&environment=typeAhead_queries&sort=alpha&searchFrom=&Ntt=1418930*&_=1504554389332"

TODO | Convert CR delimit string to Array within Array | Brand logic | Build Query string | Click Go
TODO | Unit test in IE

*/

var vTA = new Vue({
	el: "#c_headnavtype__id",
	data: {
		ta_data: "",
		ta_response: "",
	ta_responseTMP: [["123", "ABC"],["345","EFG"]],
		is_hidden: true
	},
	watch: {
		ta_data: function(){
			if( isNumeric( this.ta_data ) && ( this.ta_data.length > 5 ) ){
				this.getSearch();
			}else{
				this.ta_response = "";
			}
		},
		ta_response: function(){
			this.is_hidden = ( this.ta_response === "" );
		}
	},
	methods: {
		getSearch: function( e ){
			vTA = this;
			//axios.get( 'https://www.lakeside.com/common/includes/inc_search_type_ahead.jsp?q=1418930&limit=12&timestamp=1504554461655&environment=typeAhead_queries&sort=alpha&searchFrom=&Ntt=1418930*&_=1504554389332' )
			axios.get( "ta.html" )
			.then(function ( response ) {
				var aPins = response.data.split( "\n" ); // may need to pop last value
		console.log( aPins );
				vTA.ta_response = response;
			})
			.catch(function ( error ) {
				vTA.ta_response = "";
			});
		},
		pinClick: function( e ){
			this.ta_data = e.currentTarget.firstChild.innerHTML;
		}
	},
	created: function() {
		document.getElementById("js-headnavtype__id").classList.remove("hidden");
	}
});

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
