$("document").ready(function(){
//	/alert("hello jquery");
	$("#contentGraph").shadow();
	$("#tabletHead").shadow();
	
	function createChart() {
		 $(".chart").kendoChart({
			  chartArea: {
				    width: 1000,
				    height:500
				  },
		     title: {
		         text: "Site Visitors Stats /thousands/"
		     },
		     legend: {
		         visible: false
		     },
		     seriesDefaults: {
		         type: "column"
		     },
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
		         categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		         majorGridLines: {
		             visible: false
		         }
		     },
		     tooltip: {
		         visible: true,
		         template: "#= series.name #: #= value #"
		         }
		     });
		 }
		 
		 createChart();
		 
		
			
			
			 $(".setting").live("click",function(){
					
				 var htmlParameter = function(){
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
			 		
					 	htmlParam+="</table>";
					 	htmlParam+="</div>";
					 		htmlParam+="<div class=\"btnArea\">";
					 			htmlParam+="<div class=\"btn\">";
					 			htmlParam+="<br style=\"clear:both\">";
					 				htmlParam+="<button class=\"ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\">Plot Graph</button>";
					 				htmlParam+="</div>";
					 			htmlParam+="</div>";
					 	htmlParam+="</div>";
					 	htmlParam+="</div>";
					 	
					 	return htmlParam;
				 };
				 if($("#graph1").attr("class")=="graphTop"){
					 $("#graph1").attr({"class":"graphTop clicked"});
					 
					 /*	 htmlParam+="<div id=\"setParam\">";
					 
				
					htmlParam+="<table>";
					htmlParam+="<tr>";
					htmlParam+="<td>";
					htmlParam+="paramter1";
					htmlParam+="</td>";
					htmlParam+="<td>";
					htmlParam+="<input type=\"text\" name=\"name1\" id=\"name1\">";
					htmlParam+="</td>";
					htmlParam+="</tr>";
					htmlParam+="<tr>";
					htmlParam+="<td>";
					htmlParam+="paramter2";
					htmlParam+="</td>";
					htmlParam+="<td>";
					htmlParam+="<input type=\"text\" name=\"name2\" id=\"name2\">";
					htmlParam+="</td>";
				    htmlParam+="</tr>";
					htmlParam+="<tr>";
					htmlParam+="<td>";
					htmlParam+="paramter3";
					htmlParam+="</td>";
					htmlParam+="<td>";
					htmlParam+="<input type=\"text\" name=\"name3\" id=\"name3\">";
					htmlParam+="</td>";
				    htmlParam+="</tr>";
					htmlParam+="<tr>";
					htmlParam+="<td colspan=\"2\">";
					htmlParam+="<button>Plot Graph</button>";
					htmlParam+="</td>";
					htmlParam+="</tr>";
					htmlParam+="</table>";
					
					htmlParam+="";
					 
					 htmlParam+="</div>";
					 */
					

					 
					 $("#graph1").prepend(htmlParameter());
					 $("#setParam").slideDown();
					 $("#setParam").shadow();
					 $(".date").datepicker();
					 $(".list").kendoDropDownList();
					 $(".ui-button").css({"padding":"5px"});
					 
				 }else{
					 $("#graph1").attr({"class":"graphTop"});
					 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
					 $("#setParam").slideUp("1000",function(){
							 $(this).remove();
						 });

					 }
				
				 });
			 
			 //dialog start
			 $( "#dialog" ).dialog({
				 autoOpen: false,
				 show: {
				 effect: "blind",
				 duration: 1000
				 },
				 hide: {
				 effect: "explode",
				 duration: 1000
				 },
				 width: 370,
				 modal: true
			 });
			 
			 
			 $( ".addMyView" ).click(function() {
				 $( "#dialog" ).dialog( "open" );
				 $(".ui-dialog .ui-dialog-content").css({"padding":"0px"});
			 });

			 //dialog end
			 
});