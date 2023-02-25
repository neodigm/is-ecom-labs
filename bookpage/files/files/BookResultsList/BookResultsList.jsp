<%--
This page lays out the elements that make up the search results page/category page.

Required Parameters:
	contentItem
	The content item - results list type

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

<dsp:page>

	<%-- include javascript constants --%>
	<script><dsp:include page="/sitewide/data/jsConstants.jsp" /></script>

	<%-- imports --%>
	<dsp:importbean bean="/atg/commerce/catalog/ProductLookup" />
	<dsp:importbean bean="/atg/multisite/Site" />
	<dsp:importbean bean="/OriginatingRequest" var="originatingRequest" />
	<dsp:importbean bean="/atg/endeca/assembler/cartridge/manager/DefaultActionPathProvider"/>	

	<dsp:getvalueof var="contentItem" vartype="com.endeca.infront.assembler.ContentItem" value="${originatingRequest.contentItem}" />
	<dsp:getvalueof var="contextPath" vartype="java.lang.String" value="${originatingRequest.contextPath}" />
	<dsp:importbean bean="/atg/userprofiling/Profile" />
	<dsp:getvalueof var="currentBookId" bean="/atg/userprofiling/Profile.currentBookId"/>
  	<dsp:getvalueof var="defaultActionPath" bean="DefaultActionPathProvider.defaultExperienceManagerNavigationActionPath"/>		

	<%-- Render the search results. --%>
	<dsp:getvalueof var="size" value="${contentItem.totalNumRecs}" />
	<dsp:getvalueof var="page" value="${contentItem.recsPerPage}" />
	<input type="hidden" id="sizeTotalNumRecs" value="${size}" />
	<input type="hidden" id="pageRecsPerPage" value="${page}" />
	<dsp:getvalueof var="pageOffset" param="No" />
	<c:if test="${empty pageOffset}">
		<c:set var="pageOffset" value="0" />
	</c:if>
	<input type="hidden" id="pageOffsetVal" value="${fn:escapeXml(pageOffset)}" />
	<c:set var="question">
		<dsp:valueof param="Ntt"/>
	</c:set>
	<dsp:getvalueof var="bookId" param="bookId"/>
	
	<%--QC 63 --%>
	<c:set var="siteNavPath"><dsp:valueof bean="/atg/multisite/Site.siteNavPath"/></c:set>
	<c:if test="${empty siteNavPath}">
			<c:set var="siteNavPath" value="/browse"></c:set>
	</c:if>		
	

	<c:if test="${not empty contentItem.bookId}">
		<dsp:getvalueof var="bookIdParam" value="${contentItem.bookId}" />
		<input type="hidden" id="pageNumber" value="pageNumber_${bookIdParam}"/>
	</c:if>
	<%-- Display the number of search results if this is a query search --%>
	<%--Set the number of product columns to render--%>
	<c:set var="columnCount" value="5" />
	
	
	
	<ltdc-primebanr class="l-primebanr" role="banner"><!--  Component Begin  -->
	    <aside class="l-primebanr__whitespace"></aside>
	    <figure class="primebanr__fig" aria-label="Primary Banner">
	         <img class="l-primebanr__img" src="./N-1z0uo43_files/prime_banner_lg.png" alt="Special Offer" title="Special Offer"
						srcset="./N-1z0uo43_files/prime_banner_sm.png 764w, ./N-1z0uo43_files/prime_banner_md.png 978w, ./N-1z0uo43_files/prime_banner_lg.png 990w"
						sizes="(max-width: 766px) 764px, (min-width: 768px) and (max-width: 980px) 978px, (min-width: 982px) 990px">
	    </figure>
	</ltdc-primebanr><!--  Component End  -->
	
	<!--  bread page: c-breadpage  -->
	<aside class="c-Mockup" style="	border: 1px #e0dfdd solid;height: 48px;padding: 0; margin: 0 auto 8px  auto;"> Bread crumbs - pages</aside>

	<!--  refinements: c-refine -->
	<aside class="c-Mockup" style="	border: 1px #e0dfdd solid;height: 32px;padding: 0; margin: 0 auto 16px auto;"> Refine</aside>

