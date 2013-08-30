<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
String paramGraphName = request.getParameter("paramGraphName");
String paramStartWeek = request.getParameter("paramStartWeek");
String paramEndWeek = request.getParameter("paramEndWeek");
String paramBranch = request.getParameter("paramBranch");
String paramYear = request.getParameter("paramYear");

connectionJNDI jndi = new connectionJNDI();
/*
ProductCategoryName, sum(SalesAmountLastYear) as LastPeriod, 
sum(SalesAmount) as Current, sum(SalesTarget) as Target
*/
String columns="1,2,3,4";
//String query="CALL SMI_SalesByProductCategoryWeekly('001',2013,10,15)";
String query="CALL SMI_SalesByProductCategoryWeekly('"+paramBranch+"',"+paramYear+","+paramStartWeek+","+paramEndWeek+")";
jndi.selectByIndexDwh(query,columns);
out.println(jndi.getData());
%>