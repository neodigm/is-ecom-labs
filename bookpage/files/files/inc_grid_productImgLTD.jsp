<%--
This page renders product's image. If 'showAsLink' boolean is 'true' then image
is displayed as link to product page.

Required parameters:
	product
	The product repository item whose image we display
	image
	image for the given product, could be 'full',
	'large', 'medium', 'small, or 'thumbnail'.

Optional parameters:
	showAsLink
	Specifies if product thumbnail image should be displayed as link
	(if possible), 'true' by default
	siteId
	The site ID that should be used to generate product link
	linkImage
	The boolean indicating if the image should be a link (defaults to true)
	httpServer
	The URL prefix with protocol, server name and port to prepend to all image URLs
	and image links. This parameter is usually specified in email templates
	as they need to render images with fully qualified URLs.
	categoryNavIds
	The colon-separated list representing the category navigation trail
	categoryNav
	Determines if breadcrumbs are updated to reflect category navigation trail on click through
	navLinkAction
	The type of breadcrumb navigation to use for product detail links.
	Valid values are push, pop, or jump. Default is jump.
	defaultImageSize
	Size of default image to use if image.url isn't set
--%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%-- DSP --%>
<%@ taglib prefix="dsp" uri="dsp" %>

<%-- Endeca Taglib --%>
<%@ taglib prefix="endeca" uri="/endeca-infront-assembler/utilityTags" %>
<dsp:importbean bean="/ltd/droplets/SkusFromCurrentBookDroplet" />
<dsp:importbean bean="/atg/dynamo/droplet/ForEach" />
<dsp:importbean bean="/acquitygroup/droplet/AkamaiUrlTranslator" />
<dsp:page>

	<dsp:importbean var="originatingRequest" bean="/OriginatingRequest"/>
	<%-- get product's display name and escape special characters in it --%>
	<dsp:getvalueof var="displayName" vartype="java.lang.String" param="product.displayName"/>
	<c:set var="displayName"><c:out value="${displayName}" escapeXml="true"/></c:set>

	<dsp:importbean bean="/atg/userprofiling/Profile" />
	<dsp:getvalueof var="currentSite" bean="/atg/multisite/Site.id" />

	<dsp:getvalueof var="httpServer" vartype="java.lang.String" param="httpServer"/>
	<dsp:getvalueof var="linkImage" vartype="java.lang.String" param="linkImage"/>
	<dsp:getvalueof var="showAsLink" vartype="java.lang.String" param="showAsLink"/>
	<dsp:getvalueof var="testProdImage" param="product.smallImage.url" />
	<c:choose>
		<c:when test="${not empty testProdImage}">
			<dsp:getvalueof var="imageUrl" param="product.largeImage.url" />
			<dsp:getvalueof var="imageTUrl" param="product.smallImage.url" />
		</c:when>
		<c:otherwise>
			<c:set var="availableSKU" value="false"/>
			<dsp:droplet name="ForEach">
				<dsp:param name="array" param="product.childSKUs" />
				<dsp:param name="elementName" value="sku" />
				<dsp:oparam name="output">
					<dsp:getvalueof var="skuavailability" param="sku.availability.id" />
					<c:if test="${ ('11' != skuavailability) && (availableSKU != 'true')}">
						<c:set var="availableSKU" value="true"/>
						<dsp:getvalueof var="imageUrl" vartype="java.lang.String" param="sku.largeImage.URL"/>
						<dsp:getvalueof var="imageTUrl" vartype="java.lang.String" param="sku.smallImage.URL" />						
					</c:if>
					<c:if test="${empty savedTUrl}">
							<dsp:getvalueof var="savedTUrl" vartype="java.lang.String" param="sku.smallImage.URL"/>
					</c:if>
				</dsp:oparam>
			</dsp:droplet>
		</c:otherwise>
	</c:choose>
	<dsp:getvalueof var="defaultImageSize" vartype="java.lang.String" param="defaultImageSize"/>
	<%-- Check if image URL is found --%>
	
	<c:choose>
		<c:when test="${not empty imageTUrl}">
			<c:set var="thImageURL" value="${fn:replace(imageTUrl,'mn','th')}" />
		</c:when>
		<c:otherwise>
			<c:if test="${not empty savedTUrl}">
				<c:set var="thImageURL" value="${fn:replace(savedTUrl,'mn','th')}" />
				 <c:set var="imageTUrl" value="${fn:replace(savedTUrl,'mn','th')}" />
			</c:if>
		</c:otherwise>
	</c:choose>	
		
	<picture class="productcard__pic">
		<c:choose>
			<%--<c:when test="${empty imageUrl}"> --%>
			<c:when test="${empty thImageURL}">
				<img class="productcard__img" src="/images/product/52232_1078700_RZO_CLS_zm.jpg" alt="${displayName}"/>
			</c:when>
			<c:otherwise>
				<c:choose>
					<c:when test="${(showAsLink == 'false') or (linkImage == 'false')}">
						<%--
							The showAsLink is false so don't display image as link, no product
							URL should be generated.
						--%>
						<c:set var="productUrl" value=""/>
					</c:when>
					<c:otherwise>
						<%-- The showAsLink is true so generate URL to product page. --%>
						<dsp:include page="/global/gadgets/productLinkGenerator.jsp">
							<dsp:param name="product" param="product"/>
							<dsp:param name="navLinkAction" param="navLinkAction"/>
							<dsp:param name="categoryNavIds" param="categoryNavIds"/>
							<dsp:param name="categoryNav" param="categoryNav"/>
							<dsp:param name="siteId" param="siteId"/>
						</dsp:include>
					</c:otherwise>
				</c:choose>
				<c:choose>
					<c:when test="${empty productUrl}">
						<c:choose>
							<%-- <c:when test="${empty imageUrl }">--%>
							<c:when test="${empty thImageURL }">
								<%-- There is no product URL, just display image --%>
								<img class="productcard__img" src="/images/product/52232_1078700_RZO_CLS_zm.jpg" alt="${displayName}"/>
							</c:when>
							<c:otherwise>
								<dsp:droplet name="AkamaiUrlTranslator">
									<dsp:param name="inputUrl" value="${thImageURL}" />
									<dsp:param name="siteId" value="${currentSite}" />
									<dsp:oparam name="output">
										<dsp:getvalueof param="outputUrl" var="thURL" />
									</dsp:oparam>
								</dsp:droplet>
								<dsp:droplet name="AkamaiUrlTranslator">
									<dsp:param name="inputUrl" value="${imageTUrl}" />
									<dsp:param name="siteId" value="${currentSite}" />
									<dsp:oparam name="output">
										<dsp:getvalueof param="outputUrl" var="tURL" />
									</dsp:oparam>
								</dsp:droplet>
								
								<%-- QC 709 --%>
								<img class="productcard__img" src="<c:out value='${tURL}'/>"/>
								
							</c:otherwise>
						</c:choose>
					</c:when>
					<c:otherwise>
						<%-- Display image as link to product page. --%>
						<a href="${httpServer}${productUrl}" title="${displayName}">
							<img class="productcard__img" src="/media/global/images/product/49851_1086855_FVX_mn.jpg" alt="${displayName}"/>
						</a>
					</c:otherwise>
				</c:choose>
			</c:otherwise>
		</c:choose>
	</picture>

</dsp:page>
<%-- @version $Id: //hosting-blueprint/B2CBlueprint/version/10.2/Storefront/j2ee/store.war/browse/gadgets/productImg.jsp#1 $$Change: 735822 $--%>
