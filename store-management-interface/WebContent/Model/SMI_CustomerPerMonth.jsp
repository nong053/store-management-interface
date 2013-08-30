<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
String paramGraphName = request.getParameter("paramGraphName");
String paramStartWeek = request.getParameter("paramStartWeek");
String paramEndWeek = request.getParameter("paramEndWeek");
String paramBrach = request.getParameter("paramBranch");
String paramYear = request.getParameter("paramYear");

connectionJNDI jndi = new connectionJNDI();
//SalesType, CustomerTarget, CurrentCustomer, LastYearCustomer, SalesTarget, CurrentSales, LastYearSales

String columns="1,2,3,4,5,6,7";
//String query="CALL SMI_CustomerWeekly('311','2013','10','15')";
String query="CALL SMI_CustomerWeekly('"+paramBrach+"','"+paramYear+"','"+paramStartWeek+"','"+paramEndWeek+"')";
jndi.selectByIndexDwh(query,columns);
out.println(jndi.getData());
%>
