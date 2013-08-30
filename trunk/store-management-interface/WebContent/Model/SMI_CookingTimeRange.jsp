<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.snp.store.service.*" %>
<%
String paramBranch = request.getParameter("paramBranch");
String paramYear = request.getParameter("paramYear");
String paramMonth = request.getParameter("paramMonth");


connectionJNDI jndi = new connectionJNDI();
String columns="1,2,3";
String query="CALL SMI_CookingTimeRange('"+paramBranch+"',"+paramYear+","+paramMonth+")";
jndi.selectByIndexDwh(query,columns);
out.println(jndi.getData());
%>