$(document).ready(function(){
	
	//Math.round(x) //rounded to more
	//Math.floor(x) //rounded to Rational number
	//Math.ceil(x) //rounded to up only
	
/*######################################Define UserName Start############################################*/
	var userLogin="";
	userLogin="N0001";
/*######################################Define UserName End############################################*/
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
			
		}
		
	});
	
	};
	countMyViewFn();

	//setParameter
	
	var expansionFn = function(){
		
		$("#leftMenu").animate({"left":"0px"});
		$("#leftMenu").removeClass("expansion");
		$("#leftMenu").addClass("withdraw");
	};
	var withdrawFn= function(){
		$("#leftMenu").animate({"left":"-200px"});
		$("#leftMenu").removeClass("withdraw");
		$("#leftMenu").addClass("expansion");
	};
	
	
	
	$("#btHideShow").click(function(){
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


	
	$(".cateGraph").live("click",function(){
		//callGraphByCate();
		withdrawFn();
		//$(".setting").die("click");
	});
	//click other area is withdraw left menu
	$("#mainContent").click(function(){
		withdrawFn();
	});
	$("#heaerRight").die("click");
	$("#heaerRight").live("click",function(){
		withdrawFn();
	});
	



var createLayoutGraphNotReturn = function(graphName,graphType,graphId,arIndex,graphNameThaiLanguage){
		
		var htmlLayoutGraph="";
		htmlLayoutGraph="<div class=\"graphBoxArea\">" +
							"<div class=\"graphTop\" id=\"area"+graphName+"-"+arIndex+"\">" +
								"<div class=\"settingArea\">" +
									"<div class=\"setting\" id=\"settingarea"+graphName+"-"+arIndex+"\">" +
										"<span class=\"ui-icon ui-icon-gear\"></span>" +
									"</div>" +
								"</div>" +
								"<div id=\"chart"+graphName+"-"+arIndex+"\"  class=\"chart\"></div>" +
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
									"</ul>" +
									"<button id=\"id"+graphName+"\" class=\"addFav addMyView ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Add MyView</button>" +
								"</div>" +
							"</div>" +
						"</div>" +
								
						"";
		
		$("#contentGraph").append(htmlLayoutGraph);
		$(".graphDetail").css({"margin":"5px"});
	};
	
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
	var createLayoutGraphMyView = function(graphName,myViewId,slotPosition,graphNameTitle){

		
		
		//htmlLayoutGraphMyView="<div id=\"slot-1\" class=\"graphBoxArea\">" +
		if(slotPosition==1){
			var htmlLayoutGraphMyView="";
			htmlLayoutGraphMyView+=	"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
						"<div class=\"settingArea\">" +
							"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
								"<span class=\"ui-icon ui-icon-gear\"></span>" +
							"</div>" +
						"</div>" +
						"<div id=\"chart"+graphName+"-"+slotPosition+"\" class=\"chart\">cart</div>" +
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
							""+graphNameTitle+""+
						"</div>" +
						"<div class=\"graphAddFav\" style=\"text-align:right\">" +
							"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove</button>" +
						"</div>" +
					"</div>" +
				
			    //"</div>" +
				
			"";
			$("#slot-1").html(htmlLayoutGraphMyView);
			
		}else if(slotPosition==2){
			var htmlLayoutGraphMyView="";
			htmlLayoutGraphMyView+=	"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
						"<div class=\"settingArea\">" +
							"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
								"<span class=\"ui-icon ui-icon-gear\"></span>" +
							"</div>" +
						"</div>" +
						"<div id=\"chart"+graphName+"-"+slotPosition+"\" class=\"chart\">cart</div>" +
					"</div>" +
					"<div class=\"graphBottom\">" +
						"<div class=\"graphDetail\">" +
							"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
							
							for(var i=1;i<=6;i++){
								if(slotPosition==i){
									htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"  </option>";	
								}else{
									htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
								}
							}
			
							
							htmlLayoutGraphMyView+=	"</select>" +
							""+graphNameTitle+""+
						"</div>" +
						"<div class=\"graphAddFav\" style=\"text-align:right\">" +
							"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove </button>" +
						"</div>" +
					"</div>" +
				
			    //"</div>" +
				
			"";
			$("#slot-2").html(htmlLayoutGraphMyView);
			
		}else if(slotPosition==3){
			var htmlLayoutGraphMyView="";
			htmlLayoutGraphMyView+=	"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
						"<div class=\"settingArea\">" +
							"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
								"<span class=\"ui-icon ui-icon-gear\"></span>" +
							"</div>" +
						"</div>" +
						"<div id=\"chart"+graphName+"-"+slotPosition+"\" class=\"chart\">cart</div>" +
					"</div>" +
					"<div class=\"graphBottom\">" +
						"<div class=\"graphDetail\">" +
							"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
							
							for(var i=1;i<=6;i++){
								if(slotPosition==i){
									htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"  </option>";	
								}else{
									htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot"+i+"  </option>";
								}
							}
			
							
							htmlLayoutGraphMyView+=	"</select>" +
							""+graphNameTitle+""+
						"</div>" +
						"<div class=\"graphAddFav\" style=\"text-align:right\">" +
							"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove </button>" +
						"</div>" +
					"</div>" +
				
			    //"</div>" +
				
			"";
			$("#slot-3").html(htmlLayoutGraphMyView);
			
		}else if(slotPosition==4){
			var htmlLayoutGraphMyView="";
			htmlLayoutGraphMyView+=	"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
						"<div class=\"settingArea\">" +
							"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
								"<span class=\"ui-icon ui-icon-gear\"></span>" +
							"</div>" +
						"</div>" +
						"<div id=\"chart"+graphName+"-"+slotPosition+"\" class=\"chart\">cart</div>" +
					"</div>" +
					"<div class=\"graphBottom\">" +
						"<div class=\"graphDetail\">" +
							"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
							
							for(var i=1;i<=6;i++){
								if(slotPosition==i){
									htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"  </option>";	
								}else{
									htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
								}
							}
			
							
							htmlLayoutGraphMyView+=	"</select>" +
							""+graphNameTitle+""+
						"</div>" +
						"<div class=\"graphAddFav\" style=\"text-align:right\">" +
							"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove </button>" +
						"</div>" +
					"</div>" +
				
			    //"</div>" +
				
			"";
			$("#slot-4").html(htmlLayoutGraphMyView);
			
		}else if(slotPosition==5){
			var htmlLayoutGraphMyView="";
			htmlLayoutGraphMyView+=	"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
						"<div class=\"settingArea\">" +
							"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
								"<span class=\"ui-icon ui-icon-gear\"></span>" +
							"</div>" +
						"</div>" +
						"<div id=\"chart"+graphName+"-"+slotPosition+"\" class=\"chart\">cart</div>" +
					"</div>" +
					"<div class=\"graphBottom\">" +
						"<div class=\"graphDetail\">" +
							"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
							
							for(var i=1;i<=6;i++){
								if(slotPosition==i){
									htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"  </option>";	
								}else{
									htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
								}
							}
			
							
							htmlLayoutGraphMyView+=	"</select>" +
							""+graphNameTitle+""+
						"</div>" +
						"<div class=\"graphAddFav\" style=\"text-align:right\">" +
							"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove </button>" +
						"</div>" +
					"</div>" +
				
			    //"</div>" +
				
			"";
			$("#slot-5").html(htmlLayoutGraphMyView);
			
		}else if(slotPosition==6){
			var htmlLayoutGraphMyView="";
			htmlLayoutGraphMyView+=	"<div class=\"graphTop\" id=\"area"+graphName+"-"+slotPosition+"\">" +
						"<div class=\"settingArea\">" +
							"<div class=\"setting\" id=\"settingarea"+graphName+"-"+slotPosition+"\">" +
								"<span class=\"ui-icon ui-icon-gear\"></span>" +
							"</div>" +
						"</div>" +
						"<div id=\"chart"+graphName+"-"+slotPosition+"\" class=\"chart\">cart</div>" +
					"</div>" +
					"<div class=\"graphBottom\">" +
						"<div class=\"graphDetail\">" +
							"<select id=\"listSequenceMyView\" class=\"listSequence\">" ;
							
							for(var i=1;i<=6;i++){
								if(slotPosition==i){
									htmlLayoutGraphMyView+="<option selected value=\""+i+"\">Slot "+i+"  </option>";	
								}else{
									htmlLayoutGraphMyView+="<option value=\""+i+"\">Slot "+i+"  </option>";
								}
							}
			
							
							htmlLayoutGraphMyView+=	"</select>" +
							""+graphNameTitle+""+
						"</div>" +
						"<div class=\"graphAddFav\" style=\"text-align:right\">" +
							"<button id=\"myViewId"+myViewId+"\" class=\"delFav ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Remove </button>" +
						"</div>" +
					"</div>" +
				
			    //"</div>" +
				
			"";
			$("#slot-6").html(htmlLayoutGraphMyView);
		}
		
	};
	
	
	
		
		/*###################click category for send cate name #########################*/
	$(".cateGraph").live("click",function(){
		//alert($(this).text());
		var caetegoryNameArray = $(this).text().split("(");
		//var caetegoryName=caetegoryNameArray[0];
		$("#categroryNameTitle").html(":: "+caetegoryNameArray[0]);
		//alert("click category myview");
		//embed parameter cate graph name start;
		$(".embCateGrap").remove();	
		$("body").append("<input type=\"hidden\" id=\"embCateGraphName\" class=\"embCateGrap\" value=\""+this.id+"\">");
		
		//embed parameter cate graph name end;
		//var cateName=this.id;
		$("#contentGraph").empty();

		var typeGraph = this.id.substring(4);	
		
		if(typeGraph=="View"){
			
			//createStructureLayoutMyViewStart
			createStructureLayoutMyView();
			$.ajax({
				url:"../Model/listGraphMyView.jsp",
				type:"get",
				async:false,
				dataType:"json",
				data:{"paramUserLogin":userLogin},
				success:function(data){
					
					
					//loop while start
					$.each(data,function(index,indexEntry){
						
						//send parameter graphName,myViewId,slotPosition,graphNameTitle
						
						createLayoutGraphMyView(indexEntry[1],indexEntry[5],indexEntry[4],indexEntry[6]);
						//send graphName,graphType,index or myviewId
						createGraphByGaraphName(indexEntry[1],indexEntry[2],indexEntry[4]);
						
					});
					//loop while end
					//
					
					//define shadow border
					 $('.graphBoxArea').shadow('lifted');
					 
					//define kendoDropDown
					 $('.listSequence').kendoDropDownList();
					 $('.graphBoxArea').shadow('lifted');
					//createChart();
					//definne css button sequnce start
					$(".graphDetail").css({"margin":"0px"});
				}
					
			});
			
		}else{
			
			//call function paging here
			callPaging(this.id);
			
		}
		
	});
	//click category graph end
	
	
	//Pagingable Graph Start

	var callPaging = function(cateGraphName){
		//alert(cateGraphName);
		$.ajax({
			url:"../Model/paging.jsp",
			type:"post",
			dataType:"json",
			data:{"paramCateName":cateGraphName},
			success:function(data){
				var numPage = Math.ceil((data.length/4));
				var htmlTable="";
				console.log(numPage);
				
				for(var i=0;i <numPage;i++){
					
					htmlTable+="<div class=\"ball\" id=\"ballID"+i+"\"></div>";
					
				}
				$("#boxTopButton").html(htmlTable);
				$("#ballID0").click();
			}
		});
	};

	//function call graph start
	var createGraphByGaraphName=function(graphName,graphType,arIndex){
		
		if(graphName=="SalePerDay"){
			//Defualt Parameter Start
			 $.ajax({
				url:"../Model/getFirstBranch.jsp",
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
					 var startDate=""+yyyy+"-"+mm+"-01";
					 var endDate=""+yyyy+"-"+mm+"-"+dd+"";
					 var branchId =data[0][0];
					 
					 //alert(startDate);
					 // alert(endDate);
					 //alert(branchId);
					 
					//send graphName,graphType
					//g1
					salePerDayFn(graphName,graphType,arIndex,startDate,endDate,branchId);	
				}
			 });
			//Defualt Parameter End
			 
			
			
		}else if(graphName=="SalePerMonth"){
			//g2
			
			salePerMonthFn(graphName,graphType,arIndex);
		}else if(graphName=="CustomerPerMonth"){
			//g3
			customerPerMonthFn(graphName,graphType,arIndex);
			
		}else if(graphName=="BillPerMonth"){
			//g4
			billPerMonthFn(graphName,graphType,arIndex);
			
		}else if(graphName=="SalePerBill"){
			//g5
			SalePerBillFn(graphName,graphType,arIndex);
			
			
		}else if(graphName=="DeptWastePerDay"){
			//g6
			
			deptWastePerDayFn(graphName,graphType,arIndex);
			
		
		}else if(graphName=="SaleByFoodTypePerDay"){
			//g7
			saleByFoodTypePerDayFn(graphName,graphType,arIndex);
			
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
	
	
	//function call graph end
	
	$(".ball").live("click",function(){
		$(".ball").removeClass("ballGreenTopButton");
		$(this).addClass("ballGreenTopButton");
		$("#contentGraph").empty();
		var pageId=this.id.substring(6);
		var pagingStart=pageId*4;
		//alert($("#embCateGraphName").val());
		
		
		$.ajax({
			url:"../Model/queryPaging.jsp",
			type:"post",
			dataType:"json",
			data:{"paramCateName":$("#embCateGraphName").val(),"pagingStart":pagingStart,"pagingEnd":"4"},
			success:function(data){
				//alert(data);
				
				$.each(data,function(index,EntryIndex){
					//send graphName,graphType,graphId,graphNameTitle
					createLayoutGraphNotReturn(EntryIndex[0],EntryIndex[1],EntryIndex[2],index,EntryIndex[3]);
					//send graphName,graphType,index
					createGraphByGaraphName(EntryIndex[0],EntryIndex[1],index);
				});
				
				
			}
		});
		
		
	});
	//Pagingable Graph end
	
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
								$.each(data,function(index,EntryIndex){
									
									$.ajax({
										url:"../Model/ui_SMI_ListGraphOfCategory.jsp",
										type:"POST",
										dataType:"json",
										async:false,
										data:{"paramCateName":EntryIndex[0]},
										success:function(data){
											htmlMenuLeft+="<li class=\"cateGraph\" id=\""+EntryIndex[0]+"\"><a href=\"#\">"+EntryIndex[0]+"("+data.length+")</a></li>";
										}
									});
									
								});
							}
						});
						
						htmlMenuLeft+="<li class=\"cateGraph\" id=\"cateView\"><a href=\"#\">Favorite("+countMyView+")</a></li>" +
					"</ul>" +
				"</div>" +
				"";
		 return htmlMenuLeft;
	};
	
	
	$("#leftMenu").html(createMenuLeft());
	//Left Menu Hide Show End
	

	//call manage parameter by graph name
	var callManageParameter=function(graphNameArea){
		
		var graphNameAreaNoneIndexArray=graphNameArea.split("-");
	    var graphNameAreaNoneIndex=graphNameAreaNoneIndexArray[0];
	   // alert("graphNameArea="+graphNameArea);
	   // alert("graphNameAreaNoneIndex="+graphNameAreaNoneIndex);
	     
		if(graphNameAreaNoneIndex=="areaSalePerDay"){
			manageParamSalePerDayFn(graphNameArea);
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

	
	$(".setting").live("click",function(){
		
	     var graphNameArea= $(this).parent().parent().attr("id");
	     callManageParameter(graphNameArea);
	     /*
	     if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 $("#"+graphNameArea+"").prepend(htmlParam_SMI_SalePerDay());
			 $("#setParam").slideDown();
			 $(".date").datepicker();
			 $(".list").kendoDropDownList();
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 $("#setParam").slideUp("1000",function(){
					 $(this).remove();
				 });
			 
		}
		*/
			
	});

		/*####################### config dialog start ###################*/ 
		
		var dialogSlotFn=function(){
		//config dialog here
		 $("#dialogSlot").dialog({
			 autoOpen: false,
			 show: {
			 effect: "blind",
			 duration: 1000
			 },
			 hide: {
			 effect: "explode",
			 duration: 1000
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
					var slotTxt1="Slot#1 Name: Empty";
					var slotTxt2="Slot#2 Name: Empty";
					var slotTxt3="Slot#3 Name: Empty";
					var slotTxt4="Slot#4 Name: Empty";
					var slotTxt5="Slot#5 Name: Empty";
					var slotTxt6="Slot#6 Name: Empty";
					
					var slotStatus1="<div class=\"statusFav ballRed\"></div>";
					var slotStatus2="<div class=\"statusFav ballRed\"></div>";
					var slotStatus3="<div class=\"statusFav ballRed\"></div>";
					var slotStatus4="<div class=\"statusFav ballRed\"></div>";
					var slotStatus5="<div class=\"statusFav ballRed\"></div>";
					var slotStatus6="<div class=\"statusFav ballRed\"></div>";
					
					var htmlSlot="";
					
					
					$.each(data,function(index,indexEntry){
						if(index<=5){
						
						if(indexEntry[3]==1){
							
							slotStatus1="<div class=\"statusFav ballGreen\"></div>";
							slotTxt1="Slot#1 Name:"+indexEntry[1];
						}
						
						if(indexEntry[3]==2){
							slotStatus2="<div class=\"statusFav ballGreen\"></div>";
							slotTxt2="Slot#2 Name:"+indexEntry[1];
						}
						
						if(indexEntry[3]==3){
							slotStatus3="<div class=\"statusFav ballGreen\"></div>";
							slotTxt3="Slot#3 Name:"+indexEntry[1];
						}
						
						if(indexEntry[3]==4){
							slotStatus4="<div class=\"statusFav ballGreen\"></div>";
							slotTxt4="Slot#4 Name:"+indexEntry[1];
						}
						
						if(indexEntry[3]==5){
							slotStatus5="<div class=\"statusFav ballGreen\"></div>";
							slotTxt5="Slot#5 Name:"+indexEntry[1];
						}
						
						if(indexEntry[3]==6){
							slotStatus6="<div class=\"statusFav ballGreen\"></div>";
							slotTxt6="Slot#6 Name:"+indexEntry[1];
						}
						
						}//if index<=5
					
					});
					htmlSlot+="<div id=\"selectFav\">";
					htmlSlot+="<ul>";
					
						htmlSlot+="<li>";
							htmlSlot+=slotStatus1;
							htmlSlot+="<div class=\"slotFavName\">";
								htmlSlot+="<a class=\"slot\" id=\"slot1\" href=\"#\">";
									htmlSlot+=slotTxt1;
								htmlSlot+="</a>";
							htmlSlot+="</div>";
						htmlSlot+="</li>";
						
						htmlSlot+="<li>";
						htmlSlot+=slotStatus2;
						htmlSlot+="<div class=\"slotFavName\">";
							htmlSlot+="<a class=\"slot\" id=\"slot2\" href=\"#\">";
								htmlSlot+=slotTxt2;
							htmlSlot+="</a>";
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
						

					htmlSlot+="</ul>";
					htmlSlot+="</div>";
					
					console.log(htmlSlot);
					
					$(".selectListSlot").html(htmlSlot);
					
					$("#dialogSlot").attr("title",arGraphName);
					dialogSlotFn();
					
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
		//###########delelte grahp from myview end################
		 
		 // addFav
		 $(".addMyView").live("click",function() {
			 
			 
			 var idDataGraph=$(this).parent().children().attr("id");
			 var grachName=this.id;
			 
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
		
		 
		//this section end
		 
		 //click list for add myview start
		 $(".slot").die();
		 $(".slot").live("click",function(){
			
			var slotView=this.id.substring("4");
			var userLogin=$("#embParamUserLogin").val();
			var graphId=$("#embparamGraphId").val();
		
			insertToMyviewFn(userLogin,slotView,graphId);
		 });
		 //click list for add myview end
		 
		 //delete grahp from myview start
		 $(".delFav").live("click",function(){
			 var myviewId=this.id.substring("8");
		
			 if(confirm("Do you want to remove form myview?")){
				
				 deleteFromMyView(myviewId);
				  
			 }
		 });
		 //delete graph from myview end
		 
		 
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
	
});

