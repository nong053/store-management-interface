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

function createChart_SMI_HrCompareEmpPerModel(graphName,arIndex,graphHeight,objDataHrModelAll,paramMachine){


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
            	 data:objDataHrModelAll,
                 /*
            	 data: [{    "Position":"ผจก.บริหาร/ผู้เชี่ยวชาญ",
		                	 "Model":"299",
		                	 "Acctal":"262",
		                	 "Gap":"37",
		                	 "NewEmp":"20",
		                	 "resign":"16",
		                	 "resignPercentage":"6.00%", 
		                	 "resignAccumulated":"58"
		                 },
		                 {   "Position":"แคชเชียร์/HDD Master",
		                	 "Model":"188",
		                	 "Acctal":"166",
		                	 "Gap":"22",
		                	 "NewEmp":"20",
		                	 "resign":"6",
		                	 "resignPercentage":"4.00%", 
		                	 "resignAccumulated":"32"
			              },
			              {  "Position":"หัวหน้าหน่วยอาวุโส",
		                	 "Model":"83",
		                	 "Acctal":"69",
		                	 "Gap":"14",
		                	 "NewEmp":"20",
		                	 "resign":"2",
		                	 "resignPercentage":"2.89%", 
		                	 "resignAccumulated":"4"
				           },
			              {  "Position":"หัวหน้าหน่วย",
		                	 "Model":"538",
		                	 "Acctal":"445",
		                	 "Gap":"93",
		                	 "NewEmp":"20",
		                	 "resign":"8",
		                	 "resignPercentage":"1.79%", 
		                	 "resignAccumulated":"43"
				           },
			              {  "Position":"พนักงานระดับกลาง",
		                	 "Model":"669",
		                	 "Acctal":"555",
		                	 "Gap":"114",
		                	 "NewEmp":"20",
		                	 "resign":"12",
		                	 "resignPercentage":"2.16%", 
		                	 "resignAccumulated":"76"
				           },
			              {  "Position":"พนักงานระดับต้น",
		                	 "Model":"1541",
		                	 "Acctal":"1515",
		                	 "Gap":"26",
		                	 "NewEmp":"20",
		                	 "resign":"203",
		                	 "resignPercentage":"13.39%", 
		                	 "resignAccumulated":"990"
				           },
			              {  "Position":"พนักงาน Partime",
		                	 "Model":"636",
		                	 "Acctal":"235",
		                	 "Gap":"42",
		                	 "NewEmp":"20",
		                	 "resign":"118",
		                	 "resignPercentage":"50.21%", 
		                	 "resignAccumulated":"701"
		                		 
			           },{  "Position":"นักเรียนทวื/ศูนย์",
		                	 "Model":"636",
		                	 "Acctal":"443",
		                	 "Gap":"42",
		                	 "NewEmp":"20",
		                	 "resign":"0",
		                	 "resignPercentage":"0.00%", 
		                	 "resignAccumulated":"0"
				      },{  "Position":"รวม",
				    	   "Model":"3,954",
				    	   "Acctal":"3690",
				    	   "Gap":"264",
				    	   "NewEmp":"160",
				    	   "resign":"365",
				    	   "resignPercentage":"9.89%", 
				    	   "resignAccumulated":"1904"
				      }
                 
                 ]
                 ,*/
                // pageSize: 10
             },
             groupable: false,
             sortable: false,
             /*
             pageable: {
                 refresh: true,
                 pageSizes: true
             },
             */
             columns: [ {
                     field: "Position",
                     width: PositionWidth,
                     title: "<center><b>ตำแหน่ง</b></center>"
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

var htmlParam_SMI_HrCompareEmpPerModel = function(graphNameArea){
	
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
					htmlParam+="<b>As of Date Date</b>";
				htmlParam+="</td>";
				htmlParam+="<td id=\"areaParamStartDate"+graphNameArea+"\">";
				/*
					htmlParam+="<input type=\"text\" name=\"paramStartDate"+graphNameArea+"\" id=\"paramStartDate"+graphNameArea+"\" class=\"date\">";
	 			*/
	 			htmlParam+="</td>";
	 		htmlParam+="</tr>";
	 		
	 	
	 		
	 	htmlParam+="</table>";
	 	
	 	htmlParam+="</div>";
	 	
	 		htmlParam+="<div class=\"btnArea\">";
	 				htmlParam+="<div class=\"btn\">";
	 					htmlParam+="<button id=\"HrCompareEmpPerModelSubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
	 					htmlParam+="<button id=\"HrCompareEmpPerModelCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
	 				htmlParam+="</div>";
	 		htmlParam+="</div>";
	 			
	 			
	 	htmlParam+="</div>";
	 	htmlParam+="</div>";
	 	
	 	return htmlParam;
};


var submit_SMI_HrCompareEmpPerModel=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
	//HrCompareEmpPerModelSubmitareaHrCompareEmpPerModel-0
	//alert(graphNameArea);
	$("#HrCompareEmpPerModelSubmit"+graphNameArea).die("click");
	$("#HrCompareEmpPerModelSubmit"+graphNameArea).live("click",function(){
		
		//###################Embead parameter to call embed parameter function start##############
		var paramBranch=$("#paramBranch"+graphNameArea).val();
		var paramStartDate=$("#paramStartDate"+graphNameArea).val();
		
		embedParameterHrCompareEmpPerModel(graphName,paramBranch,paramStartDate);
		//###################Embead parameter to call embed parameter function start##############
		
		
		//call function create graph for gernarate new graph
		//HrCompareEmpPerModelFn
		//var startDate = paramStartDate.split("-");
		
		
		//if((parseInt(startDate[0])==parseInt(endDate[0]))&&((parseInt(startDate[1]))==parseInt(endDate[1]))){//check 
			
				HrCompareEmpPerModelFn(graphName,graphType,arIndex,paramBranch,paramStartDate,graphWidth,graphHeight,paramMachine);
				
				if(paramMachine=="Tablet"){
					$(".ui-icon-closethick").trigger("click");

				}else{
					$("#setting"+graphNameArea).trigger("click");
				}
			
			/*
		}else{
			alert("Unable to select over month");
		}
		*/
	});
	
	if(paramMachine=="Tablet"){
	$("#HrCompareEmpPerModelCancel"+graphNameArea).die("click");
	$("#HrCompareEmpPerModelCancel"+graphNameArea).live("click",function(){
		$(".ui-icon-closethick").trigger("click");
	});
	}else{
		
	$("#HrCompareEmpPerModelCancel"+graphNameArea).die("click");
	$("#HrCompareEmpPerModelCancel"+graphNameArea).live("click",function(){
		$("#setting"+graphNameArea).trigger("click");
		
	});
		
	}
	
	
};
/*####################### config dialog for tablet start ###################*/ 
var dialogSetParam_SMI_HrCompareEmpPerModelFn=function(paramTitleSetting){
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
function embedParameterHrCompareEmpPerModel(graphName,paramBranch,paramStartDate){

	var paramDefaultEmbedHtml="" +
	"<ul style=\"display:none\" class=\"paramDefaultEmbed"+graphName+"\">"+graphName+"" +
		"<li class=\"paramBranch\">"+paramBranch+"</li>" +
		"<li class=\"paramStartDate\">"+paramStartDate+"</li>" +
		
	"</ul>";

	$(".paramDefaultEmbed"+graphName).remove();
	$("body").append(paramDefaultEmbedHtml);
	//Embed Default Parameter end
}
//#######################Embed parameter Function end #################

function manageParamHrCompareEmpPerModelFn(graphNameArea,graphWidth,graphHeight,paramMachine){
	 var graphNameAreaIndexArray=graphNameArea.split("-");
	 var graphName=graphNameAreaIndexArray[0].substring("4");
	 var graphIndex=graphNameAreaIndexArray[1];
	 
	 
	 
	if($("#"+graphNameArea+"").attr("class")=="graphTop"){
		 
		 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
		 
		 if(paramMachine=="Tablet"){
			 $(".areaSettingExternal").remove();
			 $("body").append("<div class=\"areaSettingExternal\"></div>");
		 	 $(".areaSettingExternal").prepend(htmlParam_SMI_HrCompareEmpPerModel(graphNameArea));
		 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
		 	 dialogSetParam_SMI_HrCompareEmpPerModelFn(graphName);
		 }else{
			 $("#"+graphNameArea+"").prepend(htmlParam_SMI_HrCompareEmpPerModel(graphNameArea));
			 
			 
			 $(".setParamForm"+graphNameArea).slideDown();
		 }
		
		
		 //create button submit
		 //#####################check parameter is selected start#########################
		getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
		getStartDateParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text(),paramMachine);
		
		//######################check parameter is selected end###########################
		 submit_SMI_HrCompareEmpPerModel(graphNameArea,graphName,'column',graphIndex,graphWidth,graphHeight,paramMachine);
		 
		 $(this).die("click");
	 }else{
		
		 $("#"+graphNameArea+"").attr({"class":"graphTop"});
		 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
		 if(paramMachine=="Tablet"){
			 dialogSetParam_SMI_HrCompareEmpPerModelFn(graphName);
		 }else{
		 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
				 $(this).remove();
			 });
		 }
	}
}


