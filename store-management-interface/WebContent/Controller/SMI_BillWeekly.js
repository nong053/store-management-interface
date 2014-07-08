//click seting
//$(document).on("click",".setting",function(){

function createChart_SMI_BillWeekly(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,titleText,
		 objdataSeriesBillWeeklyValueThisYear,objDataSeriesBillWeeklyValueLastYear,objDataSeriesBillWeeklyValueTarget) {

	/*
	alert(graphName);
	alert(graphType);
	alert(graphSeries);
	alert(graphCategory);
	*/
	
	 $("#chart"+graphName+"-"+arIndex).kendoChart({
		 theme: $(document).data("kendoSkin") || "silver",
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
	           position:"right",
	           labels: {
	        	      font:legendFont
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
	             font: categoryAxisFont,
	             
	        	 // rotation : -50
	          }
	          
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= value #",
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

    	if(labelValueAmount[0]=="thisYear"){

    		var salesValue="";
    		if(objdataSeriesBillWeeklyValueThisYear[num1]!=0){
    			salesValue=" : "+objdataSeriesBillWeeklyValueThisYear[num1]+" บาท";
    		}
    		$(this).text(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num1++;
    	}
    	if(labelValueAmount[0]=="lastYear"){

    		var salesValue="";
    		if(objDataSeriesBillWeeklyValueLastYear[num2]!=0){
    			salesValue=" : "+objDataSeriesBillWeeklyValueLastYear[num2]+" บาท";
    		}
    		$(this).text(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num2++;
    	}
    	
    	if(labelValueAmount[0]=="target"){

    		var salesValue="";
    		if(objDataSeriesBillWeeklyValueTarget[num3]!=0){
    			salesValue=" : "+objDataSeriesBillWeeklyValueTarget[num3]+" บาท";
    		}
    		$(this).text(""+addCommas(labelValueAmount[1])+""+addCommas(salesValue)+"");
    		num3++;
    	}
     });
     
};



//Embed parameter function start
function embedParameter_SMI_BillWeekly(graphName,paramBranch,paramYear,startWeek,endWeek){
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
//Embed parameter function end

function BillWeeklyFn(graphName,graphType,arIndex,paramBranch,paramYear,startWeek,endWeek,graphWidth,graphHeight){
	
	//Embed Default Parameter start
	
	embedParameter_SMI_BillWeekly(graphName,paramBranch,paramYear,startWeek,endWeek);
	//Embed Default Parameter end
	
	 $.ajax({
			url:"../Model/SMI_BillWeekly.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramGraphName":graphName,"paramStartWeek":startWeek,"paramEndWeek":endWeek,"paramBranch":paramBranch,"paramYear":paramYear},
			success:function(data){
				//alert(data);
				//("hello jquery");
				
				var categoriesBillWeekly="";
				var dataSeriesBillWeeklyThisYear="";
				var dataSeriesBillWeeklyLastYear="";
				var dataSeriesBillWeeklyTarget="";
				
				var dataSeriesBillWeeklyValueThisYear="";
				var dataSeriesBillWeeklyValueLastYear="";
				var dataSeriesBillWeeklyValueTarget="";
				
				var series="";
				
				categoriesBillWeekly+="[";
				dataSeriesBillWeeklyThisYear+="[";
				dataSeriesBillWeeklyLastYear+="[";
				dataSeriesBillWeeklyTarget+="[";
				
				dataSeriesBillWeeklyValueThisYear+="[";
				dataSeriesBillWeeklyValueLastYear+="[";
				dataSeriesBillWeeklyValueTarget+="[";
				
				$.each(data,function(index,indexEntry){
					var BillType="";
					switch(indexEntry[0]){
					case "D":BillType="Delivery";break;
					case "T":BillType="Take Away";break;
					case "E":BillType="Eat in";break;
					case "Total":BillType="Total";break;
					
					}
					
					var BillWeeklyThisYear="";
					var BillWeeklyLastYear="";
					var BillWeeklyTarget="";
					
					var BillWeeklyValueThisYear="";
					var BillWeeklyValueLastYear="";
					var BillWeeklyValueTarget="";
					
					if(indexEntry[2]==null){
						BillWeeklyThisYear=0;
					}else{
						BillWeeklyThisYear=parseFloat(indexEntry[2]).toFixed(0);
					}
					//sorting target,current,lastYear
					//Amount
					if(indexEntry[3]==null){
						BillWeeklyLastYear=0;
					}else{
						BillWeeklyLastYear=parseFloat(indexEntry[3]).toFixed(0);
					}
					
					if(indexEntry[1]==null){
						BillWeeklyTarget=0;
					}else{
						BillWeeklyTarget=parseFloat(indexEntry[1]).toFixed(0);
					}
					
					//Value
					if(indexEntry[5]==null){
						BillWeeklyValueThisYear=0;
					}else{
						BillWeeklyValueThisYear=parseFloat(indexEntry[5]).toFixed(0);
					}
					
					if(indexEntry[6]==null){
						BillWeeklyValueLastYear=0;
					}else{
						BillWeeklyValueLastYear=parseFloat(indexEntry[6]).toFixed(0);
					}
					
					if(indexEntry[4]==null){
						BillWeeklyValueTarget=0;
					}else{
						BillWeeklyValueTarget=parseFloat(indexEntry[4]).toFixed(0);
					}
					
					
					if(index==0){
						categoriesBillWeekly+="\""+BillType+"\"";
						dataSeriesBillWeeklyThisYear+="\""+BillWeeklyThisYear+"\"";
						dataSeriesBillWeeklyLastYear+="\""+BillWeeklyLastYear+"\"";
						dataSeriesBillWeeklyTarget+="\""+BillWeeklyTarget+"\"";
						
						dataSeriesBillWeeklyValueThisYear+="\""+BillWeeklyValueThisYear+"\"";
						dataSeriesBillWeeklyValueLastYear+="\""+BillWeeklyValueLastYear+"\"";
						dataSeriesBillWeeklyValueTarget+="\""+BillWeeklyValueTarget+"\"";
						
					}else{
						categoriesBillWeekly+=",\""+BillType+"\"";
						dataSeriesBillWeeklyThisYear+=",\""+BillWeeklyThisYear+"\"";
						dataSeriesBillWeeklyLastYear+=",\""+BillWeeklyLastYear+"\"";
						dataSeriesBillWeeklyTarget+=",\""+BillWeeklyTarget+"\"";
						
						dataSeriesBillWeeklyValueThisYear+=",\""+BillWeeklyValueThisYear+"\"";
						dataSeriesBillWeeklyValueLastYear+=",\""+BillWeeklyValueLastYear+"\"";
						dataSeriesBillWeeklyValueTarget+=",\""+BillWeeklyValueTarget+"\"";
					}
					
					//alert(indexEntry[0]);
					console.log(indexEntry[1]);
					console.log(indexEntry[2]);
					console.log(indexEntry[3]);
					console.log("============");
					
					
					
					
					
				});
				dataSeriesBillWeeklyThisYear+="]";
				dataSeriesBillWeeklyLastYear+="]";
				dataSeriesBillWeeklyTarget+="]";
				
				dataSeriesBillWeeklyValueThisYear+="]";
				dataSeriesBillWeeklyValueLastYear+="]";
				dataSeriesBillWeeklyValueTarget+="]";
				
				
				categoriesBillWeekly+="]";
				
				/*
				alert(categoriesBillWeekly);
				alert(dataSeriesBillWeeklyThisYear);
				alert(dataSeriesBillWeeklyLastYear);
				alert(objDataSeriesBillWeeklyTarget);
				*/
				var objcategoriesBillWeekly=eval("("+categoriesBillWeekly+")");
				var objdataSeriesBillWeeklyThisYear=eval("("+dataSeriesBillWeeklyThisYear+")");
				var objDataSeriesBillWeeklyLastYear=eval("("+dataSeriesBillWeeklyLastYear+")");
				var objDataSeriesBillWeeklyTarget=eval("("+dataSeriesBillWeeklyTarget+")");
				
				var objdataSeriesBillWeeklyValueThisYear=eval("("+dataSeriesBillWeeklyValueThisYear+")");
				var objDataSeriesBillWeeklyValueLastYear=eval("("+dataSeriesBillWeeklyValueLastYear+")");
				var objDataSeriesBillWeeklyValueTarget=eval("("+dataSeriesBillWeeklyValueTarget+")");
				
				console.log(objdataSeriesBillWeeklyThisYear);
				console.log(objDataSeriesBillWeeklyLastYear);
				console.log(objDataSeriesBillWeeklyTarget);
				
				
				
				 series=[{
						 //name: ""+startWeek+"-"+endWeek+" ปี"+(yyyy-1)+"",
				    	 name: paramYear-1,
				         name2: "lastYear",
				         data: objDataSeriesBillWeeklyLastYear,
				         color: 'orange'
				     }, {
				         //name: ""+startWeek+"-"+endWeek+" ปี"+yyyy+"",
				    	 name: paramYear,
				         name2: "thisYear",
				         data: objdataSeriesBillWeeklyThisYear,
				         color: '#007bc3'
				     }, {
				        
				       //Target,Current,Last Year
			         	 name: "Target",
			         	 name2: "target",
			         	 data: objDataSeriesBillWeeklyTarget,
			         	 color: 'gray'
				     }];
				// alert(series);
				
				//var objSeries=eval("("+series+")");
				//console.log(objCategories);
				//console.log(series);
				 /*
				 var startWeekInterval=$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeekInterval").text();
				 var endWeekInterval=$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeekInterval").text();
				 */
				 var titleText="จำนวนบิลตามประเภทการขาย"+"W"+startWeek+""+getWeekInterval(paramYear,startWeek)+"-"+"W"+endWeek+""+getWeekInterval(paramYear,endWeek)+"ปี"+paramYear+"";
				 createChart_SMI_BillWeekly(graphName,graphType,series,objcategoriesBillWeekly,arIndex,graphWidth,graphHeight,titleText,
						 objdataSeriesBillWeeklyValueThisYear,objDataSeriesBillWeeklyValueLastYear,objDataSeriesBillWeeklyValueTarget);
			
			}
		});
		
	};


	//##################################### Set Parameter Here Start ###############################
	
	
	//Call Parameter
	/*
	$.ajax({
		url:"../Model/SMI_ParamYear.jsp",
		type:"get",
		dataType:"json",
		success:function(data){
			alert(data);
		}
	});
	*/
	//alert("hello world");
	
	var htmlParam_SMI_BillWeekly = function(graphNameArea){
		
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
		 			htmlParam+="</td>";
		 			*/
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
		 					htmlParam+="<button id=\"BillWeeklySubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"BillWeeklyCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_BillWeekly=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#BillWeeklySubmit"+graphNameArea).die("click");
		$("#BillWeeklySubmit"+graphNameArea).live("click",function(){
			
			
			
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var startWeek=$("#paramStartWeek"+graphNameArea).val();
			var endWeek=$("#paramEndWeek"+graphNameArea).val();
			//Embed Default Parameter start
		
			embedParameter_SMI_BillWeekly(graphName,paramBranch,paramYear,startWeek,endWeek);
			//Embed Default Parameter end
			//###################Embead parameter to call embed parameter function start##############
			
			if(startWeek <= endWeek){
							//graphName,graphType,arIndex,paramBranch,paramYear,startWeek,endWeek,graphWidth,graphHeight
				BillWeeklyFn(graphName,graphType,arIndex,paramBranch,paramYear,startWeek,endWeek,graphWidth,graphHeight);
				if(paramMachine=="Tablet"){
					$(".ui-icon-closethick").trigger("click");
	
				}else{
					$("#setting"+graphNameArea).trigger("click");
				}
			}else{
				alert("เลือกช่วงสัปดาห์ไม่ถูกต้อง");
			}
		});
		
		if(paramMachine=="Tablet"){
		$("#BillWeeklyCancel"+graphNameArea).die("click");
		$("#BillWeeklyCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#BillWeeklyCancel"+graphNameArea).die("click");
		$("#BillWeeklyCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}
		
		
	};
	/*####################### config dialog for tablet start ###################*/ 
	var dialogSetParam_SMI_BillWeeklyFn=function(paramTitleSetting){
	//config dialog here
	 $(".areaSettingExternal").dialog({
		 title:"<b>"+paramTitleSetting+"-Setting</b>",
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
	/*
	function getBranchParameter(graphNameArea,branchCode){
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
	*/
	/*######################## function call parameter start########################*/
	/*
	function getBranchParameter(graphNameArea,branchCode){
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
	
	
	$("select#paramYear"+graphNameArea).live("change",function(){
		//alert(this.value);
		getParamStartWeek(graphNameArea,this.value);
		getParamEndWeek(graphNameArea,this.value);
		
	});
	
	}
*/
	/*
	function getParamStartWeek(graphNameArea,paramYear,startWeekSeleted){
		var htmlParam="";
		$.ajax({
			url:"../Model/SMI_ParamWeek.jsp",
			type:"get",
			dataType:"json",
			async:false,
			data:{"paramYear":paramYear},
			success:function(data){
			
				htmlParam+="<select class=\"list\" id=\"paramStartWeek"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					var startWeekNumber=indexEntry[0].substring("1");
					if(startWeekSeleted==startWeekNumber){
					htmlParam+="<option selected value="+startWeekNumber+">("+indexEntry[0]+")"+indexEntry[1]+"</option>"; 
					}else{
					htmlParam+="<option value="+startWeekNumber+">("+indexEntry[0]+")"+indexEntry[1]+"</option>"; 	
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
	
	
	function manageParamBillWeeklyFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		 //alert("hello jquery");
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").remove();
				 $("body").append("<div class=\"areaSettingExternal\"></div>");
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_BillWeekly(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	dialogSetParam_SMI_BillWeeklyFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_BillWeekly(graphNameArea));
				 $(".setParamForm"+graphNameArea).slideDown();
			 }
			
			 $(".date").datepicker();
			 $(".date").datepicker("option", "dateFormat", "yy-mm-dd");
			 $("#paramBranch"+graphNameArea).kendoDropDownList();
			 
			 //create button submit

			 getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
			 getYearParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text());
			 getParamStartWeek(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text(),$("ul.paramDefaultEmbed"+graphName+">li.paramStartWeek").text());
			 getParamEndWeek(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text(),$("ul.paramDefaultEmbed"+graphName+">li.paramEndWeek").text());
			 
			 //$("#paramBranch"+graphNameArea).kendoDropDownList();
			 //$("#paramYear"+graphNameArea).kendoDropDownList();
			
			//########################### function call embed parameter function end########################
			 
			 submit_SMI_BillWeekly(graphNameArea,graphName,'bar',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParam_SMI_BillWeeklyFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}
	
	
	//##################################### Set Parameter Here End ###############################	
	
	
	 
	
	 

	 