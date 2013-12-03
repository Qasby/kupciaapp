
	var jsone = new Array();
	var dupa = new Array();
	dupa[0] = "kupa";
	var d = new Date();
	var n = d.getDay();
	var dzien = "week";
	if(n == 6) dzien = "sat";
	if(n == 7) dzien = "sun";
	var bussys = new Array();
	    $.ajax({
        type: "POST",
        url: "http://sob.xaa.pl/zurawcia/zdmikp/generate.php",
        dataType : 'json',
		success : function(json)
		{
			kupa(json);
		
		},

        //tutaj będziemy odbierać dane w postaci json
    });
	function kupa(json)
	{
		jQuery.each(json[dzien],function(entrye, texte) {
			jQuery.each(json[dzien][entrye],function(entry, text) {
			//console.log("Godzina " + entrye + " BUS " + text);
			bussys.push(convertToMin(entrye, parseInt(text))); // = 50
			
			});
	});
	
	$(document).ready(test);
	
	console.log("wykonanie");
	}



function test()
{
			//alert( jsone['week'][7]);
		//	alert( bussys[0]);
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	
	var minut = convertToMin(h, m);
	
	var hour = reConvertHour(minut);
	var hour_min = reConvertMin(minut);
	
	$("#next_bus").html("W minutach to będzie: " + minut + "Godzina to :" + hour + " " + hour_min);
	//$("#next_bus2").html("<br>Następny autobus masz za: " + zaIle + " Minut");
	searchBuss(minut, bussys);
$( "input[type=submit]" ).click(function( event ) {
  var text = $( "input[name=bus_time]" ).val();
  if(text == "") return false;

	var regex = /([0-9]{1,2}):([0-9]{1,2})/;
	match = regex.exec(text);
	console.log(match[1], match[2]);
	var zmienna = convertToMin(parseInt(match[1]), parseInt(match[2]));
	console.log("chuj " + bussys[0])
	
	searchBuss(zmienna, bussys);
	
return false;
});
}



function convertToMin(godzina, minut)
{
	//console.log((godzina*60)+minut);
	return (godzina*60)+minut;
}

function reConvertHour(minut)
{
	var min;
	min = minut%60;
	
	
	return (minut-min)/60;

}
function reConvertMin(minut)
{
	
	return minut%60;

}
function searchBuss(miner, tabela)
{
	
	var iler = 0;
	var iear;
	$(".next_bus3").remove();
	console.log("teraz wyn " + bussys.length);
	for (iear = 0; iear < bussys.length; iear++)
	{
		console.log(bussys[iear] + " iear " + iear);
		if(bussys[iear] >= miner)
		{
			
			$("#next_bus2").append("<div class='next_bus3'>Masz busa o " + reConvertHour(bussys[iear]) + " Minut " + reConvertMin(bussys[iear]) + "<br></div>");
			iler++;
			//console.log(bussys[iear] + ">=" + miner + " iear " + iear);
			if(iler == 3) break;
			
		}
	
	}
	if(!iler) return searchBuss(0);


}
function sortResults(prop, asc) {
    bussys = bussys.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
}



