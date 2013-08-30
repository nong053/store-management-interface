<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
String paramBranch = request.getParameter("paramBranch");
String paramStartDate = request.getParameter("paramStartDate");
String parartEndDate = request.getParameter("parartEndDate");

connectionJNDI jndi = new connectionJNDI();
String columns="1,2";
String query="CALL SMI_WasteDaily('"+paramBranch+"','"+paramStartDate+"','"+parartEndDate+"')";
jndi.selectByIndexDwh(query,columns);
out.println(jndi.getData());
%>