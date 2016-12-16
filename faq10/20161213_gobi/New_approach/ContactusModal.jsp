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
<dsp:importbean bean="/OriginatingRequest" var="originatingRequest" />


<dsp:page>	
	<div id="contact-us-container">
		<dsp:include page="/common/includes/inc_contact_us_form.jsp" />
	</div>	
</dsp:page>
