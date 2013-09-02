//g14

function createChart_SMI_Top10CookingTime(graphName,graphType,graphSeries,graphCategory,arIndex,graphWidth,graphHeight,titleText) {
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
	           position:"rigth"
	     },
	     
	     seriesDefaults: {
	         type: ""+graphType+"",
	         //value default show value on bar chart 
	         labels: {
                visible: true,
               template: " #=addCommas(value) #",
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
	        	 // rotation : -50
	          }
	          
	     },
	     tooltip: {
	         visible: true,
	         template: "#= series.name #: #= addCommas(value) #"
	         }
	     });
};







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
//send branch,year,startWeek,endWeek
//graphName,graphType,arIndex,branchId,yyyy,data[0][1]
/*
function timeStringToFloat(time) {
	  var hoursMinutes = time.split(/[.:]/);
	  var hours = parseInt(hoursMinutes[0], 10);
	  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
	  return hours + minutes / 60;
	}
alert(timeStringToFloat("00:06:35"));
*/
var convertTimeToNumber=function(arhour,arminute,arsecond){
	
	var hour=parseInt(arhour);
	var minute=parseInt(arminute);
	var second=parseInt(arsecond);
	
	if(hour!=0){
		hour=hour*60;
		var sumHour=hour+minute;
		return sumHour+"."+second;
	}else{
		return minute+"."+second;
	}
	
};

