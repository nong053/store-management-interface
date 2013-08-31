<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.snp.store.service.*" %>
<%
	String paramSlotView = request.getParameter("paramSlotView");
	String paramMyviewId = request.getParameter("paramMyviewId");
	String paramGraphId = request.getParameter("paramGraphId");
	//paramUserLogin="N0001";
	//paramGraphId="1";
	//paramSlotView="6";

	manageSlot slot = new manageSlot();
	String query="CALL ui_SMI_UpdateSlot("+paramSlotView+","+paramGraphId+","+paramMyviewId+")";
	slot.updateGrMyView(query);
	out.print("{\"result\":\"success\"}");
	
		

%>