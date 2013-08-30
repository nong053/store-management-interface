
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.snp.store.service.*" %>
<%
	String paramUserLogin = request.getParameter("paramUserLogin");
	//paramUserLogin="N0001";
	
	String query="CALL SMI_count_myview('"+paramUserLogin+"')";
	String columns="1";
	manageSlot slot = new manageSlot();
	slot.selectByIndex(query,columns);
	out.println(slot.getData());
%>