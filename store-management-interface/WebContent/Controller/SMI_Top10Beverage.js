//click seting
//$(document).on("click",".setting",function(){
//call SMI_Top10Beverage (  '2012-01-01' , '2012-03-31' , '322000' )

function createChart_SMI_Top10Beverage(graphName,graphType,graphSeries,graphCategory,arIndex,paramGraphWidth,paramGraphHeight,paramMachine,titleText,
		objDataSeriesSaleValue,objDataSeriesSaleValueLastMonth){
	
	
	var seriesDefaultsFont="";
	if(paramMachine=="Tablet"){
		seriesDefaultsFont="13px Tahoma";
	}else{
		seriesDefaultsFont="10px Tahoma";
	}
	

	 $("#chart"+graphName+"-"+arIndex).kendoChart({
		  chartArea: {
			    width:parseInt(paramGraphWidth), 
			    height:parseInt(paramGraphHeight),
			    background: ""
			  },
	     title: {
	    	 text: titleText,
	         visible:true,
	         font:titleFont
	     },
	     
	     
	     legend: {
	           visible: true,
	           position:"rigth",
	           labels: {
	        	      font:legendFont
	        	    }
	     },
	     
	     seriesDefaults: {
	         //type: ""+graphType+"",
	         type: "bar",
	         //value default show value on bar chart 
	         labels: {
                visible: true,
               template: "#= series.name2 #: #=addCommas(value) #",
                //template: "#= addCommas(value) #",
                font:seriesDefaultsFont,
                background: "transparent",
                rotation : 0
            }
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
	        	 font:valueAxisFont,
	             template: "#= kendo.format('{0:N0}', value ) # ",
	             visible: false
	        	
	          }
	     },
	     categoryAxis: {
	    	 categories: graphCategory,
	         /*categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],*/
	         majorGridLines: {
	             visible: true
	         },
	         labels: {
	             font: categoryAxisFont,
	        	  rotation : 0
	          }
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= addCommas(value) #",
	         font: tooltipFont
	         }
	     });
	 
	 
	 var num1=0;
	 var num2=0;

     //console.log($("#chartMTDSalePerMonth-1 svg text"));
     $(""+"#chart"+graphName+"-"+arIndex+">svg>text").each(function(){

    	var labelValue = $(this).text();
    	var labelValueAmount = labelValue.split(":");

    	if(labelValueAmount[0]=="current"){

    		var salesValue="";
    		if(objDataSeriesSaleValue[num1]!=0){
    			salesValue=":"+objDataSeriesSaleValue[num1]+"";
    		}
    		$(this).text(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num1++;
    	}
    	if(labelValueAmount[0]=="lastMonth"){

    		var salesValue="";
    		if(objDataSeriesSaleValueLastMonth[num2]!=0){
    			salesValue=":"+objDataSeriesSaleValueLastMonth[num2]+"";
    		}
    		$(this).text(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num2++;
    	}
     });
};

var htmlParam_SMI_Top10Beverage = function(graphNameArea){
	
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
					htmlParam+="<option value=\"001\">001-branName1</option>";
					htmlParam+="<option value=\"002\">002-branName2</option>";
					htmlParam+="<option value=\"003\">003-branName3</option>";
					htmlParam+="<option value=\"004\">004-branName4</option>";
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
					htmlParam+="<input type=\"text\" name=\"paramStartDate"+graphNameArea+"\" id=\"paramStartDate"+graphNameArea+"\" class=\"date\">";
	 			*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 		htmlParam+="<tr>";
	 			htmlParam+="<td>";
	 				htmlParam+="End Date";
	 			htmlParam+="</td>";
	 			htmlParam+="<td id=\"areaParamEndDate"+graphNameArea+"\">";
	 			/*
	 				htmlParam+="<input type=\"text\" name=\"paramEndDate"+graphNameArea+"\" id=\"paramEndDate"+graphNameArea+"\" class=\"date\">";
	 			*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 	
	 		
	 	htmlParam+="</table>";
	 	
	 	htmlParam+="</div>";
	 	
	 		htmlParam+="<div class=\"btnArea\">";
	 				htmlParam+="<div class=\"btn\">";
	 					htmlParam+="<button id=\"top10BeverageSubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
	 					htmlParam+="<button id=\"top10BeverageCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
	 				htmlParam+="</div>";
	 		htmlParam+="</div>";
	 			
	 			
	 	htmlParam+="</div>";
	 	htmlParam+="</div>";
	 	
	 	return htmlParam;
};


var submit_SMI_Top10Beverage=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
	//top10BeverageSubmitareatop10Beverage-0
	//alert(graphNameArea);
	$("#top10BeverageSubmit"+graphNameArea).die("click");
	$("#top10BeverageSubmit"+graphNameArea).live("click",function(){
		
		//###################Embead parameter to call embed parameter function start##############
		var paramBranch=$("#paramBranch"+graphNameArea).val();
		var paramStartDate=$("#paramStartDate"+graphNameArea).val();
		var paramEndDate=$("#paramEndDate"+graphNameArea).val();
		embedParameterTop10Beverage(graphName,paramBranch,paramStartDate,paramEndDate);
		//###################Embead parameter to call embed parameter function start##############

		//call function create graph for gernarate new graph
		//top10BeverageFn
		var startDate = paramStartDate.split("-");
		var endDate = paramEndDate.split("-");
		if(parseInt(startDate[1]) <= parseInt(endDate[1])){
				top10BeverageFn(graphName,graphType,arIndex,paramBranch,paramStartDate,paramEndDate,graphWidth,graphHeight,paramMachine);
				if(paramMachine=="Tablet"){
					$(".ui-icon-closethick").trigger("click");
				}else{
					$("#setting"+graphNameArea).trigger("click");
				}
		}else{
			alert("Unable to select start date less than end date");
		}
		
	});
	
	if(paramMachine=="Tablet"){
	$("#top10BeverageCancel"+graphNameArea).die("click");
	$("#top10BeverageCancel"+graphNameArea).live("click",function(){
		$(".ui-icon-closethick").trigger("click");
	});
	}else{
		
	$("#top10BeverageCancel"+graphNameArea).die("click");
	$("#top10BeverageCancel"+graphNameArea).live("click",function(){
		$("#setting"+graphNameArea).trigger("click");
		
	});
		
	}
	
	
};
/*####################### config dialog for tablet start ###################*/ 
var dialogSetParam_SMI_Top10BeverageFn=function(paramTitleSetting){
//config dialog here
 $(".areaSettingExternal").dialog({
	 title:paramTitleSetting+"-Setting",
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

//#######################Embed parameter Function start #################
function embedParameterTop10Beverage(graphName,paramBranch,paramStartDate,paramEndDate){

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

function manageParamtop10BeverageFn(graphNameArea,graphWidth,graphHeight,paramMachine){
	 var graphNameAreaIndexArray=graphNameArea.split("-");
	 var graphName=graphNameAreaIndexArray[0].substring("4");
	 var graphIndex=graphNameAreaIndexArray[1];
	 
	if($("#"+graphNameArea+"").attr("class")=="graphTop"){
		 
		 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
		 
		 if(paramMachine=="Tablet"){
			 $(".areaSettingExternal").remove();
			 $("body").append("<div class=\"areaSettingExternal\"></div>");
		 	 $(".areaSettingExternal").prepend(htmlParam_SMI_Top10Beverage(graphNameArea));
		 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
		 	dialogSetParam_SMI_Top10BeverageFn(graphName);
		 }else{
			 $("#"+graphNameArea+"").prepend(htmlParam_SMI_Top10Beverage(graphNameArea));
			 
			 
			 $(".setParamForm"+graphNameArea).slideDown();
		 }
		
		
		
		 //create button submit
		 //#####################check parameter is selected start#########################
		getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
		getStartDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text(),paramMachine);
		getEndDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramEndDate").text(),paramMachine);
		//######################check parameter is selected end###########################
		 //create button submit
		 submit_SMI_Top10Beverage(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
		 
		 $(this).die("click");
	 }else{
		
		 $("#"+graphNameArea+"").attr({"class":"graphTop"});
		 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
		 if(paramMachine=="Tablet"){
			 dialogSetParam_SMI_Top10BeverageFn(graphName);
		 }else{
		 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
				 $(this).remove();
			 });
		 }
	}
}


function top10BeverageFn(graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight,paramMachine){
	//graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight
	
	//#########################set embed parameter for embed default parameter start######################
	embedParameterTop10Beverage(graphName,vBranch,vSDate,vEDate);
	//#########################set embed parameter for embed default parameter end########################
	
	 $.ajax({
			url:"../Model/SMI_Top10Beverage.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramBranch":vBranch,"paramStartDate":vSDate,"paramEndDate":vEDate},
			success:function(data2){
				//alert(data2);
				var categories="";
				var dataSeriesSaleAmount="";
				var dataSeriesSaleAmountLastMonth="";
				
				var dataSeriesSaleValue="";
				var dataSeriesSaleValueLastMonth="";
				var series="";
				
				//SaleAmount
				//SaleAmountLastMonth
				
				 
				categories+="[";
				dataSeriesSaleAmount+="[";
				dataSeriesSaleAmountLastMonth+="[";
				
				dataSeriesSaleValue+="[";
				dataSeriesSaleValueLastMonth+="[";

				$.each(data2,function(index2,indexEntry2){
					
					if(index2==0){
						categories+="\""+indexEntry2[0]+"\"";
						dataSeriesSaleAmount+="\""+indexEntry2[2]+"\"";
						dataSeriesSaleAmountLastMonth+="\""+indexEntry2[1]+"\"";
						
						dataSeriesSaleValue+="\""+indexEntry2[4]+"\"";
						dataSeriesSaleValueLastMonth+="\""+indexEntry2[3]+"\"";
	
					}else{
						categories+=",\""+indexEntry2[0]+"\"";
						dataSeriesSaleAmount+=",\""+indexEntry2[2]+"\"";
						dataSeriesSaleAmountLastMonth+=",\""+indexEntry2[1]+"\"";
						
						dataSeriesSaleValue+=",\""+indexEntry2[4]+"\"";
						dataSeriesSaleValueLastMonth+=",\""+indexEntry2[3]+"\"";
				
					}

				});
				dataSeriesSaleAmount+="]";
				dataSeriesSaleAmountLastMonth+="]";
				
				dataSeriesSaleValue+="]";
				dataSeriesSaleValueLastMonth+="]";
		
				categories+="]";
				
			
				var objCategories=eval("("+categories+")");
				var objDataSeriesSaleAmount=eval("("+dataSeriesSaleAmount+")");
				var objDataSeriesSaleAmountLastMonth=eval("("+dataSeriesSaleAmountLastMonth+")");
				
				var objDataSeriesSaleValue=eval("("+dataSeriesSaleValue+")");
				var objDataSeriesSaleValueLastMonth=eval("("+dataSeriesSaleValueLastMonth+")");
		
				
				console.log("---"+objDataSeriesSaleAmount);
				console.log("---"+objDataSeriesSaleAmountLastMonth);
				
				
				 series=[{
						 name: "Last Month",
				         name2:"lastMonth",
				         data: objDataSeriesSaleAmountLastMonth,
				         color: 'orange'
				     }, {
				         
				         name: "Current",
			         	 name2:"current",
			         	 data: objDataSeriesSaleAmount,
			         	color: '#007bc3'
				     }];
				 
				 var titleText="Top10-Beverage:ตั้งแต่วันที่  "+getDayOnDate(vSDate)+" "+getMonthName(getMonthOnDate(vSDate))+" ปี"+getYearONDate(vSDate)+"-"+getDayOnDate(vEDate)+" "+getMonthName(getMonthOnDate(vEDate))+" ปี"+getYearONDate(vEDate)+"";
				 
				 createChart_SMI_Top10Beverage(graphName,graphType,series,objCategories,arIndex,graphWidth,graphHeight,paramMachine,titleText,
						 objDataSeriesSaleValue,objDataSeriesSaleValueLastMonth);
				
			}
		});
		
	};


	 
	
	
	 
	
	 

	 