<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String paramBranch=request.getParameter("paramBranch");
connectionJNDI jndi = new connectionJNDI();
String columns="1";
String query="CALL SMI_ManPowerOverallAsOfDate()";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());

%>