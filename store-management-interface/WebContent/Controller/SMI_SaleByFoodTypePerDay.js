//click seting
//$(document).on("click",".setting",function(){
//call SMI_SalePerDay (  '2012-01-01' , '2012-03-31' , '322000' )
function createChart_SMI_SaleByFoodTypePerDay(graphName,graphType,graphSeries,graphCategory,arIndex) {
	//alert(graphName);

	/*
	alert(graphName);
	alert(graphType);
	alert(graphSeries);
	alert(graphCategory);
	*/
	
	 $("#chart"+graphName+"-"+arIndex).kendoChart({
		  chartArea: {
			    width: 480,
			    height:250
			  },
	     title: {
	         text: "Site Visitors Stats /thousands/",
	         visible:false
	     },
	     
	     
	     legend: {
	         visible: true,
	           position:"bottom"
	     },
	     
	     seriesDefaults: {
	         type: ""+graphType+""
	     },
	     
	     //series:graphSeries,
	     
	     
	     series: [{
	         name: "Total Visits",
	         data: [56000, 63000, 74000, 91000, 117000, 138000]
	     }, {
	         name: "Unique visitors",
	         data: [52000, 34000, 23000, 48000, 67000, 83000]
	     }],
	     
	     valueAxis: {
	         max: 140000,
	         line: {
	             visible: false
	         },
	         minorGridLines: {
	             visible: true
	         }
	     },
	     categoryAxis: {
	    	 //categories: graphCategory,
	         categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	         majorGridLines: {
	             visible: true
	         },
	         labels: {
	             font: "6px Tahoma",
	        	  rotation : -50
	          }
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= value #"
	         }
	     });
};
var htmlParam_SMI_SaleByFoodTypePerDay = function(){
	 var htmlParam ="";
	 htmlParam+="<div id=\"setParam\">";
	 htmlParam+="<div class=\"setParamArea\">";
	 htmlParam+="<div class=\"setParamHeader\">";
	 htmlParam+="<div class=\"text\">Header Graph</div>";
	 htmlParam+="</div>";
		 htmlParam+="<div class=\"setParam\">";
		
		 htmlParam+="<table>";
		 
		 htmlParam+="<tr>";
			htmlParam+="<td>";
				htmlParam+="Brach";
			htmlParam+="</td>";
			htmlParam+="<td>";
				htmlParam+="<select class=\"list\" id=\"paramBrach\">";
					htmlParam+="<option>322000</option>";
					htmlParam+="<option>322000</option>";
					htmlParam+="<option>322000</option>";
					htmlParam+="<option>322000</option>";
				htmlParam+="</select>";
			htmlParam+="</td>";
			htmlParam+="</tr>";
			
			 htmlParam+="<tr>";
				htmlParam+="<td>";
					htmlParam+="Start Date";
				htmlParam+="</td>";
				htmlParam+="<td>";
					htmlParam+="<input type=\"text\" name=\"paramStartDate\" id=\"paramStartDate\" class=\"date\">";
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 		htmlParam+="<tr>";
	 			htmlParam+="<td>";
	 				htmlParam+="End Date";
	 			htmlParam+="</td>";
	 			htmlParam+="<td>";
	 				htmlParam+="<input type=\"text\" name=\"paramEndDate\" id=\"paramEndDate\" class=\"date\">";
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 	/*	
		htmlParam+="<tr>";
		htmlParam+="<td>";
			htmlParam+="Promotion1";
		htmlParam+="</td>";
		htmlParam+="<td>";
			htmlParam+="<select class=\"list\">";
				htmlParam+="<option>Cake by 4 free 1</option>";
				htmlParam+="<option>Snack box set A</option>";
				htmlParam+="<option>Snack box set B</option>";
				htmlParam+="<option>Snack box set C</option>";
			htmlParam+="</select>";
		htmlParam+="</td>";
		htmlParam+="</tr>";
		
		htmlParam+="<tr>";
		htmlParam+="<td>";
			htmlParam+="Promotion2";
		htmlParam+="</td>";
		htmlParam+="<td>";
			htmlParam+="<select class=\"list\">";
				htmlParam+="<option>Cake by 4 free 1</option>";
				htmlParam+="<option>Snack box set A</option>";
				htmlParam+="<option>Snack box set B</option>";
				htmlParam+="<option>Snack box set C</option>";
			htmlParam+="</select>";
		htmlParam+="</td>";
		htmlParam+="</tr>";
	 	 */
	 	htmlParam+="</table>";
	 	htmlParam+="</div>";
	 		htmlParam+="<div class=\"btnArea\">";
	 			htmlParam+="<div class=\"btn\">";
	 			
	 				htmlParam+="<button id=\"salePerDaySubmit\" class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Plot Graph</button>";
	 				htmlParam+="</div>";
	 			htmlParam+="</div>";
	 	htmlParam+="</div>";
	 	htmlParam+="</div>";
	 	
	 	return htmlParam;
};


