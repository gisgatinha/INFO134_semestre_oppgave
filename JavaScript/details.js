
// Konstruktør: Funksjon som laste inn datasettene
var Datasett = function(URL) {
	this.data = {}

	//laster inn datasettet
	this.loadIt = async function load() {
		const response = await fetch(URL);
		this.data = await response.json();

		if (typeof this.onload === "function")
			this.onload()
	}
	//returnerer en liste av kommunenavn
	this.getNames = function() {
		var kommuneliste = Object.keys(this.data.elementer);
		return kommuneliste;
	}
	//returnerer en liste av kommunenummer
	this.getIDs = function() {
		var kommuner = Object.values(this.data.elementer);
		var IDer = kommuner.map((kommune) => kommune.kommunenummer);
		return IDer
	}
	// Metode som tar som parameter kommunenummer og returnerer kommunenavn
	this.getNameFromKommunenummer = function(kommunenummer) {
		var entry = Object.entries(this.data.elementer).find(entry => {
            var kommunedata = entry[1]
			return kommunedata.kommunenummer === kommunenummer
        })
        // Her sjekker vi om kommunenummer er gyldig
        if (entry== null){
            alert ("Ikke gyldig kommunenummer!!!")
            return
        }else{
		var kommunenavn = entry[0]
		return kommunenavn
        }
    }
    // Metode som ta kommunenummer som argument og returnerer data
	this.getInfo = function(kommunenummer) {
		var kommune = Object.values(this.data.elementer).find(k => k.kommunenummer === kommunenummer);
		return kommune
	}
}

/*
********************************************************************************************
*                                                                                          *
*				                  DETALJER							                       *
*                                                                                          *
********************************************************************************************
*/

//Oppretter variable som inneholder URL og skal bli brukt som argument hos konstruktøren
var utdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var befolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var sysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json";

// Oppretter et objekt og bruker konstruktøren
var datasett = new Datasett(utdanning)
var Befolkning = new Datasett (befolkning)
var Sysselsatte = new Datasett (sysselsatte)

// Så kjører funksjonen til hvert opprettet objektet
datasett.onload = function(){
	datasett.getNames()
	datasett.getIDs()
	}

Befolkning.onload = function(){
	Befolkning.getNames()
	Befolkning.getIDs()
	}

Sysselsatte.onload = function(){
	Sysselsatte.getNames()
	Sysselsatte.getIDs()
	}

