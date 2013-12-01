//click seting
//$(document).on("click",".setting",function(){

function createChart_SMI_SalesByProductCategoryWeekly(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,paramMachine,titleText) {
/*
seriesDefaultsFont
valueAxisFont
legendFont
categoryAxisFont
titleFont
labelsRotation
tooltipFont
 */
	//var seriesDefaultsFont="";
	if(paramMachine=="Tablet"){
		seriesDefaultsFont="16px Tahoma";
	}
	/*
	else{
		seriesDefaultsFont="";
	}
	*/
	
	
	
	 $("#chart"+graphName+"-"+arIndex).kendoChart({
		  chartArea: {
			    width: parseInt(graphWidth),
			    height:parseInt(graphHeight),
			    background: ""
			  },
	     title: {
	         text:titleText,
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
	         //type: ""+graphType+""
	    	 type:"bar",
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

	     
	     valueAxis: {
	        // max: 140000,
	    	 labels: {
                 template: "#= kendo.format('{0:N0}', value)#",
                 font:valueAxisFont,
                 visible: false
                 
                 
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
	         template: "#= addCommas(value) #",
	         font: tooltipFont
	         }
	     });
};



//#######################Embed parameter Function start #################
function embedParameter_SMI_SalesByProductCategoryWeekly(graphName,paramBranch,paramYear,startWeek,endWeek){
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

function SalesByProductCategoryWeeklyFn(graphName,graphType,arIndex,paramBranch,paramYear,startWeek,endWeek,graphWidth,graphHeight,paramMachine){
	
	//Embed Default Parameter start
	embedParameter_SMI_SalesByProductCategoryWeekly(graphName,paramBranch,paramYear,startWeek,endWeek);
	//Embed Default Parameter end
	
	 $.ajax({
			url:"../Model/SMI_SalesByProductCategoryWeekly.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramGraphName":graphName,"paramStartWeek":startWeek,"paramEndWeek":endWeek,"paramBranch":paramBranch,"paramYear":paramYear},
			success:function(data){
				//alert(data);
				//("hello jquery");
				//SalesType, SalesByProductCategoryTarget, CurrentSalesByProductCategory, LastYearSalesByProductCategory 
				var categoriesSalesByProductCategoryWeekly="";
				var dataSeriesSalesByProductCategoryWeeklyThisYear="";
				var dataSeriesSalesByProductCategoryWeeklyLastYear="";
				var dataSeriesSalesByProductCategoryWeeklyTarget="";
				var series="";
				
				categoriesSalesByProductCategoryWeekly+="[";
				dataSeriesSalesByProductCategoryWeeklyThisYear+="[";
				dataSeriesSalesByProductCategoryWeeklyLastYear+="[";
				dataSeriesSalesByProductCategoryWeeklyTarget+="[";
				$.each(data,function(index,indexEntry){
					
					var SalesByProductCategoryType=indexEntry[0];
					var paramThisYear="";
					var paramLastYear="";
					var paramTarget="";
					
					if(indexEntry[1]!=null){
						paramTarget=(parseFloat(indexEntry[3]).toFixed(0));
						
					}else{
						paramTarget=0;
					}
					if(indexEntry[2]!=null){
						paramThisYear=(parseFloat(indexEntry[2]).toFixed(0));
						
					}else{
						paramThisYear=0;
					}
					if(indexEntry[3]!=null){
						paramLastYear=(parseFloat(indexEntry[1]).toFixed(0));
						
					}else{
						paramLastYear=0;
					}
					
					if(index==0){
					
						
						
						categoriesSalesByProductCategoryWeekly+="\""+SalesByProductCategoryType+"\"";
						
						dataSeriesSalesByProductCategoryWeeklyThisYear+="\""+paramThisYear+"\"";
						dataSeriesSalesByProductCategoryWeeklyLastYear+="\""+paramLastYear+"\"";
						dataSeriesSalesByProductCategoryWeeklyTarget+="\""+paramTarget+"\"";
					}else{
						categoriesSalesByProductCategoryWeekly+=",\""+SalesByProductCategoryType+"\"";
						dataSeriesSalesByProductCategoryWeeklyThisYear+=",\""+paramThisYear+"\"";
						dataSeriesSalesByProductCategoryWeeklyLastYear+=",\""+paramLastYear+"\"";
						dataSeriesSalesByProductCategoryWeeklyTarget+=",\""+paramTarget+"\"";
					}
					
					//alert(indexEntry[0]);
					console.log(indexEntry[1]);
					console.log(indexEntry[2]);
					console.log(indexEntry[3]);
					console.log("============");
					
					
					
					
					
				});
				dataSeriesSalesByProductCategoryWeeklyThisYear+="]";
				dataSeriesSalesByProductCategoryWeeklyLastYear+="]";
				dataSeriesSalesByProductCategoryWeeklyTarget+="]";
				categoriesSalesByProductCategoryWeekly+="]";
				
				/*
				alert(categoriesSalesByProductCategoryWeekly);
				alert(dataSeriesSalesByProductCategoryWeeklyThisYear);
				alert(dataSeriesSalesByProductCategoryWeeklyLastYear);
				alert(dataSeriesSalesByProductCategoryWeeklyTarget);
				*/
				var objcategoriesSalesByProductCategoryWeekly=eval("("+categoriesSalesByProductCategoryWeekly+")");
				var objdataSeriesSalesByProductCategoryWeeklyThisYear=eval("("+dataSeriesSalesByProductCategoryWeeklyThisYear+")");
				var objdataSeriesSalesByProductCategoryWeeklyLastYear=eval("("+dataSeriesSalesByProductCategoryWeeklyLastYear+")");
				var objdataSeriesSalesByProductCategoryWeeklyTarget=eval("("+dataSeriesSalesByProductCategoryWeeklyTarget+")");
				
				console.log(objdataSeriesSalesByProductCategoryWeeklyThisYear);
				console.log(objdataSeriesSalesByProductCategoryWeeklyLastYear);
				console.log(objdataSeriesSalesByProductCategoryWeeklyTarget);
				
				//categories+="[\""+getMonthName(mm)+" "+(yy-1)+"\",\""+getMonthName(mm)+" "+yy+"\",\"Plan MTD "+getMonthName(mm)+" "+yy+"\",\"Plan "+getMonthName(mm)+" "+yy+"\"]";			
				var today = new Date();
				var yyyy = today.getFullYear()+"";
				//var yy=yyyy.substring("2");
				
				 series=[{
					 //name: ""+startWeek+"-"+endWeek+" ปี"+(yyyy-1)+"",
				    	 name: paramYear-1,
				         data: objdataSeriesSalesByProductCategoryWeeklyLastYear,
				         color: 'orange'
			         
				     }, {
				         //name: ""+startWeek+"-"+endWeek+" ปี"+yyyy+"",
				    	 name: paramYear,
				         data: objdataSeriesSalesByProductCategoryWeeklyThisYear,
				         color: '#007bc3'
				     }, {

			         	 name: "Target",
			         	 data: objdataSeriesSalesByProductCategoryWeeklyTarget,
			         	 color: 'gray'
				     }];
				// alert(series);
				
				//var objSeries=eval("("+series+")");
				//console.log(objCategories);
				//console.log(series);
				 
				 
				 
				 var titleText="ยอดขายแยกตามกลุ่มสินค้า ตั้งแต่"+"W"+startWeek+""+getWeekInterval(paramYear,startWeek)+"-"+"W"+endWeek+""+getWeekInterval(paramYear,endWeek)+"ปี"+yyyy+"";
				 createChart_SMI_SalesByProductCategoryWeekly(graphName,graphType,series,objcategoriesSalesByProductCategoryWeekly,arIndex,graphWidth,graphHeight,paramMachine,titleText);
			
			}
		});
		
	};


	
	
	var htmlParam_SMI_SalesByProductCategoryWeekly = function(graphNameArea){
		
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
		 					htmlParam+="<button id=\"SalesByProductCategoryWeeklySubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"SalesByProductCategoryWeeklyCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_SalesByProductCategoryWeekly=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#SalesByProductCategoryWeeklySubmit"+graphNameArea).die("click");
		$("#SalesByProductCategoryWeeklySubmit"+graphNameArea).live("click",function(){
			
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var startWeek=$("#paramStartWeek"+graphNameArea).val();
			var endWeek=$("#paramEndWeek"+graphNameArea).val();
			/*
			
			var paramBranch="";
			var paramYear="";
			var startWeek="";
			var endWeek="";
			*/
			
			//Embed Parameter for reuse again start
			/*
			var paramEmbedHtml="" +
					"<ul class=\"paramEmbed"+graphName+"\">SMI_SalesByProductCategoryWeekly" +
						"<li class=\"paramBranch\">"+$("#paramBranch"+graphNameArea).val()+"</li>" +
						"<li class=\"paramYear\">"+$("#paramYear"+graphNameArea).val()+"</li>" +
						"<li class=\"paramStartWeek\">"+$("#paramStartWeek"+graphNameArea).val()+"</li>" +
						"<li class=\"paramEndWeek\">"+$("#paramEndWeek"+graphNameArea).val()+"</li>" +
					"</ul>";
			
			$(".paramEmbed"+graphName).remove();
			$("body").append(paramEmbedHtml);
			*/
			//Embed Default Parameter start
			embedParameter_SMI_SalesByProductCategoryWeekly(graphName,paramBranch,paramYear,startWeek,endWeek);
			//Embed Default Parameter end
				
			if(startWeek <= endWeek){
				
				SalesByProductCategoryWeeklyFn(graphName,graphType,arIndex,paramBranch,paramYear,startWeek,endWeek,graphWidth,graphHeight);
				
				if(paramMachine=="Tablet"){
					$(".ui-icon-closethick").trigger("click");
	
				}else{
					$("#setting"+graphNameArea).trigger("click");
				}
			}else{
				alert(" เลือกช่วงสัปดาห์ไม่ถูกต้อง");
			}
		});
		
		if(paramMachine=="Tablet"){
		$("#SalesByProductCategoryWeeklyCancel"+graphNameArea).die("click");
		$("#SalesByProductCategoryWeeklyCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#SalesByProductCategoryWeeklyCancel"+graphNameArea).die("click");
		$("#SalesByProductCategoryWeeklyCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}
		
		
	};
	/*####################### config dialog for tablet start ###################*/ 
	var dialogSetParam_SMI_SalesByProductCategoryWeeklyFn=function(paramTitleSetting){
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
	
			 
	function manageParamSalesByProductCategoryWeeklyFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		 //alert("hello jquery");
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").empty();
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_SalesByProductCategoryWeekly(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	dialogSetParam_SMI_SalesByProductCategoryWeeklyFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_SalesByProductCategoryWeekly(graphNameArea));
				 $(".setParamForm"+graphNameArea).slideDown();
			 }
			
			 //set default parameter here start
			 
			 //set default parameter here end
			 //create button submit
			 //#####################check parameter is selected start#########################
			 getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
			 getYearParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text());
			 getParamStartWeek(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text(),$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeek").text());
			 getParamEndWeek(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text(),$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeek").text());
			 
			//$("#paramBranch"+graphNameArea).kendoDropDownList();
			//$("#paramYear"+graphNameArea).kendoDropDownList();
			//######################check parameter is selected end###########################
			 
			 submit_SMI_SalesByProductCategoryWeekly(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParam_SMI_SalesByProductCategoryWeeklyFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}

	//##################################### Set Parameter Here End ###############################
	