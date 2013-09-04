
function createChart_SMI_CustomerPerMonth(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,titleText,paramMachine,objDataSeriesCustomerValueMonthThisYear,objDataSeriesCustomerValueMonthLastYear,objDataSeriesCustomerValueTarget) {

	
	
	 $("#chart"+graphName+"-"+arIndex).kendoChart({
		 theme: $(document).data("kendoSkin") || "silver",
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
	        	      font:legendFont,
	        	    }
	     },
	     
	     seriesDefaults: {
	         type: ""+graphType+"",
	         labels: {
                 visible: true,
                 template: "#= series.name2 #: #= value #",
                 font:seriesDefaultsFont,
                 background: "transparent"
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
	             font: valueAxisFont,
	             template: "#= kendo.format('{0:N0}', value ) # ",
	             visible: false
	        	
	          }
	     },
	     categoryAxis: {
	    	 categories: graphCategory,
	         majorGridLines: {
	             visible: true
	         },
	         labels: {
	             //font: "10px Tahoma",
	        	  //rotation : -50,
	        	  font:categoryAxisFont
	          }
	          
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= addCommas(value) #",
	         font: tooltipFont,
	         }
	     });
	 
	 
	 var num1=0;
	 var num2=0;
	 var num3=0;
	 
     //console.log($("#chartMTDSalePerMonth-1 svg text"));
     $(""+"#chart"+graphName+"-"+arIndex+">svg>text").each(function(){

    	var labelValue = $(this).text();
    	var labelValueAmount = labelValue.split(":");
    	//alert(labelValueAmount[0]);
    	if(labelValueAmount[0]=="thisYear"){
    		//alert(labelValueAmount[1]);
    		var salesValue="";
    		if(objDataSeriesCustomerValueMonthThisYear[num1]!=0){
    			salesValue=" : "+objDataSeriesCustomerValueMonthThisYear[num1]+"";
    		}
    		$(this).text(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num1++;
    	}
    	if(labelValueAmount[0]=="lastYear"){

    		var salesValue="";
    		if(objDataSeriesCustomerValueMonthLastYear[num2]!=0){
    			salesValue=" : "+objDataSeriesCustomerValueMonthLastYear[num2]+"";
    		}
    		$(this).text(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num2++;
    	}
    	
    	if(labelValueAmount[0]=="target"){

    		var salesValue="";
    		if(objDataSeriesCustomerValueTarget[num3]!=0){
    			salesValue=" : "+objDataSeriesCustomerValueTarget[num3]+"";
    		}
    		$(this).text(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num3++;
    	}
     });
};

//#######################Embed parameter Function start #################
function embedParameterCustomerPerMonth(graphName,paramBranch,paramYear,startWeek,endWeek){
	//alert("hello emped parameter");
	////Embed Default Parameter start
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
						  //graphName,graphType,arIndex,branchId,paramYear,startWeek,endWeek,graphWidth,graphHeight
function customerPerMonthFn(graphName,graphType,arIndex,paramBranch,paramYear,startWeek,endWeek,graphWidth,graphHeight,paramMachine){

	//Embed Default Parameter start

	//alert(endWeekInterval);
	embedParameterCustomerPerMonth(graphName,paramBranch,paramYear,startWeek,endWeek);
	//Embed Default Parameter end

	 $.ajax({
			url:"../Model/SMI_CustomerPerMonth.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramGraphName":graphName,"paramStartWeek":startWeek,"paramEndWeek":endWeek,"paramBranch":paramBranch,"paramYear":paramYear},
			success:function(data){
				//alert(data);
				//("hello jquery");
				
				var categoriesCustomer="";
				var dataSeriesCustomerMonthThisYear="";
				var dataSeriesCustomerMonthLastYear="";
				var dataSeriesCustomerTarget="";
				
				var dataSeriesCustomerValueMonthThisYear="";
				var dataSeriesCustomerValueMonthLastYear="";
				var dataSeriesCustomerValueTarget="";
				var series="";
				
				categoriesCustomer+="[";
				dataSeriesCustomerMonthThisYear+="[";
				dataSeriesCustomerMonthLastYear+="[";
				dataSeriesCustomerTarget+="[";
				
				dataSeriesCustomerValueMonthThisYear+="[";
				dataSeriesCustomerValueMonthLastYear+="[";
				dataSeriesCustomerValueTarget+="[";
				
				$.each(data,function(index,indexEntry){
					var CusType="";
					switch(indexEntry[0]){
					case "D":CusType="Delivery";break;
					case "T":CusType="Take Away";break;
					case "E":CusType="Eat in";break;
					case "Total":CusType="Total";break;
					
					}
					var CustomerMonthThisYear="";
					var CustomerMonthLastYear="";
					var CustomerTarget="";
					
					var CustomerValueMonthThisYear="";
					var CustomerValueMonthLastYear="";
					var CustomerValueTarget="";
					
					
					if(indexEntry[2]==null){
						CustomerMonthThisYear=0;
					}else{
						CustomerMonthThisYear=indexEntry[2];
					}
					//amount
					if(indexEntry[3]==null){
						CustomerMonthLastYear=0;
					}else{
						CustomerMonthLastYear=indexEntry[3];
					}
					
					if(indexEntry[1]==null){
						CustomerTarget=0;
					}else{
						CustomerTarget=indexEntry[1];
					}
					
					//value
					if(indexEntry[5]==null){
						CustomerValueMonthThisYear=0;
					}else{
						CustomerValueMonthThisYear=indexEntry[5];
					}
					
					if(indexEntry[6]==null){
						CustomerValueMonthLastYear=0;
					}else{
						CustomerValueMonthLastYear=indexEntry[6];
					}
					
					if(indexEntry[4]==null){
						CustomerValueTarget=0;
					}else{
						CustomerValueTarget=indexEntry[4];
					}
					
					if(index==0){
						categoriesCustomer+="\""+CusType+"\"";
						dataSeriesCustomerMonthThisYear+="\""+CustomerMonthThisYear+"\"";
						dataSeriesCustomerMonthLastYear+="\""+CustomerMonthLastYear+"\"";
						dataSeriesCustomerTarget+="\""+CustomerTarget+"\"";
						
						dataSeriesCustomerValueMonthThisYear+="\""+CustomerValueMonthThisYear+"\"";
						dataSeriesCustomerValueMonthLastYear+="\""+CustomerValueMonthLastYear+"\"";
						dataSeriesCustomerValueTarget+="\""+CustomerValueTarget+"\"";
						
						
					}else{
						categoriesCustomer+=",\""+CusType+"\"";
						dataSeriesCustomerMonthThisYear+=",\""+CustomerMonthThisYear+"\"";
						dataSeriesCustomerMonthLastYear+=",\""+CustomerMonthLastYear+"\"";
						dataSeriesCustomerTarget+=",\""+CustomerTarget+"\"";
						
						dataSeriesCustomerValueMonthThisYear+=",\""+CustomerValueMonthThisYear+"\"";
						dataSeriesCustomerValueMonthLastYear+=",\""+CustomerValueMonthLastYear+"\"";
						dataSeriesCustomerValueTarget+=",\""+CustomerValueTarget+"\"";
					}
				});
				dataSeriesCustomerMonthThisYear+="]";
				dataSeriesCustomerMonthLastYear+="]";
				dataSeriesCustomerTarget+="]";
				
				dataSeriesCustomerValueMonthThisYear+="]";
				dataSeriesCustomerValueMonthLastYear+="]";
				dataSeriesCustomerValueTarget+="]";
				
				
				categoriesCustomer+="]";

				var objCategoriesCustomer=eval("("+categoriesCustomer+")");
				var objDataSeriesCustomerMonthThisYear=eval("("+dataSeriesCustomerMonthThisYear+")");
				var objDataSeriesCustomerMonthLastYear=eval("("+dataSeriesCustomerMonthLastYear+")");
				var objDataSeriesCustomerTarget=eval("("+dataSeriesCustomerTarget+")");
				
				var objDataSeriesCustomerValueMonthThisYear=eval("("+dataSeriesCustomerValueMonthThisYear+")");
				var objDataSeriesCustomerValueMonthLastYear=eval("("+dataSeriesCustomerValueMonthLastYear+")");
				var objDataSeriesCustomerValueTarget=eval("("+dataSeriesCustomerValueTarget+")");
				
				/*
				console.log("#######################################");
				console.log(objDataSeriesCustomerValueMonthThisYear);
				console.log(objDataSeriesCustomerValueMonthLastYear);
				console.log(objDataSeriesCustomerValueTarget);
				*/

				
				 series=[{
						 name: "Last Year",
				         name2:"lastYear",
				         data: objDataSeriesCustomerMonthLastYear,
				         color: 'orange'
				     }, {
				         //name: ""+startWeek+"-"+endWeek+" ปี"+yyyy+"",
				    	 name: "Current",
				         name2:"thisYear",
				         data: objDataSeriesCustomerMonthThisYear,
				         color: '#007bc3'
				     }, {
				    	 
				         //name: ""+startWeek+"-"+endWeek+" ปี"+(yyyy-1)+"",
				         name: "Target",
			         	 name2:"target",
			         	 data: objDataSeriesCustomerTarget,
			         	color: 'gray'
				     }];
				 /*
				 var startWeekInterval=$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeekInterval").text();
				 var endWeekInterval=$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeekInterval").text();
				 */
				 var titleText="จำนวนลูกค้า(คน)ตั้งแต่"+"W"+startWeek+""+getWeekInterval(paramYear,startWeek)+"-"+"W"+endWeek+""+getWeekInterval(paramYear,endWeek)+"ปี"+paramYear+"";
				 createChart_SMI_CustomerPerMonth(graphName,graphType,series,objCategoriesCustomer,arIndex,graphWidth,graphHeight,titleText,paramMachine,objDataSeriesCustomerValueMonthThisYear,objDataSeriesCustomerValueMonthLastYear,objDataSeriesCustomerValueTarget);
			
			}
		});
		
	};


	//##################################### Set Parameter Here Start ###############################
	var htmlParam_SMI_CusPerMonth = function(graphNameArea){
		
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
			
				htmlParam+="</td>";
				htmlParam+="</tr>";
				
				 htmlParam+="<tr>";
					htmlParam+="<td>";
						htmlParam+="<b>Year</b>";
					htmlParam+="</td>";
					htmlParam+="<td id=\"areaParamYear"+graphNameArea+"\">";
					
		 			htmlParam+="</td>";
		 			
		 		htmlParam+="</tr>";
		 		
		 		htmlParam+="<tr>";
				htmlParam+="<td>";
					htmlParam+="<b>Start Week</b>";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamStartWeek"+graphNameArea+"\">";
				
	 			htmlParam+="</td>";	
	 		htmlParam+="</tr>";
	 		
	 		
	 		
	 		htmlParam+="<tr>";
			htmlParam+="<td>";
				htmlParam+="<b>End Week</b>";
			htmlParam+="</td>";
			htmlParam+="<td id=\"areaParamEndWeek"+graphNameArea+"\">";
			
 			htmlParam+="</td>";
 		htmlParam+="</tr>";

		 	htmlParam+="</table>";
		 	
		 	htmlParam+="</div>";
		 	
		 		htmlParam+="<div class=\"btnArea\">";
		 				htmlParam+="<div class=\"btn\">";
		 					htmlParam+="<button id=\"CusPerMonthSubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"CusPerMonthCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
	
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_CusPerMonth=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#CusPerMonthSubmit"+graphNameArea).die("click");
		$("#CusPerMonthSubmit"+graphNameArea).live("click",function(){
			
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var startWeek=$("#paramStartWeek"+graphNameArea).val();
			var endWeek=$("#paramEndWeek"+graphNameArea).val();
			//Embed Default Parameter start
		
			embedParameterCustomerPerMonth(graphName,paramBranch,paramYear,startWeek,endWeek);
			//Embed Default Parameter end
			//###################Embead parameter to call embed parameter function start##############
			
			//call function create graph for gernarate new graph
			
			customerPerMonthFn(graphName,graphType,arIndex,paramBranch,paramYear,startWeek,endWeek,graphWidth,graphHeight,paramMachine);
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");
			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
		});	
		if(paramMachine=="Tablet"){
		$("#CusPerMonthCancel"+graphNameArea).die("click");
		$("#CusPerMonthCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#CusPerMonthCancel"+graphNameArea).die("click");
		$("#CusPerMonthCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}

	};
	/*####################### config dialog for tablet start ###################*/ 
	var dialogSetParam_CustomerPerMonthFn=function(paramTitleSetting){
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

	 });
	 
	 //using dialog here
	 $( ".areaSettingExternal").dialog( "open" );
	 $(".ui-dialog .ui-dialog-content").css({"padding":"0px"});
	};
	 /*####################### config dialog for tablet end ###################*/ 
	
	
	/*######################## function call parameter start########################*/
	/*
	function getBranch(graphNameArea,branchCode){
		alert("branchCode"+branchCode);
		var branchHtml = "";
		$.ajax({
			url:"../Model/SMI_getBranch.jsp",
			type:"get",
			dataType:"json",
			async:false,
			success:function(data){
				branchHtml+="<select class=\"list\" id=\"paramBranch"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					if(branchCode==indexEntry[0]){
			
					branchHtml+="<option selected value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";
					}else{
					branchHtml+="<option value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";	
					}
				});
				branchHtml+="</select>";
			}
		});
	$("td#areaParamBranch"+graphNameArea).html(branchHtml);
	 $("select#paramBranch"+graphNameArea).kendoDropDownList();
	 
	}
	*/
	/*
	function getYear(graphNameArea,paramYear){
	
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
	
	$("select#paramYear"+graphNameArea).live("change",function(){
		//alert(this.value);
		getParamStartWeek(graphNameArea,this.value);
		getParamEndWeek(graphNameArea,this.value);
		
	});
	
	}
	
	function getParamStartWeek(graphNameArea,paramYear,startWeekSeleted){
		var htmlParam="";
		$.ajax({
			url:"../Model/SMI_ParamWeekInterval.jsp",
			type:"get",
			dataType:"json",
			async:false,
			data:{"paramYear":paramYear},
			success:function(data){
			
				htmlParam+="<select class=\"list\" id=\"paramStartWeek"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					var startWeekNumber=indexEntry[0].substring("1");
					if(startWeekSeleted==startWeekNumber){
					htmlParam+="<option selected value="+startWeekNumber+">"+indexEntry[0]+" "+indexEntry[1]+"</option>"; 
					}else{
					htmlParam+="<option value="+startWeekNumber+">"+indexEntry[0]+" "+indexEntry[1]+"</option>"; 	
					}
				});
				htmlParam+="</select>";
				$("td#areaParamStartWeek"+graphNameArea).html(htmlParam);
				$("select#paramStartWeek"+graphNameArea).kendoDropDownList();
			}
		});
	}
	
	
	
	function getParamEndWeek(graphNameArea,paramYear,endWeekSeleted){
		var htmlParam="";
		$.ajax({
			url:"../Model/SMI_ParamWeek.jsp",
			type:"get",
			dataType:"json",
			async:false,
			data:{"paramYear":paramYear},
			success:function(data){
			
				htmlParam+="<select class=\"list\" id=\"paramEndWeek"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					
					var endWeekNumber=indexEntry[0].substring("1");
					if(endWeekSeleted==endWeekNumber){
					htmlParam+="<option selected value="+endWeekNumber+">("+indexEntry[0]+")"+indexEntry[1]+"</option>"; 
					}else{
					htmlParam+="<option value="+endWeekNumber+">("+indexEntry[0]+")"+indexEntry[1]+"</option>"; 	
					}
				});
				htmlParam+="</select>";
				
				$("td#areaParamEndWeek"+graphNameArea).html(htmlParam);
				$("select#paramEndWeek"+graphNameArea).kendoDropDownList();
			}
		});
	}
	*/
	
	/*######################## function call parameter end########################*/

	
	function manageParamCusPerMonthFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").remove();
				 $("body").append("<div class=\"areaSettingExternal\"></div>");
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_CusPerMonth(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	dialogSetParam_CustomerPerMonthFn("<b>"+graphName+"</b>");
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_CusPerMonth(graphNameArea));
				 $(".setParamForm"+graphNameArea).slideDown();
			 }
			
			 
			 //create button submit
			 //#####################check parameter is selected start#########################
			 getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
			 getYearParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text());
			 getParamStartWeek(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text(),$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeek").text());
			 getParamEndWeek(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text(),$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeek").text());
			 
			 //$("#paramBranch"+graphNameArea).kendoDropDownList();
			 //$("#paramYear"+graphNameArea).kendoDropDownList();
			//######################check parameter is selected end###########################
			 
			 submit_SMI_CusPerMonth(graphNameArea,graphName,'bar',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParam_CustomerPerMonthFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}
	//##################################### Set Parameter Here End ###############################
	
	
	 
	
	 

	 