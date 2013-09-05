//###############################function using share other funciton start ####################################

function getYearWasteWeeklyParameter(graphNameArea,paramYear){
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
	getWeekWasteWeeklyParameter(graphNameArea,this.value);
});
}
function getWeekWasteWeeklyParameter(graphNameArea,paramYear,paramWeekSeleted){
	var htmlParam="";
	$.ajax({
		url:"../Model/SMI_ParamWeekInterval.jsp",
		type:"get",
		dataType:"json",
		async:false,
		data:{"paramYear":paramYear},
		success:function(data){
		
			htmlParam+="<select class=\"list\" id=\"paramWeek"+graphNameArea+"\">";
			$.each(data,function(index,indexEntry){
				
				var startWeekNumber=indexEntry[0].substring("1");
				//var paramWeekInterval= getWeekInterval(startWeekNumber);
				//var paramWeekInterval="set new get at store";
				//alert(paramWeekInterval);
				if(paramWeekSeleted==startWeekNumber){
				htmlParam+="<option selected value="+startWeekNumber+">"+indexEntry[0]+" "+indexEntry[1]+"</option>"; 
				}else{
				htmlParam+="<option value="+startWeekNumber+">"+indexEntry[0]+" "+indexEntry[1]+"</option>"; 	
				}
			});
			htmlParam+="</select>";
			$("td#areaParamWeek"+graphNameArea).html(htmlParam);
			$("select#paramWeek"+graphNameArea).kendoDropDownList({
				width:"400"
			});
		}
	});
}

//###############################function using share other funciton end ####################################

//click seting
//$(document).on("click",".setting",function(){

