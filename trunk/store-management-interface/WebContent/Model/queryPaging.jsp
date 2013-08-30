<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*"%>
<%
	String paramCateId = request.getParameter("paramCateId");
	String paramPagingStart = request.getParameter("pagingStart");
	String paramPagingEnd = request.getParameter("pagingEnd");
	String paramMachine = request.getParameter("paramMachine");
	
	/*
	paramCateName="ขาย";
	paramPagingStart="1";
	paramPagingEnd="4";
	paramMachine="Tablet";
	*/
	
	pagingService pj = new pagingService();
	
	if(paramMachine.equals("Tablet")){
		
	String query="CALL SMI_pagingListGraphTablet('"+paramCateId+"')";
	String columns="3,4,1,5";//graphName,graphType,graphId,graphNameTitle
	pj.selectByIndex(query, columns);
	out.print(pj.getData());	
		
	}else if(paramMachine.equals("Pc")){
	String query="CALL SMI_pagingListGraph('"+paramCateId+"','"+paramPagingStart+"','"+paramPagingEnd+"')";
	String columns="3,4,1,5";//graphName,graphType,graphId,graphNameTitle
	pj.selectByIndex(query, columns);
	out.print(pj.getData());
	}
	/*
	out.print("paramCateName"+paramCateName);
	out.print("paramPagingStart"+paramPagingStart);
	out.print("paramPagingEnd"+paramPagingEnd);
	*/
%>
