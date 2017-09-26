"use strict";
console.log("component HeadNav.js");

console.log("Vue Version " +Vue.version );
Vue.config.devtools = true;

/*
Optim Book Axios - New Type Ahead | SCK
Lakeside prod enter 143210 (lsc) then execute this snippet

sudo curl -o /Users/neodigm/2016/is-ecom-labs/ta.json "https://www.lakeside.com/common/includes/inc_search_type_ahead.jsp?q=1418930&limit=12&timestamp=1504554461655&environment=typeAhead_queries&sort=alpha&searchFrom=&Ntt=1418930*&_=1504554389332"

TODO | Brand logic | Build Query string

*/

var vTA = new Vue({
	el: "#c_headnavtype__id",
	data: {
		brand: "ltd",
		ta_data: "",
		ta_response: "",
		is_hidden: true,
		is_watched: true,
		form_id: "basicSearch",
		async_base: "/common/includes/inc_search_type_ahead.jsp"
	},
	watch: {
		ta_data: function(){
			if( this.is_watched ){
				if( isNumeric( this.ta_data ) && ( this.ta_data.length > 5 ) ){
					this.getSearch();
				}else{
					this.ta_response = "";
				}
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
			//axios.get( this.async_base + "?q=609140&limit=12&timestamp=1504554461655&environment=typeAhead_queries&sort=alpha&searchFrom=&Ntt=609140*&_=1504554389332" )
			axios.get( "ta.html" )
			.then(function ( response ) {
				var aTmp = [], aPins = response.data.split( "\n" );
				for (var i=0; i<(aPins.length - 1); ++i) {
					var nPos = aPins[i].indexOf(" ");
					aTmp.push( [aPins[i].substr(0,nPos), aPins[i].substr(nPos)] );
				}
				vTA.ta_response = aTmp;
			})
			.catch(function ( error ) {
				vTA.ta_response = "";
			console.log( error );
			});
		},
		pinClick: function( e ){
			this.is_watched = false;
			this.ta_data = e.currentTarget.firstChild.innerHTML;
			var eF = document.getElementById( this.form_id );
			if( eF ){
				eF.submit();
			}
		}
	},
	created: function() {
		document.getElementById("js-headnavtype__id").classList.remove("hidden");
		this.brand = document.querySelector("[data-brand]").dataset.brand;
	}
});

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
