<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@page import="com.snp.store.service.*" %>
<%
	String paramGraphName = request.getParameter("paramGraphName");

	//paramGraphName="salePerDay";
	String query="CALL SMI_callGraphBySubMenu('"+paramGraphName+"')";
	String columns="3,4,1,5";//graphName,graphType,graphId,graphNameTitle,myviewId
	manageSlot slot = new manageSlot();
	slot.selectByIndex(query,columns);
	out.println(slot.getData());
%>