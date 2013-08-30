
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.snp.store.service.*" %>
<%
	String paramMyViewId = request.getParameter("paramMyViewId");
	//paramUserLogin="N0001";
	
	String query="DELETE FROM ui_myview WHERE id="+paramMyViewId+"";
	manageSlot slot = new manageSlot();
    slot.deleteGrMyView(query);
%>