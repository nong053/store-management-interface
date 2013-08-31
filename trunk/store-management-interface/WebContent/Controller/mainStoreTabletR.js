
$(document).ready(function(){
	$("#loading").ajaxStart(function(){
		$(this).show();
		//alert("Loading..");
	});
	$("#loading").ajaxStart(function(){
		$(this).hide();
	});
	//createMainLayout();
		var widthTablet = (parseInt($("body").width())-5);
		
		//alert(widthTablet);
		/*
		function createChart() {
			 $(".chart").kendoChart({
				  chartArea: {
					    width: 860,
					    height:400
					  },
			     title: {
			         text: "Site Visitors Stats /thousands/"
			     },
			     legend: {
			         visible: false
			     },
			     seriesDefaults: {
			         type: "column"
			     },
			     series: [{
			         name: "Total Visits",
			         data: [56000, 63000, 74000, 91000, 117000, 138000]
			     }, {
			         name: "Unique visitors",
			         data: [52000, 34000, 23000, 48000, 67000, 83000]
			     }],
			         max: 140000,
			         line: {
			             visible: false
			         },
			         minorGridLines: {
			             visible: true
			         }
			     },
			     categoryAxis: {
			         categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
			         majorGridLines: {
			             visible: false
			         }
			     },
			     tooltip: {
			         visible: true,
			         template: "#= series.name #: #= value #"
			         }
			     });
			 }
		*/
		/*Define bind Touch Slider here*/
		var touchSlider = function(){
	
		$(".touchslider-demo").touchSlider({mouseTouch: true});
		};
		/*######################################Define Config Start############################################*/
		var userLogin="";
		userLogin="N0001";

		var graphWidth="930";
		var graphHeight="370";
		var paramMachine="Tablet";
		/*######################################Define Config End############################################*/
		//function num amount graph in myview start
		var countMyView="";
		var countMyViewFn= function(){
			
		$.ajax({
			url:"../Model/countGrMyView.jsp",
			type:"get",
			dataType:"json",
			async:false,
			data:{"paramUserLogin":userLogin},
			success:function(data){
				//console.log(data[0][0]);
				if(data[0][0]){
					countMyView= data[0][0];
				}else{
					countMyView= 0;
				}
				 //alert("countMyView"+countMyView);
				
			}
			
		});
		
		};
		countMyViewFn();
		//######################Function Expantion left menu start##########################
		var expansionFn = function(){
			
			$("#leftMenu").animate({"left":"0px"});
			$("#leftMenu").removeClass("expansion");
			$("#leftMenu").addClass("withdraw");
		};
		var withdrawFn= function(){
			$("#leftMenu").animate({"left":"-370px"});
			$("#leftMenu").removeClass("withdraw");
			$("#leftMenu").addClass("expansion");
		};
		
		//$("#btHideShow").die("click");
		$("#btHideShow").live("click",function(){
			//get count new myview 
			
			countMyViewFn();
			$("#cateView").remove();
			$("#boxContent>ul").append("<li class=\"cateGraph\" id=\"cateView\"><a href=\"#\">Myview("+countMyView+")</a></li>");
			if($("#leftMenu").hasClass("expansion")){
			expansionFn();
			}else{
			withdrawFn();	
			}
		});
		//######################Function Expansion left menu end##########################
		//######################Function Expansion sub graph start########################
		var expansionSubGraphFn = function(){
			
			$("#boxSubGraph").animate({"left":"0px"});
			$("#boxSubGraph").removeClass("expansionSubGraph");
			$("#boxSubGraph").addClass("withdrawSubGraph");
			
		};
		var withdrawSubGraphFn= function(){
			$("#boxSubGraph").animate({"left":"-370px"});
			$("#boxSubGraph").removeClass("withdrawSubGraph");
			$("#boxSubGraph").addClass("expansionSubGraph");
		};
		
		
		$("#btnShowHideSubMenu").live("click",function(){
			if($("#boxSubGraph").hasClass("expansionSubGraph")){
				expansionSubGraphFn();
			}else{
				withdrawSubGraphFn();	
			}
		});
		//######################Function Expansion sub graph end########################
		
		
		$("#cate1").click(function(){
			callGraphByCate();
			withdrawFn();
			$(".setting").die("click");
		});
		
		$("#myViewCate").click(function(){
			callGraphByMyView();
			withdrawFn();
			$(".setting").die("click");
		});
		
		//#####################Function manage seting for get config parameter bing to show###########################
		//call manage parameter by graph name
		var callManageParameter=function(graphNameArea){
			
			var graphNameAreaNoneIndexArray=graphNameArea.split("-");
		    var graphNameAreaNoneIndex=graphNameAreaNoneIndexArray[0];
		   // alert("graphNameArea="+graphNameArea);
		   // alert("graphNameAreaNoneIndex="+graphNameAreaNoneIndex);
		     
			if(graphNameAreaNoneIndex=="areaSalePerDay"){
				manageParamSalePerDayFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}else if(graphNameAreaNoneIndex=="areaSalePerMonth"){
				//manageParamSalePerMonthFn();
			}else if(graphNameAreaNoneIndex=="areaCustomerPerMonth"){
				//manageCustomerPerMonthFn();
			}else if(graphNameAreaNoneIndex=="areaBillPerMonth"){
				//manageParamBillPerMonthFn();
			}else if(graphNameAreaNoneIndex=="areaSalePerBill"){
				//manageParamSalePerBillFn();
			}else if(graphNameAreaNoneIndex=="areaDeptWastePerDay"){
				//manageParamDeptWastePerDayFn();
			}else if(graphNameAreaNoneIndex=="areaSaleByFoodTypePerDay"){
				//manageParamSaleByFoodTypePerDayFn();
			}else if(graphNameAreaNoneIndex=="areaSaleByPromotionPerMonth"){
				//manageParamSaleByPromotionPerMonthFn();
			}else if(graphNameAreaNoneIndex=="areaTop10Food"){
				//manageParamTop10FoodFn();
			}else if(graphNameAreaNoneIndex=="areaTop10bakery"){
				//manageParamTop10bakeryFn();
			}else if(areaGraphName=="areaTop10Beverage"){
				//manageParamTop10BeverageFn();
			}
		};
		$(".setting").die("click");
		$(".setting").live("click",function(){
			
		     var graphNameArea= $(this).parent().parent().attr("id");
		     //alert(graphNameArea);
		     callManageParameter(graphNameArea);
				
		});

		/*
		$(".setting").live("click",function(){
			
			 var htmlParameter = function(){
				 var htmlParam ="";
				 htmlParam+="<div id=\"setParam\">";
				 htmlParam+="<div class=\"setParamArea\">";
				 htmlParam+="<div class=\"setParamHeader\">";
				 htmlParam+="<div class=\"text\">Header Graph</div>";
				 htmlParam+="</div>";
					 htmlParam+="<div class=\"setParam\">";
					 htmlParam+="<table>";
						 htmlParam+="<tr>";
							htmlParam+="<td>";
								htmlParam+="Start Date";
							htmlParam+="</td>";
							htmlParam+="<td>";
								htmlParam+="<input type=\"text\" name=\"paramStartDate\" id=\"paramStartDate\" class=\"date\">";
				 			htmlParam+="</td>";
				 		htmlParam+="</tr>";
				 		htmlParam+="<tr>";
				 			htmlParam+="<td>";
				 				htmlParam+="End Date";
				 			htmlParam+="</td>";
				 			htmlParam+="<td>";
				 				htmlParam+="<input type=\"text\" name=\"paramEndDate\" id=\"paramEndDate\" class=\"date\">";
				 			htmlParam+="</td>";
				 		htmlParam+="</tr>";
				 		
			 		htmlParam+="<tr>";
		 			htmlParam+="<td>";
		 				htmlParam+="Promotion1";
		 			htmlParam+="</td>";
		 			htmlParam+="<td>";
		 				htmlParam+="<select class=\"list\">";
		 					htmlParam+="<option>Cake by 4 free 1</option>";
		 					htmlParam+="<option>Snack box set A</option>";
		 					htmlParam+="<option>Snack box set B</option>";
		 					htmlParam+="<option>Snack box set C</option>";
		 				htmlParam+="</select>";
		 			htmlParam+="</td>";
		 			htmlParam+="</tr>";
			 		
			 		htmlParam+="<tr>";
		 			htmlParam+="<td>";
		 				htmlParam+="Promotion2";
		 			htmlParam+="</td>";
		 			htmlParam+="<td>";
			 			htmlParam+="<select class=\"list\">";
							htmlParam+="<option>Cake by 4 free 1</option>";
							htmlParam+="<option>Snack box set A</option>";
							htmlParam+="<option>Snack box set B</option>";
							htmlParam+="<option>Snack box set C</option>";
						htmlParam+="</select>";
		 			htmlParam+="</td>";
		 			htmlParam+="</tr>";
		 		
				 	htmlParam+="</table>";
				 	htmlParam+="</div>";
				 		htmlParam+="<div class=\"btnArea\">";
				 			htmlParam+="<div class=\"btn\">";
				 			htmlParam+="<br style=\"clear:both\">";
				 				htmlParam+="<button class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Plot Graph</button>";
				 				htmlParam+="</div>";
				 			htmlParam+="</div>";
				 	htmlParam+="</div>";
				 	htmlParam+="</div>";
				 	
				 	return htmlParam;
			 };
			 if($("#graph1").attr("class")=="graphTop"){
				 $("#graph1").attr({"class":"graphTop clicked"});

				 $("#graph1").prepend(htmlParameter());
				 $("#setParam").slideDown();
				 $("#setParam").shadow();
				 $(".date").datepicker();
				 $(".list").kendoDropDownList();
				 $(".ui-button").css({"padding":"5px"});
				 
			 }else{
				 $("#graph1").attr({"class":"graphTop"});
				 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
				 $("#setParam").slideUp("1000",function(){
						 $(this).remove();
					 });

				 }
			
			 });
			 */
		 
		 //dialog start
		/*
		 $( "#dialog" ).dialog({
			 autoOpen: false,
			 show: {
			 effect: "fade",
			 duration: 1000
			 },
			 hide: {
			 effect: "fold",
			 duration: 1000
			 },
			 width: 600,
			 modal: true,
			 buttons: {
				 "OK": function() {
				 $( this ).dialog( "close" );
				 },
				 Cancel: function() {
				 $( this ).dialog( "close" );
				 }
			}
		 });
		 */
		 /*
		 $( ".addMyView").die("click");
		 $( ".addMyView").live("click",function() {
			 $( "#dialog" ).dialog( "open" );
			 $(".ui-dialog .ui-dialog-content").css({"padding":"0px"});
		 });
		*/
		 // addFav
		 $(".addMyView").live("click",function() {
			 //alert("click myview");
			 
			 var idDataGraph=$(this).parent().children().attr("id");
			 //var grachName=this.id;
			 //alert("idDataGraph"+idDataGraph);
			 var graphName=$("ul#"+idDataGraph+">li.graphName").text();
			 var grachType=$("ul#"+idDataGraph+">li.graphType").text();
			 var graphId=$("ul#"+idDataGraph+">li.graphId").text();
			 
			 console.log(userLogin);
			 console.log(graphName);
			 console.log(grachType);
			 console.log(graphId);
			 //Embed parameter for myview
			 var embParamUserLogin="<input type=\"hidden\" name=\"embparamUserLogin\" id=\"embParamUserLogin\" class=\"embParamMyView\" value="+userLogin+">";
			 var embParamGraphName="<input type=\"hidden\" name=\"embparamGraphName\" id=\"embParamGraphName\" class=\"embParamMyView\" value="+graphName+">";
			 var embParamGrachType="<input type=\"hidden\" name=\"embparamGrachType\" id=\"embParamGrachType\" class=\"embParamMyView\" value="+grachType+">";
			 var embParamGraphId="<input type=\"hidden\" name=\"embparamGraphId\" id=\"embparamGraphId\" class=\"embParamMyView\" value="+graphId+">";
			 $(".embParamMyView").remove();
			 
			 $("body").append(embParamUserLogin);
			 $("body").append(embParamGraphName);
			 $("body").append(embParamGrachType);
			 $("body").append(embParamGraphId);
			 
			 listSlotFn(userLogin,graphName);
			 //insertToSlotFn(userLogin,graphId);
			 
			
		 });
		//define shadow border
		 //dialog end
		 
		 //create main layout
		 var createMainLayout = function(){
				var mainLayoutHtml="" +
						"<div class=\"touchslider touchslider-demo\">" +
							"<div class=\"touchslider-nav\">" +
								"<div id=\"boxL\">" +
									"<div id=\"button\">" +
										"<div id=\"btHideShow\">" +
										//"<a href=\"#\" data-role=\"button\"  data-icon=\"bars\" data-iconpos=\"left\" data-inline=\"true\">Button</a>" +
											"<button class=\"hideShow ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">=</button>" +
											"<div id=\"titleDashboardName\">" +
											"Store Management <div id=\"categroryNameTitle\"></div>" +
											"</div>" +
										"</div>" +
									"</div>" +
								"</div>" +
								"<div id=\"boxR\">" +
								"</div>" +
								"<br style=\"clear:both\">" +
							"</div>" +
								"<div id=\"contentArea\">" +
									"<div id=\"leftMenu\" class=\"expansion\">" +
									"</div>" +
									"<div class=\"subGraph\">" +
										"<div id=\"boxSubGraph\" class=\"expansionSubGraph\" >" +
											"<div id=\"subMenuR\">"+
												"<ul>" +
													"<li><a href=\"#\">graph1</a></li>" +
													"<li><a href=\"#\">graph2</a></li>" +
													"<li><a href=\"#\">graph3</a></li>" +
													"<li><a href=\"#\">graph4</a></li>" +
												"</ul>" +
											"</div>" +
											"<div id=\"areaBtnShowHideSubMenu\">" +
												"<div id=\"btnShowHideSubMenu\">" +
												"<div id=\"txt\">Sub Menu</div>" +
												"</div>" +
											"</div>"+
											
										"</div>" +
									"</div>" +
									"<div class=\"areaSettingExternal\">" +
									"</div>" +
									"<div class=\"touchslider-viewport\" style=\"width:"+widthTablet+"px;overflow:hidden;position:relative;height:425px\">" +
										"<div id=\"contentGraph\" style=\"width:"+widthTablet+"px\">" +
										"</div>" +
									"</div>" +
								"</div>" +
							"</div>" +
					
						"";
				//alert(mainLayoutHtml);
				$(".demo-in-in").html(mainLayoutHtml);
				/*
					
				
			
			*/
			};
			
			//createMainLayout();
		
		//Left Menu Hide Show Start
			var createMenuLeft = function(){
				
				var htmlMenuLeft="" +
						"<div id=\"boxContent\">" +
							"<ul>" +
								"<li class=\"selected\" id=\"mainMenu\">Main Menu</li>";
								
								$.ajax({
									url:"../Model/ui_SMI_ListAllCategory.jsp",
									type:"get",
									dataType:"json",
									async:false,
									success:function(data){
										//alert(data);
										$.each(data,function(index,EntryIndex){
											
											$.ajax({
												url:"../Model/ui_SMI_ListGraphOfCategory.jsp",
												type:"POST",
												dataType:"json",
												async:false,
												data:{"paramCateId":EntryIndex[0]},
												success:function(data){
													//alert(EntryIndex[0]);
													//alert(data.length);
													htmlMenuLeft+="<li class=\"cateGraph\" id=\""+EntryIndex[0]+"\"><a href=\"#\">"+EntryIndex[1]+"("+data.length+")</a></li>";
												}
											});
											
										});
									}
								});
								
								htmlMenuLeft+="<li class=\"cateGraph\" id=\"cateView\"><a href=\"#\">Myview("+countMyView+")</a></li>" +
							"</ul>" +
						"</div>" +
						"";
				 
				 $("#leftMenu").html(htmlMenuLeft);
			};
			createMenuLeft();
			//alert(createMenuLeft());
			
			//Left Menu Hide Show End
			
			/*###################Create layout####################*/
			
			
			var createLayoutGraphNotReturn = function(graphName,graphType,graphId,arIndex,graphNameThaiLanguage,arMyView,myViewId){
				//alert("arMyView="+"["+arMyView+"]");
				//alert("myViewId="+myViewId);
				
				var htmlLayoutGraph="";
				htmlLayoutGraph="" +
						"<div class=\"touchslider-item\">" +
							"<div class=\"contentGraph\">" +
							"<div class=\"graphTop\" id=\"area"+graphName+"-"+arIndex+"\">" +
									"<div id=\"settingArea\">" +
										"<div class=\"setting\" id=\"settingarea"+graphName+"-"+arIndex+"\">" +
											"<span class=\"ui-icon ui-icon-gear\"></span>" +
										"</div>" +
									"</div>"+
									"<div id=\"chartArea\">";
									/*
									"<div id=\"chartArea\">" +
										"<div id=\"chart"+graphName+"-"+arIndex+"\"  class=\"chart\" ></div>" +
									"</div>" +
									*/
									if(graphName=="SalePerMonth"){
										htmlLayoutGraph+=	"<div id=\"chartMTD"+graphName+"-"+arIndex+"\"  class=\"chart chartMTD\">Chart1</div>" ;	
										htmlLayoutGraph+=	"<div id=\"chartYTD"+graphName+"-"+arIndex+"\"  class=\"chartYTD\">Chart2</div>" ;	
									}else{
										htmlLayoutGraph+=	"<div id=\"chart"+graphName+"-"+arIndex+"\"  class=\"chart\"></div>" ;
									}
									
									htmlLayoutGraph+="</div>" +
									"</div>" +
								
								"<div class=\"graphBottom\">" +
									"<div class=\"graphDetail\">" +
									""+graphNameThaiLanguage+"" +
									"</div>" +
									"<div class=\"graphAddFav\" style=\"text-align:right\">" +
										"<ul id=\"paramEmbed"+graphName+"\" style=\"display:none\">"+
											"<li class=\"graphName\">"+graphName+"</li>" +
											"<li class=\"graphType\">"+graphType+"</li>" +
											"<li class=\"graphId\">"+graphId+"</li>" +
											/*
											"<li class=\"graphBrachDefault\">"+graphType+"</li>" +
											"<li class=\"graphStartDate\">"+graphType+"</li>" +
											"<li class=\"graphEndDate\">"+graphType+"</li>" +
											*/
										"</ul>" ;
										if(arMyView=="MyView"){
											//alert("this is myview");
											htmlLayoutGraph+="<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove MyView</button>" ;
										}else{
											//alert("this not myview");
											htmlLayoutGraph+="<button id=\"id"+graphName+"\" class=\"addMyView ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\" >Add MyView</button>";
										}
										htmlLayoutGraph+="</div>" +
								"</div>" +
							"</div>" +
						"</div>";
				
				
				//alert(htmlLayoutGraph);
			$("#contentGraph").append(htmlLayoutGraph);
			$(".contentGraph").shadow();
			//$(".graphDetail").css({"margin":"5px"});
			};
			
			
			
			/*################### num list top button start ################################*/
			var numListTopButton = function(v_num){
				//alert(v_num);
				var htmlListTopButton="";
				for(var i=0;i<v_num;i++){
					if(i==0){
					htmlListTopButton+="<a class=\"touchslider-nav-item touchslider-nav-item-current\"></a>";
					}else{
					htmlListTopButton+="<a class=\"touchslider-nav-item\"></a>";	
					}
					/*
					<a class="touchslider-nav-item touchslider-nav-item-current"></a>
					<a class="touchslider-nav-item"></a>
					<a class="touchslider-nav-item"></a>
					<a class="touchslider-nav-item"></a>
					 */
				}
				$("#boxR").html(htmlListTopButton);
			};
			/*################ function create sub graph lis left sub menu#################*/
			var createSubGraph = function(graphName){
				/*
				 <ul>
					<li><a href="#">graph1</a></li>
					<li><a href="#">graph2</a></li>
					<li><a href="#">graph3</a></li>
					<li><a href="#">graph4</a></li>
				</ul>
				 */
				var htmlSubGraph="";
				htmlSubGraph="<li><a href=\"#\" class=\"listSubGraph\" id=\"SubGraphId-"+graphName+"\">"+graphName+"</a></li>";
				//alert(htmlSubGraph);
				$("#boxSubGraph>#subMenuR>ul").append(htmlSubGraph);
				/*$("#boxSubGraph").shadow();*/
				
			};
			
			/*################### num list top button end  ################################*/
			
			/*################### click sub graph for get graphp by id start#####################*/ 
			$(".listSubGraph").die("click");
			$(".listSubGraph").live("click",function(){
				$("#contentGraph").empty();
				var graphNameArray = this.id.split("-");
				var graphName=graphNameArray[1];
				//alert(graphId);
				$.ajax({
					url:"../Model/SMI_callGraphBySubMenu.jsp",
					type:"get",
					dataType:"json",
					data:{"paramGraphName":graphName},
					success:function(data){
						//alert(data);
						//alert(data[0][0]);
						var numIndex=1;
							//send graphName,graphType,graphId,graphNameTitle
							createLayoutGraphNotReturn(data[0][0],data[0][1],data[0][2],"0",data[0][3]);

						//boxSubGraph
						createChart();
						numListTopButton(numIndex);
						//touchSlider();
					}
					
					
				});
				//CaSMI_callGraphBySubMenu
			});
			/*################### click sub graph for get graphp by id end  #####################*/ 
			
			/*###################function call graph start ######################################*/
			var createGraphByGaraphName=function(graphName,graphType,arIndex){
				//alert(graphName);
				
				if(graphName=="SalePerDay"){
					//Defualt Parameter Start
					 $.ajax({
						url:"../Model/SMI_getBranch.jsp",
						type:"get",
						dataType:"json",
						success:function(data){
							
							 var today = new Date();
							 var dd = today.getDate();
							 var mm = today.getMonth()+1; //January is 0!
							 var yyyy = today.getFullYear();
							 
							 if (mm < 10) {
								    mm = '0' + mm;
								}

								if (dd < 10) {
								    dd = '0' + dd;
								}
							/*
							var startDate=""+yyyy+"-"+mm+"-01";
							 var endDate=""+yyyy+"-"+mm+"-"+dd+"";
							 var branchId =data[0][0];
							 */
							 var startDate="";
							 var endDate="";
							 var branchId =data[0][0];
							if($(".paramEmbed"+graphName).text()==""){
								startDate=""+yyyy+"-"+mm+"-01";
								endDate=""+yyyy+"-"+mm+"-"+dd+"";
							}else{
								startDate=$("ul.paramEmbed"+graphName+">li.paramStartDate"+graphName).text();
								endDate=$("ul.paramEmbed"+graphName+">li.paramEndDate"+graphName).text();
							}
							
							//send graphName,graphType
							//g1
							salePerDayFn(graphName,graphType,arIndex,startDate,endDate,branchId,graphWidth,graphHeight,paramMachine);	
						}
					 });
					//Defualt Parameter End
					 
					
					
				}else if(graphName=="SalePerMonth"){
					
					//g2
					//Defualt Parameter Start
					 $.ajax({
						url:"../Model/SMI_getBranch.jsp",
						type:"get",
						dataType:"json",
						success:function(data){
							
							 var today = new Date();
							 var dd = today.getDate();
							 var mm = today.getMonth()+1; //January is 0!
							 var yyyy = today.getFullYear();
							 
							 if (mm < 10) {
								    mm = '0' + mm;
								}

								if (dd < 10) {
								    dd = '0' + dd;
								}
							//2013-01-30
							 /*
							 var currentDate=""+yyyy+"-"+mm+"-"+dd+"";
							 */
							 var branchId =data[0][0];
							 
							 if($(".paramEmbed"+graphName).text()==""){
									
									currentDate=""+yyyy+"-"+mm+"-"+dd+"";
								}else{
									currentDate=""+$("ul.paramEmbed"+graphName+">li.paramDate").text()+"";
								}
							 
							//send graphName,graphType
							//g2
							//alert("Call salePerMonthFn");
							 //Fixed Parameter 
							 
							 var branchId="311";
							 var sDate="2013-01-01";
							 var eDate="2013-01-30";
							  
							salePerMonthFn(graphName,graphType,arIndex,sDate,branchId,paramMachine);	
						}
					 });
					//Defualt Parameter End
					 
					 
				}else if(graphName=="CustomerPerMonth"){
					//g3
					//Defualt Parameter Start
					 $.ajax({
						url:"../Model/SMI_getBranch.jsp",
						type:"get",
						dataType:"json",
						success:function(data){
							
							 var today = new Date();
							 var dd = today.getDate();
							 var mm = today.getMonth()+1; //January is 0!
							 var yyyy = today.getFullYear();
							 
							 if (mm < 10) {
								    mm = '0' + mm;
								}

								if (dd < 10) {
								    dd = '0' + dd;
								}
							//2013-01-30
						
							 var currentDate=""+yyyy+"-"+mm+"-"+dd+"";
							 var branchId =data[0][0];
							 
							
							 $.ajax({
								 url:"../Model/currentWeek.jsp",
								 type:"get",
								 dataType:"json",
								 async :false,
								 data:{"paramDate":currentDate},
								 success:function(data){
									 /*
									 alert(data[0][1]);
									 alert(branchId);
									 alert(yyyy);
									 */
									//send branch,year,startWeek,endWeek
			
									 var currentWeekNumber=data[0][1].substring("1");
									//customerPerMonthFn(graphName,graphType,arIndex,branchId,yyyy,currentWeekNumber,currentWeekNumber,graphWidth,graphHeight,paramMachine);
									 customerPerMonthFn(graphName,graphType,arIndex,"311","2013","10","15",graphWidth,graphHeight,paramMachine);
								 }
								 
							 });
							
						}
					 });
					//Defualt Parameter End
					
				}else if(graphName=="BillPerMonth"){
					//g4
					//billPerMonthFn(graphName,graphType,arIndex);
					
				}else if(graphName=="SalePerBill"){
					//g5
					//SalePerBillFn(graphName,graphType,arIndex);
					
					
				}else if(graphName=="DeptWastePerDay"){
					//g6
					
					//deptWastePerDayFn(graphName,graphType,arIndex);
					
				
				}else if(graphName=="SaleByFoodTypePerDay"){
					//g7
					//saleByFoodTypePerDayFn(graphName,graphType,arIndex);
					
				}else if(graphName=="SaleByPromotionPerMonth"){
					//g8
					//saleByPromotionPerMonthFn(indexEntry[0],indexEntry[2]);
					
				}else if(graphName=="Top10Food"){
					//Top10Food(indexEntry[0],indexEntry[2]);
					
				}else if(graphName=="Top10bakery"){
					//g9
					//Top10bakeryFn(indexEntry[0],indexEntry[2]);
					
				}else if(graphName=="Top10Beverage"){
					//g10
					//Top10BeverageFn(indexEntry[0],indexEntry[2]);
				}
				
				//Create Sales Graph End
			};
			
			
			/*###################function call graph end ##################################*/
			
			//create structure layout myview start
			var createStructureLayoutMyView = function(){
				var htmlStructureLayoutMyView="";
				for(var i=1;i<=6;i++){
				htmlStructureLayoutMyView+="<div id=\"slot-"+i+"\" class=\"graphBoxArea\">" +
			    "</div>" +
			    "";
				}
				$("#contentGraph").html(htmlStructureLayoutMyView);
			};
			
			/*###################click category for send cate name #########################*/
			$(".cateGraph").die("click");
			$(".cateGraph").live("click",function(){
				withdrawFn();
				//alert("cateGraph");
				createMainLayout();
				createMenuLeft();
				
				
				//$("#boxR a.touchslider-nav-item").eq(0).click();
				var caetegoryNameArray = $(this).text().split("(");
				$("#categroryNameTitle").html(":: "+caetegoryNameArray[0]);
				$(".embCateGrap").remove();	
				$("body").append("<input type=\"hidden\" id=\"embCateGraphId\" class=\"embCateGrap\" value=\""+this.id+"\">");
				//clear old value
				$("#contentGraph").empty();
				$("#boxSubGraph>#subMenuR>ul").empty();
				//$("#boxR").empty();
				if(this.id=="cateView"){
					createStructureLayoutMyView();
					//touchSlider();
					
					//graphId,ug.graphname,graphtype,userId,viewSlot,uv.id,ug.graphnametitle
					$.ajax({
						url:"../Model/listGraphMyView.jsp",
						type:"post",
						dataType:"json",
						data:{"paramUserLogin":userLogin},
						success:function(data){
							//alert(data);
							
							var numIndex=0;
							$.each(data,function(index,EntryIndex){
								numIndex++;
								//alert(EntryIndex[0]);
								//graphId, ug.graphname, graphtype, userId, viewSlot, uv.id, ug.graphnametitle
								
								//send parameter graphName,myViewId,slotPosition,graphNameTitle
								createLayoutGraphMyView(EntryIndex[1],EntryIndex[5],EntryIndex[4],EntryIndex[6]);
								//createLayoutGraphNotReturn(EntryIndex[1],EntryIndex[2],EntryIndex[0],index,EntryIndex[6],"MyView",EntryIndex[5]);
								//create sub menu sen graphName
								createSubGraph(EntryIndex[1]);
								//send graphName,graphType,index
								createGraphByGaraphName(EntryIndex[1],EntryIndex[2],index);
							
							});
							$('.listSequence').kendoDropDownList();
							numListTopButton(6);
							
							//createMainLayout();
							//createMenuLeft();
							touchSlider();
						}
					});
					
				}else{
					//create graph by cate other
					//alert("click graph other");
					
					$.ajax({
						url:"../Model/queryPaging.jsp",
						type:"post",
						dataType:"json",
						data:{"paramCateId":$("#embCateGraphId").val(),"paramMachine":paramMachine},
						success:function(data){
							
							//alert(data);
							var numIndex=0;
							$.each(data,function(index,EntryIndex){
								numIndex++;
								//alert(EntryIndex[0]);
								//send graphName,graphType,graphId,graphNameTitle
								createLayoutGraphNotReturn(EntryIndex[0],EntryIndex[1],EntryIndex[2],index,EntryIndex[3]);
								//create sub menu
								createSubGraph(EntryIndex[0]);
								//send graphName,graphType,index
								createGraphByGaraphName(EntryIndex[0],EntryIndex[1],index);
							});
							//boxSubGraph
							//createChart();
							numListTopButton(numIndex);
							
							touchSlider();
						}
					});
					
				};
				//touchSlider();
				
			});
			
			//###################Click category Default######################
			/*####################### config dialog start ###################*/ 
			
			var dialogSlotFn=function(arGraphName){
			//config dialog here
				
			 $("#dialogSlot").dialog({
				 title:arGraphName,
				 autoOpen: false,
				 show: {
				 effect: "fade",
				 duration: 1000
				 },
				 hide: {
				 effect: "fade",
				 duration: 1000
				 },
				 width: 390,
				 modal: true,
				 buttons: {
					 "OK": function() {
					 $( this ).dialog( "close" );
					 },
					 Cancel: function() {
					 $( this ).dialog( "close" );
					 }
				}
			 });
			 
			 //using dialog here
			 $( "#dialogSlot").dialog( "open" );
			 $(".ui-dialog .ui-dialog-content").css({"padding":"0px"});
			};
			 /*####################### config dialog end ###################*/
			 /*####################### Create slot Start ######################*/
			
			 var listSlotFn = function(arUserLogin,arGraphName){
				 $(".selectListSlot").attr("title","");
				 $.ajax({
					url:"../Model/list_slot.jsp",
					type:"get",
					dataType:"json",
					data:{"paramUserLogin":arUserLogin},
					success:function(data){
						var slotTxt1="Slot#1 :Empty";
						var slotTxt2="Slot#2 :Empty";
						var slotTxt3="Slot#3 :Empty";
						var slotTxt4="Slot#4 :Empty";
						var slotTxt5="Slot#5 :Empty";
						var slotTxt6="Slot#6 :Empty";
						
						var slotStatus1="<div class=\"statusFav ballGreen\"></div>";
						var slotStatus2="<div class=\"statusFav ballGreen\"></div>";
						var slotStatus3="<div class=\"statusFav ballGreen\"></div>";
						var slotStatus4="<div class=\"statusFav ballGreen\"></div>";
						var slotStatus5="<div class=\"statusFav ballGreen\"></div>";
						var slotStatus6="<div class=\"statusFav ballGreen\"></div>";
						
						var htmlSlot="";
						
						
						$.each(data,function(index,indexEntry){
							if(index<=5){
							
							if(indexEntry[3]==1){
								
								slotStatus1="<div class=\"statusFav ballRed\"></div>";
								slotTxt1="Slot#1 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==2){
								slotStatus2="<div class=\"statusFav ballRed\"></div>";
								slotTxt2="Slot#2 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==3){
								slotStatus3="<div class=\"statusFav ballRed\"></div>";
								slotTxt3="Slot#3 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==4){
								slotStatus4="<div class=\"statusFav ballRed\"></div>";
								slotTxt4="Slot#4 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==5){
								slotStatus5="<div class=\"statusFav ballRed\"></div>";
								slotTxt5="Slot#5 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==6){
								slotStatus6="<div class=\"statusFav ballRed\"></div>";
								slotTxt6="Slot#6 :"+indexEntry[1];
							}
							
							}//if index<=5
						
						});
						htmlSlot+="<div id=\"selectFav\">";
						htmlSlot+="<ul>";
						
							htmlSlot+="<li>";
							htmlSlot+="<div>";
								htmlSlot+=slotStatus1;
								htmlSlot+="<div class=\"slotFavName\">";
									htmlSlot+="<a class=\"slot\" id=\"slot1\" href=\"#\">";
										htmlSlot+=slotTxt1;
									htmlSlot+="</a>";
								htmlSlot+="</div>";
								htmlSlot+="</div>";
							htmlSlot+="</li>";
							
							htmlSlot+="<li>";
							htmlSlot+="<div>";
							htmlSlot+=slotStatus2;
							htmlSlot+="<div class=\"slotFavName\">";
								htmlSlot+="<a class=\"slot\" id=\"slot2\" href=\"#\">";
									htmlSlot+=slotTxt2;
								htmlSlot+="</a>";
							htmlSlot+="</div>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
						
							htmlSlot+="<li>";
							htmlSlot+=slotStatus3;
							htmlSlot+="<div class=\"slotFavName\">";
								htmlSlot+="<a class=\"slot\" id=\"slot3\" href=\"#\">";
									htmlSlot+=slotTxt3;
								htmlSlot+="</a>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
							
							htmlSlot+="<li>";
							htmlSlot+=slotStatus4;
							htmlSlot+="<div class=\"slotFavName\">";
								htmlSlot+="<a class=\"slot\" id=\"slot4\" href=\"#\">";
									htmlSlot+=slotTxt4;
								htmlSlot+="</a>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
							
							htmlSlot+="<li>";
							htmlSlot+=slotStatus5;
							htmlSlot+="<div class=\"slotFavName\">";
								htmlSlot+="<a class=\"slot\" id=\"slot5\" href=\"#\">";
									htmlSlot+=slotTxt5;
								htmlSlot+="</a>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
							
							htmlSlot+="<li>";
							htmlSlot+=slotStatus6;
							htmlSlot+="<div class=\"slotFavName\">";
								htmlSlot+="<a class=\"slot\" id=\"slot6\" href=\"#\">";
									htmlSlot+=slotTxt6;
								htmlSlot+="</a>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
							htmlSlot+="<br style=\"clear:both\">";
							

						htmlSlot+="</ul>";
						htmlSlot+="</div>";
						
						console.log(htmlSlot);
						
						$(".selectListSlot").html(htmlSlot);
						
						//$("#dialogSlot").attr("title",arGraphName);
						dialogSlotFn(arGraphName);
						
					}
				 });
			 };
			 /*####################### Create slot End ######################*/
			 //###########insert grahp to myview start###############
			 var insertToMyviewFn = function(arUserLogin,arSlotView,arGraphId){

				 
				 $.ajax({
					 url:"../Model/insertToSlot.jsp",
					 type:"get",
					 dataType:"html",
					 data:{"paramUserLogin":arUserLogin,"paramSlotView":arSlotView,"paramGraphId":arGraphId},
					 success:function(data){
						
						 listSlotFn(arUserLogin,arGraphId);
					 }
				 });
				 
			 };
			 //###########insert grahp to myview end#################
			//###########delelte grahp from myview start##############
			 var deleteFromMyView = function(myviewId){
				 $.ajax({
					 url:"../Model/deleteGrMyView.jsp",
					 type:"get",
					 dataType:"html",
					 data:{"paramMyViewId":myviewId},
					 success:function(data){
					 $("#cateView a").click();
					 }
				 });
			 };
			 
			 $(".delFav").live("click",function(){
				 var myviewId=this.id.substring("8");
			
				 if(confirm("Do you want to remove form myview?")){
					//alert(myviewId);
					 deleteFromMyView(myviewId);
					  
				 }
			 });
			 $(".test").live("click",function(){
					//alert("hello jquery click");
					return false;
			 });
			 $(".listSequence").live("change",function(event){
					//alert("hello jquery list");
					
					event.stopPropagation();
			 });
				 
			
			//###########delelte grahp from myview end################
			 
			 //click list for add myview start
			 $(".slot").die();
			 $(".slot").live("click",function(){
				
				var slotView=this.id.substring("4");
				var userLogin=$("#embParamUserLogin").val();
				var graphId=$("#embparamGraphId").val();
			
				insertToMyviewFn(userLogin,slotView,graphId);
			 });
			 //click list for add myview end
			 
			 //createStructure layout cate view start
			 
			
			 
			 var createLayoutGraphMyView = function(graphName,myViewId,slotPosition,graphNameTitle){


					//htmlLayoutGraphMyView="<div id=\"slot-1\" class=\"graphBoxArea\">" +
					if(slotPosition==1){

						  var htmlLayoutGraphMyView="";
						  htmlLayoutGraphMyView="" +
									"<div class=\"touchslider-item\">" +
										"<div class=\"contentGraph\">" +
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
												"<div id=\"settingArea\">" +
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
													"</div>" +
												"</div>" +
												"<div id=\"chartArea\">" +
													"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												"</div>" +
											"</div>" +
											"<div class=\"graphBottom\">" +
												"<div class=\"graphDetail\">" +
												"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
													for(var i=1;i<=6;i++){
														if(slotPosition==i){
															htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"</option>";	
														}else{
															htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
														}
													}
													htmlLayoutGraphMyView+=	"</select>" +
												""+graphNameTitle+"" +
												"</div>" +
												"<div class=\"graphAddFav\" style=\"text-align:right\">" +

														"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove MyView</button>" +
													
													"</div>" +
											"</div>" +
										"</div>" +
									"</div>";
							
							
							//alert(htmlLayoutGraph);
							$("#slot-1").html(htmlLayoutGraphMyView);
						 
										
						
					}else if(slotPosition==2){
						 var htmlLayoutGraphMyView="";
						  htmlLayoutGraphMyView="" +
									"<div class=\"touchslider-item\">" +
										"<div class=\"contentGraph\">" +
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
												"<div id=\"settingArea\">" +
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
													"</div>" +
												"</div>" +
												"<div id=\"chartArea\">" +
													"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												"</div>" +
											"</div>" +
											"<div class=\"graphBottom\">" +
												"<div class=\"graphDetail\">" +
												"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
													for(var i=1;i<=6;i++){
														if(slotPosition==i){
															htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"</option>";	
														}else{
															htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
														}
													}
													htmlLayoutGraphMyView+=	"</select>" +
												""+graphNameTitle+"" +
												"</div>" +
												"<div class=\"graphAddFav\" style=\"text-align:right\">" +

														"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove MyView</button>" +
													
													"</div>" +
											"</div>" +
										"</div>" +
									"</div>";
							
						$("#slot-2").html(htmlLayoutGraphMyView);
						
					}else if(slotPosition==3){
						 var htmlLayoutGraphMyView="";
						  htmlLayoutGraphMyView="" +
									"<div class=\"touchslider-item\">" +
										"<div class=\"contentGraph\">" +
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
												"<div id=\"settingArea\">" +
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
													"</div>" +
												"</div>" +
												"<div id=\"chartArea\">" +
													"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												"</div>" +
											"</div>" +
											"<div class=\"graphBottom\">" +
												"<div class=\"graphDetail\">" +
												"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
													for(var i=1;i<=6;i++){
														if(slotPosition==i){
															htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"</option>";	
														}else{
															htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
														}
													}
													htmlLayoutGraphMyView+=	"</select>" +
												""+graphNameTitle+"" +
												"</div>" +
												"<div class=\"graphAddFav\" style=\"text-align:right\">" +

														"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove MyView</button>" +
													
													"</div>" +
											"</div>" +
										"</div>" +
									"</div>";
							
						$("#slot-3").html(htmlLayoutGraphMyView);
						
					}else if(slotPosition==4){
						 var htmlLayoutGraphMyView="";
						  htmlLayoutGraphMyView="" +
									"<div class=\"touchslider-item\">" +
										"<div class=\"contentGraph\">" +
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
												"<div id=\"settingArea\">" +
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
													"</div>" +
												"</div>" +
												"<div id=\"chartArea\">" +
													"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												"</div>" +
											"</div>" +
											"<div class=\"graphBottom\">" +
												"<div class=\"graphDetail\">" +
												"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
													for(var i=1;i<=6;i++){
														if(slotPosition==i){
															htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"</option>";	
														}else{
															htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
														}
													}
													htmlLayoutGraphMyView+=	"</select>" +
												""+graphNameTitle+"" +
												"</div>" +
												"<div class=\"graphAddFav\" style=\"text-align:right\">" +
													
														"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove MyView</button>" +
													
													"</div>" +
											"</div>" +
										"</div>" +
									"</div>";
							
						$("#slot-4").html(htmlLayoutGraphMyView);
						
					}else if(slotPosition==5){
						 var htmlLayoutGraphMyView="";
						  htmlLayoutGraphMyView="" +
									"<div class=\"touchslider-item\">" +
										"<div class=\"contentGraph\">" +
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
												"<div id=\"settingArea\">" +
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
													"</div>" +
												"</div>" +
												"<div id=\"chartArea\">" +
													"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												"</div>" +
											"</div>" +
											"<div class=\"graphBottom\">" +
												"<div class=\"graphDetail\">" +
												"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
													for(var i=1;i<=6;i++){
														if(slotPosition==i){
															htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"</option>";	
														}else{
															htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
														}
													}
													htmlLayoutGraphMyView+=	"</select>" +
												""+graphNameTitle+"" +
												"</div>" +
												"<div class=\"graphAddFav\" style=\"text-align:right\">" +
													
														"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove MyView</button>" +
													
													"</div>" +
											"</div>" +
										"</div>" +
									"</div>";
							
						$("#slot-5").html(htmlLayoutGraphMyView);
						
					}else if(slotPosition==6){
						 var htmlLayoutGraphMyView="";
						  htmlLayoutGraphMyView="" +
									"<div class=\"touchslider-item\">" +
										"<div class=\"contentGraph\">" +
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
												"<div id=\"settingArea\">" +
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
													"</div>" +
												"</div>" +
												"<div id=\"chartArea\">" +
													"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												"</div>" +
											"</div>" +
											"<div class=\"graphBottom\">" +
												"<div class=\"graphDetail\">" +
												"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
													for(var i=1;i<=6;i++){
														if(slotPosition==i){
															htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"</option>";	
														}else{
															htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
														}
													}
													htmlLayoutGraphMyView+=	"</select>" +
												""+graphNameTitle+"" +
												"</div>" +
												"<div class=\"graphAddFav\" style=\"text-align:right\">" +
													
														"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove MyView</button>" +
													
													"</div>" +
											"</div>" +
										"</div>" +
									"</div>";
							
						$("#slot-6").html(htmlLayoutGraphMyView);
					}
					
				};
				
				//function update slot sequence start
				 var updateSlotSequence= function(oldSlot,newSlot){
					 $.ajax({
						url:"../Model/sequenceSlot.jsp",
						type:"get",
						dataType:"html",
						data:{"paramOldSlot":oldSlot,"paramNewSlot":newSlot},
						success:function(data){
							$("#cateView a").click();
						}
					 });
				 };
				//function update slot sequence end
				//sequence myview management start
				 $("#listSequenceMyView").die("change");
				 $("#listSequenceMyView").die("click");
				 var oldSlot;
				 $(".k-dropdown-wrap").live("click",function(){
					var numSlotArray= $("span.k-input",this).text().split(" ");
					 oldSlot=parseInt(numSlotArray[1]);
					 //alert(oldSlot);
				 });
				 $("#listSequenceMyView").live("change",function(){
					//alert($("select#listSequenceMyView option:selected").val());
					 var newSlot=this.value;
					 updateSlotSequence(oldSlot,newSlot);
					 
				 });
				 
				//sequence myview management end	
				 
			//Default click first sequence main menu
			$("#leftMenu ul li").eq("1").click();
			
			
	});


