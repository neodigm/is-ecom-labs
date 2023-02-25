function js_currency_only( el, ev ){
	//  Currency input mask | numeric single dec pnt
	var inc =[0,1,2,3,4,5,6,7,8,99,118,120];
	var ch = ev.which, dc = ( el.value.indexOf(".") === -1 );
	inc = ( ev.ctrlKey ) ? inc : inc.splice( 0, inc.length -3 );
	return (inc.indexOf( ch ) != -1 ) || (( ch >= 48 ) && ( ch <= 57 )) || ( ch == 46 && dc );
}
function js_number_only( el, ev ){
	//  Number input mask | whole num
	var inc =[0,1,2,3,4,5,6,7,8,99,118,120];
	var ch = ev.which, ml = ( $(el).val().length >= $(el).attr("maxlength"));
	inc = ( ev.ctrlKey ) ? inc : inc.splice( 0, inc.length -3 );
	return (inc.indexOf( ch ) != -1 ) || (( ch >= 48 ) && ( ch <= 57)) && (!ml);
}
function createEvents_ach_details(){
	// refreshed via AJAX
	$("#routingNumber").on("keyup",function(){
		if( $( this ).val().length > 7 ){
			routingNumberFetch();
		}else{
			$("#routingNumber").removeClass("error");
			$("#resp_bank_name").removeClass().addClass("resp_qtr_height").html(" ");
		}
	});

	$("#routingNumber").on("blur",function(){ 
		routingNumberFetch();
	});	

	function routingNumberFetch(){
		var rNumber=($("#routingNumber").val()).trim();	
		if(rNumber.length > 0) {
			$.ajax({
				type : 'get',
				url : '/my_account/invoice/includes/lookup_bank_name.jsp?routingNumber='+rNumber,
				cache : false,
				dataType : 'html',
				success : function (data) {
					var return_values = data.split(',');
					if(typeof return_values !== 'undefined' && return_values.length == 2 && return_values[0] == 'session_expired') {	
						// session expired
						var redirectUrl = return_values[1];
						window.location = redirectUrl;
					} else {									
						$("#routingNumber").addClass("error");
						if( data.length > 0 && data.indexOf("Invalid Bank") != -1 ){
							$("#resp_bank_name").removeClass().addClass("resp_error").html(data);
						}else{
							$("#resp_bank_name").removeClass().addClass("resp_valid").html(data);
							document.addAccountForm.bankName.value=data;
						}
						$( "#error_select_invoice_new" ).text( errorMsgText( form_state.pio_page ) );
						form_state.clickable("continue-w-pay", isOk( form_state.pio_page, form_state.form_flow ));
					}  
				}
			});		
		}else{
			$("#routingNumber").removeClass("error");
			$("#resp_bank_name").removeClass().addClass("resp_qtr_height").html(" ");
		}		
	}
			
	$("#continue-w-pay").on("click",function() {
		if( !$( this ).hasClass("cmd_disabled") ){ 
			var achDetailsParam = $( this ).attr("data-cont-ach-details");
			var achDetails = achDetailsParam.split('|');
			var form = $("#"+achDetails[0]);  
			var nickName = achDetails[1].trim(); 
			if(nickName == 'undefined' || nickName.length < 1) { 
				var selectedVal=$("#yes-no").prop("checked");	
				$("#save-chk-box").val(selectedVal);
			}
			form.submit();
		}
	});

	$("#editACHDetails").on("click",function() {	
		var achDetailsParam = $( this ).attr("data-edit-ach-details"); 
		var achDetails = achDetailsParam.split('|');
		var form = $("#"+achDetails[0]);
		$("#continue-w-pay").text("Save and Continue");
		form_state.clickable("continue-w-pay", false);
		$("#edit-cancel-btn").removeClass('hidden');
		$("#form-flow-display").removeClass('form-flow-active').addClass('form-flow-inactive');		
		$("#form-flow-new").removeClass('form-flow-inactive').addClass('form-flow-active');
		form[0].accountHolderName.value=achDetails[1];
		form[0].routingNumber.value=achDetails[2];
		form[0].nickName.value=achDetails[3];
		form[0].bankName.value=achDetails[4];
		form[0].editFlag.value=Boolean(true);
		form[0].checkingAccount.value=null;
		form[0].checkingAccountRe.value=null;
		$("#would-you-like").addClass('hidden');
		form_state.form_flow = "edit";	
		$("#routingNumber").blur();	
	});

	$("#cancelACHChanges").on("click",function() {	
		//$("#ACHpaymentForm").load("/my_account/invoice/includes/inc_payment_form.jsp");	
		//form_state.form_flow = "new";		
		 $.get("/my_account/invoice/includes/inc_payment_form.jsp", function (data) {
		        var return_values = data.split(',');
				if(typeof return_values !== 'undefined' && return_values.length == 2 && return_values[0] == 'session_expired') {	
					// session expired
					var redirectUrl = return_values[1];
					window.location = redirectUrl;
				} else {									
					$("#ACHpaymentForm").html(data);					
				}     
		 });
		
	});

	$("#deleteACHDetails").on("click",function() {		
		var achDetails = $( this ).attr("data-del-ach-details");
		var form = $("#"+achDetails);
		$("#del-confirm-dialog").foundation("reveal", "close");
		var removeAccountForm = $(form),			
		options = {
			beforeSerialize: function(form, options){
				$('<input />', {
					name: '/ltd/myAccount/invoice/InvoiceFormHandler.RemoveBankAccount',
					value: 'Submit',
					type: 'hidden'
				}).add($('<input />', {
					name: '/ltd/myAccount/invoice/InvoiceFormHandler.RemoveBankAccount.x',
					value: '1',
					type: 'hidden'
				})).add($('<input />', {
					name: '/ltd/myAccount/invoice/InvoiceFormHandler.RemoveBankAccount.y',
					value: '1',
					type: 'hidden'
				})).appendTo(form);
			},
			url:  CONTEXT_ROOT + 'my_account/invoice/includes/inc_payment_form.jsp', 
			success: function(data){
				var return_values = data.split(',');
				if(typeof return_values !== 'undefined' && return_values.length == 2 && return_values[0] == 'session_expired') {	
					// session expired
					var redirectUrl = return_values[1];
					window.location = redirectUrl;
				} else {									
					$("#ACHpaymentForm").html(data);
					form_state.form_flow = "new";
				}
			},
			beforeSend: displayWaitImage,
			complete: function(){
				$.unblockUI();
				addAndroidMaxLength();
			}		
		};
		
		if(removeAccountForm.length>0){
			removeAccountForm.ajaxSubmit(options);
		}		
		
	});
	
	$(".js-del-confirm-cancel").on("click", function(){
        $("#del-confirm-dialog").foundation("reveal", "close");
	});

	$("#routingNumber").blur();
	$("#continue-w-pay").hover(
		function(){ 
			if( $( this ).hasClass("cmd_disabled") ) {
				$( "#error_select_invoice_new" ).text( errorMsgText( form_state.pio_page ) ); form_state.showError("continue-w-pay","error_select_invoice_new")} },
		function(){ 
			if( $( this ).hasClass("cmd_disabled") ) $("#error_select_invoice_new").addClass("hidden") });
	$("#continue-w-pay").on("click", function(){
		if( $( this ).hasClass("cmd_disabled") ) {
			$( "#error_select_invoice_new" ).text( errorMsgText( form_state.pio_page ) ); 
			form_state.showError("continue-w-pay","error_select_invoice_new");
			}
	});

	$( document ).on("keyup click", function(){  //  Criteria for making the action button disabled
		if( $("#continue-w-pay").text().indexOf("Save") != -1 ){
			$( "#error_select_invoice_new" ).text( errorMsgText( form_state.pio_page ) );
			form_state.clickable("continue-w-pay", isOk( form_state.pio_page, form_state.form_flow ));
		}
	});

	$("#saveACHDetails").hover(
		function(){ 
			if( $( this ).hasClass("cmd_disabled") ) { $("#error_select_invoice_edit").removeClass("hidden")} },
		function(){ 
			if( $( this ).hasClass("cmd_disabled") ) $("#error_select_invoice_edit").addClass("hidden") });
	$("#saveACHDetails").on("click", function(){
		if( $( this ).hasClass("cmd_disabled") ) { $("#error_select_invoice_edit").removeClass("hidden")};
	});

	$(".js-number-only").on("keypress", function( e ){
		return js_number_only( this, e );
	});
	$(".js-number-only").on("input", function( e ){
		//  Android
		var v = $( this ).val();
		$( this )[0].value = "";
		$( this ).val( v.replace(/\./g, "9") );
	});

	$(".js-alpha-only").on("keyup", function( e ){
		this.value = this.value.replace(/(?=.)\d*(?:[.,]\d+)?$/g,"");
	});
	//  Legacy Android Polyfil - only on page 2
	addAndroidMaxLength();
} // createEvents_ach_details end

