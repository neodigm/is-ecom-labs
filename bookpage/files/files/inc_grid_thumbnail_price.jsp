<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%-- DSP --%>
<%@ taglib prefix="dsp" uri="dsp" %>

<%-- ATG Beans used by this page.  --%>

<dsp:importbean bean="/atg/userprofiling/Profile" />
<dsp:importbean bean="/atg/commerce/pricing/PriceRangeDroplet" />
<dsp:importbean bean="/ltd/commerce/pricing/LTDPriceRangeDroplet" />
<fmt:setBundle basename="com.ltd.atg.resourcebundle.ProductCatalog" />

<dsp:page>

	<dsp:getvalueof var="site" bean="Profile.currentSite" />
	<dsp:getvalueof var="isPriceRange" value="N" />
	<dsp:droplet name="LTDPriceRangeDroplet">
		<dsp:param name="productId" param="product" />
		<dsp:param name="priceList" bean="Profile.priceList.displayName" />
		<dsp:param name="siteId" value="${site}" />
		<dsp:oparam name="output">
			<dsp:getvalueof var="highListPrice" vartype="java.lang.Double" param="highListPrice" />
			<dsp:getvalueof var="lowListPrice" vartype="java.lang.Double" param="lowListPrice" />
			<dsp:getvalueof var="highSalePrice" vartype="java.lang.Double" param="highSalePrice" />
			<dsp:getvalueof var="lowSalePrice" vartype="java.lang.Double" param="lowSalePrice" />
			<dsp:getvalueof var="lowcompareAtPrice" vartype="java.lang.Double" param="lowcompareAtPrice" />
			<dsp:getvalueof var="highcompareAtPrice" vartype="java.lang.Double" param="highcompareAtPrice" />
			<dsp:getvalueof var="saveValue" vartype="java.lang.Integer" param="saveValue" />
			<%-- <dsp:getvalueof var="isMultipleCompareAt" vartype="java.lang.Boolean" param="isMultipleCompareAt" />--%>
		</dsp:oparam>
	</dsp:droplet>

	<%-- Might use it, depends on what droplet returns
	<c:if test="${highListPrice != highSalePrice || lowListPrice != lowSalePrice}">
			<c:set var="showSalePrice" value="true"/>
	</c:if>
	--%>
	<c:if test="${empty highListPrice && empty lowListPrice}"><%-- LTDPriceRange droplet returned nothing, defensive logic --%>
		<dsp:droplet name="PriceRangeDroplet">
			<dsp:param name="productId" param="product.repositoryId" />
			<dsp:param name="priceList" bean="Profile.salePriceList" />
			<dsp:param name="salePriceList" bean="Profile.salePriceList" />
			<dsp:oparam name="output">
				<dsp:getvalueof var="highSalePrice" vartype="java.lang.Double" param="highestPrice" />
				<dsp:getvalueof var="lowSalePrice" vartype="java.lang.Double" param="lowestPrice" />


			</dsp:oparam>
		</dsp:droplet>
		<dsp:droplet name="PriceRangeDroplet">
			<dsp:param name="productId" param="product.repositoryId" />
			<dsp:param name="priceList" bean="Profile.priceList" />
			<dsp:param name="salePriceList" bean="Profile.priceList" />
			<dsp:oparam name="output">
				<dsp:getvalueof var="highListPrice" vartype="java.lang.Double" param="highestPrice" />
				<dsp:getvalueof var="lowListPrice" vartype="java.lang.Double" param="lowestPrice" />

			</dsp:oparam>
		</dsp:droplet>
		<dsp:droplet name="PriceRangeDroplet">
			<dsp:param name="productId" param="product.repositoryId" />
			<dsp:param name="priceList" bean="Profile.compareAtPriceList" />
			<dsp:param name="salePriceList" bean="Profile.compareAtPriceList" />
			<dsp:oparam name="output">
				<dsp:getvalueof var="highcompareAtPrice" vartype="java.lang.Double" param="highestPrice" />
				<dsp:getvalueof var="lowcompareAtPrice" vartype="java.lang.Double" param="lowestPrice" />
			</dsp:oparam>
		</dsp:droplet>
	</c:if>



			<dsp:getvalueof param="Profile.priceList.locale" var="locale" />
			<fmt:setLocale value="${locale}" />

			<c:if test="${not empty lowSalePrice}">
				<dsp:droplet name="/atg/dynamo/droplet/Compare">
					<dsp:param name="obj1" value="${lowListPrice}" converter="number" />
					<dsp:param name="obj2" value="${highListPrice}" converter="number" />
					<%-- A single price --%>
					<dsp:oparam name="equal">
						<span class="productcard__p--old-price"><fmt:formatNumber type="currency" value="${lowListPrice }" /></span>
					</dsp:oparam>
					<%-- Price range --%>
					<dsp:oparam name="default">
						<dsp:getvalueof var="isPriceRange" value="Y" />
						<span class="productcard__p--old-price"><fmt:formatNumber type="currency" value="${lowListPrice }" />&nbsp;-&nbsp;<fmt:formatNumber type="currency" value="${highListPrice }" /></span>
				</dsp:oparam>
				</dsp:droplet>

				<dsp:droplet name="/atg/dynamo/droplet/Compare">
					<dsp:param name="obj1" value="${lowSalePrice}" converter="number" />
					<dsp:param name="obj2" value="${highSalePrice}" converter="number" />
					<%-- A single price --%>
					<dsp:oparam name="equal">
						<span><fmt:formatNumber type="currency" value="${lowSalePrice}" /></span>
					</dsp:oparam>
					<%-- A price range --%>
					<dsp:oparam name="default">
						<dsp:getvalueof var="isPriceRange" value="Y" />
						<span><fmt:formatNumber type="currency" value="${lowSalePrice}" />&nbsp;-&nbsp;<fmt:formatNumber type="currency" value="${highSalePrice}" /></span>						
					</dsp:oparam>
				</dsp:droplet>

			</c:if>

			<c:if test="${empty lowSalePrice}">
				<dsp:droplet name="/atg/dynamo/droplet/Compare">
					<dsp:param name="obj1" value="${lowListPrice}" converter="number" />
					<dsp:param name="obj2" value="${highListPrice}" converter="number" />
					<%-- A single price --%>
					<dsp:oparam name="equal">
						<span><fmt:formatNumber type="currency" value="${lowListPrice}" /></span>
					</dsp:oparam>
					<%-- A price range --%>
					<dsp:oparam name="default">
						<dsp:getvalueof var="isPriceRange" value="Y" />
						<span><fmt:formatNumber type="currency" value="${lowListPrice}" />&nbsp;-&nbsp;<fmt:formatNumber type="currency" value="${highListPrice}" /></span>						
					</dsp:oparam>
				</dsp:droplet>
			</c:if>
			<c:if test="${not empty lowcompareAtPrice}">				
				<dsp:droplet name="/atg/dynamo/droplet/Compare">
					<dsp:param name="obj1" value="${lowcompareAtPrice}" converter="number" />
					<dsp:param name="obj2" value="${highcompareAtPrice}" converter="number" />
					<%-- A single price --%>
					<dsp:oparam name="equal">
						<span class="productcard__p--comp-price">
							<fmt:message key="product.price.compareAt" />
							<fmt:formatNumber type="currency" value="${lowcompareAtPrice}" />
						</span>
					</dsp:oparam>
					<%-- A price range --%>
					<dsp:oparam name="default">
						<span class="productcard__p--comp-price">
							<fmt:message key="product.price.compareAt" />
							<fmt:formatNumber type="currency" value="${lowcompareAtPrice}" />&nbsp;-&nbsp;<fmt:formatNumber type="currency" value="${highcompareAtPrice}" />
						</span>
					</dsp:oparam>
				</dsp:droplet>							
			</c:if>

</dsp:page>
