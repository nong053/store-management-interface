<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.snp.store.service.*" %>
<%
	String paramUserLogin = request.getParameter("paramUserLogin");
	String paramGraphId = request.getParameter("paramGraphId");
	//paramGraphId="1";
	//paramUserLogin="N0001";
	
	manageSlot slot = new manageSlot();
	slot.setListSlot(paramUserLogin);
	out.print(slot.getListSlot());

	
	/*
	int numSlot=Integer.parseInt(slot.getListSlot());
	if(numSlot==0){
		out.print("ok insert avarible");
	}else{
		out.print("no insert not avarible");
	}
	*/
	/*
	out.print("paramUserLogin="+paramUserLogin+"<br>");
	out.print("paramGraphName="+paramGraphName+"<br>");
	out.print("paramGrachType="+paramGrachType+"<br>");
	out.print("paramGraphId="+paramGraphId+"<br>");
	*/

%>