<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Store Management Intelligence</title>
<link href="../styles/kendo.common.min.css" rel="stylesheet">
<link href="../styles/kendo.default.min.css" rel="stylesheet">
<link href="../jqueryUI/css/custom-theme/jquery-ui-1.9.2.custom.min.css" rel="stylesheet">
<link href="../styles/kendo.dataviz.min.css" rel="stylesheet">

<link rel='shortcut icon' type='image/x-icon' href='../images/favicon.ico' />

<link rel="stylesheet" href="../styles/index.css">
<link rel="stylesheet" href="../styles/jquery.shadow.css" />

<script src="../js/jquery.min.1.7.1.js"></script>
<!--  <script src="http://code.jquery.com/jquery-migrate-1.0.0.js"></script>-->
<script src="../js/jquery.shadow.js"></script>	

<!--  include file jsp userAuthen here -->
<% //String remoteUser="1000740"; 
   String remoteUser = (String)session.getAttribute("userName");
   String remotePass = (String)session.getAttribute("password");
%>
<script>
// authen ldap here

var remoteUser ="<%=remoteUser%>";
var remotePass ="<%=remotePass%>";
//alert(remoteUser);
var ObBranch="";
var firstBranchCode="";
function setObjBranch(){
$.ajax({
	 url:"../checkByLdap.jsp",
	 type:"get",
	 dataType:"json",
	 data:{"paramUser":remoteUser,"paramPassword":remotePass},
	 async:false,
	 success:function(data){
		 //console.log(data);
		// alert(data);
		 //alert(ObBranch);
		 if(data[0]=="loginFailed"){
			 	$(location).attr({"href":"../login.jsp"});
	    	}else{
	    		 firstBranchCode=data[0][0];
				 ObBranch=data;
	    		 
	    	}
	 }
 });
}
setObjBranch();
function getObjBranch(){
	
	return ObBranch;
}
getObjBranch();
/*
var ObBranch="";
var firstBranchCode="";
function setObjBranch(){
	$.ajax({
		url:"http://localhost/projectLdap/callLdap.php?callBack=?",
		type:"get",
		dataType:"json",
		async:false,
		data:{"userAuthen":remoteUser},
		success:function(data){
			//alert(data);
			ObBranch=data;
			var firstBranchCodeArray=data[0][0].split("-");
			firstBranchCode=firstBranchCodeArray[0];
			//console.log(firstBranch);
			//alert(firstBranch);
			//alert(ObBranch);
			$("#loadBranch").hide();

		}
	});
}
setObjBranch();
function getObjBranch(){
	
	return ObBranch;
}
*/



</script>

<script src="../Controller/SMI_SalesDaily.js"></script><!-- graph1 -->
<script src="../Controller/SMI_SalesMonthly.js"></script><!-- graph2 -->
<script src="../Controller/SMI_CustomerPerMonth.js"></script><!-- graph3 -->
<script src="../Controller/SMI_BillWeekly.js"></script><!-- graph4 -->
<script src="../Controller/SMI_SalesPerBillWeekly.js"></script> <!--  graph5--> 
<script src="../Controller/SMI_WasteDaily.js"></script> <!--  graph6-->
<script src="../Controller/SMI_WasteWeekly.js"></script> <!--  graph7-->
<script src="../Controller/SMI_SalesByProductCategoryWeekly.js"></script> <!--  graph8-->
<script src="../Controller/SMI_SalesByPromotionMonthly.js"></script> <!--  graph9-->
<script src="../Controller/SMI_Top10Food.js"></script> <!--  graph10-->
<script src="../Controller/SMI_Top10Bakery.js"></script> <!--  graph11-->
<script src="../Controller/SMI_Top10Beverage.js"></script> <!--  graph12-->
<script src="../Controller/SMI_Top10Waste.js"></script> <!--  graph13-->
<script src="../Controller/SMI_Top10CookingTime.js"></script> <!--  graph14-->
<script src="../Controller/SMI_CookingTimeRange.js"></script> <!--  graph15-->
<script src="../Controller/SMI_HrCompareEmpPerModel.js"></script> <!--  graph16-->
<script src="../Controller/SMI_HrCompareEmpPerModelByDepartment.js"></script> <!--  graph17-->
<script src="../Controller/SMI_HrCompareEmpPerModelByManager.js"></script> <!--  graph18-->



<script src="../Controller/mainStore.js"></script>


<script src="../js/kendo.all.min.js" type="text/javascript"></script>
<script src="../js/kendo.dataviz.min.js" type="text/javascript"></script>
<!-- <script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.js" type="text/javascript"></script> -->
<script type="text/javascript" src="../js/jquery-ui-1.9.2.custom.min.js" type="text/javascript"></script>


</head>
<body>

