<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
String paramGraphName = request.getParameter("paramGraphName");
String paramStartWeek = request.getParameter("paramStartWeek");
String paramEndWeek = request.getParameter("paramEndWeek");
String paramBranch = request.getParameter("paramBranch");
String paramYear = request.getParameter("paramYear");

connectionJNDI jndi = new connectionJNDI();


String columns="1,2,3,4";
String query="CALL SMI_SalesPerBillWeekly ('"+paramBranch+"','"+paramYear+"','"+paramStartWeek+"','"+paramEndWeek+"')";
//String query="CALL SMI_SalesPerBillWeekly ('001','2013','10','15')";
jndi.selectByIndexDwh(query,columns);
out.println(jndi.getData());
%>