// Funksjon som henter ut input (kommunenummer) for å få detaljer
function søkDetaljer(){
	// Oppretter et variabel ut i fra input
    var kommunenr = document.getElementById("Knummer").value;

    // Sjekker om brukeren ikke har tastet inn kommunenummer
    if (kommunenr == ""){
        alert ("Ikke gyldig!!! Taste inn et gyldig kommunenummer")
    }
    else{
	    // Kjører metoden fra konstruktøren for å finne fram kommunenavn
        var kommunenavn = datasett.getNameFromKommunenummer(kommunenr);

        // Setter årstall som standard
        var årstall = "2017"

        //Kjører funksjon for å hente ut antall befolkning ut i fra kommunenummer
        var antall = henteBefolkning(kommunenr, årstall);

        //Kjører funksjon for å hente ut høyere utdanningsprosent ut i fra kommunenummer
        var menn_ = henteUtdanning(kommunenr, årstall, "Menn");
        var kvinner_ = henteUtdanning(kommunenr, årstall, "Kvinner");
        var mennB = befolkning_per_kjonn(kommunenr, årstall, "Menn");
        var kvinnerB = befolkning_per_kjonn(kommunenr, årstall, "Kvinner");
        var antallMenn = beregneAntall (menn_, mennB);
        var antallKvinner = beregneAntall (kvinner_, kvinnerB);
        var antallHøyereUtdanning = (antallMenn+antallKvinner);
        var utdanning_prosent = menn_+kvinner_;

        //Kjører funksjon for å hente ut sysselsettingprosent ut i fra kommunenummer
        var sysselsetting = henteSysselsatte(kommunenr, årstall, "Begge kjønn");

        //Konverterer prosent til antall ut i fra antall befolkning
        var antallSysselsetting = beregneAntall (sysselsetting, antall)
        //var antallHøyereUtdanning = beregneAntall (h_utdanning, antall)

        // Viser ut resultater til de siste målte statistikk (befolkning, sysselsetting og utdanning)
        document.getElementById("resultater").innerHTML =
        `<h4> Kommune: <strong> ${kommunenr} - ${kommunenavn} </strong> </h4>
        <p> Befolkning (${årstall}): ${antall}  </p>
        <p> Sysselsatte (${årstall}):  ${antallSysselsetting} (${sysselsetting}) %</p>
        <p> Høyere utdanning (${årstall}): ${antallHøyereUtdanning} (${utdanning_prosent}) %</p>`;

        // Oppretter vi en tabel med historisk utvikling - befolkning og sysselsetting
        var overskrift = document.getElementById("myTable");
        overskrift.innerHTML= "<h4> Befolkning historisk utvikling </h4>"
        var table = document.getElementById("myTable");
        var tabel = document.createElement("table");
        var hode = document.createElement("thead");
        var body = document.createElement("tbody");
        var kolonne1 = document.createElement("th");
        var kolonne2 = document.createElement("th");
        var kolonne3 = document.createElement("th");
        var kolonne4 = document.createElement("th");
        var kolonne5 = document.createElement("th");
        var kolonne6 = document.createElement("th");
        var kolonne7 = document.createElement("th");

        //Så får de "hode"-elementene verdier
        kolonne1.innerHTML = "Årstall"+" ";
        kolonne2.innerHTML = "Befolkningvekst <p>antall</p>";
        kolonne3.innerHTML = "Befolkningvekst <p>menn</p>";
        kolonne4.innerHTML = "Befolkningvekst <p>kvinner</p>";
        kolonne5.innerHTML = "Sysselsettingvekst <p>antall</p>";
        kolonne6.innerHTML = "Sysselsettingvekst <p>menn</p>";
        kolonne7.innerHTML = "Sysselsettingvekst <p>kvinner</p>";

        //Så setter vi de øverste elementene i riktig rekkefølge
        hode.appendChild(kolonne1);
        hode.appendChild(kolonne2);
        hode.appendChild(kolonne3);
        hode.appendChild(kolonne4);
        hode.appendChild(kolonne5);
        hode.appendChild(kolonne6);
        hode.appendChild(kolonne7);
        tabel.appendChild(hode);
        tabel.appendChild(body);

        // For loop for å hente data om historisk utvikling
        //Vi skal hente ut data fra 2007 til å med 2017
        for (var j = 2007; j <= 2017; j++){
            // Vi oppretter en selve rad som skal inneholde data
            var tr = document.createElement("tr");
            // Her viser årstallene til historisk utvikling
            for (var i = 1; i <= 10; i++){
                // opprette element <td> og sette inn verdi til <td> elementet
                var i = document.createElement("td");
                i.innerHTML = j;
                // Setter <td> til slutten av tabellrad
                tr.appendChild(i);
            }
            // For loop for å hente historisk utvikling (befolkning - menn)
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = henteBefolkning(kommunenr, j);
                i.innerHTML = td;
                tr.appendChild(i);
            }
            // For loop for å hente historisk utvikling (befolkning - menn)
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = befolkning_per_kjonn(kommunenr, j, "Menn");
                i.innerHTML = td;
                tr.appendChild(i);
            }

            // For loop for å hente historisk utvikling (befolkning - kvinner)
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var  td = befolkning_per_kjonn(kommunenr, j, "Kvinner");
                i.innerHTML = td;
                tr.appendChild(i);
            }
            // For loop for å hente historisk utvikling (sysselsetting - antall)
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var syssel = henteSysselsatte(kommunenr, j, "Begge kjønn");
                var td = beregneAntall (syssel, antall)
                i.innerHTML = td ;
                tr.appendChild(i);
            }
            // For loop for å hente historisk utvikling (sysselsetting - menn)
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = henteSysselsatte (kommunenr, j, "Menn");
                i.innerHTML = td + "%";
                tr.appendChild(i);
            }
            // For loop for å hente historisk utvikling (sysselsetting - kvinner)
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = henteSysselsatte(kommunenr, j, "Kvinner");
                i.innerHTML = td + "%";
                tr.appendChild(i);
            }

            //Vi legger rad til slutten av body
            body.appendChild(tr);
        }

        //Vi legger hele tabellen til elementet "table"
        table.appendChild(tabel);

        // Oppretter vi en tabel med utdanning historisk utvikling - del 1
        var overskrift = document.getElementById("Utdanning1");
        overskrift.innerHTML= "<h4> Utdanning historisk utvikling </h4>"
        var table = document.getElementById("Utdanning1");
        var tabel = document.createElement("table");
        var hode = document.createElement("thead");
        var body = document.createElement("tbody");
        var kolonne1 = document.createElement("th");
        var kolonne2 = document.createElement("th");
        var kolonne3 = document.createElement("th");
        var kolonne4 = document.createElement("th");
        var kolonne5 = document.createElement("th");
        var kolonne6 = document.createElement("th");
        var kolonne7 = document.createElement("th");


        //Så får de "hode"-elementene verdier
        kolonne1.innerHTML = "Årstall";
        kolonne2.innerHTML = "Grunnskole <p>menn</p>";
        kolonne3.innerHTML = "Grunnskole <p>kvinner</p>";
        kolonne4.innerHTML = "Videregående <p>menn</p>";
        kolonne5.innerHTML = "Videregående <p>kvinner</p>";
        kolonne6.innerHTML = "Fagskole <p>menn</p>";
        kolonne7.innerHTML = "Fagskole <p>kvinner</p>";


        //Så setter vi de øverste elementene i riktig rekkefølge
        hode.appendChild(kolonne1);
        hode.appendChild(kolonne2);
        hode.appendChild(kolonne3);
        hode.appendChild(kolonne4);
        hode.appendChild(kolonne5);
        hode.appendChild(kolonne6);
        hode.appendChild(kolonne7);
        tabel.appendChild(hode);
        tabel.appendChild(body);

        // For loop for å hente data om historisk utvikling
        //Vi skal hente ut data fra 2007 til å med 2017
        for (var j = 2007; j <= 2017; j++){
            // Vi oppretter en selve rad som skal inneholde data
            var tr = document.createElement("tr");
            // Her viser årstallene til historisk utvikling
            for (var i = 1; i <= 10; i++){
                // opprette element <td> og sette inn verdi til <td> elementet
                var i = document.createElement("td");
                i.innerHTML = j;
                // Setter <td> til slutten av tabellrad
                tr.appendChild(i);
            }
            // For loop for å hente historisk utvikling
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "01", "Menn");
                i.innerHTML = td;
                tr.appendChild(i);
            }

            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "01", "Kvinner");
                i.innerHTML = td;
                tr.appendChild(i);
            }

            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "02a", "Menn");
                i.innerHTML = td;
                tr.appendChild(i);
            }

            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "02a", "Kvinner");
                i.innerHTML = td;
                tr.appendChild(i);
            }

            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "11", "Menn");
                i.innerHTML = td;
                tr.appendChild(i);
            }

            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "11", "Kvinner");
                i.innerHTML = td;
                tr.appendChild(i);
            }


            //Vi legger rad til slutten av body
            body.appendChild(tr);
        }

        //Vi legger hele tabellen til elementet "table"
        table.appendChild(tabel);

        // Oppretter vi en tabel til med utdanning historisk utvikling - del 2
        var overskrift = document.getElementById("Utdanning2");
        overskrift.innerHTML= "<h4> Utdanning historisk utvikling </h4>"
        var table = document.getElementById("Utdanning2");
        var tabel = document.createElement("table");
        var hode = document.createElement("thead");
        var body = document.createElement("tbody");
        var kolonne1 = document.createElement("th");
        var kolonne8 = document.createElement("th");
        var kolonne9 = document.createElement("th");
        var kolonne10 = document.createElement("th");
        var kolonne11 = document.createElement("th");
        var kolonne12 = document.createElement("th");
        var kolonne13 = document.createElement("th");

        //Så får de "hode"-elementene verdier
        kolonne1.innerHTML = "Årstall";
        kolonne8.innerHTML = "Universitet kort <p>menn</p>";
        kolonne9.innerHTML = "Universitet <p>kvinner</p>";
        kolonne10.innerHTML = "Universitet lang <p>menn</p>";
        kolonne11.innerHTML = "Universitet <p>kvinner</p>";
        kolonne12.innerHTML = "Ingen utdanning <p>menn</p>";
        kolonne13.innerHTML = "Ingen utdanning <p>kvinner</p>";

        //Så setter vi de øverste elementene i riktig rekkefølge
        hode.appendChild(kolonne1);
        hode.appendChild(kolonne8);
        hode.appendChild(kolonne9);
        hode.appendChild(kolonne10);
        hode.appendChild(kolonne11);
        hode.appendChild(kolonne12);
        hode.appendChild(kolonne13);
        tabel.appendChild(hode);
        tabel.appendChild(body);

        // For loop for å hente data om historisk utvikling
        //Vi skal hente ut data fra 2007 til å med 2017
        for (var j = 2007; j <= 2017; j++){
            // Vi oppretter en selve rad som skal inneholde data
            var tr = document.createElement("tr");
            // Her viser årstallene til historisk utvikling
            for (var i = 1; i <= 10; i++){
                // opprette element <td> og sette inn verdi til <td> elementet
                var i = document.createElement("td");
                i.innerHTML = j;
                // Setter <td> til slutten av tabellrad
                tr.appendChild(i);
            }
            // For loop for å hente historisk utvikling
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "03a", "Menn");
                i.innerHTML = td;
                tr.appendChild(i);
            }
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "03a", "Kvinner");
                i.innerHTML = td;
                tr.appendChild(i);
            }

            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "04a", "Menn");
                i.innerHTML = td;
                tr.appendChild(i);

            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "04a", "Kvinner");
                i.innerHTML = td;
                tr.appendChild(i);
            }
            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "09a", "Menn");
                i.innerHTML = td;
                tr.appendChild(i);
            }

            for (var i = 1; i <= 10; i++){
                var i = document.createElement("td");
                var td = finneUtdanning(kommunenr, j , "09a", "Kvinner");
                i.innerHTML = td;
                tr.appendChild(i);
            }

            //Vi legger rad til slutten av body
            body.appendChild(tr);
        }

        //Vi legger hele tabellen til elementet "table"
        table.appendChild(tabel);
        }
    }

}