<div id="loadBranch">
		
		<div id="loadImage">
			<table>
				<tr>
					<td><img src="../images/loader.gif"></td>
					<td><span id="loadText">Loading Branch ... </span></td>
				</tr>
			</table>
			
			
		</div>
</div>

<div class="tooltipContent" style="display: none;">
	<ul>
		<li>list1</li>
		<li>list2</li>
		<li>list3</li>
	</ul>
</div> 
<!--  box parameter -->
<!--  
	<div class="setParamArea">
		<div class="setParamHeader">
			<div class="text">Header Graph</div>
		</div>
		<div class="setParam">
			<table>
				<tr>
					<td>
					Start Date
					</td>
					<td>
					<input type="text" name="paramStartDate" id="paramStartDate" class="date">
					</td>
				</tr>
				<tr>
					<td>
					End Date
					</td>
					<td>
					<input type="text" name="paramEndDate" id="paramEndDate" class="date">
					</td>
				</tr>
			</table>
		</div>
		<div class="btnArea">
			<div class="btn">
				<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">Plot Graph</button>
			</div>
		</div>
	</div>
	-->
<!--  box parameter -->

<!--  
<div id="setParam">
Set Parameter
</div>
-->

<div id="dialogSlot" class="selectListSlot" style="display: none;" title="graph1">
<!-- content select slot start-->
	<div id="selectFav">
		<ul>
			<li>
				<div class="statusFav ballRed"></div>
				<div class="slotFavName">
					<a href="#">
						Slot#1 Name:Top 10 Product
					</a>
				</div>
			</li>
			<li><div class="statusFav ballGreen"></div><div class="slotFavName"><a href="#">Slot#2 Name:Empty</a></div></li>
			<li><div class="statusFav ballGreen"></div><div class="slotFavName"><a href="#">Slot#3 Name:Empty</a></div></li>
			<li><div class="statusFav ballRed" ></div><div class="slotFavName"><a href="#">Slot#4 Name:Top 10 Cooking Time</a></div></li>
			<li><div class="statusFav ballRed"></div><div class="slotFavName"><a href="#">Slot#5 Name:Customer Per Month</a></div></li>
		
		</ul>
	</div>
<!-- content select slot end-->

</div>

<!-- set loading start -->
<div id="loading">
		
		<div id="loadImage">
			<table>
				<tr>
					<td><img src="../images/loader.gif"></td>
					<td><span id="loadText">Loading... </span></td>
				</tr>
			</table>
			
			
		</div>
</div>
<!-- set loading end -->	
	
	
<div id="mainBody">
		<div id="header">
			<div id="heaerLeft">
				<div id="btHideShowArea">
					<div id="btHideShow">
					<span class="ui-icon ui-icon-grip-solid-horizontal"></span>
					</div>
					<div id="nameCateGraph">
						Store Management Intelligence  <div id="categroryNameTitle"></div>
					</div>
				</div>
				
			</div>
			<div id="heaerRight">
			<center>
				<div id="boxTopButton">
				<!--  
					<div class="ball ballGreen"></div>
					<div class="ball"></div>
					<div class="ball"></div>
				-->
				</div>
			</center>
			<!-- 
			<table width="200">
				<tr>
					<td></td>
					<td><div class="ball ballGreen"></div></td>
					<td><div class="ball"></div></td>
					<td><div class="ball"></div></td>
					<td><div class="ball"></div></td>
					<td><div class="ball"></div></td>
					<td></td>
				</tr>
			</table>
			-->
			</div>
		</div>
		<div id="mainContent">
			<div id="leftMenu" class="expansion">
				<div id="boxContent">
					<!-- 
					<div id="boxTitle">
					<div id="txt">
						à¹à¸¡à¸à¸¹à¸«à¸¥à¸±à¸(Main Manu)
					</div>
					</div>
					-->
					<ul>
						<li class="selected" id="mainMenu"><a href="#">Main Menu</a></li>
						
						<li class="cateGraph" id="cate1"><a href="#">à¸à¸(5)</a></li>
						<li class="cateGraph" id="cate2"><a href="#">à¸à¸²à¸¢(6)</a></li>
						<li class="cateGraph" id="cate3"><a href="#">cost(6)</a></li>
						<li class="cateGraph" id="cate4"><a href="#">à¸à¸¸à¸à¸ à¸²à¸	à¸£à¸°à¸à¸(4)</a></li>
						<li class="cateGraph" id="cate5"><a href="#">à¸à¸£à¸´à¸à¸²à¸£(5)</a></li>
						<li class="cateGraph" id="cateView"><a href="#">Favorite(6)</a></li>
					</ul>
				</div>
			</div>
			
			<div id="content">
				<div id="boxContent2">
					<div id="contentGraph">
					<!--  data content here -->
					
					<!--  data content here -->
					</div>
				</div>
			</div>
	</div>

</body>
</html>