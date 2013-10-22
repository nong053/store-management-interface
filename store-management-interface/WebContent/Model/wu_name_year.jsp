<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String paramBranch=request.getParameter("paramBranch");
String paramStartDate=request.getParameter("paramStartDate");

connectionJNDI jndi = new connectionJNDI();
String columns="1,2";
//String query="CALL chartComparingAtmNewStudentsByFaculty('2555','3')";

String query="CALL test_nomalization_cateName_year()";
jndi.selectByIndexTest(query, columns);
out.println(jndi.getData());

%>