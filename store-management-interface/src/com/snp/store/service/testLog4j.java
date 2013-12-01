package com.snp.store.service;

import org.apache.log4j.Logger;
import java.io.*;
public class testLog4j {
private static Logger logger=Logger.getLogger("testLog4j");
  public static void main(String[] args){
   try{
      FileInputStream fstream = 
                         new FileInputStream("D:\\textfile.txt");
      DataInputStream in = 
                         new DataInputStream(fstream);
      BufferedReader br = 
                  new BufferedReader(new InputStreamReader(in));
      String strLine;
      while ((strLine = br.readLine()) != null){
    System.out.println (strLine);
      }
      in.close();
   }catch (FileNotFoundException fe){
    logger.error("File Not Found",fe);
        logger.warn("This is a warning message");
        logger.trace("This message will not be logged since log level is set as DEBUG");
   }catch (IOException e){
    logger.error("IOEXception occured:", e);
  }
 }
}