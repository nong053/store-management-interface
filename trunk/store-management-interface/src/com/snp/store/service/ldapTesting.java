package com.snp.store.service;






import javax.naming.directory.InitialDirContext;
import javax.naming.directory.DirContext;
import javax.naming.directory.Attributes.*;
import javax.naming.NamingException;
import javax.naming.directory.*;
import javax.naming.*;
import java.util.*;
import java.io.*;
import java.sql.*;
import java.net.*;
import java.util.StringTokenizer;
import javax.activation.*;

public class ldapTesting
{
public static void main(String a[])
{
String ENTRYDN = "cn="+"abc"+", ou=usermast,o="+"abc.com"+",c=US";// This is rootDN
Hashtable env = new Hashtable();
env.put(Context.INITIAL_CONTEXT_FACTORY,"com.sun.jndi.ldap.LdapCtxFactory");
env.put(Context.PROVIDER_URL,"ldap://"+"100.100.100.100"+":389");// This is your ldap URL
System.out.print("test");
try{

env.put(Context.SECURITY_PRINCIPAL,"cn=admin, o="+"abc.com"+", c=US");//DN
env.put(Context.SECURITY_CREDENTIALS,"mandiracharu");//This is password

DirContext ctx = new InitialDirContext(env);
Attributes userAttributes = new BasicAttributes(true);

/*
BasicAttribute basicattribute = new BasicAttribute("objectclass","top");
basicattribute.add(1, "person");
basicattribute.add(2, "OpenLDAPperson");
basicattribute.add(3, "connectme");
userAttributes.put(basicattribute);
//This depends upon your LDAP tree structure
userAttributes.put(new BasicAttribute("cn","abc"));
userAttributes.put(new BasicAttribute("userpassword","hello"));
userAttributes.put(new BasicAttribute("uid","abc"));
userAttributes.put(new BasicAttribute("sn","abc"));
userAttributes.put(new BasicAttribute("ispid","0005"));
userAttributes.put(new BasicAttribute("userblocked","no"));
userAttributes.put(new BasicAttribute("parentid","abc"));
userAttributes.put(new BasicAttribute("filename"," "));
userAttributes.put(new BasicAttribute("jpegphoto",""));
ctx.createSubcontext("uid="+"abc"+",ou=usermast,o=abc.com,c=US", userAttributes);//DN
*/
ctx.close();
}catch(Exception e){
e.printStackTrace();
//return "false";
}
//return "true";
}//end of verify

}//end of class
