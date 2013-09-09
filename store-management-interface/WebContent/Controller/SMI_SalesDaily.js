//click seting
//$(document).on("click",".setting",function(){
//call SMI_SalePerDay (  '2012-01-01' , '2012-03-31' , '322000' )

function createChart_salePerDay(graphName,graphType,graphSeries,graphCategory,arIndex,paramGraphWidth,paramGraphHeight,paramMachine,titieText){
	
	
	 $("#chart"+graphName+"-"+arIndex).kendoChart({
		  theme: $(document).data("kendoSkin") || "silver",
		  chartArea: {
			    width:parseInt(paramGraphWidth), 
			    height:parseInt(paramGraphHeight),
			    background: ""
			  },
	     title: {
	         text:titieText,
	         visible:true,
	         font: titleFont
	     },
	     
	    
	     legend: {
	         visible: true,
	           position:"bottom",
	           
	           labels: {
	        	      font:legendFont,
	        	    }
	     },
	     
	     seriesDefaults: {
	         type: ""+graphType+""
	         
	     },
	     
	     series:graphSeries,
	     
	     /*
	     series: [{
	         name: "Total Visits",
	         data: [56000, 63000, 74000, 91000, 117000, 138000]
	     }, {
	         name: "Unique visitors",
	         data: [52000, 34000, 23000, 48000, 67000, 83000]
	     }],
	     */
	     valueAxis: {
	        // max: 140000,
	         line: {
	             visible: false
	         },
	         minorGridLines: {
	             visible: true
	         }, 
	         labels: {
                 template: "#= kendo.format('{0:N0}', value ) # ",
                 font: valueAxisFont,
             }
	     },
	     categoryAxis: {
	    	 categories: graphCategory,
	         /*categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],*/
	         majorGridLines: {
	             visible: true
	         },
	         labels: {
	             font: cateFont,
	        	 rotation : labelsRotation
	          }
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= addCommas(value) #",
	         }
	     });
};


