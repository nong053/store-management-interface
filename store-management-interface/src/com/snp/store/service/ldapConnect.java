package com.snp.store.service;

import javax.sql.*;
import java.sql.*;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.Hashtable;
import javax.naming.ldap.*;
import javax.naming.directory.*;
import javax.naming.*;

public class ldapConnect {
	Object dataObject;
	
	public void setLdap(String user ,String password) {

		Hashtable env = new Hashtable();
		String adminName = "uid="+user+",ou=corporate,dc=snp,dc=com";
		String adminPassword = password;
		String ldapURL = "ldap://10.14.222.14:389";

		env.put(Context.INITIAL_CONTEXT_FACTORY,
				"com.sun.jndi.ldap.LdapCtxFactory");

		// set security credentials
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		env.put(Context.SECURITY_PRINCIPAL, adminName);
		env.put(Context.SECURITY_CREDENTIALS, adminPassword);

		// connect to my domain controller
		env.put(Context.PROVIDER_URL, ldapURL);
		try {

			// Create the initial directory context
			DirContext ctx = new InitialLdapContext(env, null);

			// Create the search controls
			SearchControls searchCtls = new SearchControls();

			// Specify the attributes to return
			String returnedAtts[] = { "ou" ,"description"};
			searchCtls.setReturningAttributes(returnedAtts);

			// Specify the search scope
			searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);

			// specify the LDAP search filter
			// mailNickname and sAMAccountName is same, but sAMAccountName is
			// Old NT 4.0 logon name and it may confuse to CN attribute.
			String searchFilter = "(&(member=uid="+user+",ou=corporate,dc=snp,dc=com))";
			// String searchFilter = "uid={0},ou=corporate,dc=snp,dc=com";
			// Specify the Base for the search
			String searchBase = "ou=bi-operation-dashboard,ou=ApplicationGroup,dc=snp,dc=com";

			// initialize counter to total the results
			int totalResults = 0;

			// Search for objects using the filter
			NamingEnumeration answer = ctx.search(searchBase, searchFilter,
					searchCtls);

			// Loop through the search results
			JSONArray obj_json = new JSONArray();
			while (answer.hasMoreElements()) {
				JSONArray sub_obj_json = new JSONArray();
				SearchResult sr = (SearchResult) answer.next();

				totalResults++;

				//System.out.println(">>>" + sr.getName());

				// Print out some of the attributes, catch the exception if the
				// attributes have no values
				Attributes attrs = sr.getAttributes();
				if (attrs != null) {
					try {
						// System.out.println("   name: " +
						// attrs.get("sn").get());
						//System.out.println("  Organization: "+ attrs.get("ou").get());
						sub_obj_json.put(attrs.get("ou").get());
						sub_obj_json.put(attrs.get("description").get());
						

					} catch (NullPointerException e) {
						System.out.println("Errors listing attributes: " + e);
					}
				}
				obj_json.put(sub_obj_json);
			}
			dataObject=obj_json;
			
			//System.out.println("Total results: " + totalResults);
			ctx.close();

		} catch (NamingException e) {
			//System.err.println("Problem searching directory: " + e);
		}
	}
	public Object getRole(){
		return dataObject;
	}

}