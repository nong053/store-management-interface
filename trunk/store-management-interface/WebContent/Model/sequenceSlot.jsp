
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.snp.store.service.*" %>
<%
	String paramNewSlot = request.getParameter("paramNewSlot");
    String paramOldSlot = request.getParameter("paramOldSlot");
    String paramUserLogin = request.getParameter("paramUserLogin");
	//paramUserLogin="N0001";
	
	//SMI_sequence_slot
	manageSlot slot = new manageSlot();
	String query="CALL SMI_sequence_slot("+paramOldSlot+","+paramNewSlot+","+paramUserLogin+");";
	String columns="";
	slot.updateGrMyView(query);
	//out.println("paramNewSlot"+paramNewSlot);//3
	//out.println("paramOldSlot"+paramOldSlot);//4
	
    
%>