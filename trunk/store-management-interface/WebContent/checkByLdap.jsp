<%@page import="com.snp.store.service.ldapConnect"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>


  <%
  	String paramUser = request.getParameter("paramUser");
  	String paramPassword = request.getParameter("paramPassword");
  	//paramUser="1000740";
  	//paramPassword="Snp00740";
  	
  	ldapConnect ldap = new ldapConnect();
  
    	
    	ldap.setLdap(""+paramUser+"",""+paramPassword+"");
    	//ldap.setLdap("1000740","Snp00740");
    	//out.println(ldap.getRole());
    	if(ldap.getRole()!=null){
    		session.setAttribute("userName", paramUser);
    		session.setAttribute("password", paramPassword);
    		out.println(ldap.getRole());
    	}else{
    		out.println("[\"loginFailed\"]");
    	}
    	//out.println(ldap.getTest());
  %>