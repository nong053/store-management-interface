package com.snp.store.service;
import javax.naming.*;
import javax.sql.*;

import java.sql.*;

import org.json.JSONArray;
import org.json.JSONException;

public class manageSlot {
	Object data;
	String dataCheckSlot;
	Object dataListSlot;
	Object dataObject;
	String data1;
	
	//default config
	Context ctx;
	DataSource ds;
	Connection conn;
	Statement st ;
	
	public manageSlot(){
		try{
			ctx = new InitialContext();
			if(ctx==null) throw new Exception("Context is not create");
			 ds=(DataSource)ctx.lookup("java:comp/env/jdbc/snp-Config");
			if(ds!=null){
				 conn=ds.getConnection();
				if(conn!=null){
					 st = conn.createStatement();
				}
			}
			
		}catch (Exception e){
			e.printStackTrace();
		}
	}
	public void setCheckSlot(String paramUserLogin,String paramViewSlot){
		
		try{
			Context ctx = new InitialContext();
			if(ctx==null) throw new Exception("Context is not create");
			DataSource ds=(DataSource)ctx.lookup("java:comp/env/jdbc/snp-Config");
			if(ds!=null){
				Connection conn=ds.getConnection();
				if(conn!=null){
					Statement st = conn.createStatement();
					ResultSet result = st.executeQuery("CALL SMI_check_slot('"+paramUserLogin+"','"+paramViewSlot+"')");
					while(result.next()){
					dataCheckSlot=result.getString(1);
					}
					conn.close();
				}
			}
			
		}catch (Exception e){
			e.printStackTrace();
		}
		
		
	}
	
	
public void setListSlot(String paramUserLogin){
		
		try{
			Context ctx = new InitialContext();
			if(ctx==null) throw new Exception("Context is not create");
			DataSource ds=(DataSource)ctx.lookup("java:comp/env/jdbc/snp-Config");
			if(ds!=null){
				Connection conn=ds.getConnection();
				if(conn!=null){
					Statement st = conn.createStatement();
					ResultSet result = st.executeQuery("CALL SMI_list_slot('"+paramUserLogin+"')");
					JSONArray objListSlot = new JSONArray();
					while(result.next()){
						JSONArray objListSlotSub = new JSONArray();
						objListSlotSub.put(result.getString(1));
						objListSlotSub.put(result.getString(2));
						objListSlotSub.put(result.getString(3));
						objListSlotSub.put(result.getString(4));
						objListSlotSub.put(result.getString(5));
						
						objListSlot.put(objListSlotSub);
					}
					
					dataListSlot=objListSlot;
					conn.close();
				}
			}
			
		}catch (Exception e){
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



	public void insertGrMyView(String arGraphId,String arUserId,String arViewSlot){
		try{
			 st.executeUpdate("INSERT INTO ui_myview(graphId,userId,viewSlot)VALUES('"+arGraphId+"','"+arUserId+"','"+arViewSlot+"')");
			 conn.close();

		}catch (Exception e){
			e.printStackTrace();
		}
	}
	public void updateGrMyView(String query){
		try{
			st.executeUpdate(query);
			dataObject="[success]";
			conn.close();
		}catch (Exception e){
			e.printStackTrace();
		}
	}
	public void deleteGrMyView(String query){
		
		try{
			st.executeUpdate(query);
			dataObject="[success]";
			conn.close();
		}catch (Exception e){
			e.printStackTrace();
		}
		
	}
	
	public Object getReturnValue(){
		return data;
	}
	public String getCheckSlot(){
		return dataCheckSlot;
	}
	public Object getListSlot(){
		return dataListSlot;
	}
	public Object getData(){
		return dataObject;
	}
	public String getData1(){
		return data1;
	}
}
