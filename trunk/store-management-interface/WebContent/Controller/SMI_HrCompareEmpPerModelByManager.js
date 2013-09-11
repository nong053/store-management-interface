//ฟังก์ชันสำหรับ tooltip แสดงค่าตัวเลข 2 ตำแหน่ง และ Commas
	function getDicimalCommas(value){
	 var nStr=(value).toFixed(2);
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
	//ฟังก์ชันจัดการ Commas
	function addCommas(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}	

function createChart_SMI_HrCompareEmpPerModelByManager(graphName,arIndex,graphHeight,paramMachine){


	var seriesDefaultsFont="";
	var PositionWidth="";
	if(paramMachine=="Tablet"){
		seriesDefaultsFont="13px Tahoma";
		PositionWidth=200;
	}else{
		seriesDefaultsFont="10px Tahoma";
		PositionWidth=150;
	}

	
	 $("#chart"+graphName+"-"+arIndex).kendoGrid({
		 	 height: graphHeight,
             dataSource: {
                 data: [{    "Position":"ผู้จัดการเขต/ผู้ช่วยเขต",
		                	 "Model":"24",
		                	 "Acctal":"24",
		                	 "Gap":"0",
		                	 "NewEmp":"0",
		                	 "resign":"0",
		                	 "resignPercentage":"0.00%", 
		                	 "resignAccumulated":"0"
		                 },
		                 {   "Position":"ผู้จัดการสาขา",
		                	 "Model":"74",
		                	 "Acctal":"66",
		                	 "Gap":"8",
		                	 "NewEmp":"0",
		                	 "resign":"1",
		                	 "resignPercentage":"1.52%", 
		                	 "resignAccumulated":"2"
			              },
			              {  "Position":"ผู้ช่วยผู้จัดการสาขา",
		                	 "Model":"157",
		                	 "Acctal":"149",
		                	 "Gap":"8",
		                	 "NewEmp":"0",
		                	 "resign":"8",
		                	 "resignPercentage":"5.37%", 
		                	 "resignAccumulated":"36"
				           },
			              {  "Position":"Shop Manager",
		                	 "Model":"38",
		                	 "Acctal":"14",
		                	 "Gap":"24",
		                	 "NewEmp":"0",
		                	 "resign":"7",
		                	 "resignPercentage":"50.00%", 
		                	 "resignAccumulated":"20"
				           },
			              {  "Position":"ผู้เชี่ยวชาญ",
		                	 "Model":"6",
		                	 "Acctal":"9",
		                	 "Gap":"-3",
		                	 "NewEmp":"0",
		                	 "resign":"0",
		                	 "resignPercentage":"0.00%", 
		                	 "resignAccumulated":"0"
				           },
			              {  "Position":"แคชเชียร์",
		                	 "Model":"171",
		                	 "Acctal":"153",
		                	 "Gap":"18",
		                	 "NewEmp":"0",
		                	 "resign":"6",
		                	 "resignPercentage":"3.92%", 
		                	 "resignAccumulated":"39"
				           },
			              {  "Position":"Hod Master",
		                	 "Model":"17",
		                	 "Acctal":"13",
		                	 "Gap":"4",
		                	 "NewEmp":"0",
		                	 "resign":"0",
		                	 "resignPercentage":"0.00%", 
		                	 "resignAccumulated":"0"
		                		 
			           },{  "Position":"พนักงานประจำทั่วไป/อื่นๆ",
		                	 "Model":"6",
		                	 "Acctal":"8",
		                	 "Gap":"-2",
		                	 "NewEmp":"0",
		                	 "resign":"2",
		                	 "resignPercentage":"25.00%", 
		                	 "resignAccumulated":"2"
		                		 
				      },{  "Position":"Partime อื่นๆ /แคชเชียร์(OldType=21,22)",
		                	 "Model":"3",
		                	 "Acctal":"0",
		                	 "Gap":"0",
		                	 "NewEmp":"0",
		                	 "resign":"1",
		                	 "resignPercentage":"0.00%", 
		                	 "resignAccumulated":"4"
		                		 
				      },{  "Position":"รวม",
				    	   "Model":"496",
				    	   "Acctal":"436",
				    	   "Gap":"60",
				    	   "NewEmp":"0",
				    	   "resign":"25",
				    	   "resignPercentage":"5.73%", 
				    	   "resignAccumulated":"96"
				      }
                 
                 ],
                 pageSize: 10
             },
             groupable: false,
             sortable: false,/*
             pageable: {
                 refresh: true,
                 pageSizes: true
             },
             */
             columns: [ {
                     field: "Position",
                     width: PositionWidth,
                     title: "<center><b>บริหารสาขา<br>+แคชเชียร์hod</b></center>"
                 } , {
                     field: "Model",
                     //width: 90,
                     title: "<center><b>Model</b></center>",
                     type: "number"
                 } , {
                    // width: 100,
                     field: "Acctal",
                     title: "<center><b>Actual</b></center>",
                     type: "number"
                 } , {
                     field: "Gap",
                     title: "<center><b>Gap</b></center>",
                     type: "number"
                 } , {
                     field: "NewEmp",
                     title: "<center><b>พนง.<br>เข้าใหม่</b></center>",
                     type: "number"
                 } , {
                     //width: 50,
                     field: "resign",
                     title: "<center><b>ลาออก<br></b></center>",
                     type: "number"
                 }, {
                    // width: 50,
                     field: "resignPercentage",
                     title: "<center><b>%ลาออก<br>/Act</b></center>",
                    // type: "number"
                 }, {
                     //width: 50,
                     field: "resignAccumulated",
                     title: "<center><b>ลาออกสะสม<br>Jan-Dec</b></center>",
                     type: "number"
                 }
             ]
         });
     
     
	 
	//set Font for Gap if gap  number is Minus set red font.
	 //$("#chart"+graphName+"-"+arIndex)
	 
	 
	 $("#chart"+graphName+"-"+arIndex+" tbody tr").each(function(){
		$("td",this).eq(1).css({"text-align":"right"}); 
		$("td",this).eq(2).css({"text-align":"right"}); 
		$("td",this).eq(3).css({"text-align":"right"}); 
		$("td",this).eq(4).css({"text-align":"right"}); 
		$("td",this).eq(5).css({"text-align":"right"}); 
		$("td",this).eq(6).css({"text-align":"right"}); 
		$("td",this).eq(7).css({"text-align":"right"}); 
		
		
		var debt =parseInt($("td",this).eq(5).text());
		var credit = parseInt($("td",this).eq(6).text());
		//if debt more than creadit give font is to red color
		//alert("debt"+debt);
		//alert("credit"+credit);
		
		//if(debt > credit){
			$("td",this).eq(3).css({"text-align":"right","color":"red"}); 
			$("td",this).eq(6).css({"text-align":"right","color":"red"}); 
		//}
		$("td",this).eq(1).text(addCommas($("td",this).eq(1).text()));
		$("td",this).eq(2).text(addCommas($("td",this).eq(2).text()));
		$("td",this).eq(3).text(addCommas($("td",this).eq(3).text()));
		$("td",this).eq(4).text(addCommas($("td",this).eq(4).text()));
		$("td",this).eq(5).text(addCommas($("td",this).eq(5).text()));
		$("td",this).eq(6).text(addCommas($("td",this).eq(6).text()));
		$("td",this).eq(7).text(addCommas($("td",this).eq(7).text()));
		
		
		
	 });
	 
	 
	//set padding td in table grid
	$(".k-grid td").css({"padding":"0px"});
     
};

var htmlParam_SMI_HrCompareEmpPerModelByManager = function(graphNameArea){
	
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
					htmlParam+="<b>Start Date</b>";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamStartDate"+graphNameArea+"\">";
				/*
					htmlParam+="<input type=\"text\" name=\"paramStartDate"+graphNameArea+"\" id=\"paramStartDate"+graphNameArea+"\" class=\"date\">";
	 			*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 		htmlParam+="<tr>";
	 			htmlParam+="<td>";
	 				htmlParam+="<b>End Date</b>";
	 			htmlParam+="</td>";
	 			htmlParam+="<td id=\"areaParamEndDate"+graphNameArea+"\">";
	 			/*
	 				htmlParam+="<input type=\"text\" name=\"paramEndDate"+graphNameArea+"\" id=\"paramEndDate"+graphNameArea+"\" class=\"date\">";
	 			*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 	
	 		
	 	htmlParam+="</table>";
	 	
	 	htmlParam+="</div>";
	 	
	 		htmlParam+="<div class=\"btnArea\">";
	 				htmlParam+="<div class=\"btn\">";
	 					htmlParam+="<button id=\"HrCompareEmpPerModelByManagerSubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
	 					htmlParam+="<button id=\"HrCompareEmpPerModelByManagerCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
	 				htmlParam+="</div>";
	 		htmlParam+="</div>";
	 			
	 			
	 	htmlParam+="</div>";
	 	htmlParam+="</div>";
	 	
	 	return htmlParam;
};


var submit_SMI_HrCompareEmpPerModelByManager=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
	//HrCompareEmpPerModelByManagerSubmitareaHrCompareEmpPerModelByManager-0
	//alert(graphNameArea);
	$("#HrCompareEmpPerModelByManagerSubmit"+graphNameArea).die("click");
	$("#HrCompareEmpPerModelByManagerSubmit"+graphNameArea).live("click",function(){
		
		//###################Embead parameter to call embed parameter function start##############
		var paramBranch=$("#paramBranch"+graphNameArea).val();
		var paramStartDate=$("#paramStartDate"+graphNameArea).val();
		var paramEndDate=$("#paramEndDate"+graphNameArea).val();
		embedParameterHrCompareEmpPerModelByManager(graphName,paramBranch,paramStartDate,paramEndDate);
		//###################Embead parameter to call embed parameter function start##############
		
		
		//call function create graph for gernarate new graph
		//HrCompareEmpPerModelByManagerFn
		var startDate = paramStartDate.split("-");
		var endDate = paramEndDate.split("-");
		
		//if((parseInt(startDate[0])==parseInt(endDate[0]))&&((parseInt(startDate[1]))==parseInt(endDate[1]))){//check 
			if(parseInt(startDate[1]) <= parseInt(endDate[1])){
				HrCompareEmpPerModelByManagerFn(graphName,graphType,arIndex,paramBranch,paramStartDate,paramEndDate,graphWidth,graphHeight,paramMachine);
				
				if(paramMachine=="Tablet"){
					$(".ui-icon-closethick").trigger("click");

				}else{
					$("#setting"+graphNameArea).trigger("click");
				}
			}else{
				alert("Unable to select start date less than end date");
			}
			/*
		}else{
			alert("Unable to select over month");
		}
		*/
	});
	
	if(paramMachine=="Tablet"){
	$("#HrCompareEmpPerModelByManagerCancel"+graphNameArea).die("click");
	$("#HrCompareEmpPerModelByManagerCancel"+graphNameArea).live("click",function(){
		$(".ui-icon-closethick").trigger("click");
	});
	}else{
		
	$("#HrCompareEmpPerModelByManagerCancel"+graphNameArea).die("click");
	$("#HrCompareEmpPerModelByManagerCancel"+graphNameArea).live("click",function(){
		$("#setting"+graphNameArea).trigger("click");
		
	});
		
	}
	
	
};
/*####################### config dialog for tablet start ###################*/ 
var dialogSetParam_SMI_HrCompareEmpPerModelByManagerFn=function(paramTitleSetting){
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
//#######################Embed parameter Function start #################
function embedParameterHrCompareEmpPerModelByManager(graphName,paramBranch,paramStartDate,paramEndDate){

	var paramDefaultEmbedHtml="" +
	"<ul style=\"display:none\" class=\"paramDefaultEmbed"+graphName+"\">"+graphName+"" +
		"<li class=\"paramBranch\">"+paramBranch+"</li>" +
		"<li class=\"paramStartDate\">"+paramStartDate+"</li>" +
		"<li class=\"paramEndDate\">"+paramEndDate+"</li>" +
	"</ul>";

	$(".paramDefaultEmbed"+graphName).remove();
	$("body").append(paramDefaultEmbedHtml);
	//Embed Default Parameter end
}
//#######################Embed parameter Function end #################

function manageParamHrCompareEmpPerModelByManagerFn(graphNameArea,graphWidth,graphHeight,paramMachine){
	 var graphNameAreaIndexArray=graphNameArea.split("-");
	 var graphName=graphNameAreaIndexArray[0].substring("4");
	 var graphIndex=graphNameAreaIndexArray[1];
	 
	 
	 
	if($("#"+graphNameArea+"").attr("class")=="graphTop"){
		 
		 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
		 
		 if(paramMachine=="Tablet"){
			 $(".areaSettingExternal").remove();
			 $("body").append("<div class=\"areaSettingExternal\"></div>");
		 	 $(".areaSettingExternal").prepend(htmlParam_SMI_HrCompareEmpPerModelByManager(graphNameArea));
		 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
		 	 dialogSetParam_SMI_HrCompareEmpPerModelByManagerFn(graphName);
		 }else{
			 $("#"+graphNameArea+"").prepend(htmlParam_SMI_HrCompareEmpPerModelByManager(graphNameArea));
			 
			 
			 $(".setParamForm"+graphNameArea).slideDown();
		 }
		
		
		 //create button submit
		 //#####################check parameter is selected start#########################
		getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
		getStartDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text(),paramMachine);
		getEndDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramEndDate").text(),paramMachine);
		//######################check parameter is selected end###########################
		 submit_SMI_HrCompareEmpPerModelByManager(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
		 
		 $(this).die("click");
	 }else{
		
		 $("#"+graphNameArea+"").attr({"class":"graphTop"});
		 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
		 if(paramMachine=="Tablet"){
			 dialogSetParam_SMI_HrCompareEmpPerModelByManagerFn(graphName);
		 }else{
		 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
				 $(this).remove();
			 });
		 }
	}
}