//###################function using share other funciton start##########################
function getBranchParameter(graphNameArea,branchCode){
	//alert("branchCode"+branchCode);
	var branchHtml = "";
	$.ajax({
		url:"../Model/SMI_getBranch.jsp",
		type:"get",
		dataType:"json",
		async:false,
		success:function(data){
			branchHtml+="<select class=\"list\" id=\"paramBranch"+graphNameArea+"\">";
			$.each(data,function(index,indexEntry){
				if(branchCode==indexEntry[0]){
		
				branchHtml+="<option selected value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";
				}else{
				branchHtml+="<option value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";	
				}
			});
			branchHtml+="</select>";
		}
	});
$("td#areaParamBranch"+graphNameArea).html(branchHtml);
$("select#paramBranch"+graphNameArea).kendoDropDownList();
}

function getYearParameterOnly(graphNameArea,paramYear){
	//alert("hello call function year parameter");
	var yearHtml = "";
	$.ajax({
		url:"../Model/SMI_ParamYear.jsp",
		type:"get",
		dataType:"json",
		async:false,
		success:function(data){
			yearHtml+="<select class=\"list\" id=\"paramYear"+graphNameArea+"\">";
			$.each(data,function(index,indexEntry){
				if(paramYear==indexEntry[0]){
					//alert(branchCode==indexEntry[0]);
					yearHtml+="<option selected value=\""+indexEntry[0]+"\">"+indexEntry[0]+"</option>";
				}else{
					yearHtml+="<option value=\""+indexEntry[0]+"\">"+indexEntry[0]+"</option>";	
				}
			});
			yearHtml+="</select>";
		}
	});
$("td#areaParamYear"+graphNameArea).html(yearHtml);
$("select#paramYear"+graphNameArea).kendoDropDownList();
	
}
function getYearParameter(graphNameArea,paramYear){
	//alert("hello call function year parameter");
	var yearHtml = "";
	$.ajax({
		url:"../Model/SMI_ParamYear.jsp",
		type:"get",
		dataType:"json",
		async:false,
		success:function(data){
			yearHtml+="<select class=\"list\" id=\"paramYear"+graphNameArea+"\">";
			$.each(data,function(index,indexEntry){
				if(paramYear==indexEntry[0]){
					//alert(branchCode==indexEntry[0]);
					yearHtml+="<option selected value=\""+indexEntry[0]+"\">"+indexEntry[0]+"</option>";
				}else{
					yearHtml+="<option value=\""+indexEntry[0]+"\">"+indexEntry[0]+"</option>";	
				}
			});
			yearHtml+="</select>";
		}
	});
$("td#areaParamYear"+graphNameArea).html(yearHtml);
$("select#paramYear"+graphNameArea).kendoDropDownList();
$("select#paramYear"+graphNameArea).die("change");
$("select#paramYear"+graphNameArea).live("change",function(){
	//alert(this.value);
	getParamStartWeek(graphNameArea,this.value);
	getParamEndWeek(graphNameArea,this.value);
	
});

}
function getMonthParameter(graphNameArea,paramMonthSelected){
	//alert("paramMonthSelected"+paramMonthSelected);
	var monthHtml = "";
	$.ajax({
		url:"../Model/SMI_ParamMonth.jsp",
		type:"get",
		dataType:"json",
		async:false,
		success:function(data){
			monthHtml+="<select class=\"list\" id=\"paramMonth"+graphNameArea+"\">";
			$.each(data,function(index,indexEntry){
				if(parseInt(paramMonthSelected)==indexEntry[0]){
					//alert(branchCode==indexEntry[0]);
					monthHtml+="<option selected value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";
				}else{
					monthHtml+="<option value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";	
				}
			});
			monthHtml+="</select>";
		}
	});
$("td#areaParamMonth"+graphNameArea).html(monthHtml);
$("select#paramMonth"+graphNameArea).kendoDropDownList();
}


