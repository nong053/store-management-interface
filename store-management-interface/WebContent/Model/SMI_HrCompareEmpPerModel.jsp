<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String paramBranch=request.getParameter("paramBranch");
String paramStartDate=request.getParameter("paramStartDate");
connectionJNDI jndi = new connectionJNDI();
String columns="4,5,6,7,8,9,10,11";
//paramBranch="327";
//paramStartDate="2013-12-03";
String query="CALL SMI_ManPowerOverall("+paramBranch+",'"+paramStartDate+"')";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());

%>