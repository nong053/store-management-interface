//g15


function createChart_SMI_CookingTimeRange(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,paramMachine,titleText) {

	
	var seriesDefaultsFont="";
	if(paramMachine=="Tablet"){
		seriesDefaultsFont="16px Tahoma";
	}else{
		seriesDefaultsFont="13px Tahoma";
	}
	
	 $("#chart"+graphName+"-"+arIndex).kendoChart({
		  chartArea: {
			    width: parseInt(graphWidth),
			    height:parseInt(graphHeight),
			    background: ""
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
	         //value default show value on bar chart 
	         labels: {
                visible: true,
               template: " #=addCommas(value) #",
               font:seriesDefaultsFont,
                //template: "#= addCommas(value) #",
                //font:seriesFont,
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
	    	 //(categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	         majorGridLines: {
	             visible: true
	         },
	         labels: {
	        	 font: categoryAxisFont,
	        	 // rotation : -50
	          }
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= addCommas(value)#",
	         font: tooltipFont
	         }
	     });
};







//#######################Embed parameter Function start #################
function embedParameterCookingTimeRange(graphName,paramBranch,paramYear,paramMonth){

	var paramDefaultEmbedHtml="" +
	"<ul style=\"display:none\" class=\"paramDefaultEmbed"+graphName+"\">"+graphName+"" +
		"<li class=\"paramBranch\">"+paramBranch+"</li>" +
		"<li class=\"paramYear\">"+paramYear+"</li>" +
		"<li class=\"paramMonth\">"+paramMonth+"</li>" +
		
	"</ul>";

	$(".paramDefaultEmbed"+graphName).remove();
	$("body").append(paramDefaultEmbedHtml);
	//Embed Default Parameter end
}
//#######################Embed parameter Function end #################

