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
	
		<ltdc-headnav id="js-headnav" class="l-grid-headnav">
			<nav class="headnav__shop headnav__link">
				<a class="headnav__link--a" href="/shopCatalogs">Shop our<br><span class="headnav__link--span">Catalogs</span></a>
			</nav>
			<nav class="headnav__search">
				<section class="headnav__search--grid">
					<input class="headnav__search--input" placeholder="Search item# or keyword" type="text" aria-required="true"
						aria-label="Search item# or keyword" autocomplete="off">
					<button class="headnav__search--go">
						<span class="headnav__search--gotxt">Go</span>
					</button>
				</section>
			</nav>
			<nav class="headnav__quick headnav__link">
				<a class="headnav__link--a" href="/catalog/catalog_quick_order.jsp">Quick<br><span class="headnav__link--span">Order Form</span></a>
			</nav>
			<nav class="headnav__your headnav__link">
				<a class="headnav__link--a" href="/my_account/manage_account.jsp">Your<br><span class="headnav__link--span">Account</span></a>
			</nav>
			<nav class="headnav__order headnav__link">
				<a class="headnav__link--a" href="/my_account/order_history/order_history_listing.jsp">Order<br><span class="headnav__link--span">Status</span></a>
			</nav>
			<nav class="headnav__faq headnav__link">
				<a class="faq-circle" href="/content/faq">?</a>
			</nav>
		</ltdc-headnav>

</dsp:page>