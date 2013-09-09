
	//###################function using share other funciton start##########################

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
	//date Time end
		var CurrentDate=""+yyyy+"-"+mm+"-"+dd+"";
		 //date Time start

	var ParamFirstDayOfMonthDel2Day="";
	var ParamCurrentDateDel2Day="";
	var dateDel2Day="";
	var mmDel2Day="";
	var yyyyDel2Day="";

	function currentDateDel2Day(CurrentDate){
		
		$.ajax({
			url:"../Model/paramCurrentDateDel2Day.jsp",
			type:"get",
			dataType:"json",
			async:false,
			data:{"paramCurrentDate":CurrentDate},
			success:function(data){
				
				ParamCurrentDateDel2Day=data[0][0];
				 dateDel2Day=new Date(data[0][0]);
				 mmDel2Day=dateDel2Day.getMonth()+1;
				 yyyyDel2Day=dateDel2Day.getFullYear();
				 if (mmDel2Day < 10) {
					 mmDel2Day = '0' + mmDel2Day;
					}
				ParamFirstDayOfMonthDel2Day=yyyyDel2Day+"-"+mmDel2Day+"-01";
			}
		});
	}

	
	var branchId="";
	function getFirstBranch(userLogin){
		 $.ajax({
				url:"../Model/SMI_getBranch.jsp",
				type:"get",
				dataType:"json",
				async:false,
				success:function(data){
					branchId =data[0][0];
				}
			 });
	}
	
	 var currentWeekNumber="";
	function getCurrentWeek(){
	var currentDate=ParamCurrentDateDel2Day;
		$.ajax({
			 url:"../Model/currentWeek.jsp",
			 type:"get",
			 dataType:"json",
			 async :false,
			 data:{"paramDate":currentDate},
			 success:function(data){
				//send branch,year,startWeek,endWeek
				 currentWeekNumber=data[0][1].substring("1");

			 }
			 
		 });
	}
	
	
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
	function getStartDateParameter(graphNameArea,paramDate,paramMachine){
		var $buttonImage="";
		if(paramMachine=="Tablet"){
			$buttonImage="../images/calendarBig.gif";
			readonly="readonly='readonly'";
		}else{
			$buttonImage="../images/calendar.gif";
			readonly="";
		}
		
		//alert(graphNameArea+"ll"+paramDate);
		var html="<input type=\"text\" "+readonly+" name=\"paramStartDate"+graphNameArea+"\" id=\"paramStartDate"+graphNameArea+"\" class=\"date\">";
		$("td#areaParamStartDate"+graphNameArea).html(html);
		
		
		$("#paramStartDate"+graphNameArea).datepicker({
			 showOn: "button",
			 buttonImage: $buttonImage,
			 buttonImageOnly: true
			 });
		 $("#paramStartDate"+graphNameArea).datepicker("option", "dateFormat", "yy-mm-dd");
		 $("#paramStartDate"+graphNameArea).val(paramDate);
		 
			
	}
	function getEndDateParameter(graphNameArea,paramDate,paramMachine){
		var $buttonImage="";
		if(paramMachine=="Tablet"){
			$buttonImage="../images/calendarBig.gif";
		}else{
			$buttonImage="../images/calendar.gif";
		}
		var html="<input type=\"text\" "+readonly+" name=\"paramEndDate"+graphNameArea+"\" id=\"paramEndDate"+graphNameArea+"\" class=\"date\">";
		$("td#areaParamEndDate"+graphNameArea).html(html);

		$("#paramEndDate"+graphNameArea).datepicker({
			 showOn: "button",
			 buttonImage: $buttonImage,
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
	
	var valueAxisFont="";
	var labelsRotation="";
	var legendFont="";
	var categoryAxisFont="";
	var seriesDefaultsFont="";
	var tooltipFont="";
	
	var cateFont="";
	var seriesFont="";
	
	function setFont(paramMachine){
		//ConfigFont
		
		if(paramMachine=="Tablet"){
			//alert("Tablet");
			seriesDefaultsFont="16px Tahoma";
			valueAxisFont="20px Tahoma";
			legendFont="16px Tahoma";
			categoryAxisFont="16px Tahoma";
			titleFont="20px Tahoma";
			labelsRotation=0;
			tooltipFont="16px Tahoma";
			
		}else{
			//alert("PC");
			seriesDefaultsFont="13px Tahoma";
			valueAxisFont="12px Tahoma";
			legendFont="13px Tahoma";
			categoryAxisFont="10px Tahoma";
			titleFont="13px Tahoma";
			labelsRotation=0;
			tooltipFont="13px Tahoma";
		}
		
	}
	//function num amount graph in myview start
	var countMyView="";
	var countMyViewFn= function(userLogin){
		
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
							cache:true,
							success:function(data){
								//alert(data);
								$.each(data,function(index,EntryIndex){
									
									$.ajax({
										url:"../Model/ui_SMI_ListGraphOfCategory.jsp",
										type:"POST",
										dataType:"json",
										async:false,
										cache:true,
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
						
						htmlMenuLeft+="<li class=\"cateGraph cateView\" id=\"cateView\"><a href=\"#\">Myview("+countMyView+")</a></li>" +
					"</ul>" +
				"</div>" +
				"";
		 
		 //$("#leftMenu").html(htmlMenuLeft);
		   //$("#leftMenu").html($("#areaLeftMenu").html());
		   $("#areaLeftMenu").html(htmlMenuLeft);
	};
	//createMenuLeft();
	//alert(createMenuLeft());
	
	//Left Menu Hide Show End
	
	//###############################function using share other funciton start ####################################
$(document).ready(function(){
	
	/*######################################Define Config Start############################################*/
	var userLogin="";
	userLogin="N0001";
	var graphWidth="930";
	var graphHeight="370";
	var paramMachine="Tablet";
	/*######################################Define Config End############################################*/
	//call function top start
	getFirstBranch(userLogin);
	currentDateDel2Day(CurrentDate);
	setFont(paramMachine);
	countMyViewFn(userLogin);
	getCurrentWeek();
	createMenuLeft();
	
	/*#########################Ajax start##########################*/
	//ajax Start
	$("#loading").ajaxStart(function(){
		var widthImg=(screen.availWidth/2)-50;
		var	hieghtImg=(screen.availHeight/2)-50;
		$(this).css({"top":hieghtImg+"px","left":widthImg}).show();
	});
	

	//ajax Stop
	$("#loading").ajaxStop(function(){
	$(this).hide();
	
	}); 
	/*#########################Ajax stop##########################*/
	
	var widthTablet = (parseInt($("body").width())-5);
	
		/*Define bind Touch Slider here*/
		var touchSlider = function(){
	
		$(".touchslider-demo").touchSlider({mouseTouch: true});
		};
		
		/*
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
		*/
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
			//increse performance create function menu left create once.
			
			
			if($("#leftMenu").hasClass("expansion")){
			//countMyViewFn(userLogin);
			//Pull html left menu get to leftMenu
			$("#leftMenu").html($("#areaLeftMenu").html());
			
			$(".cateView").remove();
			$("#boxContent>ul").append("<li class=\"cateGraph cateView\" id=\"cateView\"><a href=\"#\">Myview("+countMyView+")</a></li>");
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
				manageParamSalePerMonthFn(graphNameArea,graphWidth,graphHeight,paramMachine);
				
			}else if(graphNameAreaNoneIndex=="areaCustomerPerMonth"){
				manageParamCusPerMonthFn(graphNameArea,graphWidth,graphHeight,paramMachine);
				
			}else if(graphNameAreaNoneIndex=="areaBillPerMonth"){
				//alert("areaBillWeekly");
				manageParamBillWeeklyFn(graphNameArea,graphWidth,graphHeight,paramMachine);
				
			}else if(graphNameAreaNoneIndex=="areaSalePerBill"){
				manageParamSalesPerBillWeeklyFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}else if(graphNameAreaNoneIndex=="areaDeptWastePerDay"){
				//graph6
				manageParamWasteDailyFn(graphNameArea,graphWidth,graphHeight,paramMachine);
				
			}else if(graphNameAreaNoneIndex=="areaWasteWeekly"){
				//graph7
				//manageParamwasteWeeklyFn
				manageParamwasteWeeklyFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}else if(graphNameAreaNoneIndex=="areaSalesByProductCategoryWeekly"){
				//graph8
				manageParamSalesByProductCategoryWeeklyFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}else if(graphNameAreaNoneIndex=="areaSalesByPromotionMonthly"){
				manageParamSalesByPromotionMonthlyFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}else if(graphNameAreaNoneIndex=="areaTop10Food"){
				manageParamTop10FoodFn(graphNameArea,graphWidth,graphHeight,paramMachine);
				
			}else if(graphNameAreaNoneIndex=="areaTop10bakery"){
				//g11
				manageParamtop10BakeryFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}else if(graphNameAreaNoneIndex=="areaTop10Beverage"){
				//g12
				manageParamtop10BeverageFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}else if(graphNameAreaNoneIndex=="areaTop10Waste"){
				//g13
				manageParamTop10WasteFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}else if(graphNameAreaNoneIndex=="areaTop10CookingTime"){
				//g14
				manageParamtop10CookingTimeFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}else if(graphNameAreaNoneIndex=="areaCookingTimeRange"){
				//g15
				manageParamcookingTimeRangeFn(graphNameArea,graphWidth,graphHeight,paramMachine);
			}
		    
		};
		$(".setting").die("click");
		$(".setting").live("click",function(){
			 withdrawFn();
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
			 //Embed parameter for 
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
											"<button class=\"hideShow \"></button>" +
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
												"<button id=\"btnShowHideSubMenu\">" +
												"<div id=\"txt\">Sub Menu</div>" +
												"</button>" +
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
										"<button type=\"button\" class=\"setting ui-icon ui-icon-gear\" id=\"settingarea"+graphName+"-"+arIndex+"\">" +
												"OK" +
											//"<button class=\"ui-icon ui-icon-gear\"></button>" +
										"</button>" +
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
				$("#contentGraph").remove();
				$(".touchslider-viewport").append("<div id=\"contentGraph\"></div>");
				var graphNameArray = this.id.split("-");
				var graphName=graphNameArray[1];
				//alert(graphId);
				var typeCateUrl="";
				if($("#categroryNameTitle").text()==":: Myview"){
					typeCateUrl="../Model/SMI_callGraphBySubMenuMyView.jsp";
				}else{
					typeCateUrl="../Model/SMI_callGraphBySubMenu.jsp";
				}
				
				$.ajax({
					url:typeCateUrl,
					type:"get",
					dataType:"json",
					data:{"paramGraphName":graphName},
					async:false,
					success:function(data){
						
						//data=SalePerDay,line,1,ยอดขายรายวันของหน้าร้าน
						if($("#categroryNameTitle").text()==":: Myview"){
						//send parameter graphName,myViewId,slotPosition,graphNameTitle
						//graphName,graphType,graphId,arIndex,graphNameThaiLanguage,arMyView,myViewId
						createLayoutGraphNotReturn(data[0][0],data[0][1],data[0][2],0,data[0][3],"MyView",data[0][4]);
						createGraphByGaraphName(data[0][0],data[0][1],0);
						}else{
						//get funciton graphName,graphType,graphId,arIndex,graphNameThaiLanguage,arMyView,myViewId
						createLayoutGraphNotReturn(data[0][0],data[0][1],data[0][2],0,data[0][3]);
						createGraphByGaraphName(data[0][0],data[0][1],0);
						}
						//send graphName,graphType,index
						
						
						numListTopButton(0);
						touchSlider();
					}
					
					
				});
				//CaSMI_callGraphBySubMenu
				$("#btnShowHideSubMenu").trigger("click");
			});
			/*################### click sub graph for get graphp by id end  #####################*/ 
			
			/*###################function call graph start ######################################*/

			var createGraphByGaraphName=function(graphName,graphType,arIndex){
				//Config width and height for pc here
				//alert("graphName="+graphName);
				if(graphName=="SalePerDay"){
					
							if($(".paramEmbed"+graphName).text()==""){
								
								startDate=ParamFirstDayOfMonthDel2Day;
								endDate=ParamCurrentDateDel2Day;
							}else{
								startDate=$("ul.paramEmbed"+graphName+">li.paramStartDate"+graphName).text();
								endDate=$("ul.paramEmbed"+graphName+">li.paramEndDate"+graphName).text();
							}
							
							//send graphName,graphType
							//g1
							salePerDayFn(graphName,graphType,arIndex,startDate,endDate,branchId,graphWidth,graphHeight);	
					
					//Defualt Parameter End
					 
					
					
				}else if(graphName=="SalePerMonth"){
					//g2
					//Defualt Parameter Start
					
							 
							 if($(".paramEmbed"+graphName).text()==""){
									currentDate=ParamCurrentDateDel2Day;
								}else{
									currentDate=""+$("ul.paramEmbed"+graphName+">li.paramDate").text()+"";
									branchId=""+$("ul.paramEmbed"+graphName+">li.paramBranchCode").text()+"";
								}
							 
							//send graphName,graphType
							//g2
							//alert(currentDate);
	
							salePerMonthFn(graphName,graphType,arIndex,currentDate,branchId,paramMachine);	
					
					//Defualt Parameter End
					
				}else if(graphName=="CustomerPerMonth"){
					//g3
					//Defualt Parameter Start
					
						
							 
									 if($(".paramDefaultEmbed"+graphName).text()==""){
										 	startWeek=currentWeekNumber;
										 	endWeek=currentWeekNumber;
										 	paramYear=yyyyDel2Day;
										 	
										}else{
											startWeek=$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeek").text();
											endWeek=$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeek").text();
											branchId=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
											paramYear=$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text();
									 }
									
									 customerPerMonthFn(graphName,graphType,arIndex,branchId,paramYear,startWeek,endWeek,graphWidth,graphHeight);
								
							
					//Defualt Parameter End

					
				}else if(graphName=="BillPerMonth"){
					//g4
					//Defualt Parameter Start
	
							 
									 if($(".paramDefaultEmbed"+graphName).text()==""){
										 	startWeek=currentWeekNumber;//Del 2 Day
										 	endWeek=currentWeekNumber;//Day 2 Day
										 	paramYear=yyyyDel2Day;
										}else{
											startWeek=$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeek").text();
											endWeek=$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeek").text();
											branchId=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
											paramYear=$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text();
									 }
									BillWeeklyFn(graphName,graphType,arIndex,branchId,paramYear,startWeek,endWeek,graphWidth,graphHeight);
								
							
						
					//Defualt Parameter End
					
					
				}else if(graphName=="SalePerBill"){
					
					//g5
					//Defualt Parameter Start
					
						
							
									 if($(".paramDefaultEmbed"+graphName).text()==""){
										 	startWeek=currentWeekNumber;
										 	endWeek=currentWeekNumber;
										 	paramYear=yyyyDel2Day;
										}else{
											startWeek=$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeek").text();
											endWeek=$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeek").text();
											branchId=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
											paramYear=$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text();
										
									 }
									 salesPerBillWeeklyFn(graphName,graphType,arIndex,branchId,paramYear,startWeek,endWeek,graphWidth,graphHeight);
									
							
							
					
					//Defualt Parameter End
					
				}else if(graphName=="DeptWastePerDay"){
					//g6		
					//Defualt Parameter Start
								
								if($(".paramDefaultEmbed"+graphName).text()==""){
									 
									  vSDate=ParamFirstDayOfMonthDel2Day;
									  vEDate=ParamCurrentDateDel2Day;
								}else{
									vBranch=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
									vSDate=$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text();
									vEDate=$("ul.paramDefaultEmbed"+graphName+">li.paramEndDate").text();
								}
							 wateDailyFn(graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight);
								
					
					//Defualt Parameter End
				
				}else if(graphName=="WasteWeekly"){
					
					//g7
					//Defualt Parameter Start
										var paramWeekNumber="";
									
										if($(".paramDefaultEmbed"+graphName).text()==""){
											paramWeekNumber=currentWeekNumber; 
											paramYear=yyyyDel2Day;
											
										}else{
					
											paramWeekNumber=$("ul.paramDefaultEmbed"+graphName+">li.paramWeek").text();
											branchId=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
											paramYear=$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text();
										
										}
										wasteWeeklyFn(graphName,graphType,arIndex,branchId,paramYear,paramWeekNumber,graphWidth,graphHeight);
								
					
					//Defualt Parameter End
				
				}else if(graphName=="SalesByProductCategoryWeekly"){
					
					//g8
					//Defualt Parameter Start
					
									 if($(".paramDefaultEmbed"+graphName).text()==""){
										 	startWeek=currentWeekNumber;
										 	endWeek=currentWeekNumber;
										 	paramYear=yyyyDel2Day;
										}else{
											startWeek=$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeek").text();
											endWeek=$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeek").text();
											branchId=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
											paramYear=$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text();
											/*
											alert("startWeek"+startWeek);
											alert("endWeek"+endWeek);
											alert("branchId"+branchId);
											alert("paramYear"+paramYear);
											*/
											
									 }
									 SalesByProductCategoryWeeklyFn(graphName,graphType,arIndex,branchId,paramYear,startWeek,endWeek,graphWidth,graphHeight);
									
								 	
						
							
						
					//Defualt Parameter End
					
					
				}else if(graphName=="SalesByPromotionMonthly"){
					//g9
					//Defualt Parameter Start
					
					
							
							 var today = new Date(ParamCurrentDateDel2Day);
							 var mm = today.getMonth()+1; //January is 0!
							 var yyyy = today.getFullYear();
							 if (mm < 10) {
								    mm = '0' + mm;
								}
							 /*
							  var ParamFirstDayOfMonthDel2Day="";
							  var ParamCurrentDateDel2Day="";
							  */
							 var vYearDefault=""+yyyy+"";
							 var vMonthDefault=""+mm+"";
							 var vBranchDefault =branchId;
							 var vYear="";
							 var vMonth="";
							 var vBranch="";
							 var vPromotionCode1="";
							 var vPromotionCode2="";
							 var vPromotionCode3="";
							 var vPromotionCode4="";
							 var vPromotionCode5="";
							 var vPromotionCode6="";
							 
							 
							
							 $.ajax({
								 url:"../Model/SMI_ParamPromotion.jsp",
								 type:"get",
								 dataType:"json",
								 async :false,
								 data:{"paramYear":vYearDefault,"paramMonth":vMonthDefault,"paramBranch":vBranchDefault},
								 success:function(data){
									
									 if($(".paramEmbed"+graphName).text()==""){
										 vBranch=vBranchDefault;
										 vYear=vYearDefault;
										 vMonth=vMonthDefault;
									
										 
										 if(data!=""){
										 vPromotionCode1=data[0][0];
										 vPromotionCode2=data[0][0];
										 vPromotionCode3=data[0][0];
										 vPromotionCode4=data[0][0];
										 vPromotionCode5=data[0][0];
										 vPromotionCode6=data[0][0];
										 }else{
										 	 vPromotionCode1="00";
											 vPromotionCode2="00";
											 vPromotionCode3="00";
											 vPromotionCode4="00";
											 vPromotionCode5="00";
											 vPromotionCode6="00";
										 }
										}else{
											
											 vBranch=$("ul.paramEmbed"+graphName+">li.paramBranch").text();
											 vYear=$("ul.paramEmbed"+graphName+">li.paramYear").text();
											 vMonth=$("ul.paramEmbed"+graphName+">li.paramMonth").text();
											 vPromotionCode1=$("ul.paramEmbed"+graphName+">li.paramPromotion1").text();
											 vPromotionCode2=$("ul.paramEmbed"+graphName+">li.paramPromotion2").text();
											 vPromotionCode3=$("ul.paramEmbed"+graphName+">li.paramPromotion3").text();
											 vPromotionCode4=$("ul.paramEmbed"+graphName+">li.paramPromotion4").text();
											 vPromotionCode5=$("ul.paramEmbed"+graphName+">li.paramPromotion5").text();
											 vPromotionCode6=$("ul.paramEmbed"+graphName+">li.paramPromotion6").text();
											
											
									 }
									
									 SalesByPromotionMonthlyFn(graphName,graphType,arIndex,vBranch,vYear,vMonth,vPromotionCode1,
											 vPromotionCode2,vPromotionCode3 ,vPromotionCode4,vPromotionCode5,
											 vPromotionCode6,graphWidth,graphHeight,paramMachine);
									 
								 }	
								 
							 });
							 
							
					
					//Defualt Parameter End
				
					
				}else if(graphName=="Top10Food"){
					//alert("g10");
					//g10
					//Defualt Parameter Start
					
								
							 var vBranch =branchId;
							 var vSDate="";
							 var vEDate="";
							
							if($(".paramDefaultEmbed"+graphName).text()==""){
								  vSDate=ParamFirstDayOfMonthDel2Day;
								  vEDate=ParamCurrentDateDel2Day;
							}else{
								vBranch=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
								vSDate=$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text();
								vEDate=$("ul.paramDefaultEmbed"+graphName+">li.paramEndDate").text();
							}
									 //graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight
							 top10FoodFn(graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight,paramMachine);
							
					
					//Defualt Parameter End
					
				}else if(graphName=="Top10bakery"){
					//g11
					//Defualt Parameter Start
					
								
								var vBranch =branchId;
								var vSDate="";
								var vEDate="";
								
								if($(".paramDefaultEmbed"+graphName).text()==""){
									 
									  vSDate=ParamFirstDayOfMonthDel2Day;
									  vEDate=ParamCurrentDateDel2Day;
								}else{
									vBranch=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
									vSDate=$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text();
									vEDate=$("ul.paramDefaultEmbed"+graphName+">li.paramEndDate").text();
								}

									     //graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight
							 top10BakeryFn(graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight,paramMachine);
							
					
					//Defualt Parameter End
					
					
				}else if(graphName=="Top10Beverage"){
					//g12
					//Defualt Parameter Start
					
								var vBranch =branchId;
								var vSDate="";
								var vEDate="";
								
								if($(".paramDefaultEmbed"+graphName).text()==""){
									 
									  vSDate=ParamFirstDayOfMonthDel2Day;
									  vEDate=ParamCurrentDateDel2Day;
								}else{
									vBranch=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
									vSDate=$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text();
									vEDate=$("ul.paramDefaultEmbed"+graphName+">li.paramEndDate").text();
								}

									     //graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight
							 top10BeverageFn(graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight,paramMachine);
							
					
					//Defualt Parameter End
					
				}else if(graphName=="Top10Waste"){
					
					//g13
					//Defualt Parameter Start
					
			
							 
							 	var vBranch =branchId;
								var vYear="";
								var vMonth="";
								
								if($(".paramDefaultEmbed"+graphName).text()==""){
									  
									  vYear=""+yyyyDel2Day+"";
									  vMonth=""+mmDel2Day+"";
								}else{
									vBranch=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
									vYear=$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text();
									vMonth=$("ul.paramDefaultEmbed"+graphName+">li.paramMonth").text();
								}

								
									     //graphName,graphType,arIndex,vBranch,vYear,vMonth,graphWidth,graphHeight
							 top10WasteFn(graphName,graphType,arIndex,vBranch,vYear,vMonth,graphWidth,graphHeight,paramMachine);
							
					
					//Defualt Parameter End
					
					
				}else if(graphName=="Top10CookingTime"){
					
					//g14
					//Defualt Parameter Start
					 

							 	var vBranch =branchId;
								var vYear="";
								var vMonth="";
								
								if($(".paramDefaultEmbed"+graphName).text()==""){
									
									  vYear=""+yyyyDel2Day+"";
									  vMonth=""+mmDel2Day+"";
								}else{
									vBranch=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
									vYear=$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text();
									vMonth=$("ul.paramDefaultEmbed"+graphName+">li.paramMonth").text();
								}

									     //graphName,graphType,arIndex,vBranch,vYear,vMonth,graphWidth,graphHeight
							 top10CookingTimeFn(graphName,graphType,arIndex,vBranch,vYear,vMonth,graphWidth,graphHeight,paramMachine);
							
					
					//Defualt Parameter End
					
					
				}else if(graphName=="CookingTimeRange"){
					
					//g15
					
					//Defualt Parameter Start
					
								var vBranch =branchId;
								var vYear="";
								var vMonth="";
								
								if($(".paramDefaultEmbed"+graphName).text()==""){
									
									  vYear=""+yyyyDel2Day+"";
									  vMonth=""+mmDel2Day+"";
								}else{
									vBranch=$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text();
									vYear=$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text();
									vMonth=$("ul.paramDefaultEmbed"+graphName+">li.paramMonth").text();
								}


									     //graphName,graphType,arIndex,vBranch,vYear,vMonth,graphWidth,graphHeight
							 cookingTimeRangeFn(graphName,graphType,arIndex,vBranch,vYear,vMonth,graphWidth,graphHeight,paramMachine);
							
						
					//Defualt Parameter End
					
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
				//createMenuLeft();
				
				
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
			//when click area orther define left menu hide the right.
			
			$("#contentArea").live("click",function(e){
				withdrawFn();
				//withdrawSubGraphFn();
				e.preventDefault();
				$(this).die("click");
			});
			/*
			$(".touchslider-nav").die("click");
			$(".touchslider-nav").live("click",function(){
				withdrawFn();
			});
			*/
			
			//###################Click category Default######################
			/*####################### config dialog start ###################*/ 
			
			var dialogSlotFn=function(){
			//config dialog here
				
			 $("#dialogSlot").dialog({
				 //title:arGraphName,
				 autoOpen: false,
				 show: {
				 effect: "clip",
				 duration: 500
				 },
				 hide: {
				 effect: "clip",
				 duration: 500
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
								
								slotStatus1="<div id=slotMyViewId"+indexEntry[4]+" class=\"statusFav ballRed\"></div>";
								slotTxt1="Slot#1 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==2){
								slotStatus2="<div id=slotMyViewId"+indexEntry[4]+" class=\"statusFav ballRed\"></div>";
								slotTxt2="Slot#2 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==3){
								slotStatus3="<div id=slotMyViewId"+indexEntry[4]+" class=\"statusFav ballRed\"></div>";
								slotTxt3="Slot#3 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==4){
								slotStatus4="<div id=slotMyViewId"+indexEntry[4]+" id=slotMyViewId"+indexEntry[4]+" class=\"statusFav ballRed\"></div>";
								slotTxt4="Slot#4 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==5){
								slotStatus5="<div id=slotMyViewId"+indexEntry[4]+" class=\"statusFav ballRed\"></div>";
								slotTxt5="Slot#5 :"+indexEntry[1];
							}
							
							if(indexEntry[3]==6){
								slotStatus6="<div id=slotMyViewId"+indexEntry[4]+" class=\"statusFav ballRed\"></div>";
								slotTxt6="Slot#6 :"+indexEntry[1];
							}
							
							}//if index<=5
						
						});
						htmlSlot+="<div id=\"selectFav\">";
						htmlSlot+="<ul>";
						
							htmlSlot+="<li>";
							htmlSlot+="<div class=\"boxSlot\">";
								htmlSlot+=slotStatus1;
								htmlSlot+="<div class=\"slotFavName\">";
									htmlSlot+="<a class=\"slot\" id=\"slot1\" href=\"#\">";
										htmlSlot+=slotTxt1;
									htmlSlot+="</a>";
								htmlSlot+="</div>";
								htmlSlot+="</div>";
							htmlSlot+="</li>";
							
							htmlSlot+="<li>";
							htmlSlot+="<div class=\"boxSlot\">";
							htmlSlot+=slotStatus2;
							htmlSlot+="<div class=\"slotFavName\">";
								htmlSlot+="<a class=\"slot\" id=\"slot2\" href=\"#\">";
									htmlSlot+=slotTxt2;
								htmlSlot+="</a>";
							htmlSlot+="</div>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
						
							htmlSlot+="<li>";
							htmlSlot+="<div class=\"boxSlot\">";
								htmlSlot+=slotStatus3;
								htmlSlot+="<div class=\"slotFavName\">";
									htmlSlot+="<a class=\"slot\" id=\"slot3\" href=\"#\">";
										htmlSlot+=slotTxt3;
									htmlSlot+="</a>";
								htmlSlot+="</div>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
							
							htmlSlot+="<li>";
							htmlSlot+="<div class=\"boxSlot\">";
								htmlSlot+=slotStatus4;
								htmlSlot+="<div class=\"slotFavName\">";
									htmlSlot+="<a class=\"slot\" id=\"slot4\" href=\"#\">";
										htmlSlot+=slotTxt4;
									htmlSlot+="</a>";
								htmlSlot+="</div>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
							
							htmlSlot+="<li>";
							htmlSlot+="<div class=\"boxSlot\">";
								htmlSlot+=slotStatus5;
								htmlSlot+="<div class=\"slotFavName\">";
									htmlSlot+="<a class=\"slot\" id=\"slot5\" href=\"#\">";
										htmlSlot+=slotTxt5;
									htmlSlot+="</a>";
								htmlSlot+="</div>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
							
							htmlSlot+="<li>";
							htmlSlot+="<div class=\"boxSlot\">";
								htmlSlot+=slotStatus6;
								htmlSlot+="<div class=\"slotFavName\">";
									htmlSlot+="<a class=\"slot\" id=\"slot6\" href=\"#\">";
										htmlSlot+=slotTxt6;
									htmlSlot+="</a>";
								htmlSlot+="</div>";
							htmlSlot+="</div>";
							htmlSlot+="</li>";
							htmlSlot+="<br style=\"clear:both\">";
							

						htmlSlot+="</ul>";
						htmlSlot+="</div>";
						
						console.log(htmlSlot);
						
						$(".selectListSlot").html(htmlSlot);
						
						//$("#dialogSlot").attr("title","Add to My View");
						$("#dialogSlot").attr("title","Add to My View");
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
						 countMyViewFn(userLogin);
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
					 countMyViewFn(userLogin);
					  
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
			 
			//###########check grahp on myview start#################
			 var checkMyviewFn = function(arUserLogin,arSlotView){
				 var checkSlot="";
				 
				 $.ajax({
					 url:"../Model/uiCheckSlot.jsp",
					 type:"get",
					 dataType:"json",
					 async:false,
					 data:{"paramUserLogin":arUserLogin,"paramSlotView":arSlotView},
					 success:function(data){
						 checkSlot =data["slot"];
						// listSlotFn(arUserLogin,arGraphId);
					 }
				 });
				 return checkSlot;
				 
			 };
			 //###########check grahp on myview end#################
			 //###########update grahp to myview start#################
			 var updateMyviewFn = function(arUserLogin,arGraphId,arSlotView,arMyviewId){

				 
				 $.ajax({
					 url:"../Model/uiUpdateSlot.jsp",
					 type:"get",
					 dataType:"json",
					 async:false,
					 data:{"paramSlotView":arSlotView,"paramGraphId":arGraphId,"paramMyviewId":arMyviewId},
					 success:function(data){
						
						 listSlotFn(arUserLogin,arGraphId);
					 }
				 });
				 
			 };
			 //###########update grahp to myview end#################
			 
			 //click list for add myview start
			 $(".slot").die();
			 $(".slot").live("click",function(){
				/*
				var slotView=this.id.substring("4");
				var userLogin=$("#embParamUserLogin").val();
				var graphId=$("#embparamGraphId").val();
				insertToMyviewFn(userLogin,slotView,graphId);
				*/
				 
				 var slotView=this.id.substring("4");
					var userLogin=$("#embParamUserLogin").val();
					var graphId=$("#embparamGraphId").val();
					console.log("--------------------------------");
				
					var idMyView=$(this).parent().parent().children().attr("id");
					//alert(checkMyviewFn(userLogin,slotView));
					if(checkMyviewFn(userLogin,slotView)=="thisEmpty"){
						insertToMyviewFn(userLogin,slotView,graphId);
					}else{
						
						if(confirm("Do you want to replace this myview?")){
							
							var idMyViewNumber = idMyView.substring("12");
							updateMyviewFn(userLogin,graphId,slotView,idMyViewNumber);
							
							//alert("ok replaced");
							  
						 }
						
					}
					
					
			 });
			 //click list for add myview end
			 
			 //createStructure layout cate view start
			 
			
			 
			 var createLayoutGraphMyView = function(graphName,myViewId,slotPosition,graphNameTitle){

				 //alert(slotPosition);
				 //slotPosition=slotPosition-1;
					//htmlLayoutGraphMyView="<div id=\"slot-1\" class=\"graphBoxArea\">" +
					if(slotPosition==1){
						  
						  var htmlLayoutGraphMyView="";
						  htmlLayoutGraphMyView="" +
									"<div class=\"touchslider-item\">" +
										"<div class=\"contentGraph\">" +
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+(slotPosition-1)+"\">" +
												"<div id=\"settingArea\">" +
												/*
													"<div class=\"setting\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
													"</div>" +
												*/
													"<button type=\"button\" class=\"setting ui-icon ui-icon-gear\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
					
													"</button>" +
												"</div>" +
												
												"<div id=\"chartArea\">" ;
												
													//"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												
													if(graphName=="SalePerMonth"){
														htmlLayoutGraphMyView+=	"<div id=\"chartMTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartMTD\"></div>" ;	
														htmlLayoutGraphMyView+=	"<div id=\"chartYTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartYTD\"></div>" ;	
													}else{
														htmlLayoutGraphMyView+=	"<div id=\"chart"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart\"></div>" ;
													}	
													htmlLayoutGraphMyView+="</div>" +
												
												
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
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+(slotPosition-1)+"\">" +
												"<div id=\"settingArea\">" +
												/*
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
												"</div>" +
												*/
												"<button type=\"button\" class=\"setting ui-icon ui-icon-gear\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
												
												"</button>" +
												"</div>" +
												"<div id=\"chartArea\">" ;
													//"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												//"</div>" +
												if(graphName=="SalePerMonth"){
													htmlLayoutGraphMyView+=	"<div id=\"chartMTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartMTD\"></div>" ;	
													htmlLayoutGraphMyView+=	"<div id=\"chartYTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartYTD\"></div>" ;	
												}else{
													htmlLayoutGraphMyView+=	"<div id=\"chart"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart\"></div>" ;
												}	
												htmlLayoutGraphMyView+="</div>" +
												
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
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+(slotPosition-1)+"\">" +
												"<div id=\"settingArea\">" +
												/*
													"<div class=\"setting\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
														"<span class=\"ui-icon ui-icon-gear\"></span>" +
													"</div>" +
												*/
												"<button type=\"button\" class=\"setting ui-icon ui-icon-gear\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
												
												"</button>" +
												
												"</div>" +
												"<div id=\"chartArea\">" ;
													//"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												//"</div>" +
												if(graphName=="SalePerMonth"){
													htmlLayoutGraphMyView+=	"<div id=\"chartMTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartMTD\"></div>" ;	
													htmlLayoutGraphMyView+=	"<div id=\"chartYTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartYTD\"></div>" ;	
												}else{
													htmlLayoutGraphMyView+=	"<div id=\"chart"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart\"></div>" ;
												}	
												htmlLayoutGraphMyView+="</div>" +
												
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
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+(slotPosition-1)+"\">" +
												"<div id=\"settingArea\">" +
												/*
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
												"</div>" +
												*/
												"<button type=\"button\" class=\"setting ui-icon ui-icon-gear\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
												
												"</button>" +
												
												"</div>" +
												"<div id=\"chartArea\">" ;
													//"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												//"</div>" +
												if(graphName=="SalePerMonth"){
													htmlLayoutGraphMyView+=	"<div id=\"chartMTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartMTD\"></div>" ;	
													htmlLayoutGraphMyView+=	"<div id=\"chartYTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartYTD\"></div>" ;	
												}else{
													htmlLayoutGraphMyView+=	"<div id=\"chart"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart\"></div>" ;
												}	
												htmlLayoutGraphMyView+="</div>" +
												
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
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+(slotPosition-1)+"\">" +
												"<div id=\"settingArea\">" +
												/*
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
												"</div>" +
												*/
												"<button type=\"button\" class=\"setting ui-icon ui-icon-gear\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
												
												"</button>" +
												
												"</div>" +
												"<div id=\"chartArea\">" ;
													//"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												//"</div>" +
												if(graphName=="SalePerMonth"){
													htmlLayoutGraphMyView+=	"<div id=\"chartMTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartMTD\"></div>" ;	
													htmlLayoutGraphMyView+=	"<div id=\"chartYTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartYTD\"></div>" ;	
												}else{
													htmlLayoutGraphMyView+=	"<div id=\"chart"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart\"></div>" ;
												}	
												htmlLayoutGraphMyView+="</div>" +
												
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
										"<div class=\"graphTop\" id=\"area"+graphName+"-"+(slotPosition-1)+"\">" +
												"<div id=\"settingArea\">" +
												/*
												"<div class=\"setting\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
													"<span class=\"ui-icon ui-icon-gear\"></span>" +
												"</div>" +
												*/
												"<button type=\"button\" class=\"setting ui-icon ui-icon-gear\" id=\"settingarea"+graphName+"-"+(slotPosition-1)+"\">" +
												
												"</button>" +
												"</div>" +
												"<div id=\"chartArea\">" ;
													//"<div id=\"chart"+graphName+"-"+slotPosition+"\"  class=\"chart\"></div>" +
												//"</div>" +
												if(graphName=="SalePerMonth"){
													htmlLayoutGraphMyView+=	"<div id=\"chartMTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartMTD\"></div>" ;	
													htmlLayoutGraphMyView+=	"<div id=\"chartYTD"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart chartYTD\"></div>" ;	
												}else{
													htmlLayoutGraphMyView+=	"<div id=\"chart"+graphName+"-"+(slotPosition-1)+"\"  class=\"chart\"></div>" ;
												}	
												htmlLayoutGraphMyView+="</div>" +
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



