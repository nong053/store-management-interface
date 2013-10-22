
<script src="js/jquery.min.1.7.1.js"></script>
<script>
	$(document).ready(function() {
		var yearTest = new Array();
		var nameTest = new Array();
		var cate = "";
		var seriesData = new Array();
		var seriesName = "";
		
		$.ajax({
			url : "./Model/wu_name_year.jsp",
			type : "get",
			dataType : "json",
			async : false,
			success : function(data) {
				var yearArray = data[0][1].split(",");
				var nameArray = data[0][0].split(",");

				cate += "[";
				for ( var i = 0; i < yearArray.length; i++) {
					//alert(yearArray[i]);
					//categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011]
					if (i == 0) {
						cate += yearArray[i];
					} else {
						cate += "," + yearArray[i];
					}
				}
				cate += "]";
				alert(cate);

				for ( var i = 0; i < nameArray.length; i++) {
					//alert(nameArray[i]);
					/*
					[{
					   
						name: "India",
					    data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
					},{
					    name: "World",
					    data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
					}]
					 */
					 //if(i==0){
						$.ajax({
							url : "./Model/wu_All.jsp",
							type : "get",
							dataType : "json",
							async : false,
							data : {
								"paramName" : nameArray[i]
							},
							success : function(data) {
								
								//alert(data);
								for(var i=0;i<yearArray.length;i++){
									//alert("all year="+yearArray[i]);
									seriesData[i]=0;
									$.each(data,function(index,indexEntry){
										//alert("year="+indexEntry[3]);
										if(indexEntry[3]==yearArray[i]){
											seriesData[i]=indexEntry[4];
										}

									});
								}
								
								alert(seriesData);
								
							}
						});
				
					//}//for

				}
				
			}

		});

	});
</script>
