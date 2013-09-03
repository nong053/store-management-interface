//click seting
//$(document).on("click",".setting",function(){

function createChart_SMI_SalesPerBillWeekly(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,titleText) {
	//alert(graphName);
	//alert(graphWidth);
	//alert(graphHeight);
	/*
seriesDefaultsFont
valueAxisFont
legendFont
categoryAxisFont
titleFont
labelsRotation
tooltipFont
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
	           position:"right",
	           labels: {
	        	      font:legendFont
	        	    }
	     },
	     
	     seriesDefaults: {
	         type: ""+graphType+"",
	         labels: {
                 visible: true,
                 //template: "#=value#",
                 template: "#= addCommas(value) #",
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
	    	 labels: {
                 template: "#= kendo.format('{0:N0}', value)#",
                 font:valueAxisFont
             },
	         line: {
	             visible: false
	         },
	         minorGridLines: {
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
	         template: "#= series.name #: #= value #",
	         font: tooltipFont
	         }
	     });
};






//#######################Embed parameter Function start #################
function embedParameter_SMI_SalesPerBillWeeklyFn(graphName,paramBranch,paramYear,startWeek,endWeek){
	//Embed Default Parameter start
	var paramDefaultEmbedHtml="" +
	"<ul style=\"display:none\" class=\"paramDefaultEmbed"+graphName+"\">"+graphName+"" +
		"<li class=\"paramBranch\">"+paramBranch+"</li>" +
		"<li class=\"paramYear\">"+paramYear+"</li>" +
		"<li class=\"paramStartWeek\">"+startWeek+"</li>" +
		"<li class=\"paramEndWeek\">"+endWeek+"</li>" +

	"</ul>";

	$(".paramDefaultEmbed"+graphName).remove();
	$("body").append(paramDefaultEmbedHtml);
	//Embed Default Parameter end
}
//#######################Embed parameter Function end #################

function salesPerBillWeeklyFn(graphName,graphType,arIndex,paramBranch,paramYear,startWeek,endWeek,graphWidth,graphHeight){
	
	//Embed Default Parameter start

	embedParameter_SMI_SalesPerBillWeeklyFn(graphName,paramBranch,paramYear,startWeek,endWeek);
	//Embed Default Parameter end
	
	 $.ajax({
			url:"../Model/SMI_SalesPerBillWeekly.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramGraphName":graphName,"paramStartWeek":startWeek,"paramEndWeek":endWeek,"paramBranch":paramBranch,"paramYear":paramYear},
			success:function(data){
				//alert(data);
				//("hello jquery");
				//SalesType, SalesPerBillTarget, CurrentSalesPerBill, LastYearSalesPerBill 
				var categoriesSalesPerBillWeekly="";
				var dataSeriesSalesPerBillWeeklyThisYear="";
				var dataSeriesSalesPerBillWeeklyLastYear="";
				var dataSeriesSalesPerBillWeeklyTarget="";
				var series="";
				
				categoriesSalesPerBillWeekly+="[";
				dataSeriesSalesPerBillWeeklyThisYear+="[";
				dataSeriesSalesPerBillWeeklyLastYear+="[";
				dataSeriesSalesPerBillWeeklyTarget+="[";
				$.each(data,function(index,indexEntry){
					var SalesPerBillType="";
					switch(indexEntry[0]){
					case "D":SalesPerBillType="Delivery";break;
					case "T":SalesPerBillType="Take Away";break;
					case "E":SalesPerBillType="Eat In";break;
					case "Total":SalesPerBillType="Total";break;
					
					}
					var paramThisYear="";
					var paramLastYear="";
					var paramTarget="";
					
					if(indexEntry[1]!=null){
						paramTarget=parseInt(indexEntry[1]);
						
					}else{
						paramTarget=0;
					}
					if(indexEntry[2]!=null){
						paramThisYear=parseInt(indexEntry[2]);
						
					}else{
						paramThisYear=0;
					}
					if(indexEntry[3]!=null){
						paramLastYear=parseInt(indexEntry[3]);
						
					}else{
						paramLastYear=0;
					}
					
					if(index==0){
					
						
						
						categoriesSalesPerBillWeekly+="\""+SalesPerBillType+"\"";
						
						dataSeriesSalesPerBillWeeklyThisYear+="\""+paramThisYear+"\"";
						dataSeriesSalesPerBillWeeklyLastYear+="\""+paramLastYear+"\"";
						dataSeriesSalesPerBillWeeklyTarget+="\""+paramTarget+"\"";
					}else{
						categoriesSalesPerBillWeekly+=",\""+SalesPerBillType+"\"";
						dataSeriesSalesPerBillWeeklyThisYear+=",\""+paramThisYear+"\"";
						dataSeriesSalesPerBillWeeklyLastYear+=",\""+paramLastYear+"\"";
						dataSeriesSalesPerBillWeeklyTarget+=",\""+paramTarget+"\"";
					}
					
					//alert(indexEntry[0]);
					console.log(indexEntry[1]);
					console.log(indexEntry[2]);
					console.log(indexEntry[3]);
					console.log("============");
					
					
					
					
					
				});
				dataSeriesSalesPerBillWeeklyThisYear+="]";
				dataSeriesSalesPerBillWeeklyLastYear+="]";
				dataSeriesSalesPerBillWeeklyTarget+="]";
				categoriesSalesPerBillWeekly+="]";
				
				/*
				alert(categoriesSalesPerBillWeekly);
				alert(dataSeriesSalesPerBillWeeklyThisYear);
				alert(dataSeriesSalesPerBillWeeklyLastYear);
				alert(dataSeriesSalesPerBillWeeklyTarget);
				*/
				var objcategoriesSalesPerBillWeekly=eval("("+categoriesSalesPerBillWeekly+")");
				var objdataSeriesSalesPerBillWeeklyThisYear=eval("("+dataSeriesSalesPerBillWeeklyThisYear+")");
				var objdataSeriesSalesPerBillWeeklyLastYear=eval("("+dataSeriesSalesPerBillWeeklyLastYear+")");
				var objdataSeriesSalesPerBillWeeklyTarget=eval("("+dataSeriesSalesPerBillWeeklyTarget+")");
				
				console.log(objdataSeriesSalesPerBillWeeklyThisYear);
				console.log(objdataSeriesSalesPerBillWeeklyLastYear);
				console.log(objdataSeriesSalesPerBillWeeklyTarget);
				
				
				 //Target,Current,Last Year
				 series=[{
			         	 name: "Target",
			         	 data: objdataSeriesSalesPerBillWeeklyTarget
				     }, {
				    	 name: "Current",
				         //name: ""+startWeek+"-"+endWeek+" ปี"+yyyy+"",
				         data: objdataSeriesSalesPerBillWeeklyThisYear
				     }, {
				    	 name: "Last Year",
				         //name: ""+startWeek+"-"+endWeek+" ปี"+(yyyy-1)+"",
				         data: objdataSeriesSalesPerBillWeeklyLastYear
				     }];
				// alert(series);
				/*
				 var startWeekInterval=$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeekInterval").text();
				 var endWeekInterval=$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeekInterval").text();
				 */
				 var titleText="Sale per Bill(บาทต่อบิล)ตั้งแต่"+"W"+startWeek+""+getWeekInterval(paramYear,startWeek)+"-"+"W"+endWeek+""+getWeekInterval(paramYear,endWeek)+"ปี"+paramYear+"";
				 createChart_SMI_SalesPerBillWeekly(graphName,graphType,series,objcategoriesSalesPerBillWeekly,arIndex,graphWidth,graphHeight,titleText);
			
			}
		});
		
	};


	//##################################### Set Parameter Here Start ###############################
	
	
	//function gte Parameter
	/*
	var getYearParameter = function(graphNameArea,selectYear){
		alert("hello parameter");
		var htmlYearParam="";
		$.ajax({
			url:"../Model/SMI_ParamYear.jsp",
			type:"get",
			dataType:"json",
			async:false,
			success:function(data){
				//alert(data);
				$.each(data,function(index,indexEntry){
					if(selectYear==indexEntry[0]){
					htmlYearParam+="<option selected>"+indexEntry[0]+"</option>"; 	
					}else{
					htmlYearParam+="<option>"+indexEntry[0]+"</option>"; 
					}	
					
				});
				//alert(htmlYearParam);
				//console.log($("select#paramYear"+graphNameArea).get());
				$("td#areaParamYear"+graphNameArea).html(htmlYearParam);
				$("select#paramYear"+graphNameArea).kendoDropDownList();
				alert("gen paramStartWeek and pramEndWeek");
				$("select#paramYear"+graphNameArea).die("change");
;				$("select#paramYear"+graphNameArea).live("change",function(){
					alert("getWeek");
					getStartWeekParameter(graphNameArea,this.value);
					getEndWeekParameter(graphNameArea,this.value);
				});
			}
		});
	};
	*/
	/*
	var getBranchParameter = function(graphNameArea){
		
	};
	var getStartWeekParameter = function(graphNameArea,paramYear){
		
		//alert(graphNameArea);
		//alert(paramYear);
		
		var htmlStartWeekParam="";
		$.ajax({
			url:"../Model/SMI_ParamWeek.jsp",
			type:"get",
			dataType:"json",
			async:false,
			data:{"paramYear":paramYear},
			success:function(data){
				//alert(data);
				
				htmlStartWeekParam+="<select class=\"list\" id=\"paramStartWeek"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					//"<option value=\"15\">w15(10April-16April)</option>" +
					var startWeekNumber=indexEntry[0].substring("1");
					htmlStartWeekParam+="<option value="+startWeekNumber+">("+indexEntry[0]+")"+indexEntry[1]+"</option>"; 
				});
				htmlStartWeekParam+="</select>";
				//alert(htmlYearParam);
				//console.log($("select#paramYear"+graphNameArea).get());
				$("td#startWeekPanel"+graphNameArea).html(htmlStartWeekParam);
				$("select#paramStartWeek"+graphNameArea).kendoDropDownList();
				
			}
		});
	};
var getEndWeekParameter = function(graphNameArea,paramYear){
		

		var htmlEndWeekParam="";
		$.ajax({
			url:"../Model/SMI_ParamWeek.jsp",
			type:"get",
			dataType:"json",
			async:false,
			data:{"paramYear":paramYear},
			success:function(data){
				//alert(data);
				htmlEndWeekParam+="<select class=\"list\" id=\"paramEndWeek"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					//"<option value=\"15\">w15(10April-16April)</option>" +
					var endWeekNumber=indexEntry[0].substring("1");
					htmlEndWeekParam+="<option value="+endWeekNumber+">("+indexEntry[0]+")"+indexEntry[1]+"</option>"; 
				});
				htmlEndWeekParam+="</select>";
				//alert(htmlYearParam);
				//console.log($("select#paramYear"+graphNameArea).get());
				$("td#endWeekPanel"+graphNameArea).html(htmlEndWeekParam);
				$("select#paramEndWeek"+graphNameArea).kendoDropDownList();
			}
		});
	};
	
	
	
	
	*/
	
	
	var htmlParam_SMI_SalesPerBillWeekly = function(graphNameArea){
		
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
						htmlParam+="<b>Year</b>";
					htmlParam+="</td>";
					htmlParam+="<td id=\"areaParamYear"+graphNameArea+"\">";
					/*
						htmlParam+="" +
								"<select class=\"list\" id=\"paramYear"+graphNameArea+"\">" +
								
									"<option>2013</option>" +
									"<option>2012</option>" +
									"<option>2011</option>" +
									"<option>2010</option>" +
								
								"</select>";
					 */
		 			htmlParam+="</td>";
		 		htmlParam+="</tr>";
		 		
		 		
		 		htmlParam+="<tr>";
				htmlParam+="<td>";
					htmlParam+="<b>Start Week</b>";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamStartWeek"+graphNameArea+"\">";
				/*
					htmlParam+="" +
							"<select class=\"list\" id=\"paramStartWeek"+graphNameArea+"\">" +
								"<option value=\"15\">w15(10April-16April)</option>" +
								"<option value=\"16\">w16(10April-16April)</option>" +
								"<option value=\"17\">w17(10April-16April)</option>" +
								"<option value=\"18\">w18(10April-16April)</option>" +
							"</select>";
				*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 		
	 		
	 		
	 		htmlParam+="<tr>";
			htmlParam+="<td>";
				htmlParam+="<b>End Week</b>";
			htmlParam+="</td>";
			htmlParam+="<td id=\"areaParamEndWeek"+graphNameArea+"\">";
			/*
				htmlParam+="" +
						"<select class=\"list\" id=\"paramEndWeek"+graphNameArea+"\">" +
							"<option value=\"15\">w15(10April-16April)</option>" +
							"<option value=\"16\">w16(10April-16April)</option>" +
							"<option value=\"17\">w17(10April-16April)</option>" +
							"<option value=\"18\">w18(10April-16April)</option>" +
						"</select>";
			*/
 			htmlParam+="</td>";
 			
 		htmlParam+="</tr>";

		 	htmlParam+="</table>";
		 	
		 	htmlParam+="</div>";
		 	
		 		htmlParam+="<div class=\"btnArea\">";
		 				htmlParam+="<div class=\"btn\">";
		 					htmlParam+="<button id=\"SalesPerBillWeeklySubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"SalesPerBillWeeklyCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_SalesPerBillWeekly=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#SalesPerBillWeeklySubmit"+graphNameArea).die("click");
		$("#SalesPerBillWeeklySubmit"+graphNameArea).live("click",function(){
			
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var startWeek=$("#paramStartWeek"+graphNameArea).val();
			var endWeek=$("#paramEndWeek"+graphNameArea).val();
	
			//Embed Default Parameter start
			embedParameter_SMI_SalesPerBillWeeklyFn(graphName,paramBranch,paramYear,startWeek,endWeek);
			//Embed Default Parameter end
			//###################Embead parameter to call embed parameter function start##############
			
			//call function create graph for gernarate new graph
			salesPerBillWeeklyFn(graphName,graphType,arIndex,paramBranch,paramYear,startWeek,endWeek,graphWidth,graphHeight);
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");

			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
			
		});
		
		if(paramMachine=="Tablet"){
		$("#SalesPerBillWeeklyCancel"+graphNameArea).die("click");
		$("#SalesPerBillWeeklyCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#SalesPerBillWeeklyCancel"+graphNameArea).die("click");
		$("#SalesPerBillWeeklyCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}
		
		
	};
	/*####################### config dialog for tablet start ###################*/ 
	var dialogSetParam_SMI_SalesPerBillWeeklyFn=function(paramTitleSetting){
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
		 width: 480,
		 height:350,
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
			 
	function manageParamSalesPerBillWeeklyFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		 //alert("hello jquery");
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").remove();
				 $("body").append("<div class=\"areaSettingExternal\"></div>");
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_SalesPerBillWeekly(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	 dialogSetParam_SMI_SalesPerBillWeeklyFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_SalesPerBillWeekly(graphNameArea));
				 //call parameter start
				// getYearParameter(graphNameArea);
				// getStartWeekParameter(graphNameArea,$("select#paramYear"+graphNameArea).val());
				// getEndWeekParameter(graphNameArea,$("select#paramYear"+graphNameArea).val());
				 //call parameter end
				 
				 $(".setParamForm"+graphNameArea).slideDown();
			 }
			
			
			 //create button submit
			//#####################check parameter is selected start#########################
			 getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
			 getYearParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text());
			 getParamStartWeek(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text(),$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeek").text());
			 getParamEndWeek(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text(),$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeek").text());
			 
			 /*
			 $("#paramBranch"+graphNameArea).kendoDropDownList();
			 $("#paramYear"+graphNameArea).kendoDropDownList();
			 */
			//######################check parameter is selected end###########################
			 
			 submit_SMI_SalesPerBillWeekly(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParam_SMI_SalesPerBillWeeklyFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}

	//##################################### Set Parameter Here End ###############################
	