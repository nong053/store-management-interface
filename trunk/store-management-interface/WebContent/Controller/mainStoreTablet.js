 $("document").ready(function(){
 	
	$("#contentGraph").shadow();
	$("#tabletHead").shadow();
	
	
		 
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
				if($("#leftMenu").hasClass("expansion")){
				expansionFn();
				}else{
				withdrawFn();	
				}
			});
		
			//Call AjAX to graphByCate-tablet.html
		
			
			
			var callGraphByCate= function(){
				$.ajax({
					url:"../Model/graphByCate-tablet.html",
					type:"get",
					dataType:"html",
					success:function(data){
						//alert(data);
						$("#contentGraph").html(data);
					}
				});
			};
			
			var callGraphByMyView= function(){
				$.ajax({
					url:"../Model/myViewGraph-tablet.html",
					type:"get",
					dataType:"html",
					success:function(data){
						//alert(data);
						$("#contentGraph").html(data);
					}
				});
			};
			
			callGraphByCate();
			
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
			 
			 
});