function getParamStartWeek(graphNameArea,paramYear,startWeekSeleted){
	var htmlParam="";
	$.ajax({
		url:"../Model/SMI_ParamWeekInterval.jsp",
		type:"get",
		dataType:"json",
		async:false,
		data:{"paramYear":paramYear},
		success:function(data){
		
			htmlParam+="<select class=\"list\" id=\"paramStartWeek"+graphNameArea+"\">";
			$.each(data,function(index,indexEntry){
				var startWeekNumber=indexEntry[0].substring("1");
				if(startWeekSeleted==startWeekNumber){
				htmlParam+="<option selected value="+startWeekNumber+">"+indexEntry[0]+" "+indexEntry[1]+"</option>"; 
				}else{
				htmlParam+="<option value="+startWeekNumber+">"+indexEntry[0]+" "+indexEntry[1]+"</option>"; 	
				}
			});
			htmlParam+="</select>";
			$("td#areaParamStartWeek"+graphNameArea).html(htmlParam);
			$("select#paramStartWeek"+graphNameArea).kendoDropDownList();
		}
	});
}



function getParamEndWeek(graphNameArea,paramYear,endWeekSeleted){
	var htmlParam="";
	$.ajax({
		url:"../Model/SMI_ParamWeekInterval.jsp",
		type:"get",
		dataType:"json",
		async:false,
		data:{"paramYear":paramYear},
		success:function(data){
		
			htmlParam+="<select class=\"list\" id=\"paramEndWeek"+graphNameArea+"\">";
			$.each(data,function(index,indexEntry){
				
				var endWeekNumber=indexEntry[0].substring("1");
				if(endWeekSeleted==endWeekNumber){
				htmlParam+="<option selected value="+endWeekNumber+">"+indexEntry[0]+" "+indexEntry[1]+"</option>"; 
				}else{
				htmlParam+="<option value="+endWeekNumber+">"+indexEntry[0]+""+indexEntry[1]+"</option>"; 	
				}
			});
			htmlParam+="</select>";
			
			$("td#areaParamEndWeek"+graphNameArea).html(htmlParam);
			$("select#paramEndWeek"+graphNameArea).kendoDropDownList();
		}
	});
}
function getStartDateParameter(graphNameArea,paramDate){
	//alert(graphNameArea+"ll"+paramDate);
	var html="<input type=\"text\" name=\"paramStartDate"+graphNameArea+"\" id=\"paramStartDate"+graphNameArea+"\" class=\"date\">";
	$("td#areaParamStartDate"+graphNameArea).html(html);
	
	
	$("#paramStartDate"+graphNameArea).datepicker({
		 showOn: "button",
		 buttonImage: "../images/calendar.gif",
		 buttonImageOnly: true
		 });
	 $("#paramStartDate"+graphNameArea).datepicker("option", "dateFormat", "yy-mm-dd");
	 $("#paramStartDate"+graphNameArea).val(paramDate);
	 
		
}
function getEndDateParameter(graphNameArea,paramDate){
	var html="<input type=\"text\" name=\"paramEndDate"+graphNameArea+"\" id=\"paramEndDate"+graphNameArea+"\" class=\"date\">";
	$("td#areaParamEndDate"+graphNameArea).html(html);

	$("#paramEndDate"+graphNameArea).datepicker({
		 showOn: "button",
		 buttonImage: "../images/calendar.gif",
		 buttonImageOnly: true
		 });
	 $("#paramEndDate"+graphNameArea).datepicker("option", "dateFormat", "yy-mm-dd");
	 $("#paramEndDate"+graphNameArea).val(paramDate);
}
/*
function getWeekInterval(paramWeek){
	var weekInterval="";
	$.ajax({
		url:"../Model/SMI_weekInterval.jsp",
		type:"get",
		dataType:"json",
		async:false,
		data:{"paramWeek":paramWeek},
		success:function(data){
			weekInterval= data[0][0];
		}
		
	});
	return weekInterval;
}
*/
function getWeekInterval(paramYear,paramWeek){
	var vWeek0="";
	var vWeek="";
	switch(paramWeek){
	case 1:vWeek0="01";break;
	case 2:vWeek0="02";break;
	case 3:vWeek0="03";break;
	case 4:vWeek0="04";break;
	case 5:vWeek0="05";break;
	case 6:vWeek0="06";break;
	case 7:vWeek0="07";break;
	case 8:vWeek0="08";break;
	case 9:vWeek0="09";break;
	
	}
	if(vWeek0!=""){
	vWeek='W'+vWeek0;
	}else{
	vWeek='W'+paramWeek;	
	}
	//alert("vWeek="+vWeek);
	
	var weekInterval="";
	$.ajax({
		url:"../Model/SMI_weekInterval.jsp",
		type:"get",
		dataType:"json",
		async:false,
		data:{"paramYear":paramYear,"paramWeek":vWeek},
		success:function(data){
			weekInterval= data[0][0];
		}
		
	});
	return weekInterval;
	
}

