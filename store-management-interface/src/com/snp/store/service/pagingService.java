package com.snp.store.service;
import javax.naming.*;
import javax.sql.*;

import java.sql.*;

import org.json.JSONArray;
import org.json.JSONException;

public class pagingService {
	
	//Declare Variable
	Object dataObject;
	Object objecctPaging;
	
	//Set Method
	public void setTest(){
		try{
			Context ctx =new InitialContext();
			if(ctx==null){
				throw new Exception("Boom No Context");
			}
			DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/jndiDB");
			if(ds!=null){
				Connection conn =ds.getConnection();
				if(conn!=null){
					Statement stmt= conn.createStatement();
					ResultSet rs = stmt.executeQuery("select * from register_tbl");
					
					JSONArray obj = new JSONArray();
					while(rs.next()){
						obj.put(rs.getString(1));
						dataObject = obj;
					}
					
					conn.close();
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	public void setPaging(){
		try{
			Context ctx =new InitialContext();
			if(ctx==null){
				throw new Exception("Boom No Context");
			}
			DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/jndiDB");
			if(ds!=null){
				Connection conn =ds.getConnection();
				if(conn!=null){
					Statement stmt= conn.createStatement();
					ResultSet rs = stmt.executeQuery("select * from month");
					
					JSONArray obj = new JSONArray();
					while(rs.next()){
						obj.put(rs.getString(1));
						dataObject = obj;
					}
					
					conn.close();
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	
	public void setQueryPaging(String query){
		try{
			Context ctx = new InitialContext();
			if(ctx==null) throw new Exception("Boom No Context");
			DataSource ds =(DataSource)ctx.lookup("java:comp/env/jdbc/jndiDB");
			if(ds!=null){
				Connection conn=ds.getConnection();
				if(conn!=null){
					Statement stmt = conn.createStatement();
					ResultSet rs = stmt.executeQuery(query);
					JSONArray object = new JSONArray();
					
					while(rs.next()){
						JSONArray subObject = new JSONArray();
						subObject.put(rs.getString(1));
						subObject.put(rs.getString(2));
						
						
						object.put(subObject);
					}
					objecctPaging=object;
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	public void selectByIndex(String query,String columns) {

	    try{
	      Context ctx = new InitialContext();
	      if(ctx == null ) 
	          throw new Exception("Boom - No Context");

	      DataSource ds = 
	            (DataSource)ctx.lookup(
	               "java:comp/env/jdbc/snp-Config");

	      if (ds != null) {
	        Connection conn = ds.getConnection();
	              
	        if(conn != null)  {
	        	dataObject="";
	            Statement stmt = conn.createStatement();
	            ResultSet rst = 
	                stmt.executeQuery(query);
	            String[] fieldSplit=columns.split(",");
	            
	            JSONArray obj_json = new JSONArray();
	            
	            	
	            while(rst.next()) {
	            	
	            	JSONArray sub_obj_json = new JSONArray();
	            	for(int i=0;i<fieldSplit.length;i++){
	            		
	            		sub_obj_json.put(rst.getString(Integer.parseInt(fieldSplit[i])));
	            		
	            	}
	            	obj_json.put(sub_obj_json);

	            }
	            dataObject=obj_json;
	            conn.close();
	        }
	      }
	    }catch(Exception e) {
	      e.printStackTrace();
	    }
	 }
	
	//get Method
	public Object getPaging(){
		return dataObject;
	}
	public Object getQueryPaging(){
		return objecctPaging;
	}
	public Object getData(){
		return dataObject;
	}
}
