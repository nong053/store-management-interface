<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@page import="com.snp.store.service.*" %>
<%
String ParamSalePerMonthType = request.getParameter("ParamSalePerMonthType");
String paramDate = request.getParameter("paramDate");
String paramBranch = request.getParameter("paramBranch");


connectionJNDI jndi = new connectionJNDI();

//ParamSalePerMonthType="salePerMonthTypeYTD";
if(ParamSalePerMonthType.equals("salePerMonthTypeMTD")){
	/*
	sum(MTDLastYear), sum(MTDCurrent), sum(MTDTarget), sum(FullMonthTarget),
	PercentSalesDiffLastYear,PercentSalesDiffTarget,PercentTargetDiff
	*/
String columns="1,2,3,4,5,6,7";
String query="CALL SMI_SalesMonthlyMTD('"+paramDate+"','"+paramBranch+"')";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());

}else if(ParamSalePerMonthType.equals("salePerMonthTypeYTD")){
	/*
	sum(YTDLastYear), sum(YTDCurrent), sum(YTDTarget), sum(FullYearTarget),
	PercentSalesDiffLastYear,PercentSalesDiffTarget,PercentTargetDiff
	*/
String columns="1,2,3,4,5,6,7";
String query="CALL SMI_SalesMonthlyYTD('"+paramDate+"','"+paramBranch+"')";
jndi.selectByIndexDwh(query, columns);
out.println(jndi.getData());	
	
}
%>
