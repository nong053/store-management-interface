<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*"%>
<%
	String paramCateId = request.getParameter("paramCateId");
	//paramCateName="";
	pagingService pj = new pagingService();
	/*	
	pj.setPaging();
	out.print(pj.getPaging());
	*/

	
	/*
	connectionJNDI jndi= new connectionJNDI();
	jndi.init2();
	out.print("getData"+jndi.getData());
	*/
	String query="CALL ui_SMI_ListGraphOfCategory('"+paramCateId+"')";
	//String query="CALL ui_SMI_ListGraphOfCategory('1')";
	String columns="1,2,3,4";
	pj.selectByIndex(query, columns);
	out.print(pj.getData());
%>
