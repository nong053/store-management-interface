//###################create function call parameter such as getBranch,getYear start##########################
function getBranchParam_SMI_SalesByPromotionMonthly(graphNameArea,branchCode){
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
$("select#paramBranch"+graphNameArea).kendoDropDownList();

$("select#paramBranch"+graphNameArea).die("change");
$("select#paramBranch"+graphNameArea).live("change",function(){

		getParamPromotion1(graphNameArea,this.value,$("#paramYear"+graphNameArea).val(),$("#paramMonth"+graphNameArea).val());
		getParamPromotion2(graphNameArea,this.value,$("#paramYear"+graphNameArea).val(),$("#paramMonth"+graphNameArea).val());
		getParamPromotion3(graphNameArea,this.value,$("#paramYear"+graphNameArea).val(),$("#paramMonth"+graphNameArea).val());
		getParamPromotion4(graphNameArea,this.value,$("#paramYear"+graphNameArea).val(),$("#paramMonth"+graphNameArea).val());
		getParamPromotion5(graphNameArea,this.value,$("#paramYear"+graphNameArea).val(),$("#paramMonth"+graphNameArea).val());
		getParamPromotion6(graphNameArea,this.value,$("#paramYear"+graphNameArea).val(),$("#paramMonth"+graphNameArea).val());
		
});

}


function getYearParam_SMI_SalesByPromotionMonthly(graphNameArea,paramYear){
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
/*
	alert("year="+this.value);
	alert("graphName="+graphNameArea);
	alert("branch="+$("#paramBranch"+graphNameArea).val());
	alert("month="+$("#paramMonth"+graphNameArea).val());
*/
	getParamPromotion1(graphNameArea,$("#paramBranch"+graphNameArea).val(),this.value,$("#paramMonth"+graphNameArea).val());
	getParamPromotion2(graphNameArea,$("#paramBranch"+graphNameArea).val(),this.value,$("#paramMonth"+graphNameArea).val());
	getParamPromotion3(graphNameArea,$("#paramBranch"+graphNameArea).val(),this.value,$("#paramMonth"+graphNameArea).val());
	getParamPromotion4(graphNameArea,$("#paramBranch"+graphNameArea).val(),this.value,$("#paramMonth"+graphNameArea).val());
	getParamPromotion5(graphNameArea,$("#paramBranch"+graphNameArea).val(),this.value,$("#paramMonth"+graphNameArea).val());
	getParamPromotion6(graphNameArea,$("#paramBranch"+graphNameArea).val(),this.value,$("#paramMonth"+graphNameArea).val());
	
});

}
function getMonthParam_SMI_SalesByPromotionMonthly(graphNameArea,paramMonthSelected){
	//alert("hello call function year parameter"+paramMonthSelected);
	var monthHtml = "";
	$.ajax({
		url:"../Model/SMI_ParamMonth.jsp",
		type:"get",
		dataType:"json",
		async:false,
		success:function(data){
			monthHtml+="<select class=\"list\" id=\"paramMonth"+graphNameArea+"\">";
			$.each(data,function(index,indexEntry){
				if(parseInt(paramMonthSelected)==indexEntry[0]){
					//alert(branchCode==indexEntry[0]);
					monthHtml+="<option selected value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";
				}else{
					monthHtml+="<option value=\""+indexEntry[0]+"\">"+indexEntry[1]+"</option>";	
				}
			});
			monthHtml+="</select>";
		}
	});
$("td#areaParamMonth"+graphNameArea).html(monthHtml);
$("select#paramMonth"+graphNameArea).kendoDropDownList();

$("select#paramMonth"+graphNameArea).die("change");
$("select#paramMonth"+graphNameArea).live("change",function(){
	/*
	alert($("#paramBranch"+graphNameArea).val());
	alert($("#paramYear"+graphNameArea).val());
	alert(this.value);
	*/
	getParamPromotion1(graphNameArea,$("#paramBranch"+graphNameArea).val(),$("#paramYear"+graphNameArea).val(),this.value);
	getParamPromotion2(graphNameArea,$("#paramBranch"+graphNameArea).val(),$("#paramYear"+graphNameArea).val(),this.value);
	getParamPromotion3(graphNameArea,$("#paramBranch"+graphNameArea).val(),$("#paramYear"+graphNameArea).val(),this.value);
	getParamPromotion4(graphNameArea,$("#paramBranch"+graphNameArea).val(),$("#paramYear"+graphNameArea).val(),this.value);
	getParamPromotion5(graphNameArea,$("#paramBranch"+graphNameArea).val(),$("#paramYear"+graphNameArea).val(),this.value);
	getParamPromotion6(graphNameArea,$("#paramBranch"+graphNameArea).val(),$("#paramYear"+graphNameArea).val(),this.value);
	
});

}


