	 $( "#dialog" ).dialog({
		 autoOpen: false,
		 show: {
		 effect: "blind",
		 duration: 1000
		 },
		 hide: {
		 effect: "explode",
		 duration: 1000
		 }
	 });
	 
	 $( ".addFav" ).live("click",function() {
		 $( "#dialog" ).dialog( "open" );
		 $(".ui-dialog .ui-dialog-content").css({"padding":"0px"});
	 });
	//define shadow border
	 $('.graphBoxArea').shadow('lifted');
	 //create graph type function Start
	 
	 //create graph type function end

	 