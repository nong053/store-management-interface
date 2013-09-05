//click seting
//$(document).on("click",".setting",function(){
//call SMI_Top10Bakery (  '2012-01-01' , '2012-03-31' , '322000' )

function createChart_SMI_Top10Bakery(graphName,graphType,graphSeries,graphCategory,arIndex,paramGraphWidth,paramGraphHeight,paramMachine,titleText,
		objDataSeriesSaleValue,objDataSeriesSaleValueLastMonth){

	var seriesDefaultsFont="";
	if(paramMachine=="Tablet"){
		seriesDefaultsFont="16px Tahoma";
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
	         //position:"bottom"
	         position:"rigth",
	         labels: {
       	      font:legendFont
       	    }
	     },
	     
	     seriesDefaults: {
	         //type: ""+graphType+""
	    	 type:"bar",
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

var htmlParam_SMI_Top10Bakery = function(graphNameArea){
	
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
				htmlParam+="<td >";
					htmlParam+="Start Date";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamStartDate"+graphNameArea+"\">";
				/*
					htmlParam+="<input type=\"text\" name=\"paramStartDate"+graphNameArea+"\" id=\"paramStartDate"+graphNameArea+"\" class=\"date\">";
	 			*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 		htmlParam+="<tr>";
	 			htmlParam+="<td >";
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
	 					htmlParam+="<button id=\"top10BakerySubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
	 					htmlParam+="<button id=\"top10BakeryCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
	 				htmlParam+="</div>";
	 		htmlParam+="</div>";
	 			
	 			
	 	htmlParam+="</div>";
	 	htmlParam+="</div>";
	 	
	 	return htmlParam;
};


var submit_SMI_Top10Bakery=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
	//top10BakerySubmitareatop10Bakery-0
	//alert(graphNameArea);
	$("#top10BakerySubmit"+graphNameArea).die("click");
	$("#top10BakerySubmit"+graphNameArea).live("click",function(){
		
		
		//###################Embead parameter to call embed parameter function start##############
		var paramBranch=$("#paramBranch"+graphNameArea).val();
		var paramStartDate=$("#paramStartDate"+graphNameArea).val();
		var paramEndDate=$("#paramEndDate"+graphNameArea).val();
		embedParameterTop10Bakery(graphName,paramBranch,paramStartDate,paramEndDate);
		//###################Embead parameter to call embed parameter function start##############
		
		
		//top10BakeryFn
		var startDate = paramStartDate.split("-");
		var endDate = paramEndDate.split("-");
		
		//if((parseInt(startDate[0])==parseInt(endDate[0]))&&((parseInt(startDate[1]))==parseInt(endDate[1]))){//check 
		if(parseInt(startDate[1]) <= parseInt(endDate[1])){
			
			top10BakeryFn(graphName,graphType,arIndex,paramBranch,paramStartDate,paramEndDate,graphWidth,graphHeight);
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
	$("#top10BakeryCancel"+graphNameArea).die("click");
	$("#top10BakeryCancel"+graphNameArea).live("click",function(){
		$(".ui-icon-closethick").trigger("click");
	});
	}else{
		
	$("#top10BakeryCancel"+graphNameArea).die("click");
	$("#top10BakeryCancel"+graphNameArea).live("click",function(){
		$("#setting"+graphNameArea).trigger("click");
		
	});
		
	}
	
	
};
/*####################### config dialog for tablet start ###################*/ 
var dialogSetParam_SMI_Top10BakeryFn=function(paramTitleSetting){
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
function embedParameterTop10Bakery(graphName,paramBranch,paramStartDate,paramEndDate){

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
function manageParamtop10BakeryFn(graphNameArea,graphWidth,graphHeight,paramMachine){
	 var graphNameAreaIndexArray=graphNameArea.split("-");
	 var graphName=graphNameAreaIndexArray[0].substring("4");
	 var graphIndex=graphNameAreaIndexArray[1];
	 
	if($("#"+graphNameArea+"").attr("class")=="graphTop"){
		 
		 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
		 
		 if(paramMachine=="Tablet"){
			 $(".areaSettingExternal").remove();
			 $("body").append("<div class=\"areaSettingExternal\"></div>");
		 	 $(".areaSettingExternal").prepend(htmlParam_SMI_Top10Bakery(graphNameArea));
		 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
		 	dialogSetParam_SMI_Top10BakeryFn(graphName);
		 }else{
			 $("#"+graphNameArea+"").prepend(htmlParam_SMI_Top10Bakery(graphNameArea));
			 
			 
			 $(".setParamForm"+graphNameArea).slideDown();
		 }
		
		
		 //create button submit
		 //#####################check parameter is selected start#########################
			getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
			getStartDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text(),paramMachine);
			getEndDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramEndDate").text(),paramMachine);
		//######################check parameter is selected end###########################
			
		 submit_SMI_Top10Bakery(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
		 
		 $(this).die("click");
	 }else{
		
		 $("#"+graphNameArea+"").attr({"class":"graphTop"});
		 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
		 if(paramMachine=="Tablet"){
			 dialogSetParam_SMI_Top10BakeryFn(graphName);
		 }else{
		 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
				 $(this).remove();
			 });
		 }
	}
}


function top10BakeryFn(graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight,paramMachine){
	//graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight
	/*
	alert(vBranch);
	alert(vSDate);
	alert(vEDate);
	*/
	//#########################set embed parameter for embed default parameter start########################
	embedParameterTop10Bakery(graphName,vBranch,vSDate,vEDate);
	//#########################set embed parameter for embed default parameter end########################
	
	 $.ajax({
			url:"../Model/SMI_Top10Bakery.jsp",
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
		
				console.log("-------------------------------");
				console.log("---"+objDataSeriesSaleValue);
				console.log("---"+objDataSeriesSaleValueLastMonth);
				
				
				 series=[{
			         	
			         	 name: "Last Month",
				         name2: "lastMonth",
				         data: objDataSeriesSaleAmountLastMonth,
				         color: 'orange'
				     }, {
				    	 name: "Current",
			         	 name2: "current",
			         	 data: objDataSeriesSaleAmount,
			         	 color: '#007bc3'
				     }];
				 
				 var titleText="Top10-Bakery:ตั้งแต่วันที่ "+getDayOnDate(vSDate)+" "+getMonthName(getMonthOnDate(vSDate))+" ปี"+getYearONDate(vSDate)+" -"+getDayOnDate(vEDate)+" "+getMonthName(getMonthOnDate(vEDate))+" ปี"+getYearONDate(vEDate)+"";
				 createChart_SMI_Top10Bakery(graphName,graphType,series,objCategories,arIndex,graphWidth,graphHeight,paramMachine,titleText,
						 objDataSeriesSaleValue,objDataSeriesSaleValueLastMonth);
				
			}
		});
		
	};


	 
	
	
	 
	
	 

	 