/*
// funksjon for å hente ut data om høyere utdanning fra menn og kvinne
function henteUtdanning(kommunenr, årstall){
	var kommunenavn = datasett.getNameFromKommunenummer(kommunenr);
	var kommune = datasett.getInfo(kommunenr);

	//henter ut data om menn som tok høyere utdanning (kort) og fagskole
    var menn_kort = kommune["03a"]["Menn"][årstall];
    var menn_lang = kommune["04a"]["Menn"][årstall];
    var menn_fag = kommune["11"]["Menn"][årstall];


	//henter ut data om kvinne som tok høyere utdanning (lang) og fagskole
    var kvinner_lang = kommune["04a"]["Kvinner"][årstall];
    var kvinner_kort = kommune["03a"]["Kvinner"][årstall];
    var kvinner_fag = kommune["11"]["Kvinner"][årstall];
     
    var h_utdanning = ((Number(menn_kort)+Number(kvinner_kort)/ 2)+
                        (Number(menn_lang)+Number(kvinner_lang) / 2)/ 2)  +
                         ((Number(menn_fag)+Number(kvinner_fag) /2) /2);
    
	//Sjekker om det ikke finnes data
	if (h_utdanning =="0.0" || h_utdanning == "-"){
		// Hvis det er tom for data, setter verdiet "-"
		var h_utdanning = "-";
	}
    return h_utdanning;
    */

