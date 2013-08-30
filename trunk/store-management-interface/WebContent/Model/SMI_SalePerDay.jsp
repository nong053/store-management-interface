<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String paramStartDate = request.getParameter("paramStartDate");
String paramEndDate = request.getParameter("paramEndDate");
String paramBranchId = request.getParameter("paramBranchId");
/*
out.print("paramStartDate="+paramStartDate);
out.print("paramEndDate="+paramEndDate);
out.print("paramBranchId="+paramBranchId);
*/
//paramStartDate=2013-07-01paramEndDate=2013-07-28paramBranchId=101
/*
paramStartDate="2013-01-01";
paramEndDate="2013-01-28";
paramBranchId="311";
*/
connectionJNDI jndi = new connectionJNDI();
//'2013-01-01','2013-01-30','311'
String columns="1,2,3,4";
String query="CALL SMI_SalesDaily('"+paramStartDate+"','"+paramEndDate+"','"+paramBranchId+"')";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());

%>
