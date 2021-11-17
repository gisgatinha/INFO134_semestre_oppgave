# INFO134_semestre_oppgave
Semestre oppgave i HTML / CSS / Javascript - vår 2020


1 Folk

I denne oppgaven skal dere lage et verktøy for å vise data om Norges befolkning. 
Oppgaven benytter seg av et utvalg fra tre datasett: 

- Befolkning: Datasett nummer 104857: http://data.ssb.no/api/v0/dataset/104857?lang=no
- Sysselsatte: Datasett nummer 100145: http://data.ssb.no/api/v0/dataset/100145?lang=no
- Utdanning: Datasett nummer 85432: http://data.ssb.no/api/v0/dataset/85432?lang=no 

I oppgaven skal vi benytte modifiserte kopier av disse datasettene. Hver av filene kan lastes ned fra: 
- Beskrivelser: http://wildboy.uib.no/~tpe056/folk  
- Befolkning: http://wildboy.uib.no/~tpe056/folk/104857.json  
- Sysselsatte: http://wildboy.uib.no/~tpe056/folk/100145.json  
- Utdanning: http://wildboy.uib.no/~tpe056/folk/85432.json  

Dere skal forfatte et HTML-dokument som består av tre hoveddeler: 
Navigasjon, hovedinnhold, og bunntekst. 

1.1 Hovedinnhold 

Hovedinnhold skal bestå av blokkelementer (for eksempel div-elementer), men bare nøyaktig ett av dem skal til enhver tid være synlig. De tre andre skal skjules ved hjelp av CSS og tilskriving av klasser til elementene. 
De fire elementene skal inneholde følgende: 

Introduksjon: Introduksjonsteksten skal bestå av tekst som beskriver produktet deres. Den skal også inneholde lenker til SSB sine offisielle sider, og en notis om at dataene kan inneholde feil. 

Oversikt: Oversikt skal vise alle kommunene med navn, kommunenummer, siste måling av total befolkning (“begge kjønn”) og befolkningsvekst i prosent. 

Detaljer: Detaljer skal i utgangspunktet ikke vise noe informasjon, men brukeren skal ha mulighet til å skrive inn et kommunenummer. Dersom brukeren skriver inn et korrekt kommunenummer (et kommunenummer som dere har informasjon om.) skal dere vise: 

• Kommunens navn, kommunenummer, siste målte befolkning, siste målte statistikk for sysselsetting og høyere utdanning (de to sistnevnte i b˚ade antall og prosent). 

• Etter disse punktvise detaljene skal dere også vise historisk utvikling i form av tabeller/lister for befolkningsvekst, sysselsettingsvekst og utdanningsvekst. I disse tabellene/listene kan dere selv velge om dere vil vise all data dere har, eller bare data for de årene som forekommer i alle datasettene. Altså; dere kan begrense årene dere viser data for til de årene som forekommer i alle tre datasett. 

Sammenligning: Som i “detaljer” skal dere i utgangspunktet ikke vise noe informasjon her, men brukeren skal kunne skrive inn to gyldige kommunenummere. Når brukeren skriver inn dette, så skal dere vise utdanningsdata for det siste året (som datasettet dekker) innen kjønnskategoriene “Menn” og “Kvinner” i begge kommunene, for alle utdanningskategorier. For hver kjønnskategori og hver utdanningskategori skal dere indikere hvilken av kommunene som har høyest andel utdannede. Dere skal ogs˚a utrope en “vinner”. Vinneren er kommunen som har høyest andel utdannede i flest utdanningskategorier.

-Skriv inn 2 gyldige kommunenummere. Vis utdanningsdata for det siste året som datasettet dekker, for menn og for kvinner, i begge kommunene. 
-Utrop en “vinner” - kommunen som har høyest andel utdannede i flest utdanningskategorier

1.2 Navigasjon og bunntekst 

Øverst i dokumentet deres skal brukeren ha mulighet til å velge mellom de ulike elementene som skal vises. I bunnen av dokumentet skal dere ha informasjon om at dette er en oppgavebesvarelse i emnet INFO134. 
Husk at dere må ikke inkludere identifiserende informasjon i denne karaktersatte oppgaven. 

2 Presentasjon 

Oppgaven vil ikke evalueres i særlig grad på estetiske aspekter, utenom et krav for historiske data som beskrives under, og at dokumentet deres skal være generelt ryddig og oversiktlig. Dokumentet skal ikke være unødvendig vanskelig å navigere og bruke. Det skal være enkelt å vise de fire ulike alternativene i hovedinnholdet. Valget mellom disse fire skal være tilgjengelig for brukeren nær toppen av dokumentet eller skjermen. Måten å gjøre et valg på skal være intuitivt (for eksempel: Knapp, lenke, eller lignende). 

Vi stiller ett krav til hvordan historiske data vises til brukeren. Når brukeren benytter en liten skjerm, skal historiske data (tall fra en rekke år) presenteres vertikalt. Når brukeren benytter en stor skjerm, skal de historiske dataene presenteres horisontalt. 

3 Data 

Programmet deres skal laste ned data fra wildboy-URL-ene øverst i oppgaveteksten. Dere skal ikke laste inn andre eksterne ressurser. Dette inkluderer andre ressurser som dere laster opp til wildboy eller andre servere. 

Dere skal skrive en konstruktør som skal fungere som et grensesnitt mot hvert datasett. Dere kan velge hvor mange slike konstruktører dere vil skrive (´en, to eller tre). Datasettene har litt ulik struktur, s˚a dere kan derfor vurdere å skrive en for hvert datasett, men hvis dere ønsker å implementere en generell løsning, kan det holde med ´en.

