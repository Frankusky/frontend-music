// Javascript Code.

function SortElements(){
	var colors = new Array("red","blue","green");
	colors.sort();
	var cj = colors.join(", ");
	alert("The sorted array contains: " + cj);
}
$(document).ready(function(){
	var sortInput = document.getElementById("typeOrderID");
	var dataInput = document.getElementById("dataTypeID");
	$(".button").click(function(){
		//alert("Im a uggly test message!");
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
								$(".results").append("<div class=\"result\"><br><span class=\"topNumber\">#"+(i+1)+"</span><img class=\"albumImage\" src=\""+imageList[index]+"\" align=\"right\"><span>Track: </span> "+trackList[index]+"<br><span>Artist: </span> "+artistList[index]+"<br><span>Played: </span> "+playcountList[index]+" times!<br><span>Length: </span> "+durationList[index]+"</div><br>");
							};
						}else if(orderValue=="des"){
							for (var i =49; i>=0;i--){
								var index = sortedIndex[i];
								$(".results").append("<div class=\"result\"><br><span class=\"topNumber\">#"+(i+1)+"</span><img class=\"albumImage\" src=\""+imageList[index]+"\" align=\"right\"><span>Track: </span> "+trackList[index]+"<br><span>Artist: </span> "+artistList[index]+"<br><span>Played: </span> "+playcountList[index]+" times!<br><span>Length: </span> "+durationList[index]+"</div><br>");
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
