<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
String paramWeek = request.getParameter("paramWeek");
String paramYear = request.getParameter("paramYear");

connectionJNDI jndi = new connectionJNDI();
//SalesType, CustomerTarget, CurrentCustomer, LastYearCustomer, SalesTarget, CurrentSales, LastYearSales

String columns="1";
//paramWeek="52";
String query="CALL SMI_weekInterval('"+paramYear+"','"+paramWeek+"')";
jndi.selectByIndexDwh(query,columns);
out.println(jndi.getData());
%>
