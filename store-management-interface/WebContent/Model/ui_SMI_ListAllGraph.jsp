<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
	connectionJNDI jndi = new connectionJNDI();
String columns="1,2";
String query="CALL ui_SMI_ListAllGraph( )";
jndi.selectByIndexConfig(query, columns);
out.println(jndi.getData());
%>
