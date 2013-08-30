<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
String paramBranch = request.getParameter("paramBranch");
String paramStartDate = request.getParameter("paramStartDate");
String paramEndDate = request.getParameter("paramEndDate");


connectionJNDI jndi = new connectionJNDI();
/*
PLU_Name, 
sum(SalesQtyLastMonth) as SalesQtyLastPeriod, 
sum(SalesQty) as SalesQtyCurrent,
sum(SalesAmountLastMonth) as SalesAmtLastPeriod, 
sum(SalesAmount) as SalesAmtCurrent
*/

String columns="1,2,3,4,5";
String query="CALL SMI_Top10Bakery('"+paramBranch+"','"+paramStartDate+"','"+paramEndDate+"')";
jndi.selectByIndexDwh(query,columns);
out.println(jndi.getData());
%>