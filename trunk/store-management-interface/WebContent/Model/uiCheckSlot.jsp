<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.snp.store.service.*" %>
<%
	String paramUserLogin = request.getParameter("paramUserLogin");
	String paramSlotView = request.getParameter("paramSlotView");
	//paramUserLogin="N0001";
	//paramGraphId="1";
	//paramSlotView="6";

	manageSlot slot = new manageSlot();
	slot.setCheckSlot(paramUserLogin,paramSlotView);
	int numSlot=Integer.parseInt(slot.getCheckSlot());
	
	if(numSlot==0){
		//out.print("ok insert ");
	
		 out.print("{\"slot\":\"thisEmpty\"}");
		
		
	}else{
		out.print("{\"slot\":\"thisFully\"}");
	}
	
	
%>