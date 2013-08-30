alert("hello");
$(document).ready(function(){
		
		function createChart() {
			 $(".chart").kendoChart({
				  chartArea: {
					    width: 950,
					    height:400
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
		
		$(".touchslider-demo").touchSlider({mouseTouch: true});
		
		/*######################################Define UserName Start############################################*/
		var userLogin="";
		userLogin="N0001";
		/*######################################Define UserName End############################################*/
		//######################Function Expantion left menu start##########################
		var expansionFn = function(){
			
			$("#leftMenu").animate({"left":"0px"});
			$("#leftMenu").removeClass("expansion");
			$("#leftMenu").addClass("withdraw");
		};
		var withdrawFn= function(){
			$("#leftMenu").animate({"left":"-250px"});
			$("#leftMenu").removeClass("withdraw");
			$("#leftMenu").addClass("expansion");
		};
		
		
		$("#btHideShow").click(function(){
			//get count new myview 
			countMyViewFn();
			if($("#leftMenu").hasClass("expansion")){
			expansionFn();
			}else{
			withdrawFn();	
			}
		});
		//######################Function Expansion left menu end##########################
		//######################Function Expansion sub graph start########################
		var expansionSubGraphFn = function(){
			
			$("#boxSubGraph").animate({"left":"0px"});
			$("#boxSubGraph").removeClass("expansionSubGraph");
			$("#boxSubGraph").addClass("withdrawSubGraph");
		};
		var withdrawSubGraphFn= function(){
			$("#boxSubGraph").animate({"left":"-140px"});
			$("#boxSubGraph").removeClass("withdrawSubGraph");
			$("#boxSubGraph").addClass("expansionSubGraph");
		};
		
		
		$("#boxSubGraph").click(function(){
			if($("#boxSubGraph").hasClass("expansionSubGraph")){
				expansionSubGraphFn();
			}else{
				withdrawSubGraphFn();	
			}
		});
		//######################Function Expansion sub graph end########################
		
		
		$("#cate1").click(function(){
			callGraphByCate();
			withdrawFn();
			$(".setting").die("click");
		});
		
		$("#myViewCate").click(function(){
			callGraphByMyView();
			withdrawFn();
			$(".setting").die("click");
		});
		
		//#####################Function Expantion left menu start###########################
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
		 
		 
		//function num amount graph in myview start
			var countMyView="";
			var countMyViewFn= function(){
				 
			$.ajax({
				url:"../Model/countGrMyView.jsp",
				type:"get",
				dataType:"json",
				async:false,
				data:{"paramUserLogin":userLogin},
				success:function(data){
					//console.log(data[0][0]);
					if(data[0][0]){
						countMyView= data[0][0];
					}else{
						countMyView= 0;
					}
					
				}
				
			});
			
			};
			countMyViewFn();
		//Left Menu Hide Show Start
			var createMenuLeft = function(){
				
				var htmlMenuLeft="" +
						"<div id=\"boxContent\">" +
							"<ul>" +
								"<li class=\"selected\" id=\"mainMenu\">Main Menu</li>";
								
								$.ajax({
									url:"../Model/ui_SMI_ListAllCategory.jsp",
									type:"get",
									dataType:"json",
									async:false,
									success:function(data){
										//alert(data);
										$.each(data,function(index,EntryIndex){
											
											$.ajax({
												url:"../Model/ui_SMI_ListGraphOfCategory.jsp",
												type:"POST",
												dataType:"json",
												async:false,
												data:{"paramCateName":EntryIndex[0]},
												success:function(data){
													htmlMenuLeft+="<li class=\"cateGraph\" id=\""+EntryIndex[0]+"\"><a href=\"#\">"+EntryIndex[0]+"("+data.length+")</a></li>";
												}
											});
											
										});
									}
								});
								
								htmlMenuLeft+="<li class=\"cateGraph\" id=\"cateView\"><a href=\"#\">Favorite("+countMyView+")</a></li>" +
							"</ul>" +
						"</div>" +
						"";
				 return htmlMenuLeft;
			};
			
			//alert(createMenuLeft());
			$("#leftMenu").html(createMenuLeft());
			//Left Menu Hide Show End
			
			/*###################Create layout####################*/
			var createLayoutGraphNotReturn = function(){
				
				var htmlLayoutGraph="" +
						"<div class=\"touchslider-item\">" +
							"<div class=\"contentGraph\">" +
								"<div class=\"graphTop\" id=\"graph1\">" +
									"<div id=\"settingArea\">" +
										"<div class=\"setting\">" +
										"<span class=\"ui-icon ui-icon-gear\"></span>" +
										"</div>" +
									"</div>" +
									"<div id=\"chartArea\">" +
										"<div class=\"chart\"></div>" +
									"</div>" +
								"</div>" +
								"<div class=\"graphBottom\">" +
									"<div class=\"graphDetail\">" +
									"สรุปยอดจำหน่าย ประจำเดือนเมษายน 2556" +
									"</div>" +
									"<div class=\"graphAddFav\" style=\"text-align:right\">" +
										"<button class=\"addMyView ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only\" >Add MyView</button>" +
									"</div>" +
								"</div>" +
							"</div>" +
						"</div>";
				
				
				alert(htmlLayoutGraph);
			//$("#contentGraph").append(htmlLayoutGraph);
			//$(".graphDetail").css({"margin":"5px"});
			};
			
		
	});