function getParamPromotion1(graphNameArea,vYear,vMonth,vBranch,proSelected){
	
	
	var htmlParam="";
	$.ajax({
		url:"../Model/SMI_ParamPromotion.jsp",
		type:"get",
		dataType:"json",
		async:false,
		 data:{"paramYear":vYear,"paramMonth":vMonth,"paramBranch":vBranch},
		success:function(data){
			if(data!=null){
				htmlParam+="<select class=\"list\" id=\"paramPromotion1"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					
					if(proSelected==indexEntry[0]){
					htmlParam+="<option selected value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 
					}else{
					htmlParam+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 	
					}
				});
				htmlParam+="</select>";
				
				$("td#areaParamPromotion1"+graphNameArea).html(htmlParam);
				$("select#paramPromotion1"+graphNameArea).kendoDropDownList();
			}
		}
	});
}

function getParamPromotion2(graphNameArea,vYear,vMonth,vBranch,proSelected){
	
	
	var htmlParam="";
	$.ajax({
		url:"../Model/SMI_ParamPromotion.jsp",
		type:"get",
		dataType:"json",
		async:false,
		 data:{"paramYear":vYear,"paramMonth":vMonth,"paramBranch":vBranch},
		success:function(data){
			if(data!=null){
				htmlParam+="<select class=\"list\" id=\"paramPromotion2"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					
					if(proSelected==indexEntry[0]){
					htmlParam+="<option selected value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 
					}else{
					htmlParam+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 	
					}
				});
				htmlParam+="</select>";
				
				$("td#areaParamPromotion2"+graphNameArea).html(htmlParam);
				$("select#paramPromotion2"+graphNameArea).kendoDropDownList();
			}
		}
	});
}

function getParamPromotion3(graphNameArea,vYear,vMonth,vBranch,proSelected){
	
	
	var htmlParam="";
	$.ajax({
		url:"../Model/SMI_ParamPromotion.jsp",
		type:"get",
		dataType:"json",
		async:false,
		 data:{"paramYear":vYear,"paramMonth":vMonth,"paramBranch":vBranch},
		success:function(data){
			if(data!=null){
				htmlParam+="<select class=\"list\" id=\"paramPromotion3"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					
					if(proSelected==indexEntry[0]){
					htmlParam+="<option selected value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 
					}else{
					htmlParam+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 	
					}
				});
				htmlParam+="</select>";
				
				$("td#areaParamPromotion3"+graphNameArea).html(htmlParam);
				$("select#paramPromotion3"+graphNameArea).kendoDropDownList();
			}
		}
	});
}

