<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
    <head>
        <title>SMI User - Login</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="gwt:property" content="locale=th_TH">
        <!-- Uncomment to put your own favicon -->
        <link rel="shortcut icon" href="/pentaho-style/favicon.ico" /> 
        <style type="text/css" media="screen, projection">
            *{margin:0;padding:0;}
            html{font-size:100%;}
            body{background:#fff;color:#222;font-family:"Helvetica Neue", Arial, Helvetica, sans-serif;text-align:center;font-size:75%;}
            h2{font-size:2em;margin-bottom:0.75em;}
            .error{background:#FBE3E4;border:2px solid #FBC2C4;color:#8a1f11;margin-bottom:3em;text-align:center;width:97%;padding:6px;}
            #login-logo{padding:30px 0;}
            #login-form{background:#fff;border:1px solid #ccc;text-align:center;width:599px;-moz-border-radius:5px;-webkit-border-radius:5px;-moz-box-shadow:1 1px 3px #ddd;-webkit-box-shadow:0 1px 3px #ddd;margin:0 auto;padding:5px 0px 25px;}
            #login-form h2{text-align:center;padding:5px 0;}
            #login-form .field{width:595px;margin:15px 0;}
            #login-form .field label{color:#777;font-size:1em;font-weight:700;margin-bottom:5px;text-align:left;}
            #login-form .field input{border:2px solid #ccc;font-size:1.2em;width:50%;padding:5px;}
        </style>
        <script src="js/jquery.min.1.7.1.js"></script>
        <script type="text/javascript">
            // If the Username and Password values are blank then alert();
            // This can be replaced with an AJAX solution
            //var ObBranch="";
           $(document).ready(function(){
        	  $("form#sw-login").submit(function(){
        		 
        		  
        		  if(($("#username").val()=="") && ($("#password").val()=="")){
        			  alert("You can not have a blank Username and Password!");
        		  }else{
        			  $.ajax({
        				 url:"checkByLdap.jsp",
        				 type:"get",
        				 dataType:"json",
        				 data:{"paramUser":$("#username").val(),"paramPassword":$("#password").val()},
        				 success:function(data){
        					 //console.log(data);
        					 if(data[0]=="loginFailed"){
        						 alert("Login is Failed");
        					 }else{
        						 //"WebContent/View/index.jsp"
        						//alert(data[0][0]);
        						 $(location).attr({"href":"View/index.jsp"});
        					 }
        				 }
        			  });
        		  }
        		 
        		 return false;
        	  });
           });
        </script>
    </head>
    <body>
		 
        <!-- Login Logo -->
        <div id="login-logo">
            
        </div>
        <!-- Login Form -->
        <div id="login-form">
            <!-- Header -->
			<img src="./images/snp_logo.jpg" alt="S&P Company Logo" >
            <!-- If the login_error URL parameter is set then show error box -->
            
            <!-- Form -->
            <form id="sw-login" method="POST" action="/pentaho/j_spring_security_check">
                <!-- Username -->
                <div class="field">
                    <label for="username">User &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label>
                    <input id="username" name="j_username" type="text">
                </div>
                <!-- Password -->
                <div class="field">
                    <label for="password">Password</label>
                    <input id="password" name="j_password" type="password">
                </div>
                <!-- On click on the submit button run the checkFrom function -->
                <input type="submit" value="Login">
            </form>
        </div>
    </body>
</html>