// funksjon for å hente ut data om høyere utdanning fra menn og kvinne
function henteUtdanning(kommunenr, årstall, kjonn){
	var kommunenavn = datasett.getNameFromKommunenummer(kommunenr);
	var kommune = datasett.getInfo(kommunenr);

	//henter ut data om menn som tok høyere utdanning (kort) og fagskole
    var kort = kommune["03a"][kjonn][årstall];
    var lang = kommune["04a"][kjonn][årstall];
    var fag = kommune["11"][kjonn][årstall];
    //Sum fagskole, kort og lang høyere utdanning på menn og kvinner
    var prosent_utdanning = (kort+lang+fag)
    return prosent_utdanning
    

}
// funksjon for å hente ut data om høyere utdanning fra menn og kvinne
function finneUtdanning(kommunenr, årstall, nivå, kjonn){
	var kommunenavn = datasett.getNameFromKommunenummer(kommunenr);
	var kommune = datasett.getInfo(kommunenr);

	//henter ut data om menn og kvinne som tok høyere utdanning (kort)
	var resultat = kommune[nivå][kjonn][årstall];

	//Sjekker om det ikke finnes data
	if (resultat =="0.0" || resultat == "-"){
		// Hvis det er tom for data, setter verdiet "-"
		var resultat = "-";
	}else{
		//resultatet for standard. Vi runde(2)
		var resultat =  Math.round(resultat)+"%";
	}
	return resultat
}

