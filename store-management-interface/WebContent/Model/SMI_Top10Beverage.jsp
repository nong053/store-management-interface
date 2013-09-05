<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
String paramBranch = request.getParameter("paramBranch");
String paramStartDate = request.getParameter("paramStartDate");
String paramEndDate = request.getParameter("paramEndDate");

connectionJNDI jndi = new connectionJNDI();
/*
BranchCode,date,PLU_Code,BranchName,PLU_Name,SalesQty,SalesQtyLastMonth,
sum(SalesAmount)as totalSaleAmount,sum(SalesQtyLastMonth)as totalSalesQtyLastMonth
*/

String columns="5,6,7,8,9";
String query="CALL SMI_Top10Beverage ('"+paramBranch+"','"+paramStartDate+"','"+paramEndDate+"')";
jndi.selectByIndexDwh(query,columns);
out.println(jndi.getData());
%>