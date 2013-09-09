<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*"%>
<%
	String paramCateId = request.getParameter("paramCateId");
	pagingService pj = new pagingService();	
	//paramCateId="1";
	String query="CALL SMI_pagingListGraphTablet('"+paramCateId+"')";
	String columns="5";//graphName,graphType,graphId,graphNameTitle
	pj.selectByIndex(query, columns);
	out.print(pj.getData());	
	
%>
