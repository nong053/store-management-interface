<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="../js/jquery.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Test Hidden URL</title>
<script>
$(document).ready(function(){
	/*######################################Hidden  url for tablet process start#######################*/
	
	window.open("http://www.mydomain.com/mypage.htm", "mywindow", "location=0,menubar=0,status=0,scrollbars=0,width=100,height=100");
	
	
	function hidestatus() {
	    window.status='';
	    return true;
	}
	$("#hiddenUrl").click(function(){
		openWindow();
		alert("Hidden Url");
	});
	
	
	function openWindow(){
		var browser=navigator.appName;
		if (browser=="Microsoft Internet Explorer")
		{
		window.opener=self;

		}
		window.open('filename.htm','null','width=900,height=750,toolbar=0,scrollbars=0,location=0,resizable =yes');
		window.moveTo(0,0);
		window.resizeTo(screen.width,screen.height-100);
		self.close();
		}
	/*######################################Hidden  url for tablet process end#######################*/
});

</script>
</head>
<body>
	<button id="hiddenUrl">hiddenUrl</button>
	<a href="htp://www.google.com" target="_blank" onmouseover="window.status='';return true;" onmouseout="window.status=' ';return true;">ใส่ชื่อเวบที่นี่</a>
</body>
</html>