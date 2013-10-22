<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String paramName=request.getParameter("paramName");


connectionJNDI jndi = new connectionJNDI();
String columns="1,2,3,4,5";
//String query="CALL chartComparingAtmNewStudentsByFaculty('2555','3')";

String query="CALL test_nomalizationAll(\""+paramName+"\")";
jndi.selectByIndexTest(query, columns);
out.println(jndi.getData());

%>