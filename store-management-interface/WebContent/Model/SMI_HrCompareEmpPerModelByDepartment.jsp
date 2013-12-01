<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String paramBranch=request.getParameter("paramBranch");
String paramSubBranch=request.getParameter("paramSubBranch");
String paramAsofDate=request.getParameter("paramAsofDate");
//paramBranch="311";
//paramSubBranch="ครัว";
//paramAsofDate="2013-10-30";
connectionJNDI jndi = new connectionJNDI();
String columns="7,8,9,10,11,12,13,14";
String query="CALL SMI_ManPowerByOrganization("+paramBranch+",'"+paramSubBranch+"','"+paramAsofDate+"')";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());

%>