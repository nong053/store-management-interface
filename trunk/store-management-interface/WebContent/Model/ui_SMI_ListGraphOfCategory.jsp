<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
	String paramCateId = request.getParameter("paramCateId");
//out.println("paramCateName"+paramCateName);
connectionJNDI jndi = new connectionJNDI();
String columns="1,2,3,4";
String query="CALL ui_SMI_ListGraphOfCategory ('"+paramCateId+"')";
jndi.selectByIndexConfig(query, columns);
out.println(jndi.getData());
%>