function getParamPromotion4(graphNameArea,vYear,vMonth,vBranch,proSelected){
	
	
	var htmlParam="";
	$.ajax({
		url:"../Model/SMI_ParamPromotion.jsp",
		type:"get",
		dataType:"json",
		async:false,
		 data:{"paramYear":vYear,"paramMonth":vMonth,"paramBranch":vBranch},
		success:function(data){
			if(data!=null){
				htmlParam+="<select class=\"list\" id=\"paramPromotion4"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					
					if(proSelected==indexEntry[0]){
					htmlParam+="<option selected value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 
					}else{
					htmlParam+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 	
					}
				});
				htmlParam+="</select>";
				
				$("td#areaParamPromotion4"+graphNameArea).html(htmlParam);
				$("select#paramPromotion4"+graphNameArea).kendoDropDownList();
			}
		}
	});
}

function getParamPromotion5(graphNameArea,vYear,vMonth,vBranch,proSelected){
	
	
	var htmlParam="";
	$.ajax({
		url:"../Model/SMI_ParamPromotion.jsp",
		type:"get",
		dataType:"json",
		async:false,
		 data:{"paramYear":vYear,"paramMonth":vMonth,"paramBranch":vBranch},
		success:function(data){
			if(data!=null){
				htmlParam+="<select class=\"list\" id=\"paramPromotion5"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					
					if(proSelected==indexEntry[0]){
					htmlParam+="<option selected value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 
					}else{
					htmlParam+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 	
					}
				});
				htmlParam+="</select>";
				
				$("td#areaParamPromotion5"+graphNameArea).html(htmlParam);
				$("select#paramPromotion5"+graphNameArea).kendoDropDownList();
			}
		}
	});
}
function getParamPromotion6(graphNameArea,vYear,vMonth,vBranch,proSelected){
	
	
	var htmlParam="";
	$.ajax({
		url:"../Model/SMI_ParamPromotion.jsp",
		type:"get",
		dataType:"json",
		async:false,
		 data:{"paramYear":vYear,"paramMonth":vMonth,"paramBranch":vBranch},
		success:function(data){
			if(data!=null){
				htmlParam+="<select class=\"list\" id=\"paramPromotion6"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					
					if(proSelected==indexEntry[0]){
					htmlParam+="<option selected value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 
					}else{
					htmlParam+="<option value="+indexEntry[0]+">"+indexEntry[1]+"</option>"; 	
					}
				});
				htmlParam+="</select>";
				
				$("td#areaParamPromotion6"+graphNameArea).html(htmlParam);
				$("select#paramPromotion6"+graphNameArea).kendoDropDownList();
			}
		}
	});
}



//###############################function create function call parameter such as getBranch,getYear end ########################
//###############################create embed parameter function start#########################################################
function embedParameter_SMI_SalesByPromotionMonthly(graphName,paramBranch,paramYear,paramMonth,
		paramPromotion1,paramPromotion2,paramPromotion3,paramPromotion4,paramPromotion5,paramPromotion6){
	//Embed Default Parameter start
	var paramEmbedHtml="" +
	"<ul style=\"display:none\" class=\"paramEmbed"+graphName+"\">"+graphName+"" +
		"<li class=\"paramGraphName\">"+graphName+"</li>" +
		"<li class=\"paramBranch\">"+paramBranch+"</li>" +
		"<li class=\"paramYear\">"+paramYear+"</li>" +
		"<li class=\"paramMonth\">"+paramMonth+"</li>" +
		"<li class=\"paramPromotion1\">"+paramPromotion1+"</li>" +
		"<li class=\"paramPromotion2\">"+paramPromotion2+"</li>" +
		"<li class=\"paramPromotion3\">"+paramPromotion3+"</li>" +
		"<li class=\"paramPromotion4\">"+paramPromotion4+"</li>" +
		"<li class=\"paramPromotion5\">"+paramPromotion5+"</li>" +
		"<li class=\"paramPromotion6\">"+paramPromotion6+"</li>" +
	"</ul>";

	$("ul.paramEmbed"+graphName).remove();
	$("body").append(paramEmbedHtml);
	//Embed Default Parameter end
}

//###############################create embed parameter function end############################################################