function HrCompareEmpPerModelFn(graphName,graphType,arIndex,vBranch,asOfDate,graphHeight,paramMachine){
	//graphName,graphType,arIndex,vBranch,asOfDate,graphHeight,paramMachine
	
	//alert("graphName="+graphName);
	//alert("graphType="+graphType);
	//alert("arIndex="+arIndex);
	
	//#########################set embed parameter for embed default parameter start########################
	embedParameterHrCompareEmpPerModel(graphName,vBranch,asOfDate);
	//#########################set embed parameter for embed default parameter end########################
	
	
	 $.ajax({
			url:"../Model/SMI_HrCompareEmpPerModel.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramBranch":vBranch,"paramStartDate":asOfDate},
			success:function(data){
				
				var dataHrModelAll="";
				dataHrModelAll+="[";
				$.each(data,function(index,indexEntry){
					
					if(index==0){
						dataHrModelAll+="{";
					}else{
						dataHrModelAll+=",{";
					}
					
					
					dataHrModelAll+="\"Position\":\""+indexEntry[0]+"\",";
					dataHrModelAll+="\"Model\":"+indexEntry[1]+",";
					dataHrModelAll+="\"Acctal\":"+indexEntry[2]+",";
					dataHrModelAll+="\"Gap\":"+indexEntry[3]+",";
					dataHrModelAll+="\"NewEmp\":"+indexEntry[4]+",";
					dataHrModelAll+="\"resign\":"+indexEntry[5]+",";
					dataHrModelAll+="\"resignPercentage\":"+indexEntry[6]+"," ;
					dataHrModelAll+="\"resignAccumulated\":"+indexEntry[7]+"";
					
					dataHrModelAll+="}";
					
				});
				dataHrModelAll+="]";
				var objDataHrModelAll=eval("("+dataHrModelAll+")");
				//console.log(objDataHrModelAll);
				
				 //var titleText="Top10-Food:������ѹ��� "+getDayOnDate(vSDate)+" "+getMonthName(getMonthOnDate(vSDate))+" ��"+getYearONDate(vSDate)+" -"+getDayOnDate(vEDate)+" "+getMonthName(getMonthOnDate(vEDate))+" ��"+getYearONDate(vEDate)+"";
				 //createChart_SMI_HrCompareEmpPerModel(graphName,arIndex,objDataHrModelAll);
				 createChart_SMI_HrCompareEmpPerModel(graphName,arIndex,graphHeight,objDataHrModelAll,paramMachine);
				
			}
		});
	 
	 
	// createChart_SMI_HrCompareEmpPerModel(graphName,arIndex,graphHeight,paramMachine);
		
	};


	 
	
	
	 
	
	 

	 