<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
	String paramCurrentDate = request.getParameter("paramCurrentDate");
	//paramCurrentDate="2013-01-01";
	String query="CALL currentDateDel2Day('"+paramCurrentDate+"')";
	String columns="1";
	connectionJNDI jndi = new connectionJNDI();
	jndi.selectByIndexDwh(query,columns);
	out.println(jndi.getData());
%>