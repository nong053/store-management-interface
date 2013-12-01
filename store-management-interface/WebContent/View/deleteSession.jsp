<%
/*session.invalidate();*/
session.removeAttribute("userName"); 
session.removeAttribute("password");
response.sendRedirect("../login.jsp"); 
%>