//#######################Embed parameter Function start #################
function embedParameterTop10CookingTime(graphName,paramBranch,paramYear,paramMonth){

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
function top10CookingTimeFn(graphName,graphType,arIndex,vBranch,vYear,vMonth,graphWidth,graphHeight){
	
	//#########################set embed parameter for embed default parameter start######################
	embedParameterTop10CookingTime(graphName,vBranch,vYear,vMonth);
	//#########################set embed parameter for embed default parameter end########################
	
	 $.ajax({
			url:"../Model/SMI_Top10CookingTime.jsp",
			type:"POST",
			dataType:"json",
			async:false,
			data:{"paramBranch":vBranch,"paramYear":vYear,"paramMonth":vMonth},
			success:function(data){

				var categoriestop10CookingTime="";
				var dataSeriestop10CookingTimeThisMonth="";
				var dataSeriestop10CookingTimeLastMonth="";
				var series="";
				categoriestop10CookingTime+="[";
				dataSeriestop10CookingTimeThisMonth+="[";
				dataSeriestop10CookingTimeLastMonth+="[";
				
				$.each(data,function(index,indexEntry){
					var TimeThisMonth="";
					var TimeLastMonth="";
					TimeThisMonth=indexEntry[2].split(":");
					TimeLastMonth=indexEntry[3].split(":");
					//alert(TimeThisMonth[0]+"-"+TimeThisMonth[1]+"-"+TimeThisMonth[2]);
					
					
					if(index==0){
						categoriestop10CookingTime+="\""+indexEntry[1]+"\"";
						dataSeriestop10CookingTimeThisMonth+="\""+convertTimeToNumber(TimeThisMonth[0],TimeThisMonth[1],TimeThisMonth[2])+"\"";
						dataSeriestop10CookingTimeLastMonth+="\""+convertTimeToNumber(TimeLastMonth[0],TimeLastMonth[1],TimeLastMonth[2])+"\"";
						
					}else{
						categoriestop10CookingTime+=",\""+indexEntry[1]+"\"";
						dataSeriestop10CookingTimeThisMonth+=",\""+convertTimeToNumber(TimeThisMonth[0],TimeThisMonth[1],TimeThisMonth[2])+"\"";
						dataSeriestop10CookingTimeLastMonth+=",\""+convertTimeToNumber(TimeLastMonth[0],TimeLastMonth[1],TimeLastMonth[2])+"\"";	
					}

				});
				dataSeriestop10CookingTimeLastMonth+="]";
				dataSeriestop10CookingTimeThisMonth+="]";
				categoriestop10CookingTime+="]";
				
				//alert(dataSeriestop10CookingTime);
				//alert(categoriestop10CookingTime);
				
				var objcategoriestop10CookingTime=eval("("+categoriestop10CookingTime+")");
				var objdataSeriestop10CookingTimeThisMonth=eval("("+dataSeriestop10CookingTimeThisMonth+")");
				var objdataSeriestop10CookingTimeLastMonth=eval("("+dataSeriestop10CookingTimeLastMonth+")");

				
				 series=[{
			         	 name: "This Month",
			         	 data: objdataSeriestop10CookingTimeThisMonth
				     },{
			         	 name: "Last Month",
			         	 data: objdataSeriestop10CookingTimeLastMonth
				     }];
				 
				 var titleText="Top10-เวลาปรุงอาหาร(นาที):ของเดือน "+getMonthFullName(vMonth)+" ปี "+vYear+"";
				 
				 createChart_SMI_Top10CookingTime(graphName,graphType,series,objcategoriestop10CookingTime,arIndex,graphWidth,graphHeight,titleText);
			
			}
		});
		
		
	};


	//##################################### Set Parameter Here Start ###############################
	
	var htmlParam_SMI_Top10CookingTime = function(graphNameArea){
		
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
		 					htmlParam+="<button id=\"top10CookingTimeSubmit"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Plot Graph</button>";
		 					htmlParam+="<button id=\"top10CookingTimeCancel"+graphNameArea+"\" class=\"plot_grahp ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only \">Cancel</button>";
		 				htmlParam+="</div>";
		 		htmlParam+="</div>";
		 			
		 			
		 	htmlParam+="</div>";
		 	htmlParam+="</div>";
		 	
		 	return htmlParam;
	};


	var submit_SMI_Top10CookingTime=function(graphNameArea,graphName,graphType,arIndex,graphWidth,graphHeight,paramMachine){
		
		//alert(graphNameArea);
		$("#top10CookingTimeSubmit"+graphNameArea).die("click");
		$("#top10CookingTimeSubmit"+graphNameArea).live("click",function(){
			
			//###################Embead parameter to call embed parameter function start##############
			var paramBranch=$("#paramBranch"+graphNameArea).val();
			var paramYear=$("#paramYear"+graphNameArea).val();
			var paramMonth=$("#paramMonth"+graphNameArea).val();
			embedParameterTop10CookingTime(graphName,paramBranch,paramYear,paramMonth);
			//###################Embead parameter to call embed parameter function start##############
			
			top10CookingTimeFn(graphName,graphType,arIndex,paramBranch,paramYear,paramMonth,graphWidth,graphHeight);
			
			if(paramMachine=="Tablet"){
				$(".ui-icon-closethick").trigger("click");

			}else{
				$("#setting"+graphNameArea).trigger("click");
			}
			
		});
		
		if(paramMachine=="Tablet"){
		$("#top10CookingTimeCancel"+graphNameArea).die("click");
		$("#top10CookingTimeCancel"+graphNameArea).live("click",function(){
			$(".ui-icon-closethick").trigger("click");
		});
		}else{
			
		$("#top10CookingTimeCancel"+graphNameArea).die("click");
		$("#top10CookingTimeCancel"+graphNameArea).live("click",function(){
			$("#setting"+graphNameArea).trigger("click");
			
		});
			
		}
		
		
	};
	/*####################### config dialog for tablet start ###################*/ 
	
	var dialogSetParam_SMI_Top10CookingTimeFn=function(paramTitleSetting){
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
			 
	function manageParamtop10CookingTimeFn(graphNameArea,graphWidth,graphHeight,paramMachine){
		 var graphNameAreaIndexArray=graphNameArea.split("-");
		 var graphName=graphNameAreaIndexArray[0].substring("4");
		 var graphIndex=graphNameAreaIndexArray[1];
		 //alert("hello jquery");
		if($("#"+graphNameArea+"").attr("class")=="graphTop"){
			 
			 $("#"+graphNameArea+"").attr({"class":"graphTop clicked"});
			 
			 if(paramMachine=="Tablet"){
				 $(".areaSettingExternal").remove();
				 $("body").append("<div class=\"areaSettingExternal\"></div>");
			 	 $(".areaSettingExternal").prepend(htmlParam_SMI_Top10CookingTime(graphNameArea));
			 	 $(".setParamForm"+graphNameArea+" .setParamHeader").empty();
			 	 dialogSetParam_SMI_Top10CookingTimeFn(graphName);
			 }else{
				 $("#"+graphNameArea+"").prepend(htmlParam_SMI_Top10CookingTime(graphNameArea));
				 $(".setParamForm"+graphNameArea).slideDown();
			 }
			//#####################check parameter is selected start#########################
				getBranchParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramBranch").text());
				getYearParameterOnly(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramYear").text());
				getMonthParameter(graphNameArea,$("ul.paramDefaultEmbed"+graphName+">li.paramMonth").text());
			//######################check parameter is selected end###########################
			 //create button submit
			 submit_SMI_Top10CookingTime(graphNameArea,graphName,'bar',graphIndex,graphWidth,graphHeight,paramMachine);
			 
			 $(this).die("click");
		 }else{
			
			 $("#"+graphNameArea+"").attr({"class":"graphTop"});
			 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
			 if(paramMachine=="Tablet"){
				 dialogSetParam_SMI_Top10CookingTimeFn(graphName);
			 }else{
			 $(".setParamForm"+graphNameArea).slideUp("1000",function(){
					 $(this).remove();
				 });
			 }
		}
	}
	
	//##################################### Set Parameter Here End ###############################
	