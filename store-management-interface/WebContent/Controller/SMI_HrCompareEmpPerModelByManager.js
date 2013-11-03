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
	function callAsOfDateEmpPerModelAll(graphNameArea,paramStartDate){
		var htmlDropdown="";
		$.ajax({
			url:"../Model/SMI_ManPowerBranchAsOfDate.jsp",
			type:"get",
			dataType:"json",
			//data:{"paramBranch":vBranch},
			async:false,
			success:function(data){
				//alert(data);
				htmlDropdown+="<select class=\"list\" id=\"paramStartDate"+graphNameArea+"\">";
				$.each(data,function(index,indexEntry){
					if(paramStartDate==indexEntry[0]){
						htmlDropdown+="<option value="+indexEntry[0]+" selected>"+indexEntry[0]+"</option>";
					}else{
						htmlDropdown+="<option value="+indexEntry[0]+">"+indexEntry[0]+"</option>";
					}
				});
				htmlDropdown+="</select>";
				//alert(htmlDropdown);
				$("#areaParamStartDate"+graphNameArea).html(htmlDropdown);
				$("#paramStartDate"+graphNameArea).kendoDropDownList();
			}
		});
	}

function createChart_SMI_HrCompareEmpPerModelByManager(graphName,arIndex,objDataHrModelManager,graphHeight,paramMachine){


	var seriesDefaultsFont="";
	var PositionWidth="";
	if(paramMachine=="Tablet"){
		seriesDefaultsFont="13px Tahoma";
		PositionWidth=200;
	}else{
		seriesDefaultsFont="10px Tahoma";
		PositionWidth=150;
	}

	$("#chart"+graphName+"-"+arIndex).empty();
	 $("#chart"+graphName+"-"+arIndex).kendoGrid({
		 	 height: graphHeight,
             dataSource: {
            	 data:objDataHrModelManager,
            	 /*
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
                 
                 ],*/
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
     
     
	 /*find sum value on graph start*/
	 var sum_MDBM_model=0;
	 var sum_MDBM_Acctal=0;
	 var sum_MDBM_Gap=0;
	 var sum_MDBM_NewEmp=0;
	 var sum_MDBM_resign=0;
	 var sum_MDBM_resignPercentage=0;
	 var sum_MDBM_resignAccumulated=0;
	 
	 $("#chart"+graphName+"-"+arIndex+" tbody tr").each(function(){
		 sum_MDBM_model+=parseInt($("td",this).eq(1).text()); 
		 sum_MDBM_Acctal+=parseInt($("td",this).eq(2).text()); 
		 sum_MDBM_Gap+=parseInt($("td",this).eq(3).text()); 
		 sum_MDBM_NewEmp+=parseInt($("td",this).eq(4).text()); 
		 sum_MDBM_resign+=parseInt($("td",this).eq(5).text()); 
		 sum_MDBM_resignPercentage+=parseInt($("td",this).eq(6).text()); 
		 sum_MDBM_resignAccumulated+=parseInt($("td",this).eq(7).text()); 
	 });
     var sumDataHtmlModelByManager="" +
     
     "<tr id=\"sumDataHtmlModelByManager\" style='background:#FEEEBD'>"+
		"<td >รวม</td>"+
		"<td>"+sum_MDBM_model+"</td>"+
		"<td>"+sum_MDBM_Acctal+"</td>"+
		"<td>"+sum_MDBM_Gap+"</td>"+
		"<td>"+sum_MDBM_NewEmp+"</td>"+
		"<td>"+sum_MDBM_resign+"</td>"+
		"<td>"+sum_MDBM_resignPercentage+"%</td>"+
		"<td>"+sum_MDBM_resignAccumulated+"</td>"+
	"</tr>";
     $("tr#sumDataHtmlModelByManager").remove();
     $("#chart"+graphName+"-"+arIndex+" tbody").append(sumDataHtmlModelByManager);
      
     /*find sum value on graph end*/
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
	 $(".k-grid td").css({"padding-left":"2px","padding-right":"2px"});
	//set shadow
	 $(".k-grid").shadow('lifted');
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
					htmlParam+="<b>As of Date</b>";
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
		
		embedParameterHrCompareEmpPerModelByManager(graphName,paramBranch,paramStartDate);
		//###################Embead parameter to call embed parameter function start##############
		
		
		//call function create graph for gernarate new graph
		//HrCompareEmpPerModelByManagerFn
		
		
	         // HrCompareEmpPerModelByManagerFn(graphName,graphType,arIndex,vBranch,vAsOfDate,graphHeight,paramMachine
				HrCompareEmpPerModelByManagerFn(graphName,graphType,arIndex,paramBranch,paramStartDate,graphHeight,paramMachine);
				
				if(paramMachine=="Tablet"){
					$(".ui-icon-closethick").trigger("click");

				}else{
					$("#setting"+graphNameArea).trigger("click");
				}
			
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
function embedParameterHrCompareEmpPerModelByManager(graphName,paramBranch,paramStartDate){

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
		callAsOfDateEmpPerModelAll(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramStartDate").text());
		
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


function HrCompareEmpPerModelByManagerFn(graphName,graphType,arIndex,vBranch,vAsOfDate,graphHeight,paramMachine){
	
	
	//alert("graphName="+graphName);
	//alert("graphType="+graphType);
	//alert("arIndex="+arIndex);
	
	//#########################set embed parameter for embed default parameter start########################
	 embedParameterHrCompareEmpPerModelByManager(graphName,vBranch,vAsOfDate);
	//#########################set embed parameter for embed default parameter end########################
	
	
	 $.ajax({
			url:"../Model/SMI_HrCompareEmpPerModelByManager.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramBranch":vBranch,"paramAsfDate":vAsOfDate},
			success:function(data){
				/*check value is null start*/
				var ModelNum="";
				var AcctalNum="";
				var GapNum="";
				var NewEmpNum="";
				var resignNum="";
				var resignPercentageNum="";
				var resignAccumulatedNum="";
				
				
				/*check value is null end*/
				
				
				var dataHrModelByManager="";
				dataHrModelByManager+="[";
				$.each(data,function(index,indexEntry){
					if(indexEntry[1]==null){
						ModelNum=0;
					}else{
						ModelNum=indexEntry[1];
					}
					
					if(indexEntry[2]==null){
						AcctalNum=0;
					}else{
						AcctalNum=indexEntry[2];
					}
					
					
					if(indexEntry[3]==null){
						GapNum=0;
					}else{
						GapNum=indexEntry[3];
					}
					
					
					if(indexEntry[4]==null){
						NewEmpNum=0;
					}else{
						NewEmpNum=indexEntry[4];
					}
					
					
					if(indexEntry[5]==null){
						resignNum=0;
					}else{
						resignNum=indexEntry[5];
					}
					
					if(indexEntry[6]==null){
						resignPercentageNum=0+"%";
					}else{
						resignPercentageNum=parseInt(indexEntry[6])+"%";
					}
					
					if(indexEntry[7]==null){
						resignAccumulatedNum=0;
					}else{
						resignAccumulatedNum=indexEntry[7];
					}

					
					if(index==0){
						dataHrModelByManager+="{";
					}else{
						dataHrModelByManager+=",{";
					}
					/*
					var AcctalNum="";
					var GapNum="";
					var NewEmpNum="";
					var resignNum="";
					var resignPercentageNum="";
					var resignAccumulatedNum="";
					*/
					dataHrModelByManager+="\"Position\":\""+indexEntry[0]+"\",";
					dataHrModelByManager+="\"Model\":"+ModelNum+",";
					dataHrModelByManager+="\"Acctal\":"+AcctalNum+",";
					dataHrModelByManager+="\"Gap\":"+GapNum+",";
					dataHrModelByManager+="\"NewEmp\":"+NewEmpNum+",";
					dataHrModelByManager+="\"resign\":"+resignNum+",";
					dataHrModelByManager+="\"resignPercentage\":\""+resignPercentageNum+"\"," ;
					dataHrModelByManager+="\"resignAccumulated\":"+resignAccumulatedNum+"";
					
					dataHrModelByManager+="}";
					
				});
				dataHrModelByManager+="]";
				var objDataHrModelManager=eval("("+dataHrModelByManager+")");
				
				createChart_SMI_HrCompareEmpPerModelByManager(graphName,arIndex,objDataHrModelManager,graphHeight,paramMachine);
			}
		});
	 
	 
	 //createChart_SMI_HrCompareEmpPerModelByManager(graphName,arIndex,graphHeight,paramMachine);
		
	};


	 
	
	
	 
	
	 

	 