var htmlParam_SMI_SalePerDay = function(graphNameArea,paramMachine){
	var readonly="";
	if(paramMachine=="Tablet"){
		//alert("tablet");
		readonly="readonly='readonly'";
		//readonly="";
	}else{
		readonly="";
	}
	 var htmlParam ="";
	 htmlParam+="<div id=\"setParamForm\" class=\"setParamForm"+graphNameArea+"\">";
	 htmlParam+="<div class=\"setParamArea\">";
	 htmlParam+="<div class=\"setParamHeader\">";
	 htmlParam+="<div class=\"text\">Setting Parameter</div>";
	 htmlParam+="</div>";
		 htmlParam+="<div class=\"setParam\">";
		
		 htmlParam+="<table>";
		 
		 htmlParam+="<tr>";
			htmlParam+="<td>";
				htmlParam+="<b>Branch</b>";
			htmlParam+="</td>";
			htmlParam+="<td id=\"areaParamBranch"+graphNameArea+"\">";
				/*
				htmlParam+="<select class=\"list\" id=\"paramBranch"+graphNameArea+"\">";
					htmlParam+="<option value=\"311\">311-ทองหล่อ</option>";
					htmlParam+="<option value=\"312\">312-branchName2</option>";
					htmlParam+="<option value=\"313\">313-branchName3</option>";
					htmlParam+="<option value=\"314\">314-branchName4</option>";
				htmlParam+="</select>";
				*/
			htmlParam+="</td>";
			htmlParam+="</tr>";
			
			 htmlParam+="<tr>";
				htmlParam+="<td>";
					htmlParam+="<b>Start Date</b>";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamStartDate"+graphNameArea+"\">";
				/*
					htmlParam+="<input type=\"text\" "+readonly+" name=\"paramStartDate"+graphNameArea+"\" id=\"paramStartDate"+graphNameArea+"\" class=\"date\">";
	 			*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 		htmlParam+="<tr>";
	 			htmlParam+="<td>";
	 				htmlParam+="<b>End Date</b>";
	 			htmlParam+="</td>";
	 			htmlParam+="<td id=\"areaParamEndDate"+graphNameArea+"\">";
	 			/*
	 				htmlParam+="<input type=\"text\" "+readonly+" name=\"paramEndDate"+graphNameArea+"\" id=\"paramEndDate"+graphNameArea+"\" class=\"date\">";
	 			*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 	
	 		
	 	htmlParam+="</table>";
	 	
	 	htmlParam+="</div>";
	 	
	 		htmlParam+="<div class=\"btnArea\">";
	 				htmlParam+="<div class=\"btn\">";
	 					htmlParam+="<button id=\"salePerDaySubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
	 					htmlParam+="<button id=\"salePerDayCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
	 				htmlParam+="</div>";
	 		htmlParam+="</div>";
	 			
	 			
	 	htmlParam+="</div>";
	 	htmlParam+="</div>";
	 	
	 	return htmlParam;
};


var submit_SMI_SalePerDay=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
	//salePerDaySubmitareaSalePerDay-0
	//alert(graphNameArea);
	$("#salePerDaySubmit"+graphNameArea).die("click");
	$("#salePerDaySubmit"+graphNameArea).live("click",function(){
		
		//###################Embead parameter to call embed parameter function start##############
		var paramBranch=$("#paramBranch"+graphNameArea).val();
		var paramStartDate=$("#paramStartDate"+graphNameArea).val();
		var paramEndDate=$("#paramEndDate"+graphNameArea).val();
		embedParamSalePerDay(graphName,paramBranch,paramStartDate,paramEndDate);
		//###################Embead parameter to call embed parameter function start##############
		

	
		//condition check can't select over month
		var startDate = paramStartDate.split("-");
		var endDate = paramEndDate.split("-");
		
		if((parseInt(startDate[0])==parseInt(endDate[0]))&&((parseInt(startDate[1]))==parseInt(endDate[1]))){
			
			if(parseInt(startDate[2]) < parseInt(endDate[2])){
					
					salePerDayFn(graphName,graphType,arIndex,paramStartDate,paramEndDate,paramBranch,graphWidth,graphHeight,paramMachine);
					if(paramMachine=="Tablet"){
						$(".ui-icon-closethick").trigger("click");
						$(".contentGraph").shadow();
					}else{
						$("#setting"+graphNameArea).trigger("click");
					}
			}else{
				alert("Unable to select start date less than end date");
			}
			
		}else{
			alert("Unable to select over month");
		}
		
		
		
	});
	
	if(paramMachine=="Tablet"){
	$("#salePerDayCancel"+graphNameArea).die("click");
	$("#salePerDayCancel"+graphNameArea).live("click",function(){
		$(".ui-icon-closethick").trigger("click");
	});
	}else{
		
	$("#salePerDayCancel"+graphNameArea).die("click");
	$("#salePerDayCancel"+graphNameArea).live("click",function(){
		$("#setting"+graphNameArea).trigger("click");
		
	});
		
	}
	
	
};
/*####################### config dialog for tablet start ###################*/ 
var dialogSetParam_SMI_SalePerDayFn=function(paramTitleSetting){
//config dialog here

	$(".areaSettingExternal").dialog({
	 title:"<b>"+paramTitleSetting+"-Setting</b>",
	 autoOpen: false,
	 show: {
	 effect: "clip",
	 duration: 500
	 },
	 hide: {
	 effect: "clip",
	 duration: 500
	 },
	 width: 450,
	 height:300,
	 modal: true,
	
	
	
 });
 
 //using dialog here
 $( ".areaSettingExternal").dialog( "open" );
 $(".ui-dialog .ui-dialog-content").css({"padding":"0px"});
};
 /*####################### config dialog for tablet end ###################*/ 
//#######################Embed parameter Function start #################
function embedParamSalePerDay(graphName,paramBranch,paramStartDate,paramEndDate){

	var paramDefaultEmbedHtml="" +
	"<ul style=\"display:none\" class=\"paramDefaultEmbed"+graphName+"\">"+graphName+"" +
		"<li class=\"paramBranch\">"+paramBranch+"</li>" +
		"<li class=\"paramStartDate\">"+paramStartDate+"</li>" +
		"<li class=\"paramEndDate\">"+paramEndDate+"</li>" +
	"</ul>";

	$(".paramDefaultEmbed"+graphName).remove();
	$("body").append(paramDefaultEmbedHtml);
	//Embed Default Parameter end
}
//#######################Embed parameter Function end #################

function manageParamSalePerDayFn(graphNameArea,graphWidth,graphHeight,paramMachine){
	//alert("access by:"+paramMachine);
	var $buttonImage="";
	if(paramMachine=="Tablet"){
		$buttonImage="../images/calendarBig.gif";
	}else{
		$buttonImage="../images/calendar.gif";
	}
	
	 var graphNameAreaIndexArray=graphNameArea.split("-");
	 var graphName=graphNameAreaIndexArray[0].substring("4");
	 var graphIndex=graphNameAreaIndexArray[1];
	 
	if($("#"+graphNameArea+"").attr("class")=="graphTop"){
		 
		 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
		 
		 if(paramMachine=="Tablet"){
			 //alert("here Tablet");
			 $(".areaSettingExternal").remove();
			 $("body").append("<div class=\"areaSettingExternal\"></div>");
		 	 $(".areaSettingExternal").prepend(htmlParam_SMI_SalePerDay(graphNameArea,paramMachine));
		 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
		 	 dialogSetParam_SMI_SalePerDayFn(graphName);
		 }else{
			 $("#"+graphNameArea+"").prepend(htmlParam_SMI_SalePerDay(graphNameArea,paramMachine));
			 
			 
			 $(".setParamForm"+graphNameArea).slideDown();
		 }
		
		 //#####################check parameter is selected start#########################
			getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
			getStartDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text(),paramMachine);
			getEndDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramEndDate").text(),paramMachine);
		//######################check parameter is selected end###########################
			
		 //create button submit
		 submit_SMI_SalePerDay(graphNameArea,graphName,'line',graphIndex,graphWidth,graphHeight,paramMachine);
		 
		 $(this).die("click");
	 }else{
		
		 $("#"+graphNameArea+"").attr({"class":"graphTop"});
		 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
		 if(paramMachine=="Tablet"){
			 dialogSetParam_SMI_SalePerDayFn(graphName);
		 }else{
		 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
				 $(this).remove();
			 });
		 }
	}
}


