<%--
This page lays out the elements that make up a one column page.

Required Parameters:
	contentItem
	The one column page content item to render.

Optional Parameters:
--%>

<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%-- DSP --%>
<%@ taglib prefix="dsp" uri="dsp"%>

<%-- Endeca Taglib --%>
<%@ taglib prefix="endeca" uri="/endeca-infront-assembler/utilityTags"%>

<fmt:setBundle basename="com.ltd.atg.resourcebundle.ContactUs" />
<dsp:importbean bean="/atg/multisite/Site"/>
<dsp:importbean bean="/atg/userprofiling/Profile" />
<dsp:importbean bean="/ltd/util/email/LTDContactUsFormHandler" />
<dsp:importbean bean="/atg/dynamo/droplet/Switch"/>
<dsp:importbean bean="/OriginatingRequest" var="originatingRequest" />


<dsp:page>	

	<dsp:getvalueof var="content" vartype="com.endeca.infront.assembler.ContentItem" value="${originatingRequest.contentItem}" />
	<dsp:getvalueof var="formStatus" bean="LTDContactUsFormHandler.formStatus"/>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
	
	
	<dsp:droplet name="Switch">
      <dsp:param name="value" value="${formStatus}"/>
      <dsp:oparam name="success"> <!-- Inside Success -->
        <article id="rev-contact-us" class="reveal-modal large" data-reveal aria-labelledby="Contact Us" aria-hidden="true" role="dialog">	
			<figcaption class="resp_qtr_height"></figcaption> Inside Success
			<h3 class="txt_caption text-center">Thank You</h3>
			<p class="text-center">Thank you for contact us.  We have received your message and will reply as soon as possible.</p>
			<hr>
			<nav class="row">
				<div class="column small-10 text-center">
					<figcaption class="resp_half_height"></figcaption>
					<a class="js-continue-shopping button closeMod radius resp_btn_brand__1">Continue Shopping</a>	
				</div>
			</nav>	
			<a class="close-reveal-modal resp_x" aria-label="Close">x</a>
		</article>
      </dsp:oparam>
      <dsp:oparam name="error"> <!-- Inside Error -->
        	<article id="rev-contact-us" class="reveal-modal large" data-reveal aria-labelledby="Contact Us" aria-hidden="true" role="dialog">	
	                <figcaption class="resp_qtr_height"></figcaption>  Inside Error 
	                <h6 class="txt_caption text-center">Contact Us</h6>
	                <p class="text-center">We will make every attempt to respond to your email within 1 day, excluding weekends and holidays. Thank you for your patience.</p>	                
	            <%-- <dsp:include page="/my_account/includes/inc_display_errors_responsive.jsp"> --%>
	            <dsp:include page="/my_account/includes/inc_display_errors_responsive.jsp">
						<dsp:param name="FormHandler" bean="/ltd/util/email/LTDContactUsFormHandler"/>
				</dsp:include>
				
				
				<dsp:form action="/cartridges/ContactusModal/ContactusModal.jsp" id="contactUsEmailForm" method="post">    
	                
	                <section class="row">
	                                <div class="column small-10 medium-5">
	                                             
	                                               <dsp:select bean="LTDContactUsFormHandler.serviceArea" required="false" iclass="select-custom">
														<option value="">* Select Topic</option>
														<dsp:option value="Account_Assistance">Account Assistance</dsp:option>
														<dsp:option value="Billing_Payment_Inquiry">Billing/Payment Inquiry</dsp:option>
														<dsp:option value="Catalog_Inquiry">Catalog Inquiry</dsp:option>
														<dsp:option value="Order_Status">Order Status</dsp:option>
														<dsp:option value="Product_Information">Product Information</dsp:option>
														<dsp:option value="Return_Exchange">Return/Exchange</dsp:option>
														<dsp:option value="Technical_Website_Help">Technical/Website Help</dsp:option>
														<dsp:option value="General_Question">General Question</dsp:option>
													</dsp:select> 
													
													<dsp:input type="text" bean="LTDContactUsFormHandler.name" id="" required="false" maxlength="19" iclass="resp_input_brand" value="${firstName}" placeholder="* Name" aria-required="true" aria-label="Name"/>
							
													<dsp:input type="text" bean="LTDContactUsFormHandler.email" id="" required="false" maxlength="256" iclass="resp_input_brand" value="${email}" placeholder="* Email Address" aria-required="true" aria-label="Email Address"/>	
	                                                
	                                </div>
	                                <div class="column small-10 medium-5">
	                                         <!--        <textarea id="" cols="" rows="12" maxlength="4000" placeholder="* Comment"></textarea> -->
	                                         <dsp:textarea bean="LTDContactUsFormHandler.comments" id="" required="false" rows="12" cols="" iclass="emailTextarea" maxlength="4000" placeholder="* Comment"/>
	                                </div>   	                             
											<dsp:input bean="LTDContactUsFormHandler.successURL" type="hidden" value="/content/faq?thankyou" />			
											<dsp:input bean="LTDContactUsFormHandler.errorURL" type="hidden" value="/content/faq?contactus" />
	                </section>
	               
	                <nav class="row">
	                                <div class="columns small-10 medium-5 large-5 push-5 small-padding-top">
	                                	<dsp:input type="hidden" bean="LTDContactUsFormHandler.sendContactUsEmail" value="sendContactUsEmail" alt="Submit" /> 
	                                    <a class="js-contact-us-send button radius expand resp_btn_green resp_btn_brand__1" data-cont-us-details="contactUsEmailForm">Send Message</a>                      
	                                    
	                                    <%-- <dsp:input type="submit" bean="LTDContactUsFormHandler.sendContactUsEmail" value="Send Message" alt="Submit" iclass="js-contact-us-send button closeMod radius expand resp_btn_green resp_btn_brand__1"/> --%>
	                                                            
	                                </div>
	                                <div class="columns small-10 medium-5 large-5 pull-5 small-padding-top">
	                                        <a class="js-contact-us-cancel button closeMod radius expand resp_btn_brand resp_btn_brand__1">Cancel</a>
	                                </div>
	                </nav>
	                </dsp:form>	
	
				<a class="close-reveal-modal resp_x" aria-label="Close">x</a>				
			</article>
      </dsp:oparam>
      <dsp:oparam name="default">  <!-- Inside Default -->
      		<article id="rev-contact-us" class="reveal-modal large" data-reveal aria-labelledby="Contact Us" aria-hidden="true" role="dialog">	
	                <figcaption class="resp_qtr_height"></figcaption> Inside default
	                <h6 class="txt_caption text-center">Contact Us</h6>
	                <p class="text-center">We will make every attempt to respond to your email within 1 day, excluding weekends and holidays. Thank you for your patience.</p>
				
				<dsp:form action="/cartridges/ContactusModal/ContactusModal.jsp" id="contactUsEmailForm" method="post">    
	                
	                <section class="row">
	                                <div class="column small-10 medium-5">
	                                             
	                                               <dsp:select bean="LTDContactUsFormHandler.serviceArea" required="false" iclass="select-custom">
														<option value="">* Select Topic</option>
														<dsp:option value="Account_Assistance">Account Assistance</dsp:option>
														<dsp:option value="Billing_Payment_Inquiry">Billing/Payment Inquiry</dsp:option>
														<dsp:option value="Catalog_Inquiry">Catalog Inquiry</dsp:option>
														<dsp:option value="Order_Status">Order Status</dsp:option>
														<dsp:option value="Product_Information">Product Information</dsp:option>
														<dsp:option value="Return_Exchange">Return/Exchange</dsp:option>
														<dsp:option value="Technical_Website_Help">Technical/Website Help</dsp:option>
														<dsp:option value="General_Question">General Question</dsp:option>
													</dsp:select> 
													
													<dsp:input type="text" bean="LTDContactUsFormHandler.name" id="" required="false" maxlength="19" iclass="resp_input_brand" value="${firstName}" placeholder="* Name" aria-required="true" aria-label="Name"/>
							
													<dsp:input type="text" bean="LTDContactUsFormHandler.email" id="" required="false" maxlength="256" iclass="resp_input_brand" value="${email}" placeholder="* Email Address" aria-required="true" aria-label="Email Address"/>	
	                                                
	                                </div>
	                                <div class="column small-10 medium-5">
	                                         <!--        <textarea id="" cols="" rows="12" maxlength="4000" placeholder="* Comment"></textarea> -->
	                                         <dsp:textarea bean="LTDContactUsFormHandler.comments" id="" required="false" rows="12" cols="" iclass="emailTextarea" maxlength="4000" placeholder="* Comment"/>
	                                </div>   	                             
											<dsp:input bean="LTDContactUsFormHandler.successURL" type="hidden" value="/content/faq?thankyou" />			
											<dsp:input bean="LTDContactUsFormHandler.errorURL" type="hidden" value="/content/faq?contactus" />
	                </section>
	               
	                <nav class="row">
	                                <div class="columns small-10 medium-5 large-5 push-5 small-padding-top">
	                                	<dsp:input type="hidden" bean="LTDContactUsFormHandler.sendContactUsEmail" value="sendContactUsEmail" alt="Submit" /> 
	                                    <a class="js-contact-us-send button radius expand resp_btn_green resp_btn_brand__1" data-cont-us-details="contactUsEmailForm">Send Message</a>                      
	                                    
	                                    <%-- <dsp:input type="submit" bean="LTDContactUsFormHandler.sendContactUsEmail" value="Send Message" alt="Submit" iclass="js-contact-us-send button closeMod radius expand resp_btn_green resp_btn_brand__1"/> --%>
	                                                            
	                                </div>
	                                <div class="columns small-10 medium-5 large-5 pull-5 small-padding-top">
	                                        <a class="js-contact-us-cancel button closeMod radius expand resp_btn_brand resp_btn_brand__1">Cancel</a>
	                                </div>
	                </nav>
	                </dsp:form>	
	
				<a class="close-reveal-modal resp_x" aria-label="Close">x</a>				
			</article>
      </dsp:oparam>
      </dsp:droplet>
	
	
	
					
	<script>
	
	$(document).ready(function() { 
		contactusJS();
	});
	
	function contactusJS() {	
	$(".js-contact-us-cancel").on("click", function( e ){
		$(".reveal-modal").foundation("reveal", "close");
		e.preventDefault();
		
		$.get("/common/includes/inc_contact_us_form.jsp", function (data) {
		        var return_values = data.split(',');
				if(typeof return_values !== 'undefined' && return_values.length == 2 && return_values[0] == 'session_expired') {	
					// session expired
					var redirectUrl = return_values[1];
					window.location = redirectUrl;
				} else {	
					console.log('Response data: ', data);
					$("#contact-us-container").html(data);					
				}     
		 });	
	}); 
	
	
	$(".js-contact-us-send").on("click",function() {
		//$("#rev-contact-us").foundation("reveal", "close"); 		
		var contactUsDetails = $( this ).attr("data-cont-us-details");
		var form = $("#"+contactUsDetails);		
		var contactUsForm = $(form),			
		options = {
			beforeSerialize: function(form, options){
				$('<input />', {
					name: '/ltd/util/email/LTDContactUsFormHandler.sendContactUsEmail',
					value: 'Submit',
					type: 'hidden'
				}).add($('<input />', {
					name: '/ltd/util/email/LTDContactUsFormHandler.sendContactUsEmail.x',
					value: '1',
					type: 'hidden'
				})).add($('<input />', {
					name: '/ltd/util/email/LTDContactUsFormHandler.sendContactUsEmail.y',
					value: '1',
					type: 'hidden'
				})).appendTo(form);
			},
			url:  CONTEXT_ROOT + 'common/includes/inc_contact_us_form.jsp', 
			success: function(data){				
					console.log('Response data: ', data);					
					$("#contact-us-container").html(data);
					contactusJS();	
					//$("#rev-contact-us").foundation("reveal", "open"); 	
			}	
		};
		
		if(contactUsForm.length>0){
			contactUsForm.ajaxSubmit(options);
		}		
		
	});
		
	$(".js-continue-shopping").on("click", function( e ){
		window.location = "/";
	});
	
	}
	</script>
	
</dsp:page>