function createChart_SMI_SalesByPromotionMonthly(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,titleText) {
	

	
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
	         //type: ""+graphType+""
	    	type:"bar",
	    	//value default show value on bar chart 
	         labels: {
                visible: true,
               // template: "#= series.name #: #=value #",
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
	         //template: "#= series.name #: #= value #"
	         template: "#= series.name #:#= addCommas(value) #",
	         font: tooltipFont
	         }
	     });
};



//send branch,year,startWeek,endWeek
//graphName,graphType,arIndex,branchId,yyyy,data[0][1]
function SalesByPromotionMonthlyFn(graphName,graphType,arIndex,vBranch,vYear,
		vMonth,vPromotionCode1,vPromotionCode2,vPromotionCode3 ,vPromotionCode4,
		vPromotionCode5,vPromotionCode6,graphWidth,graphHeight){
	
	
	//##################################Embed Default Parameter start #####################
	embedParameter_SMI_SalesByPromotionMonthly(graphName,vBranch,vYear,vMonth,
	vPromotionCode1,vPromotionCode2,vPromotionCode3,vPromotionCode4,vPromotionCode5,vPromotionCode6);
	//##################################Embed Default Parameter end #######################
	/*
	alert("graphName="+graphName);
	alert("graphType="+graphType);
	alert("arIndex="+arIndex);
	alert("paramBranch="+vBranch);
	alert("paramYear="+vYear);
	alert("paramMonth="+vMonth);
	alert("paramPromotionCode1="+vPromotionCode1);
	alert("paramPromotionCode2="+vPromotionCode2);
	alert("paramPromotionCode3="+vPromotionCode3);
	alert("paramPromotionCode4="+vPromotionCode4);
	alert("paramPromotionCode5="+vPromotionCode5);
	alert("paramPromotionCode6="+vPromotionCode6);
	 */
	
	//'001','2013','10','15'
	//branch,year,w10,w15
	 $.ajax({
			url:"../Model/SMI_SalesByPromotionMonthly.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramGraphName":graphName,"paramBranch":vBranch,"paramYear":vYear,"paramMonth":vMonth,
				"paramPromotionCode1":vPromotionCode1,"paramPromotionCode2":vPromotionCode2,
				"paramPromotionCode3":vPromotionCode3,"paramPromotionCode4":vPromotionCode4,
				"paramPromotionCode5":vPromotionCode5,"paramPromotionCode6":vPromotionCode6},
			success:function(data){
				//alert(data);
				//("hello jquery");
				//PromotionName, YTDSalesTarget, YTDSalesAmount, YTDSalesAmountLastYear
				var categoriesSalesByPromotionMonthly="";
				var dataSeriesSalesByPromotionMonthlyThisYear="";
				var dataSeriesSalesByPromotionMonthlyLastYear="";
				var dataSeriesSalesByPromotionMonthlyTarget="";
				var series="";
				
				categoriesSalesByPromotionMonthly+="[";
				dataSeriesSalesByPromotionMonthlyThisYear+="[";
				dataSeriesSalesByPromotionMonthlyLastYear+="[";
				dataSeriesSalesByPromotionMonthlyTarget+="[";
				$.each(data,function(index,indexEntry){
					
					var SalesByPromotionMonthlyCategoryType=""+indexEntry[0]+"";
					
					var paramThisYear="";
					var paramLastYear="";
					var paramTarget="";
					
					if(indexEntry[1]!=null){
						paramTarget=parseFloat(indexEntry[1]).toFixed(2);
						
					}else{
						paramTarget=0;
					}
					if(indexEntry[2]!=null){
						paramThisYear=parseFloat(indexEntry[2]).toFixed(2);
						
					}else{
						paramThisYear=0;
					}
					if(indexEntry[3]!=null){
						paramLastYear=parseFloat(indexEntry[3]).toFixed(2);
						
					}else{
						paramLastYear=0;
					}
					
					if(index==0){
					
						
						
						categoriesSalesByPromotionMonthly+="\""+SalesByPromotionMonthlyCategoryType+"\"";
						
						dataSeriesSalesByPromotionMonthlyThisYear+="\""+paramThisYear+"\"";
						dataSeriesSalesByPromotionMonthlyLastYear+="\""+paramLastYear+"\"";
						dataSeriesSalesByPromotionMonthlyTarget+="\""+paramTarget+"\"";
					}else{
						categoriesSalesByPromotionMonthly+=",\""+SalesByPromotionMonthlyCategoryType+"\"";
						dataSeriesSalesByPromotionMonthlyThisYear+=",\""+paramThisYear+"\"";
						dataSeriesSalesByPromotionMonthlyLastYear+=",\""+paramLastYear+"\"";
						dataSeriesSalesByPromotionMonthlyTarget+=",\""+paramTarget+"\"";
					}
					
					//alert(indexEntry[0]);
					console.log(indexEntry[1]);
					console.log(indexEntry[2]);
					console.log(indexEntry[3]);
					console.log("============");
					
					
					
					
					
				});
				dataSeriesSalesByPromotionMonthlyThisYear+="]";
				dataSeriesSalesByPromotionMonthlyLastYear+="]";
				dataSeriesSalesByPromotionMonthlyTarget+="]";
				categoriesSalesByPromotionMonthly+="]";
				
				
				var objcategoriesSalesByPromotionMonthly=eval("("+categoriesSalesByPromotionMonthly+")");
				var objdataSeriesSalesByPromotionMonthlyThisYear=eval("("+dataSeriesSalesByPromotionMonthlyThisYear+")");
				var objdataSeriesSalesByPromotionMonthlyLastYear=eval("("+dataSeriesSalesByPromotionMonthlyLastYear+")");
				var objdataSeriesSalesByPromotionMonthlyTarget=eval("("+dataSeriesSalesByPromotionMonthlyTarget+")");
				
				console.log(objdataSeriesSalesByPromotionMonthlyThisYear);
				console.log(objdataSeriesSalesByPromotionMonthlyLastYear);
				console.log(objdataSeriesSalesByPromotionMonthlyTarget);
				
				//categories+="[\""+getMonthName(mm)+" "+(yy-1)+"\",\""+getMonthName(mm)+" "+yy+"\",\"Plan MTD "+getMonthName(mm)+" "+yy+"\",\"Plan "+getMonthName(mm)+" "+yy+"\"]";			
				//var today = new Date();
				//var yyyy = today.getFullYear()+"";
				//var yy=yyyy.substring("2");
				
				 series=[{
			         	 name: "Target",
			         	 data: objdataSeriesSalesByPromotionMonthlyTarget
				     }, {
				         name: "Current",
				         data: objdataSeriesSalesByPromotionMonthlyThisYear
				     }, {
				         name: "Last Year",
				         data: objdataSeriesSalesByPromotionMonthlyLastYear
				     }];
				// alert(series);
				
				//var objSeries=eval("("+series+")");
				//console.log(objCategories);
				//console.log(series);
				 var titleText="ยอดขายสะสมถึงเดือน  "+getMonthName(vMonth)+" "+vYear+"(YTD)";
				 createChart_SMI_SalesByPromotionMonthly(graphName,graphType,series,objcategoriesSalesByPromotionMonthly,arIndex,graphWidth,graphHeight,titleText);
			
			
			}
			
		});
		
	};


	

	//SMI_SalesByPromotionMonthly
	
	
	var htmlParam_SMI_SalesByPromotionMonthly = function(graphNameArea){
		
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
						htmlParam+="<option value=\"311\">002-branName2</option>";
						htmlParam+="<option value=\"003\">003-branName3</option>";
						htmlParam+="<option value=\"004\">004-branName4</option>";
					htmlParam+="</select>";
				*/
				htmlParam+="</td>";
				htmlParam+="</tr>";
				
				 htmlParam+="<tr >";
					htmlParam+="<td>";
						htmlParam+="YTD-Year";
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
						htmlParam+="<td>";
							htmlParam+="YTD-Month";
						htmlParam+="</td>";	
						htmlParam+="<td id=\"areaParamMonth"+graphNameArea+"\">";
						/*					
						htmlParam+="" +
								"<select class=\"list\" id=\"paramMonth"+graphNameArea+"\">" +
								
									"<option value=\"1\">Jan</option>" +
									"<option value=\"2\">Feb</option>" +
									"<option value=\"3\">Mar</option>" +
									"<option value=\"4\">Apr</option>" +
									"<option value=\"5\">May</option>" +
									"<option value=\"6\">Jun</option>" +
									"<option value=\"7\">Junly</option>"+
									"<option value=\"8\">Aug</option>" +
									"<option value=\"9\">Sep</option>" +
									"<option value=\"10\">Oct</option>" +
									"<option value=\"11\">Nov</option>" +
									"<option value=\"12\">Dec</option>" +
								"</select>";
						*/
		 			htmlParam+="</td>";
		 		htmlParam+="</tr>";
		 		
		 		
		 		htmlParam+="<tr>";
				htmlParam+="<td>";
					htmlParam+="Promotion1";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamPromotion1"+graphNameArea+"\">";
				/*
					htmlParam+="" +
							"<select class=\"list\" id=\"paramPromotion1"+graphNameArea+"\">" +
								"<option value=\"15\">promotionName1</option>" +
								"<option value=\"16\">promotionName2</option>" +
								"<option value=\"17\">promotionName3</option>" +
								"<option value=\"18\">promotionName4</option>" +
							"</select>";
				*/
	 			htmlParam+="</td>";
	 		
			htmlParam+="<td>";
				htmlParam+="Promotion2:";
			htmlParam+="</td>";
			htmlParam+="<td id=\"areaParamPromotion2"+graphNameArea+"\">";
			/*
				htmlParam+="" +
						"<select class=\"list\" id=\"paramPromotion2"+graphNameArea+"\">" +
							"<option value=\"15\">promotionName1</option>" +
							"<option value=\"16\">promotionName2</option>" +
							"<option value=\"17\">promotionName3</option>" +
							"<option value=\"18\">promotionName4</option>" +
						"</select>";
			*/
 			htmlParam+="</td>";
 			
 		htmlParam+="</tr>";
 		
 		htmlParam+="<tr>";
 		
		htmlParam+="<td>";
			htmlParam+="Promotion3:";
		htmlParam+="</td>";
		htmlParam+="<td id=\"areaParamPromotion3"+graphNameArea+"\">";
		/*
			htmlParam+="" +
					"<select class=\"list\" id=\"paramPromotion3"+graphNameArea+"\">" +
						"<option value=\"15\">promotionName1</option>" +
						"<option value=\"16\">promotionName2</option>" +
						"<option value=\"17\">promotionName3</option>" +
						"<option value=\"18\">promotionName4</option>" +
					"</select>";
		*/
			htmlParam+="</td>";


		htmlParam+="<td>";
			htmlParam+="Promotion4:";
		htmlParam+="</td>";
		htmlParam+="<td id=\"areaParamPromotion4"+graphNameArea+"\">";
		/*
			htmlParam+="" +
					"<select class=\"list\" id=\"paramPromotion4"+graphNameArea+"\">" +
						"<option value=\"15\">promotionName1</option>" +
						"<option value=\"16\">promotionName2</option>" +
						"<option value=\"17\">promotionName3</option>" +
						"<option value=\"18\">promotionName4</option>" +
					"</select>";
		*/
			htmlParam+="</td>";
			
		htmlParam+="</tr>";
		
		htmlParam+="<tr>";
		
		htmlParam+="<td>";
			htmlParam+="Promotion5:";
		htmlParam+="</td>";
		htmlParam+="<td id=\"areaParamPromotion5"+graphNameArea+"\">";
		/*
			htmlParam+="" +
					"<select class=\"list\" id=\"paramPromotion5"+graphNameArea+"\">" +
						"<option value=\"15\">promotionName1</option>" +
						"<option value=\"16\">promotionName2</option>" +
						"<option value=\"17\">promotionName3</option>" +
						"<option value=\"18\">promotionName4</option>" +
					"</select>";
		*/
			htmlParam+="</td>";
		

		htmlParam+="<td>";
			htmlParam+="Promotion6:";
		htmlParam+="</td>";
		htmlParam+="<td id=\"areaParamPromotion6"+graphNameArea+"\">";
		/*
			htmlParam+="" +
					"<select class=\"list\" id=\"paramPromotion6"+graphNameArea+"\">" +
						"<option value=\"15\">promotionName1</option>" +
						"<option value=\"16\">promotionName2</option>" +
						"<option value=\"17\">promotionName3</option>" +
						"<option value=\"18\">promotionName4</option>" +
					"</select>";
		*/
			htmlParam+="</td>";
		htmlParam+="</tr>";
		

		 	htmlParam+="</table>";
		 	
		 	htmlParam+="</div>";
		 	
		 		htmlParam+="<div class=\"btnArea\">";
		 				htmlParam+="<div class=\"btn\">";
		 					htmlParam+="<button id=\"SalesByPromotionMonthlySubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"SalesByPromotionMonthlyCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_SalesByPromotionMonthly=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#SalesByPromotionMonthlySubmit"+graphNameArea).die("click");
		$("#SalesByPromotionMonthlySubmit"+graphNameArea).live("click",function(){
			/*
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var paramMonth=$("#paramMonth"+graphNameArea).val();
			var paramPromotion1=$("#paramPromotion1"+graphNameArea).val();
			*/
			
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var paramMonth=$("#paramMonth"+graphNameArea).val();
			var paramPromotion1=$("#paramPromotion1"+graphNameArea).val();
			var paramPromotion2=$("#paramPromotion2"+graphNameArea).val();
			var paramPromotion3=$("#paramPromotion3"+graphNameArea).val();
			var paramPromotion4=$("#paramPromotion4"+graphNameArea).val();
			var paramPromotion5=$("#paramPromotion5"+graphNameArea).val();
			var paramPromotion6=$("#paramPromotion6"+graphNameArea).val();
			
			/*
			alert(paramBranch);
			alert(paramYear);
			alert(paramMonth);
			alert(paramPromotion1);
			alert(paramPromotion2);
			alert(paramPromotion3);
			alert(paramPromotion4);
			alert(paramPromotion5);
			alert(paramPromotion6);
			*/
			
			//Embed Default Parameter start
			embedParameter_SMI_SalesByPromotionMonthly(graphName,paramBranch,paramYear,paramMonth,paramPromotion1,
					paramPromotion2,paramPromotion3,paramPromotion4,paramPromotion5,paramPromotion6);
			//Embed Default Parameter end
			//###################Embead parameter to call embed parameter function start##############
			
			SalesByPromotionMonthlyFn(graphName,graphType,arIndex,paramBranch,paramYear,paramMonth,
					paramPromotion1,paramPromotion2 ,paramPromotion3,paramPromotion4,
					paramPromotion5,paramPromotion6,graphWidth,graphHeight);
			
			
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");

			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
			
		});
		
		if(paramMachine=="Tablet"){
		$("#SalesByPromotionMonthlyCancel"+graphNameArea).die("click");
		$("#SalesByPromotionMonthlyCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#SalesByPromotionMonthlyCancel"+graphNameArea).die("click");
		$("#SalesByPromotionMonthlyCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}
		
		
	};
	/*####################### config dialog for tablet start ###################*/ 
	var dialogSetParam_SMI_SalesByPromotionMonthlyFn=function(paramTitleSetting){
	//config dialog here
	 $(".areaSettingExternal").dialog({
		 title:"<b>"+paramTitleSetting+"-Setting</b>",
		 autoOpen: false,
		 show: {
		 effect: "blind",
		 duration: 1000
		 },
		 hide: {
		 effect: "explode",
		 duration: 1000
		 },
		 width: 870,//+200
		 height:384,//+50
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
			 
	function manageParamSalesByPromotionMonthlyFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		 //alert("hello jquery");
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").remove();
				 $("body").append("<div class=\"areaSettingExternal\"></div>");
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_SalesByPromotionMonthly(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	dialogSetParam_SMI_SalesByPromotionMonthlyFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_SalesByPromotionMonthly(graphNameArea));
				 //call parameter start
				 // getYearParameter(graphNameArea);
				 // getStartWeekParameter(graphNameArea,$("select#paramYear"+graphNameArea).val());
				 // getEndWeekParameter(graphNameArea,$("select#paramYear"+graphNameArea).val());
				 //call parameter end
				 
				 $(".setParamForm"+graphNameArea).slideDown();
			 }
			

			 //##################### get embed parameter function start ##################
			getBranchParam_SMI_SalesByPromotionMonthly(graphNameArea,$("ul.paramEmbed"+graphName+">li.paramBranch").text());
			getYearParam_SMI_SalesByPromotionMonthly(graphNameArea,$("ul.paramEmbed"+graphName+">li.paramYear").text());
			getMonthParam_SMI_SalesByPromotionMonthly(graphNameArea,$("ul.paramEmbed"+graphName+">li.paramMonth").text());
			
			getParamPromotion1(graphNameArea,$("ul.paramEmbed"+graphName+">li.paramBranch").text(),$("ul.paramEmbed"+graphName+">li.paramYear").text(),
					$("ul.paramEmbed"+graphName+">li.paramMonth").text(),$("ul.paramEmbed"+graphName+">li.paramPromotion1").text());
			getParamPromotion2(graphNameArea,$("ul.paramEmbed"+graphName+">li.paramBranch").text(),$("ul.paramEmbed"+graphName+">li.paramYear").text(),
					$("ul.paramEmbed"+graphName+">li.paramMonth").text(),$("ul.paramEmbed"+graphName+">li.paramPromotion2").text());
			
			getParamPromotion3(graphNameArea,$("ul.paramEmbed"+graphName+">li.paramBranch").text(),$("ul.paramEmbed"+graphName+">li.paramYear").text(),
					$("ul.paramEmbed"+graphName+">li.paramMonth").text(),$("ul.paramEmbed"+graphName+">li.paramPromotion3").text());
			
			getParamPromotion4(graphNameArea,$("ul.paramEmbed"+graphName+">li.paramBranch").text(),$("ul.paramEmbed"+graphName+">li.paramYear").text(),
					$("ul.paramEmbed"+graphName+">li.paramMonth").text(),$("ul.paramEmbed"+graphName+">li.paramPromotion4").text());
			
			getParamPromotion5(graphNameArea,$("ul.paramEmbed"+graphName+">li.paramBranch").text(),$("ul.paramEmbed"+graphName+">li.paramYear").text(),
					$("ul.paramEmbed"+graphName+">li.paramMonth").text(),$("ul.paramEmbed"+graphName+">li.paramPromotion5").text());
			
			getParamPromotion6(graphNameArea,$("ul.paramEmbed"+graphName+">li.paramBranch").text(),$("ul.paramEmbed"+graphName+">li.paramYear").text(),
					$("ul.paramEmbed"+graphName+">li.paramMonth").text(),$("ul.paramEmbed"+graphName+">li.paramPromotion6").text());
			
			//##################### get embed parameter function end #####################
			 
			 submit_SMI_SalesByPromotionMonthly(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParam_SMI_SalesByPromotionMonthlyFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}

	//##################################### Set Parameter Here End ###############################
	