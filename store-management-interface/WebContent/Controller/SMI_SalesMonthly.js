//click seting
/*###  pieChart hr  Define start ###*/
function templateFormat(value,summ) {
	//alert("call templateFormat");
   //var value1 = Math.floor(value);
   //var value2 = Math.floor((value/summ)*100);
   var htmlData=value+"-"+summ+"%";
   return htmlData;
}
/*### pieChart hr  Defind   end ###*/

			
//$(document).on("click",".setting",function(){
//call SMI_SalePerMonth (  '2012-01-01' , '2012-03-31' , '322000' )
function createChartSMI_SalePerMonthMTD(graphName,graphType,graphSeries,graphCategory,arIndex,paramGraphWidth,paramGraphHeight,currentMTD,paramMachine,objDataDiffSalesMonthlyMTD) {

	var chartWidth="";
	var chartHeight="";
	var titleFont="";
	var legendFont="";
	var valueAxisFont="";
	var cateFont="";
	if(paramMachine=="Tablet"){
		//graphWidth=(paramGraphWidth/2);
		
		chartWidth=(paramGraphWidth/2);
		chartHeight=paramGraphHeight-((paramGraphHeight*5)/100);
		//alert(chartWidth);
		//alert(chartHeight);
		
		titleFont="20px Tahoma";
		legendFont="16px Tahoma";
		valueAxisFont="16px Tahoma";
		seriesFont="16px Tahoma";
		cateFont="16px Tahoma";
		
		
		
	}else{
		chartWidth=320;
		chartHeight=230;
		titleFont="13px Tahoma";
		legendFont="13px Tahoma";
		valueAxisFont="13px Tahoma";
		seriesFont="10px Tahoma";
		cateFont="10px Tahoma";
	}
	//alert(graphName);
	 $("#chartMTD"+graphName+"-"+arIndex).kendoChart({
		 theme: $(document).data("kendoSkin") || "silver",
		  chartArea: {
			    width: chartWidth,
			    height:(chartHeight-20),
			    background: ""
			  },
	     title: {
	         text: currentMTD,
	         visible:true,
	         font: titleFont
	     },
	     
	     
	     legend: {
	         visible: false,
	           position:"bottom",
	           font:legendFont	   
	     },
	     
	     seriesDefaults: {
	         type: "bar",
	       //value default show value on bar chart 
	         labels: {
                 visible: true,
                 template: "#= series.name #: #=value #",
                 //template: "#= templateFormat(value,series.data2) #",
                 font:seriesFont,
                 background: "transparent",
                 rotation : 0
             }
	         
	     },
	     
	     series:graphSeries,
	     
	     
	     /*
	     series: [{
	         name: "Total Visits",
	         data: [56000, 63000, 74000, 91000]
	     }],
	     */
	     
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
	         //categories: ["Jan", "Feb", "Mar", "Apr"],
	         majorGridLines: {
	             visible: true
	         },
	         labels: {
	             font: cateFont,
	        	  rotation : -20
	          }
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= kendo.format('{0:N0}', value)#"
	         //template: "#= templateFormat(value,100000) #"
	         }
	     });
	 
	 /*
	 var chart = $("#chartMTD"+graphName+"-"+arIndex).data("kendoChart"),
     firstSeries = chart.options.series;
     firstSeries[0].gap = 0.1;
     chart.redraw();
     firstSeries[0].spacing =0.1;
     chart.redraw();
     */
     
     var num=0;
     //console.log($("#chartMTDSalePerMonth-1 svg text"));
     $(""+"#chartMTD"+graphName+"-"+arIndex+">svg>text").each(function(){
    	//alert($(this).text());
    	var labelValue = $(this).text();
    	var labelValueMTD = labelValue.split(":");
    	//alert(labelValueMTD[0]);
    	//alert(objDataDiffSalesMonthlyMTD[0]);
    	if(labelValueMTD[0]=="MTD"){
    		//alert("Num"+num);
    		var diffPercentage="";
    		if(objDataDiffSalesMonthlyMTD[num]!=0){
    			if(objDataDiffSalesMonthlyMTD[num]){
    			diffPercentage=":"+objDataDiffSalesMonthlyMTD[num]+"%";
    			}
    			}
    		$(this).text(""+addCommas(labelValueMTD[1])+""+diffPercentage+"");
    		num++;
    	}
     });
     console.log("-----------------------------");
     $(""+"#chartMTD"+graphName+"-"+arIndex+">svg").css({"width":(chartWidth+30)+"px"});
     
   
     
     $(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(0)").children("path:eq(0)").attr({"fill":"orange" ,"stroke-opacity":"1" ,"fill-opacity":"1" ,"stroke-linejoin":"round" ,"stroke-linecap":"square" ,"stroke-width":"1","stroke":"#cc8400"});
     $(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(0)").children("path:eq(1)").attr({"stroke":"#cc8400"});
     
     
     //$(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(0)").children("path:eq(0)").attr({"fill":"orange","stroke":"orange"});
     //$(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(0)").children("path:eq(1)").attr({"fill":"orange","stroke":"orange"});
     
     $(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(1)").children("path:eq(0)").attr({"fill":"#007bc3","stroke":"#007bc3"});
     $(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(1)").children("path:eq(1)").attr({"stroke":"#007bc3"});
     
     $(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(2)").children("path:eq(0)").attr({"fill":"gray","stroke":"gray"});
     $(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(2)").children("path:eq(1)").attr({"stroke":"#666666"});
     
     $(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(3)").children("path:eq(0)").attr({"fill":"#cccccc","stroke":"#cccccc"});
     $(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(3)").children("path:eq(1)").attr({"stroke":"#cccccc"});
     


};


function createChartSMI_SalePerMonthYTD(graphName,graphType,graphSeries,graphCategory,arIndex,paramGraphWidth,paramGraphHeight,currentYTD,paramMachine,objDataDiffSalesMonthlyYTD) {
	var chartWidth="";
	var chartHeight="";
	var titleFont="";
	var legendFont="";
	var valueAxisFont="";
	var cateFont="";
	var fontLegend="";
	if(paramMachine=="Tablet"){
		
		
		chartWidth=(paramGraphWidth/2);
		chartHeight=paramGraphHeight-((paramGraphHeight*5)/100);
		
		/*
		chartWidth=460;
		chartHeight=350;
		*/
		titleFont="20px Tahoma";
		legendFont="16px Tahoma";
		valueAxisFont="16px Tahoma";
		seriesFont="16px Tahoma";
		cateFont="16px Tahoma";
		fontLegend="10px Tahoma";
		
	}else{
		chartWidth=340;
		chartHeight=230;
		titleFont="13px Tahoma";
		legendFont="13px Tahoma";
		valueAxisFont="13px Tahoma";
		seriesFont="10px Tahoma";
		cateFont="10px Tahoma";
		fontLegend="13px Tahoma";
	}
	//alert(graphName);

	/*
	alert(graphName);
	alert(graphType);
	alert(graphSeries);
	alert(graphCategory);
	*/
	
	 
	 $("#chartYTD"+graphName+"-"+arIndex).kendoChart({
		 theme: $(document).data("kendoSkin") || "silver",
		  chartArea: {
			    width: chartWidth,
			    height:(chartHeight-20),
			    background: ""
			  },
	     title: {
	         text: "(หน่วย:พันบาท) ยอดขายสะสม "+currentYTD+"(YTD)",
	         visible:true,
	         font: titleFont
	     },
	     
	     
	     legend: {
	         visible: false,
	           position:"bottom",
	           font:legendFont
	     },
	     
	     seriesDefaults: {
	         type: "bar",
	         //value default show value on bar chart 
	         labels: {
                 visible: true,
                 template: "#= series.name #: #=value #",
                 //template: "#= templateFormat(value,series.data2) #",
                 font:seriesFont,
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
	         //max: 140000,
	    	 labels: {
                 template: "#= kendo.format('{0:N0}', value) #  ",
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
	         /*
	    	 categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	         majorGridLines: {
	             visible: true
	         },
	         */
	         labels: {
	             font: cateFont,
	        	  rotation : -20
	          }
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= kendo.format('{0:N0}', value)#"
	         }
	     });
	 
	 //set fontLegend
	 $(".fontLegend").css({"font-size":fontLegend+"px"});
	 
	 /*
	 //set barChart
	 var chart = $("#chartYTD"+graphName+"-"+arIndex).data("kendoChart"),
     firstSeries = chart.options.series;
     firstSeries[0].gap = 0.1;
     chart.redraw();
     firstSeries[0].spacing =0.1;
     chart.redraw();
     */
     
     var num=0;
     //console.log($("#chartMTDSalePerMonth-1 svg text"));
     $(""+"#chartYTD"+graphName+"-"+arIndex+">svg>text").each(function(){
    	//alert($(this).text());
    	var labelValue = $(this).text();
    	var labelValueYTD = labelValue.split(":");
    	//alert(labelValueMTD[0]);
    	//alert(objDataDiffSalesMonthlyMTD[0]);
    	if(labelValueYTD[0]=="YTD"){
    		//alert("Num"+num);
    		var diffPercentage="";
    		if(objDataDiffSalesMonthlyYTD[num]!=0){
    			diffPercentage=":"+objDataDiffSalesMonthlyYTD[num]+"%";
    		}
    		$(this).text(""+addCommas(labelValueYTD[1])+""+diffPercentage+"");
    		num++;
    	}
     });
     
     $(""+"#chartYTD"+graphName+"-"+arIndex+">svg").css({"width":(chartWidth+30)+"px"});

     
     $(""+"#chartYTD"+graphName+"-"+arIndex+" svg g:eq(0)").children("path:eq(0)").attr({"fill":"orange" ,"stroke-opacity":"1" ,"fill-opacity":"1" ,"stroke-linejoin":"round" ,"stroke-linecap":"square" ,"stroke-width":"1","stroke":"#cc8400"});
     $(""+"#chartYTD"+graphName+"-"+arIndex+" svg g:eq(0)").children("path:eq(1)").attr({"stroke":"#cc8400"});
     
     
     //$(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(0)").children("path:eq(0)").attr({"fill":"orange","stroke":"orange"});
     //$(""+"#chartMTD"+graphName+"-"+arIndex+" svg g:eq(0)").children("path:eq(1)").attr({"fill":"orange","stroke":"orange"});
     
     $(""+"#chartYTD"+graphName+"-"+arIndex+" svg g:eq(1)").children("path:eq(0)").attr({"fill":"#007bc3","stroke":"#007bc3"});
     $(""+"#chartYTD"+graphName+"-"+arIndex+" svg g:eq(1)").children("path:eq(1)").attr({"stroke":"#007bc3"});
     
     $(""+"#chartYTD"+graphName+"-"+arIndex+" svg g:eq(2)").children("path:eq(0)").attr({"fill":"gray","stroke":"gray"});
     $(""+"#chartYTD"+graphName+"-"+arIndex+" svg g:eq(2)").children("path:eq(1)").attr({"stroke":"#666666"});
     
     $(""+"#chartYTD"+graphName+"-"+arIndex+" svg g:eq(3)").children("path:eq(0)").attr({"fill":"#cccccc","stroke":"#cccccc"});
     $(""+"#chartYTD"+graphName+"-"+arIndex+" svg g:eq(3)").children("path:eq(1)").attr({"stroke":"#cccccc"});
     
     
    
};


function salePerMonthFn(graphName,graphType,arIndex,currentDate,brach,graphWidth,graphHeight,paramMachine){
	
	//call SalesMonthlyMTD
	/*
	alert(graphWidth);
	alert(graphHeight);
	alert(paramMachine);
	*/
	//alert(currentDate);
	//#########################set embed parameter for embed default parameter start########################
	embedParameterSalesMonthly(graphName,brach,currentDate);
	//#########################set embed parameter for embed default parameter end########################
	
	 $.ajax({
			url:"../Model/SMI_SalePerMonth.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"ParamSalePerMonthType":"salePerMonthTypeMTD","paramDate":currentDate,"paramBranch":brach},
			success:function(data){
				
				// categories: ["Jan", "Feb", "Mar", "Apr"],
				var categories="";
				var dataSeriesSalesMonthlyMTD="";
				var dataDiffSalesMonthlyMTD="";
				var series="";

				var today = new Date(currentDate);
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear()+"";
				var yy=yyyy.substring("2");
				
				
				//alert(mm);
				//alert(getMonthName(mm));
				var lastPeriod=(parseInt(data[0][0]/1000));
				var current=(parseInt(data[0][1]/1000));
				var targetMTD=(parseInt(data[0][2]/1000));
				var targetFullMTD=(parseInt(data[0][3]/1000));				
				
				//categories+="[\""+getMonthName(mm)+" "+(yy-1)+"\",\""+getMonthName(mm)+" "+yy+"\",\"Target MTD "+getMonthName(mm)+" "+yy+"\",\"Target "+getMonthName(mm)+" "+yy+"\"]";	
				categories+="[\"\",\"\",\"\",\"\"]";	
				dataSeriesSalesMonthlyMTD+="["+lastPeriod+","+current+","+targetMTD+","+targetFullMTD+"]";
				dataDiffSalesMonthlyMTD+="[0,"+data[0][4]+","+data[0][5]+","+data[0][6]+"]";
				var objCategories=eval("("+categories+")");
				var objDataSeriesSalesMonthlyMTD=eval("("+dataSeriesSalesMonthlyMTD+")");
				var objDataDiffSalesMonthlyMTD=eval("("+dataDiffSalesMonthlyMTD+")");
								
				console.log(objDataSeriesSalesMonthlyMTD);
				
				 series=[{
			         	 name: "MTD",
			         	 data: objDataSeriesSalesMonthlyMTD
			         	 
			         	 
				     }];
				 
				 //set legend SaleMonthly MTD start here..
				 $("#lastYearMTD").html(""+getMonthName(mm)+" "+(yy-1)+"");
				 $("#currentYearMTD").html(""+getMonthName(mm)+" "+yy+"");
				 $("#planMTD").html("Target MTD "+getMonthName(mm)+" "+yy+"");
				 $("#planMTDFull").html("Target "+getMonthName(mm)+" "+yy+"");
				 //set legend SaleMonthly MTD end here
				 //เป็น ยอดขาย 1-18 Aug 2013
				 var titieText="(หน่วย:พันบาท)ยอดขาย 1-"+dd+" "+getMonthName(mm)+" "+yyyy;
				 createChartSMI_SalePerMonthMTD(graphName,graphType,series,objCategories,arIndex,graphWidth,graphHeight,titieText,paramMachine,objDataDiffSalesMonthlyMTD);
				
			}
			
		});
	 
	//call SalesMonthlyYTD
	 $.ajax({
			url:"../Model/SMI_SalePerMonth.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"ParamSalePerMonthType":"salePerMonthTypeYTD","paramDate":currentDate,"paramBranch":brach},
			success:function(data){
				//alert(data);
				// categories: ["Jan", "Feb", "Mar", "Apr"],
				var categories="";
				var dataSeriesSalesMonthlyYTD="";
				var dataDiffSalesMonthlyYTD="";
				var series="";

				 var today = new Date(currentDate);
				 var mm = today.getMonth()+1; //January is 0!
				 var yyyy = today.getFullYear()+"";
				 var yy=yyyy.substring("2");
				 
				 var lastPeriod=(parseInt(data[0][0]/1000));
				 var current=(parseInt(data[0][1]/1000));
				 var targetYTD=(parseInt(data[0][2]/1000));
				 var targetFullYTD=(parseInt(data[0][3]/1000));	
	
				 
				//categories+="[\"Jan-"+getMonthName(mm)+" "+(yy-1)+"\",\"Jan-"+getMonthName(mm)+" "+yy+"\",\"Target YTD Jan-"+getMonthName(mm)+" "+yy+"\",\"Target Yearly\"]";	
				categories+="[\"\",\"\",\"\",\"\"]";
				dataSeriesSalesMonthlyYTD+="["+lastPeriod+","+current+","+targetYTD+","+targetFullYTD+"]";
				dataDiffSalesMonthlyYTD+="[0,"+data[0][4]+","+data[0][5]+","+data[0][6]+"]";
				var objCategories=eval("("+categories+")");
				var objDataSeriesSalesMonthlyYTD=eval("("+dataSeriesSalesMonthlyYTD+")");
				var objDataDiffSalesMonthlyYTD=eval("("+dataDiffSalesMonthlyYTD+")");
								
				console.log(objDataSeriesSalesMonthlyYTD);
				
				 series=[{
			         	 name: "YTD",
			         	 data: objDataSeriesSalesMonthlyYTD
				     }];
				 
				
				 var selectDate = new Date(currentDate);
				 var selectYYYY = selectDate.getFullYear();
				 var selectMM = selectDate.getMonth()+1; //January is 0!
				 
				//set legend SaleMonthly YTD start here..
				 $("#lastYearYTD").html("Jan-"+getMonthName(mm)+" "+(yy-1)+"");
				 $("#currentYearYTD").html("Jan-"+getMonthName(mm)+" "+yy+"");
				 $("#planYTD").html("Target YTD Jan-"+getMonthName(mm)+" "+yy+"");
				 $("#planYTDFull").html("Target Yearly");
				 //set legend SaleMonthly YTD end here
				 
				 
				 createChartSMI_SalePerMonthYTD(graphName,graphType,series,objCategories,arIndex,graphWidth,graphHeight,""+getMonthName(selectMM)+" "+selectYYYY,paramMachine,objDataDiffSalesMonthlyYTD);
				
			}
			
		});
	};

	
	
	//##################################### Set Parameter Here Start ###############################
	var htmlParam_SMI_SalePerMonth = function(graphNameArea,paramMachine){
		
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
						htmlParam+="<b>Date</b>";
					htmlParam+="</td>";
					htmlParam+="<td id=\"areaParamStartDate"+graphNameArea+"\">";
						//htmlParam+="<input type=\"text\"  "+readonly+" name=\"paramDate"+graphNameArea+"\" id=\"paramDate"+graphNameArea+"\" class=\"date\">";
		 			htmlParam+="</td>";
		 		htmlParam+="</tr>";

		 	htmlParam+="</table>";
		 	
		 	htmlParam+="</div>";
		 	
		 		htmlParam+="<div class=\"btnArea\">";
		 				htmlParam+="<div class=\"btn\">";
		 					htmlParam+="<button id=\"SalePerMonthSubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"SalePerMonthCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_SalePerMonth=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		//SalePerMonthSubmitareaSalePerMonth-0
		
		$("#SalePerMonthSubmit"+graphNameArea).die("click");
		$("#SalePerMonthSubmit"+graphNameArea).live("click",function(){
			
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramDate=$("#paramStartDate"+graphNameArea).val();
			
			embedParameterTop10Food(graphName,paramBranch,paramDate);
			//###################Embead parameter to call embed parameter function start##############
			
			
			 		  
			salePerMonthFn(graphName,graphType,arIndex,paramDate,paramBranch,graphWidth,graphHeight,paramMachine);
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");

			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
			
		});
		
		if(paramMachine=="Tablet"){
		$("#SalePerMonthCancel"+graphNameArea).die("click");
		$("#SalePerMonthCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#SalePerMonthCancel"+graphNameArea).die("click");
		$("#SalePerMonthCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}
		
		
	};
	/*####################### config dialog for tablet start ###################*/ 
	var dialogSetParam_SMI_SalesMonthlyFn=function(paramTitleSetting){
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
		 width: 440,//+90
		 height:250,//+20
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

	
	function getBranch(graphNameArea,branchCode){
		//alert("branchCode"+branchCode);
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
						//alert(branchCode==indexEntry[0]);
					branchHtml+="<option selected value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";
					}else{
					branchHtml+="<option value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";	
					}
				});
				branchHtml+="</select>";
			}
		});
	$("td#areaParamBranch"+graphNameArea).html(branchHtml);
	}	
	
	
	
	//#######################Embed parameter Function start #################
	function embedParameterSalesMonthly(graphName,paramBranch,paramDate){

		var paramDefaultEmbedHtml="" +
		"<ul style=\"display:none\" class=\"paramDefaultEmbed"+graphName+"\">"+graphName+"" +
			"<li class=\"paramBranch\">"+paramBranch+"</li>" +
			"<li class=\"paramStartDate\">"+paramDate+"</li>" +
		
		"</ul>";

		$(".paramDefaultEmbed"+graphName).remove();
		$("body").append(paramDefaultEmbedHtml);
		//Embed Default Parameter end
	}
	//#######################Embed parameter Function end #################
	
	
	function manageParamSalePerMonthFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		
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
				 $(".areaSettingExternal").remove();
				 $("body").append("<div class=\"areaSettingExternal\"></div>");
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_SalePerMonth(graphNameArea,paramMachine));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	dialogSetParam_SMI_SalesMonthlyFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_SalePerMonth(graphNameArea));
				 $(".setParamForm"+graphNameArea).slideDown();
				 
			 }
			
			 
			//#####################check parameter is selected start#########################
				getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
				getStartDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text(),paramMachine);
			//######################check parameter is selected end###########################
			
			 
			 
			 submit_SMI_SalePerMonth(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParam_SMI_SalesMonthlyFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}

	//##################################### Set Parameter Here End ###############################

	 
	
	
	 
	
	 

	 