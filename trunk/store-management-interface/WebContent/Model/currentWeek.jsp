
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.snp.store.service.*" %>
<%
	String paramDate = request.getParameter("paramDate");
	
	String query="CALL SMI_CurrentWeek('"+paramDate+"')";
	String columns="1,2";
	connectionJNDI jndi = new connectionJNDI();
	jndi.selectByIndexDwh(query,columns);
	out.println(jndi.getData());
%>