//click seting
//$(document).on("click",".setting",function(){

function createChart_SMI_Top10Waste(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,titleText,
		objdataSeriesTop10WasteValueThisMonth,objdataSeriesTop10WasteValueLastMonth) {
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
	         font:"13px Tahoma"
	     },
	     
	     
	     legend: {
	         visible: true,
	           position:"ritgth"
	     },
	     
	     seriesDefaults: {
	         //type: ""+graphType+""
	    	 type:"bar",
	    	 //value default show value on bar chart 
	         labels: {
                visible: true,
               template: "#= series.name2 #: #=addCommas(value) #",
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
	        	// font: "10px Tahoma",
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

    	if(labelValueAmount[0]=="current"){

    		var salesValue="";
    		if(objdataSeriesTop10WasteValueThisMonth[num1]!=0){
    			salesValue="="+objdataSeriesTop10WasteValueThisMonth[num1]+"";
    		}
    		$(this).html(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num1++;
    	}
    	if(labelValueAmount[0]=="lastMonth"){

    		var salesValue="";
    		if(objdataSeriesTop10WasteValueLastMonth[num2]!=0){
    			salesValue="="+objdataSeriesTop10WasteValueLastMonth[num2]+"";
    		}
    		$(this).html(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num2++;
    	}
     });
};







//#######################Embed parameter Function start #################
function embedParameterTop10Waste(graphName,paramBranch,paramYear,paramMonth){

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

function top10WasteFn(graphName,graphType,arIndex,vBranch,vYear,vMonth,graphWidth,graphHeight){
	
	//#########################set embed parameter for embed default parameter start######################
	embedParameterTop10Waste(graphName,vBranch,vYear,vMonth);
	//#########################set embed parameter for embed default parameter end########################
	
	 $.ajax({
			url:"../Model/SMI_Top10Waste.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramBranch":vBranch,"paramYear":vYear,"paramMonth":vMonth},
			success:function(data){

				var categoriesTop10Waste="";
				var dataSeriesTop10WasteThisMonth="";
				var dataSeriesTop10WasteLastMonth="";
				
				var dataSeriesTop10WasteValueThisMonth="";
				var dataSeriesTop10WasteValueLastMonth="";
				
				
				var series="";
				categoriesTop10Waste+="[";
				dataSeriesTop10WasteThisMonth+="[";
				dataSeriesTop10WasteLastMonth+="[";
				
				dataSeriesTop10WasteValueThisMonth+="[";
				dataSeriesTop10WasteValueLastMonth+="[";
				
				$.each(data,function(index,indexEntry){
					
					
					if(index==0){
						categoriesTop10Waste+="\""+indexEntry[1]+"\"";
						dataSeriesTop10WasteThisMonth+="\""+indexEntry[3]+"\"";
						dataSeriesTop10WasteLastMonth+="\""+indexEntry[2]+"\"";
						
						dataSeriesTop10WasteValueThisMonth+="\""+indexEntry[5]+"\"";
						dataSeriesTop10WasteValueLastMonth+="\""+indexEntry[4]+"\"";
						
					}else{
						categoriesTop10Waste+=",\""+indexEntry[1]+"\"";
						dataSeriesTop10WasteThisMonth+=",\""+indexEntry[3]+"\"";
						dataSeriesTop10WasteLastMonth+=",\""+indexEntry[2]+"\"";
						
						dataSeriesTop10WasteValueThisMonth+=",\""+indexEntry[5]+"\"";
						dataSeriesTop10WasteValueLastMonth+=",\""+indexEntry[4]+"\"";
						
					}

				});
				dataSeriesTop10WasteLastMonth+="]";
				dataSeriesTop10WasteThisMonth+="]";
				
				dataSeriesTop10WasteValueThisMonth+="]";
				dataSeriesTop10WasteValueLastMonth+="]";
				
				categoriesTop10Waste+="]";
				
				//alert(dataSeriesTop10Waste);
				//alert(categoriesTop10Waste);
				
				var objcategoriesTop10Waste=eval("("+categoriesTop10Waste+")");
				var objdataSeriesTop10WasteThisMonth=eval("("+dataSeriesTop10WasteThisMonth+")");
				var objdataSeriesTop10WasteLastMonth=eval("("+dataSeriesTop10WasteLastMonth+")");
				
				var objdataSeriesTop10WasteValueThisMonth=eval("("+dataSeriesTop10WasteValueThisMonth+")");
				var objdataSeriesTop10WasteValueLastMonth=eval("("+dataSeriesTop10WasteValueLastMonth+")");

				
				 series=[{
			         	 name: "This Month",
			         	 name2:"current",
			         	 data: objdataSeriesTop10WasteThisMonth
				     },{
			         	 name: "Last Month",
			         	 name2:"lastMonth",
			         	 data: objdataSeriesTop10WasteLastMonth
				     }];
				 
				 var titleText="Top10-ของเสีย(ชิ้น):ของเดือน "+getMonthName(vMonth)+" ปี "+vYear+"";
				 
				 createChart_SMI_Top10Waste(graphName,graphType,series,objcategoriesTop10Waste,arIndex,graphWidth,graphHeight,titleText,
						 objdataSeriesTop10WasteValueThisMonth,objdataSeriesTop10WasteValueLastMonth);
			
			}
		});
		
		
	};


	//##################################### Set Parameter Here Start ###############################
	
	var htmlParam_SMI_Top10Waste = function(graphNameArea){
		
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
		 					htmlParam+="<button id=\"Top10WasteSubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"Top10WasteCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_Top10Waste=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#Top10WasteSubmit"+graphNameArea).die("click");
		$("#Top10WasteSubmit"+graphNameArea).live("click",function(){
			
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var paramMonth=$("#paramMonth"+graphNameArea).val();
			embedParameterTop10Waste(graphName,paramBranch,paramYear,paramMonth);
			//###################Embead parameter to call embed parameter function start##############
			top10WasteFn(graphName,graphType,arIndex,paramBranch,paramYear,paramMonth,graphWidth,graphHeight);
			
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");

			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
			
		});
		
		if(paramMachine=="Tablet"){
		$("#Top10WasteCancel"+graphNameArea).die("click");
		$("#Top10WasteCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#Top10WasteCancel"+graphNameArea).die("click");
		$("#Top10WasteCancel"+graphNameArea).live("click",function(){
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
			 
	function manageParamTop10WasteFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		 //alert("hello jquery");
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").empty();
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_Top10Waste(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	 dialogSetParamFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_Top10Waste(graphNameArea));
				 $(".setParamForm"+graphNameArea).slideDown();
			 }
			//#####################check parameter is selected start#########################
				getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
				getYearParameterOnly(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text());
				getMonthParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramMonth").text());
			//######################check parameter is selected end###########################
			 
			 //create button submit
			 submit_SMI_Top10Waste(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
			 
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
	