function HrCompareEmpPerModelByManagerFn(graphName,graphType,arIndex,graphHeight,paramMachine){
	//graphName,graphType,arIndex,vBranch,vSDate,vEDate,graphWidth,graphHeight
	
	//alert("graphName="+graphName);
	//alert("graphType="+graphType);
	//alert("arIndex="+arIndex);
	
	//#########################set embed parameter for embed default parameter start########################
	//embedParameterHrCompareEmpPerModelByManager(graphName,vBranch,vSDate,vEDate);
	//#########################set embed parameter for embed default parameter end########################
	
	/*
	 $.ajax({
			url:"../Model/SMI_HrCompareEmpPerModelByManager.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramBranch":vBranch,"paramStartDate":vSDate,"paramEndDate":vEDate},
			success:function(data2){
				//alert(data2);
				var categories="";
				var dataSeriesSaleAmount="";
				var dataSeriesSaleAmountLastMonth="";
				
				var dataSeriesSaleValue="";
				var dataSeriesSaleValueLastMonth="";
				
				var series="";
				
				//SaleAmount
				//SaleAmountLastMonth
				
				 
				categories+="[";
				dataSeriesSaleAmount+="[";
				dataSeriesSaleAmountLastMonth+="[";
				
				dataSeriesSaleValue+="[";
				dataSeriesSaleValueLastMonth+="[";

				$.each(data2,function(index2,indexEntry2){
					
					if(index2==0){
						categories+="\""+indexEntry2[0]+"\"";
						dataSeriesSaleAmount+="\""+indexEntry2[2]+"\"";
						dataSeriesSaleAmountLastMonth+="\""+indexEntry2[1]+"\"";
						
						dataSeriesSaleValue+="\""+indexEntry2[4]+"\"";
						dataSeriesSaleValueLastMonth+="\""+indexEntry2[3]+"\"";
	
					}else{
						categories+=",\""+indexEntry2[0]+"\"";
						dataSeriesSaleAmount+=",\""+indexEntry2[2]+"\"";
						dataSeriesSaleAmountLastMonth+=",\""+indexEntry2[1]+"\"";
						
						dataSeriesSaleValue+=",\""+indexEntry2[4]+"\"";
						dataSeriesSaleValueLastMonth+=",\""+indexEntry2[3]+"\"";
				
					}

				});
				dataSeriesSaleAmount+="]";
				dataSeriesSaleAmountLastMonth+="]";
				
				dataSeriesSaleValue+="]";
				dataSeriesSaleValueLastMonth+="]";
		
				categories+="]";
				
			
				var objCategories=eval("("+categories+")");
				var objDataSeriesSaleAmount=eval("("+dataSeriesSaleAmount+")");
				var objDataSeriesSaleAmountLastMonth=eval("("+dataSeriesSaleAmountLastMonth+")");
				
				var objDataSeriesSaleValue=eval("("+dataSeriesSaleValue+")");
				var objDataSeriesSaleValueLastMonth=eval("("+dataSeriesSaleValueLastMonth+")");
				
		
				console.log("------------------------------------");
				console.log("---"+objDataSeriesSaleValue);
				console.log("---"+objDataSeriesSaleValueLastMonth);
				
				
				 series=[{
			         	 
			         	 name: "Last Month",
				         name2:"lastMonth",
				         data: objDataSeriesSaleAmountLastMonth,
				         color: 'orange'
				     }, {
				    	 name: "Current",
			         	 name2:"current",
			         	 data: objDataSeriesSaleAmount,
			         	 color: '#007bc3'
				     }];
				
				 //var titleText="Top10-Food:������ѹ��� "+getDayOnDate(vSDate)+" "+getMonthName(getMonthOnDate(vSDate))+" ��"+getYearONDate(vSDate)+" -"+getDayOnDate(vEDate)+" "+getMonthName(getMonthOnDate(vEDate))+" ��"+getYearONDate(vEDate)+"";
				 //createChart_SMI_HrCompareEmpPerModelByManager(graphName,arIndex);
				
			}
		});
	 
	 */
	 createChart_SMI_HrCompareEmpPerModelByManager(graphName,arIndex,graphHeight,paramMachine);
		
	};


	 
	
	
	 
	
	 

	 