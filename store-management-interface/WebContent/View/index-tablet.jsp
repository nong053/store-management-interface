<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>Store Management Intelligence</title>
<link rel='shortcut icon' type='image/x-icon' href='../images/favicon.ico' />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

<script src="../js/jquery.min.1.7.1.js"></script>

<!--  include file jsp userAuthen here -->
<%
	//String remoteUser="1000740"; 
	String remoteUser = (String) session.getAttribute("userName");
	String remotePass = (String) session.getAttribute("password");
%>
<script>
// authen ldap here

var remoteUser ="<%=remoteUser%>";
var remotePass ="<%=remotePass%>";

	//alert(remoteUser);
	var ObBranch = "";
	var firstBranchCode = "";
	function setObjBranch() {
		$.ajax({
			url : "../checkByLdap.jsp",
			type : "get",
			dataType : "json",
			data : {
				"paramUser" : remoteUser,
				"paramPassword" : remotePass
			},
			async : false,
			success : function(data) {
				//console.log(data);
				// alert(data);
				//alert(ObBranch);
				if (data[0] == "loginFailed") {
					$(location).attr({
						"href" : "../login.jsp"
					});
				} else {
					firstBranchCode = data[0][0];
					ObBranch = data;

				}
			}
		});
	}
	setObjBranch();
	function getObjBranch() {

		return ObBranch;
	}
	getObjBranch();
</script>

<link href="../styles/kendo.common.min.css" rel="stylesheet" />
<link href="../styles/kendo.default.min.css" rel="stylesheet" />
<link href="../styles/kendo.mobile.all.min.css" rel="stylesheet" />
<link rel="stylesheet" href="../styles/jquery.shadow.css" />
<link href="../jqueryUI/css/custom-theme/jquery-ui-1.9.2.custom.min.css"
	rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../styles/touchslider.css">
<link rel="stylesheet" type="text/css" href="../styles/index-tablet.css">


<script src="../js/kendo.all.min.js"></script>


<script src="../Controller/SMI_SalesDaily.js"></script>
<!-- graph1 -->
<script src="../Controller/SMI_SalesMonthly.js"></script>
<!-- graph2 -->
<script src="../Controller/SMI_CustomerPerMonth.js"></script>
<!-- graph3 -->
<script src="../Controller/SMI_BillWeekly.js"></script>
<!-- graph4 -->
<script src="../Controller/SMI_SalesPerBillWeekly.js"></script>
<!--  graph5-->
<script src="../Controller/SMI_WasteDaily.js"></script>
<!--  graph6-->
<script src="../Controller/SMI_WasteWeekly.js"></script>
<!--  graph7-->
<script src="../Controller/SMI_SalesByProductCategoryWeekly.js"></script>
<!--  graph8-->
<script src="../Controller/SMI_SalesByPromotionMonthly.js"></script>
<!--  graph9-->
<script src="../Controller/SMI_Top10Food.js"></script>
<!--  graph10-->
<script src="../Controller/SMI_Top10Bakery.js"></script>
<!--  graph11-->
<script src="../Controller/SMI_Top10Beverage.js"></script>
<!--  graph12-->
<script src="../Controller/SMI_Top10Waste.js"></script>
<!--  graph13-->
<script src="../Controller/SMI_Top10CookingTime.js"></script>
<!--  graph14-->
<script src="../Controller/SMI_CookingTimeRange.js"></script>
<!--  graph15-->
<script src="../Controller/SMI_HrCompareEmpPerModel.js"></script>
<!--  graph16-->
<script src="../Controller/SMI_HrCompareEmpPerModelByDepartment.js"></script>
<!--  graph17-->
<script src="../Controller/SMI_HrCompareEmpPerModelByManager.js"></script>
<!--  graph18-->

<script src="../Controller/mainStoreTabletR.js"></script>

<script src="../js/jquery.touchslider.js"></script>
<script src="../js/jquery.shadow.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.9.2.custom.min.js"
	type="text/javascript"></script>

<style scoped>
.chart-wrapper,.chart-wrapper .k-chart {
	height: 350px;
}
</style>

</head>
<body>
	<!-- set load left menu start -->
	<div id="areaLeftMenu" style="display: none"></div>
	<!-- set load left menu end -->
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


	<div id="dialogSlot" class="selectListSlot" style="display: none;"
		title="graph1">
		<!-- content select slot start-->
		<div id="selectFav">
			<ul>
				<li>
					<div class="statusFav ballRed"></div>
					<div class="slotFavName">
						<a href="#"> Slot#1 Name:Top 10 Product </a>
					</div>
				</li>
				<li><div class="statusFav ballGreen"></div>
					<div class="slotFavName">
						<a href="#">Slot#2 Name:Empty</a>
					</div></li>
				<li><div class="statusFav ballGreen"></div>
					<div class="slotFavName">
						<a href="#">Slot#3 Name:Empty</a>
					</div></li>
				<li><div class="statusFav ballRed"></div>
					<div class="slotFavName">
						<a href="#">Slot#4 Name:Top 10 Cooking Time</a>
					</div></li>
				<li><div class="statusFav ballRed"></div>
					<div class="slotFavName">
						<a href="#">Slot#5 Name:Customer Per Month</a>
					</div></li>

			</ul>
		</div>
		<!-- content select slot end-->

	</div>

	<section class="demo">
		<div class="demo-in">
			<div class="demo-in-in">
				<div class="touchslider touchslider-demo">



					<div class="touchslider-nav">
						<div id="boxL">
							<div id="button">

								<div id="btHideShow">
									<button class="hideShow "></button>
									<div id="titleDashboardName">
										Store Management
										<div id="categroryNameTitle"></div>
									</div>
								</div>

							</div>

						</div>

						<div id="boxR"></div>
						<br style="clear: both">
					</div>
					<div id="contentArea">

						<div id="leftMenu" class="expansion"></div>

						<div class="subGraph">
							<div id="boxSubGraph" class="expansionSubGraph">
								<ul>
									<li><a href="#">graph1</a></li>
									<li><a href="#">graph2</a></li>
									<li><a href="#">graph3</a></li>
									<li><a href="#">graph4</a></li>
								</ul>

							</div>
						</div>
						<div class="areaSettingExternal">
							<div></div>

						</div>


						<div class="touchslider-viewport"
							style="width: 1000px; overflow: hidden; position: relative; height: 470px">


							<div id="contentGraph" style="width: 1000px">
								<!-- LOOP FOR CREATE GRAPH HERE START -->




								<!-- LOOP FOR CREATE GRAPH HERE START -->
							</div>
						</div>
					</div>



				</div>
			</div>
		</div>
	</section>
	<div id="loading">Loading...</div>