var nav_home = {"hasChanged": false, "revealCount": 0};
var more_less = {"inv_limit_warning": 25,"inv_limit_init": 10, "MoL_state": "More", inv_is_limit: false,
	"init" : function( $aTableRow, more_than_limit, cmd_more_less_id ){
	//  Init object vars and bind click event
		this.$aTR = $aTableRow;
		this.$cmd_more_less = $("#"+cmd_more_less_id);
		this.more_than_limit = more_than_limit;
		this.inv_is_limit = ( this.$aTR.length > this.inv_limit_init );
		if( this.inv_is_limit ){
			if( this.$aTR.length === this.inv_limit_warning ){
				$(".js-limit-warning").removeClass("hidden");
			}
			this.$cmd_more_less.on("click", function( e ){
				more_less.MoL_state = ( more_less.MoL_state === "Less" ) ? "More" : "Less" ;
				more_less.$cmd_more_less.text( more_less.MoL_state );
				more_less.showMoreOrLess();
				e.preventDefault();
			});
		}
		return this.clickable( this.inv_is_limit );
	},
	"clickable" : function( bMakeClickable ){
	//  Determin if button and message should be visible
		(bMakeClickable) ? $("."+this.more_than_limit).removeClass("hidden") : $("."+this.more_than_limit).addClass("hidden");
		return bMakeClickable;
	},
	"showMoreOrLess" : function(){
	//  Iterate through elements toggling hidden class
		var nCnt = 0;
		this.$aTR.each(function(){
			if( nCnt++ >= more_less.inv_limit_init ){
				$( this ).toggleClass("hidden");
			}
		});
	}};

