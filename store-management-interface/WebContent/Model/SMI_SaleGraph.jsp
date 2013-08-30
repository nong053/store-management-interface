<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
	connectionJNDI jndi = new connectionJNDI();
String paramGraphName=request.getParameter("paramGraphName");

//out.print("paramGraphName"+paramGraphName);

if(paramGraphName.trim().equals("SalePerDay")){
	
String columns="1,2,3,4";
String query="CALL SMI_SalePerDay('2012-01-01','2012-03-31','322000')";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());

}else{
	out.println("[]");
}
/*
if(paramGraphName.trim().equals("SalePerMonth")){
	String columns="1,2,3,4,5,6,7,8";
	String query="CALL SMI_SalePerMonth(2012,1,2012,6,'322000')";
	jndi.selectByIndexDwh(query, columns);
	out.println(jndi.getData());
}

if(paramGraphName.trim().equals("CustomerPerMonth")){
	String columns="1,2,3,4,5,6,7,8";
	String query="CALL SMI_CustomerPerMonth(2012,1,'322000')";
	jndi.selectByIndexDwh(query,columns);
	out.println(jndi.getData());
}
*/
%>