<%-- 	<section id="sorting" class="sort-by hide-while-loading">
		Start -  Section to build the Breandscrumbs from the results
		<c:set var="bookPresent" value="false" />

		build price sort dropdown
		<a data-dropdown="includeSort" aria-controls="includeSort" class="small secondary radius button dropdown" aria-expanded="false">Sort</a>
		<ul id="includeSort" data-dropdown-content class="f-dropdown tiny">
			<c:choose>
				<c:when test="${contentItem.extSortOptions ne null}">
					<c:forEach var="sortOption" items="${contentItem.extSortOptions}">
						<c:if test="${sortOption.type != 'book'}">
							<c:url value="${sortOption.navigationState}" var="sortAction" />
							<li><a href="${siteNavPath}/${sortAction}">Price: ${sortOption.label}</a></li>
						</c:if>
						<c:if test="${sortOption.type == 'book' && bookPresent ne 'true'}">
							<c:set var="bookPresent" value="true" />
						</c:if>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<c:forEach var="sortOption" items="${contentItem.sortOptions}">
						<c:url value="${sortOption.navigationState}" var="sortAction" />
						<li><a href="${siteNavPath}/${sortAction}">${sortOption.label}</a></li>
					</c:forEach>
				</c:otherwise>
			</c:choose>
			build page sort dropdown
			<c:if test="${bookPresent eq 'true'}">
			<a href="#" data-dropdown="includePageSort" class="small secondary radius button dropdown">Page</a>
				<c:forEach var="sortOption" items="${contentItem.extSortOptions}">
					<c:if test="${sortOption.type == 'book'}">
						<c:url value="${sortOption.navigationState}" var="sortAction" />
						<li><a href="${siteNavPath}/${sortAction}">Page: ${sortOption.label}</a></li>
					</c:if>
				</c:forEach>
			</c:if>
		</ul>
		
		build pagination
		<ul id="paginationUL" class="pagination hide-while-loading">
			<c:set var="paginated" value="Y" />
			<dsp:include page="/global/gadgets/paginationTag.jsp">
				<dsp:param name="top" value="true" />
				<dsp:param name="contentItem" value="${content}" />
			</dsp:include>
		</ul>

		<c:set var="pageURL" value="${contentItem.pagingActionTemplate.navigationState}" />
		
		<c:if test="${fn:contains(pageURL, '?No')}">
			<c:set var="pageURL" value="${fn:substringBefore(pageURL, '?No')}" />
		</c:if>
		
		
		<c:url var="url" value="${pageURL}">
			<c:forEach items="${param}" var="entry">
				<c:if test="${entry.key == 'pageNum'}">
					<c:param name="${entry.key}" value="1" />
				</c:if>
				<c:if test="${entry.key == 'Ns'}">
					<c:param name="${entry.key}" value="${entry.value}" />
				</c:if>
				<c:if test="${entry.key == 'Ntt'}">
					<c:param name="${entry.key}" value="${entry.value}" />
				</c:if>
			</c:forEach>
		</c:url>
		

		build page sort dropdown
		<a href="#" data-dropdown="itemsPPUL" class="small secondary radius button dropdown override show-for-medium-up" data-wsid="ws-itemview">Item View</a>
		<ul id="itemsPPUL" data-dropdown-content class="f-dropdown tiny">
		<c:choose>
		<c:when test="${fn:indexOf(url,'?') != -1}">
			<c:set var="delim" value="&"/>
		</c:when>
		<c:otherwise>
			<c:set var="delim" value="?"/>
		</c:otherwise>
		</c:choose>
			<li><a href="${siteNavPath}/${url}${delim}Nrpp=20">20 per page</a></li>
			<li><a href="${siteNavPath}/${url}${delim}Nrpp=40">40 per page</a></li>
			<li><a href="${siteNavPath}/${url}${delim}Nrpp=60">60 per page</a></li>
			<li><a href="${siteNavPath}/${url}${delim}Nrpp=80">80 per page</a></li>
			<li><a href="${siteNavPath}/${url}${delim}Nrpp=${contentItem.totalNumRecs}">Show All</a></li>
		</ul>

	</section> --%>
	<%-- End -- Section to build the Breandcrumbs from the results --%>

  <ltdc-productcard id="js-productcard" class="l-grid-productcard" role="grid"><!--  Component Begin  -->
	<section role="rowgroup">
		
		<c:choose>
			<%-- No Results --%>
			<c:when test="${empty size || size == 0 }">
				<crs:messageContainer optionalClass="atg_store_noMatchingItem" titleKey="facet_facetSearchResults.noMatchingItem" />
			</c:when>
			<%-- Display Results --%>
			<c:otherwise>
				<c:if test="${not empty contentItem.bookId}">
					<dsp:getvalueof var="bookIdParam" value="${contentItem.bookId}" />
					<dsp:getvalueof var="bookMaxParam"
						value="${contentItem.bookMaxPage}" />
					<dsp:getvalueof var="profileMaxPage" bean="Profile.maxPageBookId" />
					<dsp:getvalueof var="bookPageMaxLimitCompare"
						bean="Profile.bookMaxPage" />
					<c:choose>
						<c:when test="${profileMaxPage != bookIdParam}">
							<dsp:setvalue bean="Profile.maxPageBookId" value="${bookIdParam}" />
							<dsp:setvalue bean="Profile.bookMaxPage" value="${bookMaxParam}" />
						</c:when>
						<c:when
							test="${(profileMaxPage == bookIdParam) && (bookMaxParam != bookPageMaxLimitCompare)}">
							<dsp:setvalue bean="Profile.maxPageBookId" value="${bookIdParam}" />
							<dsp:setvalue bean="Profile.bookMaxPage" value="${bookMaxParam}" />
						</c:when>
						<c:otherwise />
					</c:choose>
				</c:if>
				<dsp:getvalueof var="bookPageMaxLimit" bean="Profile.bookMaxPage" />
				<c:forEach var="record" items="${contentItem.records}"
					varStatus="loopStatus">
					<dsp:getvalueof var="index" value="${loopStatus.index}" />
					<dsp:getvalueof var="count" value="${loopStatus.count}" />
					<dsp:getvalueof var="productId"
						value="${record.attributes['product.repositoryId']}" />
					<dsp:droplet name="ProductLookup">
						<dsp:param name="id"
							value="${record.attributes['product.repositoryId']}" />
						<dsp:oparam name="output">
							<dsp:setvalue param="product" paramvalue="element" />
							<article class="productcard" aria-describedby="id-prod-COUNTER" role="row">
							<dsp:getvalueof var="productSites"
									param="product.siteIds" /> <dsp:getvalueof var="siteId"
									bean="Site.id" /> <dsp:contains var="productFromCurrentSite"
									values="${productSites}" object="${siteId}" /> <dsp:getvalueof
									var="product" param="element" /> <dsp:include
									page="/global/gadgets/inc_grid_productListRangeRowLTD.jsp">
									<dsp:param name="categoryId" param="product.parentCategory.id" />
									<dsp:param name="product" param="product" />
									<dsp:param name="categoryNav" value="false" />
									<dsp:param name="displaySiteIndicator"
										value="${!productFromCurrentSite}" />
									<dsp:param name="mode" value="name" />
									<c:if test="${not empty bookIdParam}">
										<dsp:param name="bookId" value="${bookIdParam}" />
									</c:if>
								</dsp:include>
								</article>
						</dsp:oparam>
					</dsp:droplet>
				</c:forEach>
			</c:otherwise>
		</c:choose>
		
		<!-- 
		<script type="application/ld+json">
		{
			"@context": "http://schema.org/",
			"@type": "Product",
			"name": "Tote with Hot/Cold Casserole Carrier",
			"image": "https://neodigm.github.io/is-ecom-labs/bookpage/N-1z0uo43_files/60256_mn.jpg",
			"description": "This 2-in-1 Tote with Hot/Cold Casserole Carrier is perfect for picnics, parties, tailgating and more. It lets you store hot or cold food and dry items in one convenient place. The tote holds dry goods and has an interior zippered pocket and a durable aluminum handle with grip.",
			"offers": {
	  			"@type": "Offer",
	  			"priceCurrency": "USD",
	  			"price": "11.98",
	  			"availability": "http://schema.org/InStock",
	  			"seller": {
	  				"@type": "Organization",
	    			"name": "LTD Commodities"
	  			}
			}
		}
		</script>
		 -->
		
		</section>
		<nav class="drawerright__menu" :class="{ isOpenR__menu: isOpenR__menu }"></nav>
		<nav class="drawerright__scrim" :class="{ isOpenR__scrim: isOpenR__scrim }" @click="toggle"></nav>
	</ltdc-productcard><!--  Component End  -->

		

		<c:if test="${not empty bookPageMaxSlide}">
			<input type="hidden" id="bookPageMaxSlide" value="${bookPageMaxSlide}"/>
		</c:if>
		<c:if test="${not empty bookPageMaxLimit}">
			<input type="hidden" id="bookPageMaxLimit" value="${bookPageMaxLimit}"/>
		</c:if>
		<c:if test="${empty bookPageMaxLimit}">
			<dsp:getvalueof var="bookPageMaxLimit" bean="Profile.bookMaxPage"/>
			<input type="hidden" id="bookPageMaxLimit" value="${bookPageMaxLimit}"/>
		</c:if>
		<c:if test="${empty bookPageMaxSlide}">
			<dsp:getvalueof var="bookPageMaxLimit" bean="Profile.bookMaxPage"/>
			<input type="hidden" id="bookPageMaxSlide" value="${bookPageMaxLimit}"/>
		</c:if>

	</div>

</dsp:page>

