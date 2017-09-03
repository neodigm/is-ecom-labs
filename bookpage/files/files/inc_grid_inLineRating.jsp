<%@ page isELIgnored="false"%>
<%-- imports --%>



<%@ taglib prefix="dsp" uri="dsp" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- Endeca Taglib --%>
<%@ taglib prefix="endeca" uri="/endeca-infront-assembler/utilityTags" %>


<dsp:page>
  <%-- This is a smaple page to display the Inline Ratings for products
			 It uses the /bv/droplet/InlineRatingDisplayDroplet
			 This page expects the following input parameters:

			 product - the product to display inline ratings
  --%>

	<%-- bazaar voice --%>
    <%-- If product has a primary product, then point to that for the rating --%>
    <dsp:getvalueof var="primaryProduct" param="product.primaryProduct" vartype="atg.repository.RepositoryItem"/>
    <c:choose>
    	<c:when test="${empty primaryProduct}">
    		<dsp:getvalueof var="bvProductId" param="product.id"/>
    		<dsp:getvalueof var="showRR" param="product.showRR"/>
    		<dsp:getvalueof var="product" param="product"/>
    	</c:when>
    	<c:otherwise>
    		<dsp:getvalueof var="bvProductId" param="product.primaryProduct.id"/>
    		<dsp:getvalueof var="showRR" param="product.primaryProduct.showRR"/>
    		<dsp:getvalueof var="product" param="product.primaryProduct"/>
    	</c:otherwise>
    </c:choose>

    <!-- using bvProd = ${bvProductId} and showRR = ${showRR} and product = <dsp:valueof value="${product}"/> -->
	
	<c:set var="siteLevelRnREnabled"><dsp:valueof bean="/atg/multisite/Site.bvClient.rnrEnabled"/></c:set>

    <%-- Check site level BV flag is enabled and also Use product.showRR or product.primaryProduct.showRR flag 
    	to determine if we can show ratings and reviews --%>
    
    <c:if test="${siteLevelRnREnabled && showRR}">
		<dsp:droplet name="/bv/droplet/InlineRatingDisplayDroplet">
			<dsp:param name="product" value="${product}" />
			<dsp:param name="bvClient" bean="/atg/multisite/Site.bvClient"/>
			<dsp:param name="locale" bean="/atg/dynamo/servlet/RequestLocale.locale" />
			<dsp:oparam name="output">
				<dsp:getvalueof var="ratingClass" param="ratingImage" />
				<!-- ratingClass = ${ratingClass} -->
				
				<section itemprop="aggregateRating">
					<div class="${ratingClass} review-stars" content="4"></div>
				</section>
				
			</dsp:oparam>
			<dsp:oparam name="empty">
				<%-- If there are no ratings, then show nothing --%>
			</dsp:oparam>
			<dsp:oparam name="disabled">
				<%-- BV is disabled for this area --%>
			</dsp:oparam>
		</dsp:droplet>
    </c:if>
</dsp:page>
