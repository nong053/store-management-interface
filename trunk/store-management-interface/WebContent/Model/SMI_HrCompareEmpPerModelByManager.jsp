<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String paramBranch=request.getParameter("paramBranch");

String paramAsfDate=request.getParameter("paramAsfDate");
//paramBranch="311";
//paramStartDate="2013-10-31";


connectionJNDI jndi = new connectionJNDI();
String columns="5,6,7,8,9,10,11,12";
String query="CALL SMI_ManPowerBranch("+paramBranch+",'"+paramAsfDate+"')";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());

%>