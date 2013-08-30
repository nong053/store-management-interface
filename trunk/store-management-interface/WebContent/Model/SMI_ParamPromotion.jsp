<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String paramYear = request.getParameter("paramYear");
String paramMonth = request.getParameter("paramMonth");
String paramBranch = request.getParameter("paramBranch");

connectionJNDI jndi = new connectionJNDI();
String columns="1,2";
String query="CALL SMI_ParamPromotion('311',2013,04)";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());

%>