<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
  <head>
    <title>DB Test</title>
  </head>
  <body>

  <%
  	com.snp.store.service.connectionJNDI jndi = new com.snp.store.service.connectionJNDI();
       /* 
      jndi.selectByIndex("select * from bd_branch","2,3");
      out.println("------------------");
      out.println(jndi.getData());
      jndi.selectByIndex("select * from bd_branchtrans","2,3");
      out.println("------------------");
      out.println(jndi.getData());
      
      jndi.selectByIndex("select * from bd_branchconstruction","2,3");
      out.println("------------------");
      out.println(jndi.getData());
      
      jndi.selectByIndex("select * from bd_branchtrans","2,3");
      out.println("------------------");
      out.println(jndi.getData());
      */
      //'s&p','Thailand','ภาคกลาง','กรุงเทพมหานคร','ALL'
      /*
      String query2="'Thailand','ภาคกลาง','กรุงเทพมหานคร','ALL'";
      String query3="'Thailand','ภาคกลาง','กรุงเทพมหานคร','ALL'";
      jndi.selectExpiring("CALL NotSparkLine('ALL','Thailand','ภาคกลาง','กรุงเทพมหานคร','ALL')",query2,query3);
      */
      
     // out.println(jndi.getData());

      /*
      jndi.setStoreFactsContract("CALL StoreFactsContract(415)","415","2,3,4,5,6,7,8,9,10,11,12,13,1");
    	out.println(jndi.getData());
    	out.println("<br>------------------ <br>");
    	
      jndi.selectByColumnName("CALL StoreFactsContract(415)","Address,TelNo,FaxNo,MobileNo,OpenDate,RentType,LocationType,LandlordGroup,BrandName,FormatName,TableQty,TotalSeatQty,RevenueSeatQty");
    	out.println(jndi.getData());
    	*/
    	out.println("<br>------------------ <br>");
    	/*
    	jndi.setOptionBranch("CALL ParameterBranch('ALL','Thailand','ภาคกลาง','กรุงเทพมหานคร','ALL')");
    	out.println(jndi.getOptionBranch());
    	*/
    	String columns="2";
    	String query="CALL ui_SMI_ListAllCategory( )";
    	jndi.selectByIndexConfig(query, columns);
    	out.println(jndi.getData());
    	
      //415 Brachcode
      //103 BrachKey
  %>


 

  </body>
</html>