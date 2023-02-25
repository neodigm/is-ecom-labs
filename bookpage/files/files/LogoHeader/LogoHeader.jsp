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
	
	<ltdc-headtop id="js-headtop" class="l-grid-headtop">
			<nav class="headtop__hb">
				<a class="headtop__hb--a" @click="toggle">
					<hr class="headtop__hb--hr"><hr class="headtop__hb--hr"><hr class="headtop__hb--hr">
					<p class="headtop__hb--p">MENU</p>
				</a>
			</nav>
			<nav class="headtop__img">
				<a class="brand--ltd__showb headtop__img--a" href="/homeltd"></a>
				<a class="brand--lsc__showb headtop__img--a" href="/homels"></a>
			</nav>
			<nav class="headtop__link">
	Hello,<br><a class="headtop--a" href="/my_account/index.jsp">Sign In</a>
			</nav>
			<nav class="headtop__link">
	New Customer?<br><a class="headtop--a" href="/my_account/index.jsp">Register</a>
			</nav>
			<nav class="headtop__link">
	Request A<br><a class="headtop--a" href="/catalog_request/index.jsp">FREE Catalog</a>
			</nav>
			<nav class="headtop__link">
	Sign Up For<br><a data-reveal-id="id-email-sign-up-dialog" href="#">Email Offers</a>
			</nav>
			<nav class="headtop__cart">
				<button class="headtop--input__cart">
					<svg class="" fill="#FFFFFF" height="26" width="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"
					alt="Cart">
					    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
					    <path d="M0 0h24v24H0z" fill="none"/>
					</svg>
				<span class="headtop--input__carttxt">Cart</span><span class="headtop--input__cartqty">0</span>
				</button>
			</nav>
			<section class="drawerleft__menu" :class="{ isOpen__menu: isOpen__menu }"></section>
			<nav class="drawerleft__scrim" :class="{ isOpen__scrim: isOpen__scrim }" @click="toggle"></nav>
	</ltdc-headtop>
		
</dsp:page>