var form_state = {
	"clickable"	: function( sId, bEnabled ){
		( bEnabled ) ? $("#"+sId).removeClass("cmd_disabled") : $("#"+sId).addClass("cmd_disabled");
		if (bEnabled){
			$("#error_select_invoice").addClass("hidden");
		}
	},
	"showError" : function( sButtonId, sErrorId ){
		var $eBt = $("#"+sButtonId), $eEm = $("#"+sErrorId); // size error elemant to a buttons width
		if( $eBt && $eEm ){
			$eEm.css("width", $eBt.css("width") ).removeClass("hidden");
			return true;
		}
	},
	"pio_page" : document.body.getAttribute("data-pio-page"),
	"form_flow" : "new"
};

function calculateTotal(){
	var total=0;
	//var totaldue=0;
	$('#invoicetable tr').filter(':has(:checkbox:checked)').each(function() {
		var x=this.id;
		if(x != "js-header"){
			var y = "amt"+x;
			var z = "amtdue"+x;			
			if (!isNaN(parseFloat($("#"+y).val()))){
					total+= parseFloat($("#"+y).val());					
			}			

		 }
	});		
	$("#invoicePaymentTotalText").html("$" + total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}				
$(".js-amount").on('input', function() {
	var x= $(this).parent().parent().attr('id');
	if ($("#checkbox"+x).is(":checked")){
		if(	parseFloat($("#amt"+x).val())  > parseFloat($("#amtdue"+x).val())){
			$("#tr"+x).removeClass("hidden");
			//$(".map_error"+x).addClass("hidden");
		}else{
			$("#tr"+x).addClass("hidden");			
		}
	}
	calculateTotal();
});
$(".js-checkbox").click( function() {
	//parent is faster, but DOM change, use closest
	//var x= $(this).closest('tr').attr('id');
	var x= $(this).parent().parent().attr('id');
	if ($("#"+this.id).is(":checked")){
		$("#amt"+x).val($("#amtdue"+x).val());
	}else{
		$("#amt"+x).val("0.00");
		$("#selectall").prop('checked', false);
	}
	$("#tr"+x).addClass("hidden");
	calculateTotal();
});

$(".js-inv-details").click( function() {	
	var sInvoiceDets = $( this ).attr("data-invoice-details");
	var aInvoiceDets = sInvoiceDets.split('|'); 
	var qv = $("#clickForInvoiceDetailsModal"+aInvoiceDets[3]),		
	link = CONTEXT_ROOT+"my_account/invoice/invoice_details.jsp?transactionId="+aInvoiceDets[0]+"&amount="+aInvoiceDets[1]+"&docDate="+aInvoiceDets[2]+"&index="+aInvoiceDets[3]+"&sapDoc="+aInvoiceDets[4]+"&dueDate="+aInvoiceDets[5];
	
	qv.load(link, function(response, status, xhr){
		var return_values = response.split(',');
		if(typeof return_values !== "undefined" && return_values.length == 2 && return_values[0] == "session_expired") {
			// session expired
			var redirectUrl = return_values[1];
			window.location = redirectUrl;
		} else {
			$("html, body").scrollTop(0);
			$("#clickForInvoiceDetailsModal"+aInvoiceDets[3]).css("overflow", "hidden");
			$("#clickForInvoiceDetailsModal"+aInvoiceDets[3]).foundation("reveal", "open");
			setTimeout(
				//  Fire framework to equalize then set height to that of the reveal minus the header
				function(){ 
					$(document).foundation("equalizer", "reflow");
					$(".invc-det--aside").css("height", ( $( window ).height()-308 )+"px");
			}, 580);
		}
	});
	
});

$("#selectall").click( function() {
	$('#invoicetable tr').each(function() {
		var x=this.id;
		$("#tr"+x).addClass("hidden");
			if(x != "js-header" && x.indexOf("tr") == -1 ){	
			var y = "checkbox"+x;
			if ($("#selectall").is(":checked")){
				$("#"+y).prop('checked', true);
				$("#amt"+x).val($("#amtdue"+x).val()); 
			}else{
				$("#"+y).prop('checked', false);
				$("#amt"+x).val("0.00");
			}
		}
	});					
	
	calculateTotal();
});


 function showInvoiceDetails(transactionId, amount, docDate, index, sapDocument, dueDate){
		
		var qv = $('#clickForInvoiceDetailsModal'),		
		link = CONTEXT_ROOT+"my_account/invoice/invoice_details.jsp?transactionId="+transactionId+"&amount="+amount+"&docDate="+docDate+"&index="+index+"&sapDoc="+sapDocument+"&dueDate="+dueDate;
		
		qv.load(link, function(response, status, xhr){
			var return_values = response.split(',');
			if(typeof return_values !== 'undefined' && return_values.length == 2 && return_values[0] == 'session_expired') {
				// session expired
				var redirectUrl = return_values[1];
				window.location = redirectUrl;
			} else {
				$('#clickForInvoiceDetailsModal').foundation('reveal', 'open');
				setTimeout( function(){ $(document).foundation(); }, 600);
			}
		});
		
	}
	function updateInvTotlCaption( sId ){
		//  Update the caption depending if any checkboxes deselected
		if( $( "input:checked.js-checkbox" ).length === $( ".js-checkbox" ).length ){
			$( "#"+sId ).text("Pay All Invoices");
		}else{
			$( "#"+sId ).text("Pay Selected Invoices");
		}
	}

	function isOk( sDocument, sFormId ){
		//  Return true if action button should be enabled based on the current page / form
		var isValid = true;
		switch( sDocument ){
			case "pio_select_invoices":
				var bTot = Number( $("#invoicePaymentTotalText").text().replace("$","") );
				bTot = (bTot < 0);
				isValid = ( !bTot ) && ($("#invoicePaymentTotalText").text() !== "$0.00") && ($(".resp_error").closest("tr").not(".hidden").length === 0);
			break;
			case "pio_ach_details":
				isValid = ( $("#accountHolderName").val() !== "" ) && ( $("#routingNumber").val() !== "" ) && ( $("#checkingAccount").val() !== "" ) && ( $("#checkingAccountRe").val() !== "" ) && ( $("#checkingAccount").val() === $("#checkingAccountRe").val() ) && ( $("#resp_bank_name").hasClass("resp_valid") );
			break;
			case "pio_agreement":
				var bTot = Number( $("#invoicePaymentTotalText").text().replace("$","") );
				bTot = (bTot < 0);
				isValid = ( !bTot ) && ($("#invoicePaymentTotalText").text() !== "$0.00") && ($(".resp_error").closest("tr").not(".hidden").length === 0) && ( $("#chkAgree").prop("checked") );
			break;
			case "pio_confirmation":
				
			break;
		}
		return isValid
	}  

	function errorMsgText( sDocument, sFormId ){
		//    Determine Error Message Text
		var nMsg = 0, sMsg = "";
		switch( sDocument ){
			case "pio_select_invoices":
				var aMsg = ["Please Review Information", "Please Select an Invoice.", "Your Payment Total cannot be 0 or less than 0. Please review.", "The amount entered cannot exceed the invoice amount"];
				if( $( "input:checked.js-checkbox" ).length === 0 ){
					nMsg = 1;
				}else if( $("#invoicePaymentTotalText").text() === "$0.00" ){
					nMsg = 2;
				}else if( $("#invoicePaymentTotalText").text().indexOf("-") !== -1 ){
					nMsg = 2;
				}else if( $(".resp_error").closest("tr").not(".hidden").length !== 0 ){
					nMsg = 3;
				}
				sMsg = aMsg[nMsg];
			break;
			case "pio_ach_details":
				var aMsg = ["Please Review Information", "All Information is Required", "Enter a Valid Routing Number", "Checking Account Numbers Must Match", "Enter Required Information then click Save"];
				if( ( $("#accountHolderName").val() === "" ) || ( $("#routingNumber").val() === "" ) || ( $("#checkingAccount").val() === "" ) || ( $("#checkingAccountRe").val() === "" ) ){
					nMsg = 1;
				}else if( $("#resp_bank_name").hasClass("resp_error") ){
					nMsg = 2;
				}else if( $("#checkingAccount").val() !== $("#checkingAccountRe").val() ){
					nMsg = 3;
				}
				sMsg = aMsg[nMsg];
			break;
			case "pio_agreement":
				var aMsg = ["Please Review Information", "Please Select an Invoice.", "Your Payment Total cannot be 0 or less than 0. Please review.", "The amount entered cannot exceed the invoice amount","Check I Agree above"];
				if( $( "input:checked.js-checkbox" ).length === 0 ){
					nMsg = 1;
				}else if( $("#invoicePaymentTotalText").text() === "$0.00" ){
					nMsg = 2;
				}else if( $("#invoicePaymentTotalText").text().indexOf("-") !== -1 ){
					nMsg = 2;
				}else if( $(".resp_error").closest("tr").not(".hidden").length !== 0 ){
					nMsg = 3;
				}else if( !$("#chkAgree").prop("checked") ){
					nMsg = 4;
				}
				sMsg = aMsg[nMsg];
			break;
		}
		return sMsg
	}
 
	function uncheckIf0( $inputs, $checkboxes, sInput_id ){
		//  Check or Uncheck if GT 0 or 0, respectively
		$inputs.each(function(){
			var $eChk = $checkboxes.filter("[id='" + $( this ).attr("data-checkbox-id") + "']");

			if( Number( $( this ).val() ) === 0 && $eChk.prop("checked") ){  //  zero or blank
				$eChk.prop("checked", false);
				return false;
			}
			if( Number( $( this ).val() ) !== 0 && !$eChk.prop("checked") ){
				if( $( this ).attr("id") === sInput_id ){
					$eChk.prop("checked", true);
					return false;
				}
			}
		});
	}

	$(document).ready(function(){

		form_state.form_flow = "new";
		form_state.js_amount = $(".js-amount");  //  not js-negative
		form_state.js_checkbox = $(".js-checkbox");
		$(document).foundation({
		  equalizer : {
		    equalize_on_stack: false,
		    act_on_hidden_el: true
		  }
		});
		
		if( form_state.js_amount.length > 0 ){  //  Bind keyup only if inputs/chkbox are on the page, use global arrays
			$(".js-amount").on("keyup", function( e ){  //  Change checkbox state based on numeric input
				//this.value = this.value.replace(/[^\d\.]/g, "");
				uncheckIf0( form_state.js_amount, form_state.js_checkbox, e.target.id );
				calculateTotal();
			});
		}

		$(".button").on("click", function( e ){
			if( $( this ).hasClass("cmd_disabled") ) e.preventDefault();
		});
		
		if( form_state.pio_page === "pio_select_invoices" ){  //  Show red msg on hover/touch if disabled
			calculateTotal();
			if( !IsSmall() ){  //  Expand if Med or Large 
				$("#ccp-1").addClass("ccp-panel__active").find("i").text("-");
				$("#resp_ccp_1_v").removeClass("hidden");
			}

			//  Determine if the More or Less button/warning is visible
			more_less.init( $(".js-more-less"), "js-more-than-inv-limit" ,"cmd-more-less" );

			$( document ).on("keyup click", function(){  //  Criteria for making the action button disabled
				var sMsg = errorMsgText( form_state.pio_page );
				$( "#error_select_invoice" ).text( sMsg );
				form_state.clickable("Continue2", isOk( form_state.pio_page, "" ));
			});

			$(".js-currency-only").on("keypress", function( e ){
				return js_currency_only( this, e );
			});

			$("#Continue2").hover(
				function(){ 
					if( $( this ).hasClass("cmd_disabled") ) {
						$( "#error_select_invoice" ).text( errorMsgText( form_state.pio_page ) );
						$( "#error_select_invoice" ).removeClass("hidden")} },
				function(){ 
					if( $( this ).hasClass("cmd_disabled") ) $("#error_select_invoice").addClass("hidden") });

			$("#Continue2").on("click", function(){
				if( $( this ).hasClass("cmd_disabled") ) {
					$( "#error_select_invoice" ).text( errorMsgText( form_state.pio_page ) ); $("#error_select_invoice").removeClass("hidden")};
			});

			$( document ).on("opened.fndtn.reveal", "[data-reveal]", function () {
				nav_home.revealCount++;
			});
		}

		if( form_state.pio_page === "pio_agreement" ){

			//  Determine if the More or Less button/warning is visible
			more_less.init( $(".js-more-less"), "js-more-than-inv-limit" ,"cmd-more-less" );

			$("#Continue2").hover(
				function(){ 
					if( $( this ).hasClass("cmd_disabled") ) {
						$( "#error_agreement" ).text( errorMsgText( form_state.pio_page ) ); form_state.showError("Continue2","error_agreement")} },
				function(){ 
					if( $( this ).hasClass("cmd_disabled") ) $("#error_agreement").addClass("hidden") });
			$("#Continue2").on("click", function(){
				if( $( this ).hasClass("cmd_disabled") ) {
					$( "#error_agreement" ).text( errorMsgText( form_state.pio_page ) ); form_state.showError("Continue2","error_agreement")};
			});

			$( document ).on("keyup click", function(){  //  Criteria for making the action button disabled
				var sMsg = errorMsgText( form_state.pio_page );
				$( "#error_agreement" ).text( sMsg );
				form_state.clickable("Continue2", isOk( form_state.pio_page, "" ));
			});

			$(".js-currency-only").on("keypress", function( e ){
				return js_currency_only( this, e );
			});			
		}

		if( form_state.pio_page === "pio_ach_details" ){  //  Show red msg on hover/touch if disabled			
			createEvents_ach_details();
		} // End pio_ach details

		if( form_state.pio_page === "pio_confirmation" ){
			//    Print Exclusion Terms
			$("[href='#modalTermsConditions']").parent().addClass("resp_no_print");
			$(".prime-banner--section").addClass("resp_no_print");

			$("#a-print").on("click", function(){
				window.print();
			});
		}

		$( document ).on("change", function(){
			updateInvTotlCaption( "invoice-totl--li" );
		});
		$( document ).on("keypress", function(){
			nav_home.hasChanged = true;
		});

		//    Page Nav Confirmation
		$("#branding").addClass("js-nav-home"); // Bind logo

		$(".js-nav-home").on("click", function( e ){
			if( nav_home.hasChanged ){
				$("#nav-home-dialog").foundation( "reveal", "open" );
				$(".js-nav-home-leave").attr( "href", e.target.href );
				e.preventDefault();
			}  
		});
		$(".js-nav-home-stay").on("click", function(){
		                $("#nav-home-dialog").foundation("reveal", "close");
		});
				
		//    Breadc
		$(".js-nav-breadc").on("click", function( e ){
			if( $( this ).hasClass("unavailable") || $( this ).hasClass("current") ){
				e.preventDefault();
			}
		});

		//  Collapsible Content Pattern
		$(".js-ccp").on("click", function( e ){
			$( this ).toggleClass("ccp-panel__active").next().toggleClass("hidden");
			$( this ).find("i").text(( $( this ).hasClass("ccp-panel__active") )?"-":"+");
		});
	});
		
	// Display spinner image until server finish processing ajax request.	
	function displayWaitImage(){ 
		 var spinnerImg = CONTEXT_ROOT+"media/ltd/images/popups/spinner1-black.gif";		
		$.blockUI({ 
			message: '<img src="'+spinnerImg+'" />', 
			css: { 
				top:  ($(window).height() - 100) /2 + 'px', 
				left: ($(window).width() - 100) /2 + 'px', 
				width: '100px',
				border: 'none'
			}
		});
	}