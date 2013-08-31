
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String paramYear = request.getParameter("paramYear");
//paramYear="2013";
connectionJNDI jndi = new connectionJNDI();
String columns="1,2";
//paramYear="2013";
String query="CALL SMI_ParamWeekInterval('"+paramYear+"')";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());

%>