// funksjon for å hente antall befolkning ut i fra standard årstall
function henteBefolkning(kommunenr, årstall){

	var kommunenavn = Befolkning.getNameFromKommunenummer(kommunenr);
	var kommune = Befolkning.getInfo(kommunenr);
	var menn = kommune["Menn"][årstall];
	var kvinner = kommune["Kvinner"][årstall];
	var antall = Number(menn) + Number (kvinner)
	return antall

}
// funksjon for å hente antall befolkning ut i fra kjønn
function befolkning_per_kjonn(kommunenr, årstall, kjonn){

	var kommunenavn = Befolkning.getNameFromKommunenummer(kommunenr);
	var kommune = Befolkning.getInfo(kommunenr);
	var antall_B = kommune[kjonn][årstall];

	return antall_B

}

// funksjon for å hente sysselsatte ui i fra standard årstall
function henteSysselsatte(kommunenr, årstall, kjonn){

	var kommunenavn = Sysselsatte.getNameFromKommunenummer(kommunenr);
	var kommune = Sysselsatte.getInfo(kommunenr);
	var prosent_Syssel = kommune[kjonn][årstall];
	// Hvis det er tom for data, setter verdiet "-"
	if (prosent_Syssel =="0.0"){
		// Hvis det er tom for data, setter verdiet "-"
		var prosent_Syssel = "-";
	}
	return Math.round(prosent_Syssel)

}

// funskjon for å beregne antall ut i fra antall befolkning og prosent
function beregneAntall (prosent, antallBefolkning){
	// Sjekker om det er tom for data
	if (prosent =="0.0" || prosent == "-"){
		// Hvis det er tom for data, setter verdiet "-"
		var resultat_antall = "-";
	}else{
		var resultat_antall =  Math.round((prosent/100)*antallBefolkning);
	}

	return resultat_antall
}

//Til slutt kjører vi "load" funksjoner til objektene som ble opprettet
datasett.loadIt()
Befolkning.loadIt()
Sysselsatte.loadIt()