$("#salePerDaySubmit").live("click",function(){

	var paramBrach=$("#paramBrach").val();
	var paramStartDate=$("#paramStartDate").val();
	var paramEndDate=$("#paramEndDate").val();
	var paramGraphName= $("ul#paramEmbedSalePerDay >li.graphName").text();
	var paramGraphType= $("ul#paramEmbedSalePerDay >li.graphType").text();
	
	/*
	alert(paramBrach);
	alert(paramStartDate);
	alert(paramEndDate);
	alert(paramGraphName);
	alert(paramGraphType);
	*/
	//call function create graph for gernarate new graph
	//salePerDayFn("");
	//$(".setting").trigger("click");
});

function saleByFoodTypePerDayFn(graphName,graphType,arIndex,startDate,endDate,brach){
	// alert("salePerDay22222222222222222222222");
	 $.ajax({
			url:"../Model/SMI_SaleGraph.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramGraphName":graphName,"paramStartDate":startDate,"paramEndDate":endDate,"paramBrach":brach},
			success:function(data2){
				//alert("hello jquery");
				var categories="";
				var dataSeriesSaleAmount="";
				var dataSeriesSaleAmountLastYear="";
				var dataSeriesSaleTarget="";
				var series="";
				/*
				 	SaleAmount
					SaleAmountLastYear
					SaleTarget
				 */
				categories+="[";
				dataSeriesSaleAmount+="[";
				dataSeriesSaleAmountLastYear+="[";
				dataSeriesSaleTarget+="[";
				$.each(data2,function(index2,indexEntry2){
					
					if(index2==0){
						categories+="\""+indexEntry2[0]+"\"";
						dataSeriesSaleAmount+="\""+indexEntry2[1]+"\"";
						dataSeriesSaleAmountLastYear+="\""+indexEntry2[2]+"\"";
						dataSeriesSaleTarget+="\""+indexEntry2[3]+"\"";
					}else{
						categories+=",\""+indexEntry2[0]+"\"";
						dataSeriesSaleAmount+=",\""+indexEntry2[1]+"\"";
						dataSeriesSaleAmountLastYear+=",\""+indexEntry2[2]+"\"";
						dataSeriesSaleTarget+=",\""+indexEntry2[3]+"\"";
					}
					
					console.log(indexEntry2[0]);
					console.log(indexEntry2[1]);
					console.log(indexEntry2[2]);
					console.log(indexEntry2[3]);
					console.log("============");
					
					
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
					
					
				});
				dataSeriesSaleAmount+="]";
				dataSeriesSaleAmountLastYear+="]";
				dataSeriesSaleTarget+="]";
				categories+="]";
				
				/*
			 	SaleAmount
				SaleAmountLastYear
				SaleTarget
			 */
				var objCategories=eval("("+categories+")");
				var objDataSeriesSaleAmount=eval("("+dataSeriesSaleAmount+")");
				var objDataSeriesSaleAmountLastYear=eval("("+dataSeriesSaleAmountLastYear+")");
				var objDataSeriesSaleTarget=eval("("+dataSeriesSaleTarget+")");
				
				console.log(objDataSeriesSaleAmount);
				console.log(objDataSeriesSaleAmountLastYear);
				console.log(objDataSeriesSaleTarget);
				
				 series=[{
			         	 name: "SaleAmount",
			         	 data: objDataSeriesSaleAmount
				     }, {
				         name: "SaleAmountLastYear",
				         data: objDataSeriesSaleAmountLastYear
				     }, {
				         name: "SaleTarget",
				         data: objDataSeriesSaleTarget
				     }];
				 
				
				//var objSeries=eval("("+series+")");
				//console.log(objCategories);
				//console.log(series);
				 createChart_SMI_SaleByFoodTypePerDay(graphName,graphType,series,objCategories,arIndex);
			}
		});
	};


	 
	
	
	 
	
	 

	 