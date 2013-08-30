	/*
	 
	 $( ".delFav" ).click(function() {
		 if(confirm("Do you want to remove form myview?")){
			 
		 }
	 });
	//define shadow border
	 $('.graphBoxArea').shadow('lifted');
	 
	//define kendoDropDown
	 $('.listSequence').kendoDropDownList();
	 
function createChart2() {
	 $(".chart").kendoChart({
		  chartArea: {
			    width: 480,
			    height:250
			  },
	     title: {
	         text: "Site Visitors Stats /thousands/"
	     },
	     legend: {
	         visible: false
	     },
	     seriesDefaults: {
	         type: "bar"
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
	
	 
	 //click seting
	 //$(document).on("click",".setting",function(){
	 $(".setting").live("click",function(){
		 
	 if($("#graph1").attr("class")=="graphTop"){
		 $("#graph1").attr({"class":"graphTop clicked"});
		 var htmlParam ="";
		 htmlParam+="<div id=\"setParam\">";
		 
	
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
	
		 
		 htmlParam+="</div>";
		 
		 $("#graph1").prepend(htmlParam);
		 $("#setParam").slideDown();
		 
	 }else{
		 $("#graph1").attr({"class":"graphTop"});
		 //$("#graph1").prepend("<div id=\"setParam\">Set Parameter</div>");
		 $("#setParam").slideUp("1000",function(){
				 $(this).remove();
			 });

		 }
	
	 });
*/