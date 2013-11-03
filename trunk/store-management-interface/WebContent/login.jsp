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
        <link rel='shortcut icon' type='image/x-icon' href='images/favicon.ico' />
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
        	   /*#########################Ajax start##########################*/
        		//ajax Start
        		$("#loading").ajaxStart(function(){
        			//$("body").prepend("loading");
        			var widthImg=(screen.availWidth/2)-50;
        			var	hieghtImg=(screen.availHeight/2)-50;
        			$(this).css({"top":hieghtImg+"px","left":widthImg}).show();
        		});
        		

        		//ajax Stop
        		$("#loading").ajaxStop(function(){
        		$(this).hide();
        		
        		}); 
        		/*#########################Ajax stop##########################*/
        	   //check login here start here.
        	   function DetectBrowser(a)
				{
        		   	var urlPc="View/index.jsp";
        			var urlTablet="View/index-tablet.jsp";
        			
				     if(/android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
				     {
				    	 $(location).attr({"href":urlTablet});
				     }
				     else
				     {
				    	 $(location).attr({"href":urlPc});
				     }
				}

		
        	   //check login here end here.
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
        						 //$(location).attr({"href":"View/index.jsp"});
        						DetectBrowser(navigator.userAgent||navigator.vendor||window.opera);
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