function createChart_SMI_WasteWeekly(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,titleText) {
	//alert(graphName);
	//alert(graphWidth);
	//alert(graphHeight);
	/*
	alert(graphName);
	alert(graphType);
	alert(graphSeries);
	alert(graphCategory);
	*/
	
	 $("#chart"+graphName+"-"+arIndex).kendoChart({
		  chartArea: {
			    width: parseInt(graphWidth),
			    height:parseInt(graphHeight)
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
	         type: ""+graphType+"",
	         
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
	             visible: true
	        	
	          }
	     },
	     categoryAxis: {
	    	 categories: graphCategory,
	    	 //(categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
//#######################Embed parameter Function start #################
function embedParameterWasteWeekly(graphName,paramBranch,paramYear,paramWeek){

	var paramDefaultEmbedHtml="" +
	"<ul style=\"display:none\" class=\"paramDefaultEmbed"+graphName+"\">"+graphName+"" +
		"<li class=\"paramBranch\">"+paramBranch+"</li>" +
		"<li class=\"paramYear\">"+paramYear+"</li>" +
		"<li class=\"paramWeek\">"+paramWeek+"</li>" +
	"</ul>";

	$(".paramDefaultEmbed"+graphName).remove();
	$("body").append(paramDefaultEmbedHtml);
	//Embed Default Parameter end
}
//#######################Embed parameter Function end #################

//send branch,year,startWeek,endWeek
//graphName,graphType,arIndex,branchId,yyyy,data[0][1],graphWidth,graphHeight
function wasteWeeklyFn(graphName,graphType,arIndex,vBranch,vYear,vWeek,graphWidth,graphHeight){

	
	
	//#########################set embed parameter for embed default parameter start########################
	 
	 
	 embedParameterWasteWeekly(graphName,vBranch,vYear,vWeek);
	//#########################set embed parameter for embed default parameter end########################
	
	
	 $.ajax({
			url:"../Model/SMI_WasteWeekly.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramBranch":vBranch,"paramYear":vYear,"paramWeek":vWeek},
			success:function(data){

				var categorieswasteWeekly="";
				var dataSerieswasteUpperLine="";
				var dataSerieswasteLowerLine="";
				var dataSerieswasteWeekly="";
				var series="";
				categorieswasteWeekly+="[";
				dataSerieswasteUpperLine+="[";
				dataSerieswasteLowerLine+="[";
				dataSerieswasteWeekly+="[";
				
				$.each(data,function(index,indexEntry){
					
					
					if(index==0){
						categorieswasteWeekly+="\""+indexEntry[0]+"\"";
						dataSerieswasteUpperLine+="\""+indexEntry[1]+"\"";
						dataSerieswasteLowerLine+="\""+indexEntry[2]+"\"";
						dataSerieswasteWeekly+="\""+indexEntry[3]+"\"";
						
						
					}else{
						categorieswasteWeekly+=",\""+indexEntry[0]+"\"";
						dataSerieswasteUpperLine+=",\""+indexEntry[1]+"\"";
						dataSerieswasteLowerLine+=",\""+indexEntry[2]+"\"";
						dataSerieswasteWeekly+=",\""+indexEntry[3]+"\"";
						
					}

				});
				dataSerieswasteUpperLine+="]";
				dataSerieswasteLowerLine+="]";
				dataSerieswasteWeekly+="]";
				categorieswasteWeekly+="]";
				
				//alert(dataSerieswasteWeekly);
				//alert(categorieswasteWeekly);
				
				var objcategorieswasteWeekly=eval("("+categorieswasteWeekly+")");
				var objdataSerieswasteUpperLine=eval("("+dataSerieswasteUpperLine+")");
				var objdataSerieswasteLowerLine=eval("("+dataSerieswasteLowerLine+")");
				var objdataSerieswasteWeekly=eval("("+dataSerieswasteWeekly+")");

				/*
				 Waste2012
				 UpperLine
				 LowerLine
				  */
				 series=[{
					 
			         	 name: "UpperLine",
			         	 data: objdataSerieswasteUpperLine,
			         	 color: "red",
			         	 dashType: "dot"
				     },{
					 
			         	 name: "LowerLine",
			         	 data: objdataSerieswasteLowerLine,
			         	 color: "green",
			         	 dashType: "dot"
				     },{
					 
			         	 name: "Waste",
			         	 data: objdataSerieswasteWeekly,
			         	 color: "#007bc3"
				     }];
				 var vWeekDel12="";
				 if((vWeek-12)<=0){
					 vWeekDel12=1;
				 }else{
					 vWeekDel12=vWeek-12;
				 }
				 var titleText="ของเสีย12 week ตั้งแต่  W"+vWeekDel12+""+getWeekInterval(vYear,vWeekDel12)+"-"+vWeek+""+getWeekInterval(vYear,vWeek)+" ปี "+vYear+"";
				 
				 createChart_SMI_WasteWeekly(graphName,graphType,series,objcategorieswasteWeekly,arIndex,graphWidth,graphHeight,titleText);
			
			}
		});
		
	
	};


	//##################################### Set Parameter Here Start ###############################
	
	var htmlParam_SMI_WasteWeekly = function(graphNameArea){
		
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
						htmlParam+="Year";
					htmlParam+="</td>";
					htmlParam+="<td id=\"areaParamYear"+graphNameArea+"\">";
					/*
						htmlParam+="" +
								"<select id=\"paramYear"+graphNameArea+"\" class=\"list\">" +
								"<option>2013</opton>" +
								"<option>2012</opton>" +
								"<option>2011</opton>" +
								"<option>2010</opton>" +
								"<select>" +
								"";
					*/
		 			htmlParam+="</td>";
		 		htmlParam+="</tr>";
		 		
		 		
		 		htmlParam+="<tr>";
				htmlParam+="<td>";
					htmlParam+="Week";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamWeek"+graphNameArea+"\">";
				/*
					htmlParam+="" +
								"<select id=\"paramWeek"+graphNameArea+"\" class=\"list\">" +
								"<option value=\"10\">W10</opton>" +
								"<option value=\"11\">W11</opton>" +
								"<option value=\"12\">W12</opton>" +
								"<option value=\"13\">W13</opton>" +
								"<select>" +
								"";
				*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";

		 	htmlParam+="</table>";
		 	
		 	htmlParam+="</div>";
		 	
		 		htmlParam+="<div class=\"btnArea\">";
		 				htmlParam+="<div class=\"btn\">";
		 					htmlParam+="<button id=\"wasteWeeklySubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"wasteWeeklyCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_WasteWeekly=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#wasteWeeklySubmit"+graphNameArea).die("click");
		$("#wasteWeeklySubmit"+graphNameArea).live("click",function(){
			
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var paramWeek=$("#paramWeek"+graphNameArea).val();
			embedParameterTop10Food(graphName,paramBranch,paramYear,paramWeek);
			//###################Embead parameter to call embed parameter function start##############
			
			wasteWeeklyFn(graphName,graphType,arIndex,paramBranch,paramYear,paramWeek,graphWidth,graphHeight);
			
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");

			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
			
		});
		
		if(paramMachine=="Tablet"){
		$("#wasteWeeklyCancel"+graphNameArea).die("click");
		$("#wasteWeeklyCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#wasteWeeklyCancel"+graphNameArea).die("click");
		$("#wasteWeeklyCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}
		
		
	};
	/*####################### config dialog for tablet start ###################*/ 
	
	var dialogSetParam_SMI_WasteWeeklyFn=function(paramTitleSetting){
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
			 
	function manageParamwasteWeeklyFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		 //alert("hello jquery");
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").remove();
				 $("body").append("<div class=\"areaSettingExternal\"></div>");
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_WasteWeekly(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	 dialogSetParam_SMI_WasteWeeklyFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_WasteWeekly(graphNameArea));
				 $(".setParamForm"+graphNameArea).slideDown();
			 }
			//#####################check parameter is selected start#########################
				getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
				getYearWasteWeeklyParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text());
				getWeekWasteWeeklyParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text(),$("ul.paramDefaultEmbed"+graphName+">li.paramWeek").text());
			//######################check parameter is selected end###########################

			 //create button submit
			 submit_SMI_WasteWeekly(graphNameArea,graphName,'line',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParam_SMI_WasteWeeklyFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}
	
	//##################################### Set Parameter Here End ###############################
	