//Get return monthName start
function getMonthName(monthNo){
				var monthName="";
				//'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
				switch(parseInt(monthNo)){
				case 1:monthName="Jan";break;
				case 2:monthName="Feb";break;
				case 3:monthName="Mar";break;
				case 4:monthName="Apr";break;
				case 5:monthName="May";break;
				case 6:monthName="Jun";break;
				case 7:monthName="Jul";break;
				case 8:monthName="Aug";break;
				case 9:monthName="Sep";break;
				case 10:monthName="Oct";break;
				case 11:monthName="Nov";break;
				case 12:monthName="Dec";break;
				
				}
				return monthName;
			}

//Get return monthName end

//Get return monthName start
function getMonthFullName(monthNo){
				var monthName="";
				/*
				1. January – Jan.
				2 . February – Feb.
				3. March – Mar.
				4. April – Apr.
				5. May – May
				6. June – Jun.
				7. July – Jul.
				8. August – Aug.
				9. September – Sep. or Sept.
				10. October – Oct.
				11. November – Nov.
				12. December – Dec.
				*/
				switch(parseInt(monthNo)){
				case 1:monthName="January";break;
				case 2:monthName="February";break;
				case 3:monthName="March";break;
				case 4:monthName="April";break;
				case 5:monthName="May";break;
				case 6:monthName="June";break;
				case 7:monthName="July";break;
				case 8:monthName="August";break;
				case 9:monthName="September";break;
				case 10:monthName="October";break;
				case 11:monthName="November";break;
				case 12:monthName="December";break;
				
				}
				return monthName;
			}

//Get return monthName end


//date Time start
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if (mm < 10) {
	    mm = '0' + mm;
	}

	if (dd < 10) {
	    dd = '0' + dd;
	}
	 //date Time start	

function getYearONDate(date){
	
	 var thisDate = new Date(date);
	 var yyyy = thisDate.getFullYear();
	 return yyyy;

}
function getMonthOnDate(date){
	var thisDate = new Date(date);
	var mm = thisDate.getMonth()+1; //January is 0!
	return mm;

}
function getDayOnDate(date){
	var thisDate = new Date(date);
	var dd = thisDate.getDate();
	return dd;
	 

}
/*
var dd = thisDate.getDate();

*/

//ฟังก์ชันสำหรับ tooltip แสดงค่าตัวเลข 2 ตำแหน่ง และ Commas
function getDicimalCommas(value){
var nStr=(value).toFixed(2);
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
//ฟังก์ชันจัดการ Commas
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}	
//###############################function using share other funciton start ####################################