<%@page import="com.snp.store.service.testLog4j"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

  <%
 	
  testLog4j log4j = new testLog4j();
 // log4j.setLog4j();
  out.print(log4j.getTest());
  
   	
  %>