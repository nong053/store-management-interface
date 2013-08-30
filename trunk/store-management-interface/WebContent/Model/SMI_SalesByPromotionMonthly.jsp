<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
String paramBranch = request.getParameter("paramBranch");
String paramYear = request.getParameter("paramYear");
String paramMonth = request.getParameter("paramMonth");
String paramPromotionCode1 = request.getParameter("paramPromotionCode1");
String paramPromotionCode2 = request.getParameter("paramPromotionCode2");
String paramPromotionCode3 = request.getParameter("paramPromotionCode3");
String paramPromotionCode4 = request.getParameter("paramPromotionCode4");
String paramPromotionCode5 = request.getParameter("paramPromotionCode5");
String paramPromotionCode6 = request.getParameter("paramPromotionCode6");

connectionJNDI jndi = new connectionJNDI();

//PromotionName, YTDSalesTarget, YTDSalesAmount, YTDSalesAmountLastYear
String columns="1,2,3,4";
//vBranch,vYear,v_Month,v_PromotionCode1,v_PromotionCode2,v_PromotionCode3 ,v_PromotionCode4,v_PromotionCode5,v_PromotionCode6
String query="CALL SMI_SalesByPromotionMonthly ('"+paramBranch+"',"+paramYear+","+paramMonth+",'"+paramPromotionCode1+"','"+paramPromotionCode2+"','"+paramPromotionCode3+"','"+paramPromotionCode4+"','"+paramPromotionCode5+"','"+paramPromotionCode6+"')";
jndi.selectByIndexDwh(query,columns);
out.println(jndi.getData());
%>