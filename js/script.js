// Javascript Code.

$(document).ready(function(){
	jQuery(document).ready(function($) { 
		$.ajax({ 
			url : "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=85b8c37b1a6be5182a5ed0549c4a7400&format=json", 
			dataType : "jsonp", 
			success : function(parsed_json) { 
				for(var i = 0; i<50; i++){
					if (parsed_json["tracks"]["track"][i]["image"]){
						var imagen = parsed_json["tracks"]["track"][i]["image"][2]["#text"];
					}else{
						var imagen = "images/notfound.png";
					};

					$(".results").append("<div class=\"result span8\"><br><img class=\"albumImage img-polaroid\" src=\""+imagen+"\" align=\"right\"><span class=\"topNumber span1\">#"+(i+1)+"</span><div class=\"span4\"><span>Track: </span> "+parsed_json["tracks"]["track"][i]["name"]+"<br><span>Artist: </span> "+parsed_json["tracks"]["track"][i]["artist"]["name"]+"<br><span>Played: </span> "+parsed_json["tracks"]["track"][i]["playcount"]+" times!<br><span>Length: </span> "+parsed_json["tracks"]["track"][i]["duration"]+"</div></div><br>");
				};
			} 
		}); 
	});

	var sortInput = document.getElementById("typeOrderID");
	var dataInput = document.getElementById("dataTypeID");
	$(".button").click(function(){
		$(".results").empty();

		var trackList = new Array(); //guardara los titulos de las canciones
		var artistList = new Array();//guardara los nombres de los artistas
		var imageList = new Array();//guardara las portadas de albums
		var playcountList = new Array(); //guardara la cantidad de veces reproducidas
		var durationList = new Array(); //guardara la duracion de la cancion

		var sortedList = new Array();//guardara y ordenara las variables de alguna lista
		var sortedIndex = new Array();//guardara los index
		var orderValue = sortInput.options[sortInput.selectedIndex].value;
		var dataValue = dataInput.options[dataInput.selectedIndex].value;

		if (orderValue!="nothing" && dataValue!="nothing"){
			jQuery(document).ready(function($) {
				$.ajax({ 
					url : "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=85b8c37b1a6be5182a5ed0549c4a7400&format=json", 
					dataType : "jsonp", 
					success : function(parsed_json) {
						//Leer datos y meterlos a una lista
						for (var i =0; i<50;i++){
							trackList.push(parsed_json["tracks"]["track"][i]["name"]);
							artistList.push(parsed_json["tracks"]["track"][i]["artist"]["name"]);
							playcountList.push(parsed_json["tracks"]["track"][i]["playcount"]);
							durationList.push(parsed_json["tracks"]["track"][i]["duration"]);
							if (parsed_json["tracks"]["track"][i]["image"]){
								imageList.push(parsed_json["tracks"]["track"][i]["image"][2]["#text"]);
							}else{
								imageList.push("images/notfound.png");
							}
						};
						if (dataValue=="duration"){
							sortedList = durationList.slice(0).sort(function(a,b) { return a - b; }); //crear un duplicado sin que quede conectado al original
							for (var i=0; i<durationList.length ; i++){
								sortedIndex.push(durationList.indexOf(sortedList[i]));
							};
						}else if(dataValue=="playcounts"){
							sortedList = playcountList.slice(0).sort(function(a,b) { return a - b; });
							for (var i=0; i<playcountList.length ; i++){
								sortedIndex.push(playcountList.indexOf(sortedList[i]));
							};
						}else if(dataValue=="tracksname"){
							sortedList = trackList.slice(0).sort();
							for (var i=0; i<trackList.length ; i++){
								sortedIndex.push(trackList.indexOf(sortedList[i]));
							};
						}else if(dataValue=="artistname"){
							sortedList = artistList.slice(0).sort();
							for (var i=0; i<artistList.length ; i++){
								sortedIndex.push(artistList.indexOf(sortedList[i]));
							};
						};
						if (orderValue=="asc"){
							for (var i =0; i<50;i++){
								var index = sortedIndex[i];
								$(".results").append("<div class=\"result span8\"><br><img class=\"albumImage img-polaroid\" src=\""+imageList[index]+"\" align=\"right\"><span class=\"topNumber span1\">#"+(i+1)+"</span><div class=\"span4\"><span>Track: </span> "+trackList[index]+"<br><span>Artist: </span> "+artistList[index]+"<br><span>Played: </span> "+playcountList[index]+" times!<br><span>Length: </span> "+durationList[index]+"</div></div><br>");
							};
						}else if(orderValue=="des"){
							for (var i =49; i>=0;i--){
								var index = sortedIndex[i];
								$(".results").append("<div class=\"result span8\"><br><img class=\"albumImage img-polaroid\" src=\""+imageList[index]+"\" align=\"right\"><span class=\"topNumber span1\">#"+(i+1)+"</span><div class=\"span4\"><span>Track: </span> "+trackList[index]+"<br><span>Artist: </span> "+artistList[index]+"<br><span>Played: </span> "+playcountList[index]+" times!<br><span>Length: </span> "+durationList[index]+"</div></div><br>");
							};
						};
					}//success
				});//ajax

			}); //jquery ready

		}else if(orderValue=="nothing" && dataValue=="nothing"){
			alert("Error! You must choose a data to show and the sorting mode before.");
		}else if(orderValue=="nothing" && dataValue!="nothing"){
			alert("Error! You forgot to choose the sorting mode.");
		}else if(orderValue!="nothing" && dataValue=="nothing"){
			alert("Error! You forgot to choose the data to show.");
		};

	});//onchange
});//document ready
