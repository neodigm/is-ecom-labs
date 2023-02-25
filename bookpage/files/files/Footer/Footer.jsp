<%-- Taglibs --%>
<%@taglib uri="dsp" prefix="dsp"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%-- Endeca Taglib --%>
<%@ taglib prefix="endeca" uri="/endeca-infront-assembler/utilityTags"%>

<dsp:page>
	<dsp:getvalueof var="content" vartype="com.endeca.infront.assembler.ContentItem" value="${originatingRequest.contentItem}"/> 
	<dsp:getvalueof var="contentName" bean="/OriginatingRequest.contentItem.contentName"/>
	
		<!--  bread page: c-breadpage  -->
<aside class="c-Mockup" style="	border: 1px #e0dfdd solid;height: 48px;padding: 0; margin: 0 auto 8px  auto;">Pages</aside>

<!--  footer 1: c-footone  -->
<aside class="c-Mockup" style="	border: 1px #e0dfdd solid;height: 226px;padding: 0; margin: 24px auto 0 auto;">footer one</aside>

<ltdc-footer2 class="l-grid-footer2 " role="banner"><!--  Component Begin  -->
<hr>
</ltdc-footer2><!--  Component End  -->


<script src="/media/components/vue.runtime.min.js"></script>
<script src="/media/components/headtop/headtop.js" async></script>
<script src="/media/components/headnav/headnav.js" async></script>
<script src="/media/components/productcard/productcard.js" async></script>

</body>

</dsp:page>