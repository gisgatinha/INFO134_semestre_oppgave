var Datasett = function(URL) {
    this.data = {}

    //laster inn datasettet
    this.loadIt = async function load() {
        const response = await fetch(URL);
        this.data = await response.json();
        console.log("KONSTRUKTØREN VIRKER!!!")

        if (typeof this.onload === "function")
            this.onload()
    }
    //returnerer en liste av kommunenavn
    this.getNames = function() {
        var kommuneliste = Object.keys(this.data.elementer);

        //lister kommunenavn og skriver ut under hverandre
        kommuneliste.forEach(myFunction);
        function myFunction(item){
          document.getElementById("kommunenavn").innerHTML += item + "<br>";
        }
        return kommuneliste;
    }

    //returnerer en liste av kommunenummer
    this.getIDs = function() {
        var kommuner = Object.values(this.data.elementer);
        var IDer = kommuner.map((kommune) => kommune.kommunenummer);

        //lister kommunnummer og skriver ut under hverandre
        IDer.forEach(idNummer);
        function idNummer(item){
          document.getElementById("kommunenummer").innerHTML += item + "<br>";
        }
        return IDer;
    }

    this.getNameFromKommunenummer = function(kommunenummer) {
        var entry = Object.entries(this.data.elementer).find(entry => {
            var kommunedata = entry[1]
            return kommunedata.kommunenummer === kommunenummer
        })
        var kommunenavn = entry[0]
        return kommunenavn
    }

    this.getInfo = function(kommunenummer) {
        var kommune = Object.values(this.data.elementer).find(k => k.kommunenummer === kommunenummer)
        return kommune
    }
    //henter ut informasjon om befolkning
    this.getBefolkning = function() {
        var kommuner = Object.values(this.data.elementer);
        var IDer = kommuner.map((kommune) => kommune.kommunenummer);

        IDer.forEach(idNummer);
        function idNummer(item){
            var kommune = datasett.getInfo(item);

            //Henter ut menn og skriver ut i html
            var antall = kommune["Menn"]["2018"];
            document.getElementById("menn").innerHTML += antall + "<br>";

            //Henter ut kvinner og skriver ut i html
            var antall2 = kommune["Kvinner"]["2018"];
            document.getElementById("kvinner").innerHTML += antall2 + "<br>";

            //lager variabler på årstall for å finne befolkningsvket
            var start = "2007"
            var slutt = "2018"

            //regner ut befolkningsvekst og printer i html
            var vekst = (kommune["Menn"][slutt] + kommune["Kvinner"][slutt]) - (kommune["Menn"][start] + kommune["Kvinner"][start]);
            var samletStart = kommune["Menn"][start] + kommune["Kvinner"][start];
            var befolkningsvekst = Number(vekst) / Number(samletStart)
            var prosent = Number(befolkningsvekst) * 100
            document.getElementById("befolkningsvekst").innerHTML += Math.round(prosent) + "%" + "<br>";
        }
    }

}

//Datasett som skal lastes inn
var datasett = new Datasett("http://wildboy.uib.no/~tpe056/folk/104857.json");

datasett.onload = function () {
    datasett.getNames()
    datasett.getIDs()
    datasett.getBefolkning()
    //console. log ("alle datasett lastet ned")

}
datasett.loadIt()