Konstruktøren skal defineres med (minst) ett parameter: Datasettets URL. Dersom dere finner det hensiktsmessig, kan dere også definere den med ytterligere parametere. Objektet som returneres skal i det minste ha følgende metoder: 

getNames: Returnerer listen av alle kommunenavnene (som de fremtrer i datasettet). 

getIDs: Returnerer listen av alle kommunenummerene. Merk at et kommunenummer er fire heltall, og Haldens kommunenummer er “0101”, altså inkludert en ledende 0. Det kan derfor være lurt å representere kommunenummer som tekstverdier eller finne en annen løsning for dette. 

getInfo: Tar et kommunenummer som argument, og returnerer informasjonen om denne kommunen fra dette datasettet. 

load: Klargjør og sender en forespørsel om å laste ned datasettet. Dersom objektet har egenskapen onload med funksjonsverdi (se under), skal denne funksjonen kalles n˚ar datasettet er lastet inn, tolket og objektet er klart til å gi informasjon om datasettet via de forrige tre metodene. 

Objektet som konstrueres skal også ha en egenskap onload som i utgangspunktet er satt til å ha verdi null. Brukeren av objektet deres kan tilordne en funksjon til denne egenskapen. I så fall skal denne funksjonen kalles når objektet er klart til å gi informasjon om datasettet. 

For eksempel: Anta at vi har skrevet en konstruktør for hvert datasett. Anta også at befolkningsdata er det siste som lastes ned. Da kan vi anta at alle datasettene er lastet ned når dette datasettet er klart. Anta videre at vi har to funksjoner: enableNavigationButtons og removeLoadingMessage, som henholdsvis lar brukeren velge hvilket element som skal vises og som fjerner en melding eller animasjon som sier at dataene lastes inn. (Ingen av disse funksjonene er påkrevd i i denne oppgaven.) Da kan vi se for oss følgende linjer med kode som implementerer denne oppførselen: 

<script>
  var befolkning = new Population(URL_wildboy_105857}; 
  befolkning.onload = function(){ enableNavigationButtons(); 
  removeLoadingMessage(); }; 
  befolkning.load(); 
</script>

4 Rapport og øvrige filer 

Sammen med løsningen deres skal dere levere en rapport. I denne rapporten skal dere beskrive, kort, hver fil i besvarelsen (en/to setninger). I rapporten skal dere også besvare følgende spørsmål: 

Filer: 

Vår zip mappe inneholder tre mapper; HTML, CSS og JavaScript.  I HTML mappen finner vi fire HTML dokumenter, CSS mappen har fire CSS dokumenter og JavaScript mappen inneholder tre dokumenter. 

HTML:
- introduction.html
- overview.html
- comparison.html
- details.html

Disse dokumentene inneholder html strukturen, samt laster inn de eksterne CSS og JavaScript filene. 

- JavaScript:
- overview.js
- details.js
- comparison.js

JavaScript filene inneholder logikken til nettsiden og laster inn JSON filene som vises på nettsiden.

CSS:
- style.css 
- overview.css
- details.css
- comparison.css

CSS (Cascading Style Sheets) dokumentet inneholder selve utformingen og design av nettsiden. 

Spørsmål:

1. Lastes datasettene ned samtidig eller etter hverandre av programmet deres? Begrunn svaret deres. Henvis gjerne til koden og forklar når de tre forespørslene blir sendt (dere trenger ikke rettferdiggjøre hvorfor programmet deres laster inn dataene på denne måten). 
Javascript er et asynkront kodespråk. Dette betyr at det tillater at programmet kan vente på at enkelte parametere skal inntreffe før det kjører kode, uten å fryse programmet mens dette skjer. Innlasting av datasettene skjer ved hjelp av metoden loadIt() som ligger inne i en konstruktør. Datasettene lastes inn i den rekkefølgen de er skrevet opp med metode loadIt(), og på grunn av den dynamiske strukturen til loadIt() trenger vi ikke om å belaste websiden med andre datasett en de vi trenger for akkurat den aktuelle siden. 

2. Hvordan vet programmet deres når det tredje (siste) datasettet er lastet ned? Begrunn svaret deres. (Henvis gjerne til en variabel, eller et sted i koden der dette er sikkert.) 
Når datasettet er ferdig lastet ned, skrives en melding til konsollen om at dataene er ferdig lastet ned, for hvert dokument som lastes inn, dersom dette foregikk korrekt og dataene faktisk er ferdig lastet ned. Dersom en slik melding ikke blir skrevet ut er det en indikasjon på at filen ikke er lastet ned, og det vil også være her programmet vet at filen ikke er lastet ned - dette må den vite for å skrive ut konsoll-meldingen. Se vedlagt bilde. 


3. På små skjermer skal de historiske dataene presenteres vertikalt. På store skjermer skal de presenteres horisontalt. Forklar hvordan dere har løst dette.
Vi tok i bruk “flexbox” hvor vi ved hjelp av en media query regel i CSS sjekker bredden på browser vinduet og spesifiserer at dataene skal vises vertikalt på mindre skjerm (se bilde under). 


4. Har alle tre datasett nøyaktig de samme kommunene? Forklar kort hvordan dere fant dette svaret. 

For å sjekke dette sammenlignet lengden på de ulike datasettene i getNames(). Dette viste oss at det var forskjell på lengdene på settene, noe som viser at det ikke er likt antall kommuner i alle datasett. Derfor inneholder ikke datasettene et likt antall kommuner.

