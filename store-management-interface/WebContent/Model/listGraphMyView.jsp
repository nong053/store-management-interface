

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.snp.store.service.*" %>
<%
	String paramUserLogin = request.getParameter("paramUserLogin");
	paramUserLogin="N0001";
	
	String query="CALL SMI_list_myview('"+paramUserLogin+"')";
	String columns="1,2,3,4,5,6,7";
	//graphId,ug.graphname,graphtype,userId,viewSlot,uv.id,ug.graphnametitle
	manageSlot slot = new manageSlot();
	slot.selectByIndex(query, columns);
	out.print(slot.getData());
%>
