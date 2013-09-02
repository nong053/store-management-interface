//click seting
//$(document).on("click",".setting",function(){

function createChart_SMI_WasteDaily(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,titleText,objdataSeriesWasteDailyPercentage) {

	
	 $("#chart"+graphName+"-"+arIndex).kendoChart({
		  chartArea: {
			    width: parseInt(graphWidth),
			    height:parseInt(graphHeight)
			  },
	     title: {
	    	 text: titleText,
	         visible:true,
	         font:"13px Tahoma"
	     },
	     
	     
	     legend: {
	         visible: false,
	           position:"rigth"
	     },
	     
	     seriesDefaults: {
	        // type: ""+graphType+""
	    	 type:"bar",
    		 labels: {
                 visible: true,
                template: "#= series.name #: #=addCommas(value) #",
                 //template: "#= addCommas(value) #",
                 //font:seriesFont,
                 background: "transparent",
                 rotation : 0
             }
	     },
	     
	     series:graphSeries,
	  
	     
	     valueAxis: {
	        // max: 140000,
	         line: {
	             visible: false
	         },
	         minorGridLines: {
	             visible: true
	         },
	         labels: {
	        	 font: "10px Tahoma",
	             template: "#= kendo.format('{0:N0}', value ) # ",
	             visible: false
	        	
	          }
	     },
	     categoryAxis: {
	    	 categories: graphCategory,
	    	 //(categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	         majorGridLines: {
	             visible: true
	         },
	         labels: {
	             font: "10px Tahoma",
	        	  rotation : 0
	          }
	          
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= addCommas(value) #"
	         }
	     });
	 
	 
	 var num1=0;
	 var num2=0;

     //console.log($("#chartMTDSalePerMonth-1 svg text"));
     $(""+"#chart"+graphName+"-"+arIndex+">svg>text").each(function(){

    	var labelValue = $(this).text();
    	var labelValueAmount = labelValue.split(":");

    	if(labelValueAmount[0]=="Series"){

    		var salesValue="";
    		if(objdataSeriesWasteDailyPercentage[num1]!=0){
    			salesValue="="+objdataSeriesWasteDailyPercentage[num1]+"%";
    		}
    		$(this).text(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num1++;
    	}
    	
     });
};