function salePerDayFn(graphName,graphType,arIndex,startDate,endDate,branchId,graphWidth,graphHeight,paramMachine){
	//#########################set embed parameter for embed default parameter start########################
	embedParamSalePerDay(graphName,branchId,startDate,endDate);
	//#########################set embed parameter for embed default parameter end########################
	 $.ajax({
			url:"../Model/SMI_SalePerDay.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramStartDate":startDate,"paramEndDate":endDate,"paramBranchId":branchId},
			success:function(data2){
				
				var categories="";
				var dataSeriesSaleAmount="";
				var dataSeriesSaleAmountLastYear="";
				var dataSeriesSaleTarget="";
				var series="";
				
				//	SaleAmount
				//SaleAmountLastYear
				//	SaleTarget
				 
				categories+="[";
				dataSeriesSaleAmount+="[";
				dataSeriesSaleAmountLastYear+="[";
				dataSeriesSaleTarget+="[";
				$.each(data2,function(index2,indexEntry2){
					
					var vCategoriesArray=indexEntry2[0].split("-");
					var vCategories=vCategoriesArray[2];
					
					if(index2==0){
						categories+="\""+vCategories+"\"";
						dataSeriesSaleAmount+="\""+indexEntry2[2]+"\"";
						dataSeriesSaleAmountLastYear+="\""+indexEntry2[1]+"\"";
						dataSeriesSaleTarget+="\""+indexEntry2[3]+"\"";
					}else{
						categories+=",\""+vCategories+"\"";
						dataSeriesSaleAmount+=",\""+indexEntry2[2]+"\"";
						dataSeriesSaleAmountLastYear+=",\""+indexEntry2[1]+"\"";
						dataSeriesSaleTarget+=",\""+indexEntry2[3]+"\"";
					}
					/*
					console.log(indexEntry2[0]);
					console.log(indexEntry2[1]);
					console.log(indexEntry2[2]);
					console.log(indexEntry2[3]);
					console.log("============");
					*/
					
				
					
					
				});
				dataSeriesSaleAmount+="]";
				dataSeriesSaleAmountLastYear+="]";
				dataSeriesSaleTarget+="]";
				categories+="]";
				
			
				var objCategories=eval("("+categories+")");
				var objDataSeriesSaleAmount=eval("("+dataSeriesSaleAmount+")");
				var objDataSeriesSaleAmountLastYear=eval("("+dataSeriesSaleAmountLastYear+")");
				var objDataSeriesSaleTarget=eval("("+dataSeriesSaleTarget+")");
				
				 series=[{
						 name: "Last Year",
				         data: objDataSeriesSaleAmountLastYear,
				         color: 'orange'
				     }, {
				         
				         name: "Current",
			         	 data: objDataSeriesSaleAmount,
			         	 color: '#007bc3'
				     }, {
				         name: "Target",
				         data: objDataSeriesSaleTarget,
				         color: 'gray'
				     }];
				 
				
				// var Numbermm=parseInt(mm);
				 var selectStartDate = new Date(startDate);
				 var selectStartYYYY = selectStartDate.getFullYear();
				 var selectStartMM = selectStartDate.getMonth()+1; //January is 0!
				 var selectStartDD = selectStartDate.getDate();
				 
				 var selectEndDate = new Date(endDate);
				 var selectEndYYYY = selectEndDate.getFullYear();
				 var selectEndMM = selectEndDate.getMonth()+1; //January is 0!
				 var selectEndDD = selectEndDate.getDate();
				 console.log(series);
				 var titieText="ยอดขายรายวันตั้งแต่  "+selectStartDD+" "+getMonthName(selectStartMM)+" "+selectStartYYYY+" ถึง "+selectEndDD+" "+getMonthName(selectEndMM)+" "+selectEndYYYY+"";
				createChart_salePerDay(graphName,graphType,series,objCategories,arIndex,graphWidth,graphHeight,paramMachine,titieText);
				
			}
		});
	};


	 
	
	
	 
	
	 

	 