function cookingTimeRangeFn(graphName,graphType,arIndex,vBranch,vYear,vMonth,graphWidth,graphHeight,paramMachine){
	//#########################set embed parameter for embed default parameter start######################
	embedParameterCookingTimeRange(graphName,vBranch,vYear,vMonth);
	//#########################set embed parameter for embed default parameter end########################
	
	 $.ajax({
			url:"../Model/SMI_CookingTimeRange.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramBranch":vBranch,"paramYear":vYear,"paramMonth":vMonth},
			success:function(data){

				var categoriescookingTimeRange="";
				var dataSeriescookingTimeRangeThisMonth="";
				var dataSeriescookingTimeRangeLastMonth="";
				var series="";
				categoriescookingTimeRange+="[";
				dataSeriescookingTimeRangeThisMonth+="[";
				dataSeriescookingTimeRangeLastMonth+="[";
				
				$.each(data,function(index,indexEntry){
					

					var cookingTimeRangeThisMonthValue="";
					var cookingTimeRangeLastMonthValue="";
					
					
					if(indexEntry[1]==null){
						cookingTimeRangeThisMonthValue="0";
					}else{
						cookingTimeRangeThisMonthValue=indexEntry[1];
					}
					if(indexEntry[2]==null){
						cookingTimeRangeLastMonthValue="0";
					}else{
						cookingTimeRangeLastMonthValue=indexEntry[2];
					}
					
					
					if(index==0){
						categoriescookingTimeRange+="\""+indexEntry[0]+"\"";
						dataSeriescookingTimeRangeThisMonth+="\""+cookingTimeRangeThisMonthValue+"\"";
						dataSeriescookingTimeRangeLastMonth+="\""+cookingTimeRangeLastMonthValue+"\"";
						
					}else{
						categoriescookingTimeRange+=",\""+indexEntry[0]+"\"";
						dataSeriescookingTimeRangeThisMonth+=",\""+cookingTimeRangeThisMonthValue+"\"";
						dataSeriescookingTimeRangeLastMonth+=",\""+cookingTimeRangeLastMonthValue+"\"";
						
					}

				});
				dataSeriescookingTimeRangeLastMonth+="]";
				dataSeriescookingTimeRangeThisMonth+="]";
				categoriescookingTimeRange+="]";
				
				//alert(dataSeriescookingTimeRange);
				//alert(categoriescookingTimeRange);
				
				var objcategoriescookingTimeRange=eval("("+categoriescookingTimeRange+")");
				var objdataSeriescookingTimeRangeThisMonth=eval("("+dataSeriescookingTimeRangeThisMonth+")");
				var objdataSeriescookingTimeRangeLastMonth=eval("("+dataSeriescookingTimeRangeLastMonth+")");

				var vLastMonth="";
				var vLastYear="";
				if((vMonth-1)==0){
					vLastMonth=12;
					vLastYear=vYear-1;
				}else{
					vLastMonth=vMonth-1;
					vLastYear=vYear;
				}
				
				 series=[{
					     name: getMonthName(vLastMonth)+" "+vLastYear,
			         	 data: objdataSeriescookingTimeRangeLastMonth,
			         	color: 'orange'
				     },{
				    	 name: getMonthName(vMonth)+" "+vYear,
			         	 data: objdataSeriescookingTimeRangeThisMonth,
			         	color: '#007bc3'
				     }];
				 
				 var titleText="จำนวนอาหารที่ทำเกินเวลา "+getMonthName(vMonth)+" ปี "+vYear+"";
				 createChart_SMI_CookingTimeRange(graphName,graphType,series,objcategoriescookingTimeRange,arIndex,graphWidth,graphHeight,paramMachine,titleText);
			
			}
		});
		
		
	};


	//##################################### Set Parameter Here Start ###############################
	
	var htmlParam_SMI_CookingTimeRange = function(graphNameArea){
		
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
						htmlParam+="Year";
					htmlParam+="</td>";
					htmlParam+="<td id=\"areaParamYear"+graphNameArea+"\">";
					/*
						htmlParam+="" +
								"<select class=\"list\" id=\"paramYear"+graphNameArea+"\">" +
								"<option>2013</option>" +
								"<option>2012</option>" +
								"<option>2011</option>" +
								"</select>";
					*/
		 			htmlParam+="</td>";
		 		htmlParam+="</tr>";
		 		
		 		
		 		htmlParam+="<tr>";
				htmlParam+="<td>";
					htmlParam+="Month";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamMonth"+graphNameArea+"\">";
				/*
					htmlParam+="" +
							"<select class=\"list\" id=\"paramMonth"+graphNameArea+"\">" +
								"<option value=\"01\">Jan</option>" +
								"<option value=\"02\">feb</option>" +
								"<option value=\"03\">Mar</option>" +
								"<option value=\"04\">Apr</option>" +
								"<option value=\"05\">May</option>" +
								"<option value=\"06\">Jun</option>" +
								"<option value=\"07\">Junly</option>" +
								"<option value=\"08\">Aug</option>" +
								"<option value=\"09\">Sep</option>" +
								"<option value=\"10\">Oct</option>" +
								"<option value=\"11\">Dev</option>" +
								"<option value=\"12\">Nov</option>" +
								
							"</select>";
				*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";

		 	htmlParam+="</table>";
		 	
		 	htmlParam+="</div>";
		 	
		 		htmlParam+="<div class=\"btnArea\">";
		 				htmlParam+="<div class=\"btn\">";
		 					htmlParam+="<button id=\"cookingTimeRangeSubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"cookingTimeRangeCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_CookingTimeRange=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#cookingTimeRangeSubmit"+graphNameArea).die("click");
		$("#cookingTimeRangeSubmit"+graphNameArea).live("click",function(){
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var paramMonth=$("#paramMonth"+graphNameArea).val();
			embedParameterTop10CookingTime(graphName,paramBranch,paramYear,paramMonth);
			//###################Embead parameter to call embed parameter function start##############
			
			cookingTimeRangeFn(graphName,graphType,arIndex,paramBranch,paramYear,paramMonth,graphWidth,graphHeight,paramMachine);
			
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");

			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
			
		});
		
		if(paramMachine=="Tablet"){
		$("#cookingTimeRangeCancel"+graphNameArea).die("click");
		$("#cookingTimeRangeCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#cookingTimeRangeCancel"+graphNameArea).die("click");
		$("#cookingTimeRangeCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}
		
		
	};
	/*####################### config dialog for tablet start ###################*/ 
	
	var dialogSetParam_SMI_CookingTimeRangeFn=function(paramTitleSetting){
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
			 
	function manageParamcookingTimeRangeFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		 //alert("hello jquery");
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").remove();
				 $("body").append("<div class=\"areaSettingExternal\"></div>");
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_CookingTimeRange(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	 dialogSetParam_SMI_CookingTimeRangeFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_CookingTimeRange(graphNameArea));
				 $(".setParamForm"+graphNameArea).slideDown();
			 }
			//#####################check parameter is selected start#########################
				getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
				getYearParameterOnly(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text());
				getMonthParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramMonth").text());
			//######################check parameter is selected end###########################
			 //create button submit
			 submit_SMI_CookingTimeRange(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParam_SMI_CookingTimeRangeFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}
	
	//##################################### Set Parameter Here End ###############################
	