/*
series: [{
name: "Total Visits",
data: [56000, 63000, 74000, 91000, 117000, 138000]
}, {
    name: "Unique visitors",
    data: [52000, 34000, 23000, 48000, 67000, 83000]
}]


categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
*/
//send branch,year,startWeek,endWeek
//graphName,graphType,arIndex,branchId,yyyy,data[0][1]
//#######################Embed parameter Function start #################
function embedParameterWasteDaily(graphName,paramBranch,paramStartDate,paramEndDate){

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

function wateDailyFn(graphName,graphType,arIndex,branchId,startDate,endDate,graphWidth,graphHeight){
	
	//#########################set embed parameter for embed default parameter start######################
	embedParameterWasteDaily(graphName,branchId,startDate,endDate);
	//#########################set embed parameter for embed default parameter end########################
	
	 $.ajax({
			url:"../Model/SMI_WasteDaily.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramGraphName":graphName,"paramStartDate":startDate,"parartEndDate":endDate,"paramBranch":branchId},
			success:function(data){

				var categoriesWasteDaily="";
				var dataSeriesWasteDaily="";
				
				var dataSeriesWasteDailyPercentage="";
				
				var series="";
				categoriesWasteDaily+="[";
				dataSeriesWasteDaily+="[";
				dataSeriesWasteDailyPercentage+="[";
				
				var totalWaste="";
				$.each(data,function(index,indexEntry){
					
					
					if(index==0){
						totalWaste=parseFloat(indexEntry[1]).toFixed(2);
						categoriesWasteDaily+="\""+indexEntry[0]+"\"";
						dataSeriesWasteDaily+="\""+indexEntry[1]+"\"";
						
						dataSeriesWasteDailyPercentage+="0";
						
					}else{
						var wasteValue=parseFloat(indexEntry[1]).toFixed(2);
						var wastePercentageValue=parseFloat((wasteValue/totalWaste)*100).toFixed(2);
						categoriesWasteDaily+=",\""+indexEntry[0]+"\"";
						dataSeriesWasteDaily+=",\""+indexEntry[1]+"\"";
						
						dataSeriesWasteDailyPercentage+=",\""+wastePercentageValue+"\"";
						
					}

				});
				dataSeriesWasteDaily+="]";
				
				dataSeriesWasteDailyPercentage+="]";
				
				categoriesWasteDaily+="]";
				
				//alert(dataSeriesWasteDaily);
				//alert(categoriesWasteDaily);
				
				var objcategoriesWasteDaily=eval("("+categoriesWasteDaily+")");
				var objdataSeriesWasteDaily=eval("("+dataSeriesWasteDaily+")");
				
				var objdataSeriesWasteDailyPercentage =eval("("+dataSeriesWasteDailyPercentage+")");
				
				console.log("--------------------------------");
				console.log(objdataSeriesWasteDailyPercentage);
				console.log("--------------------------------");

				
				 series=[{
			         	 name: "Series",
			         	 data: objdataSeriesWasteDaily
				     }];
				 var titleText="ของเสียรายวัน  "+getDayOnDate(startDate)+" "+getMonthName(getMonthOnDate(startDate))+" -"+getDayOnDate(endDate)+" "+getMonthName(getMonthOnDate(endDate))+" ปี"+getYearONDate(startDate)+"";
				 
				 createChart_SMI_WasteDaily(graphName,graphType,series,objcategoriesWasteDaily,arIndex,graphWidth,graphHeight,titleText,objdataSeriesWasteDailyPercentage);
			
			}
		});
		
		
	};


	//##################################### Set Parameter Here Start ###############################
	
	var htmlParam_SMI_WasteDaily = function(graphNameArea){
		
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
					htmlParam+="Branch";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamBranch"+graphNameArea+"\">";
				/*
					htmlParam+="<select class=\"list\" id=\"paramBranch"+graphNameArea+"\">";
						htmlParam+="<option value=\"311\">311-branName1</option>";
						htmlParam+="<option value=\"312\">312-branName2</option>";
						htmlParam+="<option value=\"313\">313-branName3</option>";
						htmlParam+="<option value=\"314\">314-branName4</option>";
					htmlParam+="</select>";
				*/
				htmlParam+="</td>";
				htmlParam+="</tr>";
				
				 htmlParam+="<tr>";
					htmlParam+="<td>";
						htmlParam+="Start Date";
					htmlParam+="</td>";
					htmlParam+="<td id=\"areaParamStartDate"+graphNameArea+"\">";
					/*
						htmlParam+="" +
								"<input type=\"text\" class=\"date\" id=\"startDate"+graphNameArea+"\" name=\"startDate\" >";
					*/
		 			htmlParam+="</td>";
		 		htmlParam+="</tr>";
		 		
		 		
		 		htmlParam+="<tr>";
				htmlParam+="<td>";
					htmlParam+="End Date";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamEndDate"+graphNameArea+"\">";
				/*
					htmlParam+="" +
							"<input type=\"text\" class=\"date\" id=\"endDate"+graphNameArea+"\" name=\"endDate\" >";
				*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";

		 	htmlParam+="</table>";
		 	
		 	htmlParam+="</div>";
		 	
		 		htmlParam+="<div class=\"btnArea\">";
		 				htmlParam+="<div class=\"btn\">";
		 					htmlParam+="<button id=\"WasteDailySubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"WasteDailyCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_WasteDaily=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#WasteDailySubmit"+graphNameArea).die("click");
		$("#WasteDailySubmit"+graphNameArea).live("click",function(){
			
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramStartDate=$("#paramStartDate"+graphNameArea).val();
			var paramEndDate=$("#paramEndDate"+graphNameArea).val();
			embedParameterTop10Food(graphName,paramBranch,paramStartDate,paramEndDate);
			//###################Embead parameter to call embed parameter function start##############
			
			wateDailyFn(graphName,graphType,arIndex,paramBranch,paramStartDate,paramEndDate,graphWidth,graphHeight);
			
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");

			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
			
		});
		
		if(paramMachine=="Tablet"){
		$("#WasteDailyCancel"+graphNameArea).die("click");
		$("#WasteDailyCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#WasteDailyCancel"+graphNameArea).die("click");
		$("#WasteDailyCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}
		
		
	};
	/*####################### config dialog for tablet start ###################*/ 
	
	var dialogSetParamFn=function(paramTitleSetting){
	//config dialog here
	 $(".areaSettingExternal").dialog({
		 title:paramTitleSetting+"-Setting",
		 autoOpen: false,
		 show: {
		 effect: "blind",
		 duration: 1000
		 },
		 hide: {
		 effect: "explode",
		 duration: 1000
		 },
		 width: 350,
		 height:235,
		 modal: true,
		 /*
		 buttons: {
			 "Plot Graph": function() {
			 $( this ).dialog( "close" );
			 },
			 Cancel: function() {
			 $( this ).dialog( "close" );
			 }
		}
		*/
	 });
	 
	 //using dialog here
	 $( ".areaSettingExternal").dialog( "open" );
	 $(".ui-dialog .ui-dialog-content").css({"padding":"0px"});
	};
	
	 /*####################### config dialog for tablet end ###################*/ 
			 
	function manageParamWasteDailyFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		 //alert("hello jquery");
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").empty();
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_WasteDaily(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	 dialogSetParamFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_WasteDaily(graphNameArea));
				 $(".setParamForm"+graphNameArea).slideDown();
			 }

			 //#####################check parameter is selected start#########################
			getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
			getStartDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text());
			getEndDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramEndDate").text());
			//######################check parameter is selected end###########################
			 //create button submit
			 submit_SMI_WasteDaily(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParamFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}
	
	//##################################### Set Parameter Here End ###############################
	