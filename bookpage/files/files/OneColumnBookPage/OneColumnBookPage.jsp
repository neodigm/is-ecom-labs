<%--
This page lays out the elements that make up a one column page.

Required Parameters:
	contentItem
	The one column page content item to render.

Optional Parameters:
--%>

<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%-- DSP --%>
<%@ taglib prefix="dsp" uri="dsp" %>

<%-- Endeca Taglib --%>
<%@ taglib prefix="endeca" uri="/endeca-infront-assembler/utilityTags" %>
<dsp:importbean bean="/atg/userprofiling/Profile" />
<dsp:importbean bean="/atg/commerce/catalog/CategoryLookup" />
<dsp:importbean bean="/atg/multisite/Site"/>
<dsp:importbean	bean="/atg/repository/seo/CatalogItemLink" />
<dsp:importbean bean="/atg/commerce/catalog/BookLookup" />

<dsp:page>

	<dsp:importbean bean="/OriginatingRequest" var="originatingRequest" />
	<dsp:getvalueof var="contentItem" vartype="com.endeca.infront.assembler.ContentItem" value="${originatingRequest.contentItem}" />
	<dsp:getvalueof var="currentSite" bean="Profile.currentSite" />

	<!doctype html>
	<html class="no-js" lang="en">
	<head>
	
		<c:forEach var="element" items="${contentItem.MainContent}">	
			<c:if test="${!empty element.bookId}">
				<c:set var="bookId" scope="request" value="${element.bookId}" />
			</c:if>
		</c:forEach>		
		<c:if test="${contentItem.PageType eq 'book' && (!empty contentItem.MainContent)}">		
			<c:set var="isBook" value="true" />
			<!-- The book id is ${bookId} -->
			<dsp:droplet
				name="/atg/commerce/endeca/cache/DimensionValueCacheDroplet">
				<dsp:param name="repositoryId" value="${bookId}" />
				<dsp:param name="dimensionName" value="product.book" />
				<dsp:oparam name="output">
					<dsp:getvalueof var="categoryCacheEntry1"
						param="dimensionValueCacheEntry" />
					<dsp:setvalue bean="Profile.lastCategoryViewed"
						value="${categoryCacheEntry1.url}" />
				</dsp:oparam>
			</dsp:droplet>
			<dsp:setvalue bean="Profile.currentBook" value="${bookId}" />
			<dsp:setvalue bean="Profile.currentBookId" value="${bookId}" />
			<dsp:droplet name="BookLookup">
				<dsp:param name="id" value="${bookId}" />
				<dsp:oparam name="output">
					<title><dsp:valueof param="element.displayName" />&nbsp;|&nbsp;<c:out
							value="${siteName}" /></title>
					<dsp:getvalueof var="isTestBook" param="element.test" />
					<dsp:getvalueof var="pageName" param="element.displayName" />
					<c:if test="${!empty isTestBook && isTestBook}">
						<dsp:setvalue bean="Profile.lastTestBookViewed" value="${bookId}" />
					</c:if>
				</dsp:oparam>
			</dsp:droplet>
			<%-- Set Tealium variables for the book page - Start --%>
			<c:set var="pagename" value="${pageName}" scope="request" />
			<c:set var="page_type" value="book" scope="request" />
			<%-- Set Tealium variables for the book page - Ends --%>
		</c:if>
		
		
		<%-- Render the header --%>			
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<link rel="apple-touch-icon" sizes="180x180" href="/images/ltd-apple-touch-icon.png">
			<link rel="icon" type="image/png" href="/images/ltd-favicon-16x16.png" sizes="16x16">
			<link rel="icon" type="image/png" href="/images/ltd-favicon-32x32.png" sizes="32x32">
			<link rel="manifest" href="/images/ltd-manifest.json">
			<link rel="mask-icon" href="/images/ltd-safari-pinned-tab.svg" color="#297fb8">
			<link rel="shortcut icon" href="/images/ltd-favicon.ico">
			<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
			<meta name="msapplication-config" content="/images/ltd-browserconfig.xml">
			<meta name="theme-color" content="#297fb8">
		
			<!--
			/*========================================*/
			/*  Component: headtop                    */
			/*================================ begin =*/
			-->
			<style>
			/*  Brand Themes required Above the Fold  */
		body[data-brand=lsc] .brand--lsc__show,body[data-brand=ltd] .brand--ltd__show{display:inline}body[data-brand=lsc] .brand--lsc__showb,body[data-brand=ltd] .brand--ltd__showb{display:block}body[data-brand=lsc] .brand--ltd__show,body[data-brand=lsc] .brand--ltd__showb,body[data-brand=ltd] .brand--lsc__show,body[data-brand=ltd] .brand--lsc__showb{display:none!important}.hidden{display:none !important;}
			/*  Above the Fold begin    */
		body,figcaption,figure,img,input,li,picture,section,ul{margin:0;padding:0}.l-grid-headtop{align-items:flex-start;display:flex;flex-flow:row nowrap;height:89px;justify-content:space-between;margin:0 auto;padding:8px 0 2px;width:980px}.headtop__hb{display:none}body[data-brand=lsc] .headtop__hb{padding:8px 0 8px 8px}body[data-brand=ltd] .headtop__hb{padding:1px 0 8px 8px}.l-grid-headtop nav:nth-of-type(3){width:50px}.l-grid-headtop nav:nth-of-type(4){width:92px}.l-grid-headtop nav:nth-of-type(5){width:83px}.l-grid-headtop nav:nth-of-type(6){width:74px}.headtop__hb--a{display:block;height:40px;margin:0 auto;padding-top:4px;width:34px}.headtop__hb--hr{border-top:1px solid #fff;margin:5px auto;width:55%}.headtop__hb--p{font-family:sans-serif;font-size:9px;line-height:.8;margin:0;text-align:center}.headtop__img{height:100%;width:620px}.headtop__img--a{display:block;height:100%;width:88%}.headtop__link{border-right:solid .6px #999;flex-grow:0;flex-shrink:1;font-size:11px;height:32px;line-height:16px;padding:1px 0 1px 6px}.headtop__link,body[data-brand=lsc] .headtop__link{margin:36px 1px 1px}body[data-brand=ltd] .headtop__link{margin:25px 1px 1px}.headtop__cart{margin:0 2px 0 6px}.headtop--input__cart{border-radius:3px;border:0;cursor:pointer;display:inline-flex;font-size:14px;font-weight:300;height:39px;margin:34px 1px 0 0;min-width:104px}body[data-brand=lsc] .headtop--input__cart{margin:34px 1px 0 0}body[data-brand=ltd] .headtop--input__cart{margin:22px 1px 0 0}.headtop--input__cart svg{margin:2px 1px 1px 4px}.headtop--input__cartqty{border-radius:1000px;font-weight:700;margin:4px 2px 4px 6px;padding:2px 8px}.headtop--input__carttxt{margin-top:5px}body[data-brand=lsc] .headtop__img{background-image:url(/images/lsc-logo-lg.jpg);background-size:380px 112px}body[data-brand=ltd] .headtop__img{background-image:url(/images/ltd-logo-lg.jpg);background-size:auto 87px}body[data-brand=lsc] .l-grid-headtop{height:114px}body[data-brand=ltd] .l-grid-headtop{height:89px}.drawerleft__menu{box-shadow:4px 4px 2px #767676;background-color:#fff;position:fixed;top:0;bottom:0;left:-400px;transition:all .3s;width:0;z-index:16}.drawerleft__scrim{display:none;background-color:#000;opacity:.4;position:fixed;top:0;right:0;bottom:0;left:0;z-index:8;cursor:pointer}.isOpen__menu{left:0}.isOpen__scrim{display:block}@media only screen and (max-width:47.9375em){.headtop--input__cart span:first-of-type,.headtop__link{display:none}.headtop--input__cart{min-width:66px}body[data-brand=lsc] .l-grid-headtop{height:66px!important}body[data-brand=ltd] .l-grid-headtop{height:56px!important}body[data-brand=lsc] .headtop__hb{padding:12px 0 8px 8px}body[data-brand=ltd] .headtop__hb{padding:0 0 8px 8px}body[data-brand=lsc] .headtop--input__cart{margin:1px 6px 0 0}body[data-brand=ltd] .headtop--input__cart{margin:0 6px 0 0}.isOpen__menu{width:70%}}@media only screen and (min-width:48em) and (max-width:61.1875em){body[data-brand=lsc] .l-grid-headtop{height:63px!important}body[data-brand=ltd] .l-grid-headtop{height:56px!important}body[data-brand=lsc] .headtop--input__cart{margin:1px 1px 0 0}body[data-brand=ltd] .headtop--input__cart{margin:0 1px 0 0}.isOpen__menu{width:32%}}@media only screen and (max-width:61.1875em){.l-grid-headtop{width:inherit}.headtop__hb{display:block}.headtop__img{width:352px}body[data-brand=lsc] .headtop__img{background-image:url(/images/lsc-logo-md-sm.jpg);background-size:auto}body[data-brand=ltd] .headtop__img{background-image:url(/images/ltd-logo-md.jpg);background-size:auto auto}body[data-brand=lsc] .headtop__link{margin:7px 1px 1px}body[data-brand=ltd] .headtop__link{margin:5px 1px 1px}}
			/*  Above the Fold end      */
			</style>
			<link rel="preload" href="/media/components/headtop/headtop_skin.min.css" as="style" onload="this.rel='stylesheet'">
			<!--
			/*========================================*/
			/*  Component: headtop                    */
			/*================================ end ===*/
			-->
		
			<!--
			/*========================================*/
			/*  Component: headnav                    */
			/*================================ begin =*/
			-->
			<style>
			/*  Above the Fold begin    */
		.l-grid-headnav{padding:0;align-items:flex-start;border:1px #ccc solid;display:flex;flex-flow:row nowrap;height:42px;justify-content:space-between;margin:0 auto;width:980px}body,figcaption,figure,img,input,li,picture,section,ul{margin:0;padding:0}.l-grid-headnav nav{border-right:solid 1px #ccc;height:98%;padding-top:2px}.headnav__link{text-align:center}.headnav__link--a{font-family:sans-serif;font-size:12px;line-height:16.6px}.headnav__link--span{font-size:14px}.headnav__shop{width:12%}.headnav__search{width:44%}.headnav__search--grid{display:flex}.headnav__search--grid-l{width:86%}.headnav__search--input{border:solid 1px #ccc;border-radius:0;display:block;font-size:15px;height:28px;margin:4px 2px 2px 8px;padding:0 0 0 8px;width:100%}.headnav__search--go{border-radius:3px;border:0;box-shadow:none;font-size:1em;font-weight:400;height:28px;margin:6px 8px 6px 6px;min-width:36px;padding:4px;text-align:center;width:35px}.headnav__quick{width:13%}.headnav__order,.headnav__your{width:12%}.headnav__faq{width:7%;border:0!important}.faq-circle{border-radius:50%;display:inline-block;font-family:monospace;font-size:17px;height:24px;left:18px;line-height:24px;margin-top:6px;text-decoration:none;width:24px}@media only screen and (max-width:47.9375em){.headnav__link{display:none}.headnav__search{width:100%}.headnav__search--go{min-width:112px}}@media only screen and (max-width:61.1875em){.l-grid-headnav{width:inherit}}
			/*  Above the Fold end      */
			</style>
			<link rel="preload" href="/media/components/headnav/headnav_skin.min.css" as="style" onload="this.rel='stylesheet'">
			<!--
			/*========================================*/
			/*  Component: headnav                    */
			/*================================ end ===*/
			-->
		
			<!--
			/*========================================*/
			/*  Component: primebanr                  */
			/*================================ begin =*/
			-->
			<style>
			/*  Above the Fold begin    */
		.l-primebanr{display:block;margin:0 auto;padding:0;width:980px}.l-primebanr__whitespace{height:10px}.l-primebanr__img{width:100%}@media only screen and (max-width:61.1875em){.l-primebanr{width:inherit}}
			/*  Above the Fold end      */
			</style>
			<!--
			/*========================================*/
			/*  Component: primebanr                  */
			/*================================ end ===*/
			-->
		
			<!--
			/*========================================*/
			/*  Component: ProductCard                */
			/*================================ begin =*/
			-->
			<style>
			/*  Above the Fold begin    */
			 Beautify
		body,figcaption,figure,img,input,li,picture,section,ul{margin:0;padding:0}.l-grid-productcard>section{display:grid;grid-template-columns:repeat(5,1fr);margin:0 auto!important;width:980px}.productcard{padding:0;margin:0 5px 8px}.productcard .productcard__a{text-align:center;text-decoration:none}.productcard,.productcard .productcard__figcap{position:relative}.productcard .productcard__a--qv{display:none}.productcard:hover .productcard__a--qv{border-radius:3px;cursor:pointer;display:block;font-family:sans-serif;font-size:16px;font-weight:300;margin:2px 20%;padding:8px 6px;position:absolute;text-align:center;text-decoration:none;top:-68px;width:60%;z-index:176}.productcard__excl{font-size:9px;margin:0;padding:4px;position:absolute;top:-22px}.productcard .productcard__pic{display:block;height:0;overflow:hidden;padding-bottom:122%;position:relative}.productcard .productcard__img{height:100%;width:100%;margin:auto;position:absolute;top:0;left:0}.productcard .productcard__p{font-family:sans-serif;font-size:16px;font-weight:700;line-height:1em;margin:4px}.productcard .productcard__p--comp-price{display:block;font-size:13px;font-weight:500;line-height:1.2}.productcard .productcard__p--old-price{display:block;font-size:12px;font-weight:700}.productcard .productcard__h2{display:block;font-family:sans-serif;font-size:11px;font-weight:400;margin:0;text-decoration:underline}.drawerright__menu{box-shadow:-4px -4px 2px #767676;background-color:#fff;position:fixed;top:0;bottom:0;right:-400px;transition:all .3s;width:0;z-index:16}.drawerright__scrim{background-color:#000;cursor:pointer;display:none;opacity:.4;position:fixed;top:0;right:0;bottom:0;left:0;z-index:8}.isOpenR__menu{right:0;width:352px}.isOpenR__scrim{display:block}@media only screen and (max-width:47.9375em){.l-grid-productcard>section{grid-template-columns:1fr 1fr;width:inherit}.productcard:hover .productcard__a--qv{display:none}}@media only screen and (min-width:48em) and (max-width:61.1875em){.l-grid-productcard>section{grid-template-columns:repeat(5,1fr);width:inherit}}
			/*  Above the Fold end      */
			</style>
			<link rel="preload" href="/media/components/productcard/productcard_skin.min.css" as="style" onload="this.rel='stylesheet'">
			<!--
			/*========================================*/
			/*  Component: ProductCard                */
			/*================================ end ===*/
			-->
		
			<!--
			/*========================================*/
			/*  Component: footer2                    */
			/*================================ begin =*/
			-->
			<style>
			/*  Above the Fold begin    */
		border: 1px #e0dfdd solid;height: 276px;padding: 24px 0 0 0; margin: 0 auto 0 auto; width: inherit!important
		
		/*  CSS category Base     */ /*  reset margin padding ...  */
		.l-grid-footer2, body, figure, picture, img, figcaption, section, ul, li, input {
		  margin: 0;
		  padding: 0;
		}
		/*  CSS category Layout   */ /*  border display height media width ...  */
		.l-grid-footer2 {
		  /* align-content: not used if only one row */
		  align-items: flex-start;
			color: #fff;
		  display: flex;
		  flex-flow: row nowrap; /* Shorthand for flex-direction and flex-wrap */
		  height: 276px;
		  justify-content: space-between;
		  margin: 0 auto;
		  padding: 8px 0 2px;
		  width: inherit;
		}
		
		.l-grid-headtop nav:nth-of-type(3) { width: 50px; }
		.l-grid-headtop nav:nth-of-type(4) { width: 92px; }
		.l-grid-headtop nav:nth-of-type(5) { width: 83px; }
		.l-grid-headtop nav:nth-of-type(6) { width: 74px; }
		
		body[data-brand="lsc"] .l-grid-footer2 { background-color: #7e2d3e; }
		body[data-brand="ltd"] .l-grid-footer2 { background-color: #1f5f8b; }
		@media only screen and (max-width: 47.9375em) {
		/* small */
		}
		@media only screen and (min-width:48em) and (max-width:61.1875em){
		/* medium */
		@media only screen and (max-width:61.1875em){
		/* small and medium */
		}
		
		
			/*  Above the Fold end      */
			</style>
			<link rel="preload" href="/media/components/footer2/footer2_skin.min.css" as="style" onload="this.rel='stylesheet'">
			<!--
			/*========================================*/
			/*  Component: footer2                    */
			/*================================ end ===*/
			-->
		
			<!--
			/*========================================*/
			/*  Component: Mockup (delete me)         */
			/*================================ begin =*/
			-->
			<style>
			/*  Above the Fold begin    */
			.c-Mockup {
			background-color: #eee;
				margin: 0 auto;
				padding: 8px 0 2px;
				width: 980px;
			}
			@media only screen and (max-width:61.1875em){
			/* small and medium */
				.c-Mockup {
					width: inherit;
				}
			}
			/*  Above the Fold end      */
			</style>
			<!--
			/*========================================*/
			/*  Component: Mockup                     */
			/*================================ end ===*/
			-->
		<script data-ver="loadCSS v1.3.1">
		!function(a){"use strict";var b=function(b,c,d){function e(a){return h.body?a():void setTimeout(function(){e(a)})}function f(){i.addEventListener&&i.removeEventListener("load",f),i.media=d||"all"}var g,h=a.document,i=h.createElement("link");if(c)g=c;else{var j=(h.body||h.getElementsByTagName("head")[0]).childNodes;g=j[j.length-1]}var k=h.styleSheets;i.rel="stylesheet",i.href=b,i.media="only x",e(function(){g.parentNode.insertBefore(i,c?g:g.nextSibling)});var l=function(a){for(var b=i.href,c=k.length;c--;)if(k[c].href===b)return a();setTimeout(function(){l(a)})};return i.addEventListener&&i.addEventListener("load",f),i.onloadcssdefined=l,l(f),i};"undefined"!=typeof exports?exports.loadCSS=b:a.loadCSS=b}("undefined"!=typeof global?global:this);
		!function(a){if(a.loadCSS){var b=loadCSS.relpreload={};if(b.support=function(){try{return a.document.createElement("link").relList.supports("preload")}catch(b){return!1}},b.poly=function(){for(var b=a.document.getElementsByTagName("link"),c=0;c<b.length;c++){var d=b[c];"preload"===d.rel&&"style"===d.getAttribute("as")&&(a.loadCSS(d.href,d,d.getAttribute("media")),d.rel=null)}},!b.support()){b.poly();var c=a.setInterval(b.poly,300);a.addEventListener&&a.addEventListener("load",function(){b.poly(),a.clearInterval(c)}),a.attachEvent&&a.attachEvent("onload",function(){a.clearInterval(c)})}}}(this);
		</script>
		
		</head>
		
		<dsp:getvalueof var="currentSite" bean="Site.id" />
		<c:set var="brand" value="ltd" />
		<c:choose>
			<c:when test="${currentSite == 'LS' }">
				<c:set var="brand" value="lsc" />
			</c:when>
		</c:choose>
		<body data-brand="${brand}">
			<c:forEach var="element" items="${contentItem.MainContent}">
				<dsp:renderContentItem contentItem="${element}" />			
			</c:forEach>
		</body>

	</html>

</dsp:page>
