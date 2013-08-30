//click seting
//$(document).on("click",".setting",function(){
//call SMI_SalePerDay (  '2012-01-01' , '2012-03-31' , '322000' )

function createChart_salePerDay(graphName,graphType,graphSeries,graphCategory,arIndex,paramGraphWidth,paramGraphHeight,paramMachine,titieText){
	
	var valueAxisFont="";
	var labelsRotation="";
	var legendFont="";
	var cateFont="";
	
	if(paramMachine=="Tablet"){
		//alert("Tablet");
		valueAxisFont="20px Tahoma";
		legendFont="16px Tahoma";
		cateFont="16px Tahoma";
		titleFont="16px Tahoma";
		labelsRotation=0;
	}else{
		//alert("PC");
		valueAxisFont="12px Tahoma";
		legendFont="13px Tahoma";
		cateFont="10px Tahoma";
		titleFont="13px Tahoma";
		labelsRotation=0;
	}
	//alert(cateFont);
	
	 $("#chart"+graphName+"-"+arIndex).kendoChart({
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
	         template: "#= series.name #: #= value #"
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
				htmlParam+="<select class=\"list\" id=\"paramBrach"+graphNameArea+"\">";
					htmlParam+="<option value=\"311\">311-branchName1</option>";
					htmlParam+="<option value=\"312\">312-branchName2</option>";
					htmlParam+="<option value=\"313\">313-branchName3</option>";
					htmlParam+="<option value=\"314\">314-branchName4</option>";
				htmlParam+="</select>";
			htmlParam+="</td>";
			htmlParam+="</tr>";
			
			 htmlParam+="<tr>";
				htmlParam+="<td>";
					htmlParam+="<b>Start Date</b>";
				htmlParam+="</td>";
				htmlParam+="<td>";
					htmlParam+="<input type=\"text\" "+readonly+" name=\"paramStartDate"+graphNameArea+"\" id=\"paramStartDate"+graphNameArea+"\" class=\"date\">";
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 		htmlParam+="<tr>";
	 			htmlParam+="<td>";
	 				htmlParam+="<b>End Date</b>";
	 			htmlParam+="</td>";
	 			htmlParam+="<td>";
	 				htmlParam+="<input type=\"text\" "+readonly+" name=\"paramEndDate"+graphNameArea+"\" id=\"paramEndDate"+graphNameArea+"\" class=\"date\">";
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
		
		//Embed Parameter for reuse again start
		
		var paramEmbedHtml="" +
				"<ul style=\"display:none\" class=\"paramEmbed"+graphName+"\">"+graphName+"" +
					"<li class=\"paramBranchCode"+graphName+"\">"+$("#paramBrach"+graphNameArea).val()+"</li>" +
					"<li class=\"paramStartDate"+graphName+"\">"+$("#paramStartDate"+graphNameArea).val()+"</li>" +
					"<li class=\"paramEndDate"+graphName+"\">"+$("#paramEndDate"+graphNameArea).val()+"</li>" +
				"</ul>";
		
		$(".paramEmbed"+graphName).remove();
		$("body").append(paramEmbedHtml);

		//Embed Parameter for reuse again end
		var paramBrach="";
		var paramStartDate="";
		var paramEndDate="";
		
		paramBrach=$("#paramBrach"+graphNameArea).val();
		paramStartDate=$("#paramStartDate"+graphNameArea).val();
		paramEndDate=$("#paramEndDate"+graphNameArea).val();

		//call function create graph for gernarate new graph
		//salePerDayFn
		//condition check can't select over month
		var startDate = paramStartDate.split("-");
		var endDate = paramEndDate.split("-");
		if((startDate[0]==endDate[0])&&((startDate[1])==endDate[1])){
			
			
			
			salePerDayFn(graphName,graphType,arIndex,paramStartDate,paramEndDate,paramBrach,graphWidth,graphHeight,paramMachine);
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");
				$(".contentGraph").shadow();
			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
			
		}else{
			alert("Not select over the month");
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
	 effect: "blind",
	 duration: 1000
	 },
	 hide: {
	 effect: "fold",
	 duration: 1000
	 },
	 width: 500,
	 //width: 700,
	 height:310,
	 modal: true,
	
	
	
 });
 
 //using dialog here
 $( ".areaSettingExternal").dialog( "open" );
 $(".ui-dialog .ui-dialog-content").css({"padding":"0px"});
};
 /*####################### config dialog for tablet end ###################*/ 

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
		
		
		 $(".date").datepicker({
			 showOn: "button",
			 buttonImage: ""+$buttonImage+"",
			 buttonImageOnly: true
			 });
		 $(".date").datepicker("option", "dateFormat", "yy-mm-dd");
		 $("#paramBrach"+graphNameArea).kendoDropDownList();
		 

		if($(".paramEmbed"+graphName).text()==""){
			 $("#paramStartDate"+graphNameArea).val(""+yyyy+"-"+mm+"-01");
			 $("#paramEndDate"+graphNameArea).val(""+yyyy+"-"+mm+"-"+dd+"");
		}else{
			$("#paramStartDate"+graphNameArea).val($("ul.paramEmbed"+graphName+">li.paramStartDate"+graphName).text());
			$("#paramEndDate"+graphNameArea).val($("ul.paramEmbed"+graphName+">li.paramEndDate"+graphName).text());	

		}
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
	 /*
	 alert("--1"+startDate);
	 alert("--2"+endDate);
	 alert("--3"+branchId);
	 */
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
			         	 name: "Current",
			         	 data: objDataSeriesSaleAmount
				     }, {
				         name: "Last Year",
				         data: objDataSeriesSaleAmountLastYear
				     }, {
				         name: "Target",
				         data: objDataSeriesSaleTarget
				     }];
				 
				
				// var Numbermm=parseInt(mm);
				 var selectDate = new Date(startDate);
				 var selectYYYY = selectDate.getFullYear();
				 var selectMM = selectDate.getMonth()+1; //January is 0!
				 
				 var titieText="ยอดขายหน้าร้านรายวัน  "+getMonthName(selectMM)+" "+selectYYYY+"";
				createChart_salePerDay(graphName,graphType,series,objCategories,arIndex,graphWidth,graphHeight,paramMachine,titieText);
				
			}
		});
	};


	 
	
	
	 
	
	 

	 