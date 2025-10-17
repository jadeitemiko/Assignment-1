# Assignment-1
inlämningsuppgift DAN25S - Skriptspråk och databashantering, 60 yhp
Påbörjat minispel med html, css och javascript
Sidan är live på https://asmalladventure.netlify.app/

## Innehållsförteckning
- Interaktion mellan HTML, CSS och JS
- HTML-sidornas uppbyggnad
- Spelets logik: JS
- Förklaring SPELMOTOR

### Sitens uppbyggnad: HTML + CSS
1) **HTML**: Tre sidor (splash-pagen index.html, centrala sidan game.html och attributering credits.html) är den betydelsemässiga strukturen,
   (DOM-trädet), med game.html den som dynamiskt påverkas av js.
 Fokus i html har varit på att använda div-element, flexboxes och förklarande namn.
3) **CSS**: Design sköts via CSS, huvudsakligen style.css som kopplas till t.ex. div och span-taggar med klasser.
Använder dock inline CSS på index.html, för att inte röra ihop ett redan rätt komplext stildokument. På detta sätt kan
sidans design (färger, typsnitt, placering) lättare underhållas.
4) **JS**: Beteendet styrs utifrån app.js som länkas till game.html via script-taggen. Js hanterar själva spelmotorn och manipulerar DOM-element.
Unika id på exempelvis div-tagg förklarar var js skall göra ändringar.
Via formulär tas spelarens val in i js och via DOM-output förändras och skapar js nya element på game.html. Försök har gjorts för att hålla kodens ordning logisk inte bara för
browser, utan också för en människa som läser och ska kunna uppdatera koden.
5) **JSON**: Som står i kommentar i app.js, skulle ett fullt spel bli väldigt mycket text. Inom ramen för denna uppgift
har ingen json-fil skapats, men koden är uppbyggd så att det ska vara enkelt att bryta loss "manus och scener" till egen fil,
och hämta dem vid behov, i stället för att göra en jättestor app-fil.

### HTML-sidornas uppbyggnad ###
- **Header** = Information som bör vara spelaren till handa är alltid synligt då headern ligger ovanför (via z-index och fixed position)
Här syns logotyp, aktuell del av spelet (Prolog, Level 1, The Final Fight osv), hem-länk och efter spelstart även namn + level.

- **Main** = Det första innehållet ligger på game.html när sidan laddas. Det är en ruta med ett Orakel som kommer finnas
kvar, med olika innehåll under spelets gång, samt ett startformulär.

- **Footer** = Statisk information som finns på alla sidor och inte förändras. Länkar till skolan + credits-sidan.
Framtida uppdatering lämplig för större sida vore att separera även innehållet i footer så att det kan uppdateras centralt.

### Spelets logik: JS
Just nu har spelet endast 3 scener, men jag har försökt skapa en logik som gör att det är lätt att expandera.
Jag har även försökt göra koden återanvändningsbar för att hålla den kompakt.
Spelets scener är:
- **1.1 Ready for Adventure?** - Startscen + svar på ålderskontroll
- **1.2 Explore the village** - Äventyret börjar, med användning av data från 1.1.

I 1.1. får spelaren  instruktioner av oraklet och anger sitt namn (playerName) och ålder (playerAge). Denna data sparas i js och
används för att kontrollera att spelaren är 13 år gammal. Annars får spelaren "träna hemma" och åldras med en while-loop.
En ny rad matas ut för varje år spelaren stannar hemma.
Html-formuläret förhindrar också negativa tal och att text skrivs i sifferfältet, så att js-koden inte behöver bli onödigt komplex.
När spelaren har rätt ålder, fortsätter de med en knapptryckning, som tömmer tidigare fält (och döljer oraklets ruta) och laddar manuset som hör till scen 1.2.

I 1.2. får spelaren startutrustning (som i framtid scener kan uppgraderas) och deras namn + level börjar visas i headern.
För att spelfigurerna ska tilltala spelaren korrekt samt att ålderskontrollen ska kunna genomföras, sparas namn, ålder och level som globala variabler.
För att knappen "Continue" alltid skall leda till rätt scen, även om spelet blir mer komplext, sparas även vilken scen spelet är på
i en global variabel. På detta sätt kan olika vägar programmeras i JS.

### Förklaring Spelmotor ###
I app.js finns kod och tillhörande innehållsförteckning. Innehållsförteckningen kopieras hit med mer förklaring

SPELMOTOR
1. Definiera globala variabler
2. Spelets manus
3. input från DOM: variabler setupForm, nameInput, ageInput
*1-3 skall kunna användas i globalt och sparas, behöver därför definieras först*
4. återanvändbara verktyg: setInnerHTML, fillPlayerStats, förbereder DOM-output
*De verktyg som genom spelet ska manipulera DOM, dvs ta bort och ersätta html-kod på game.html. Gjort återanvändbara så spelet kan byggas ut utan att koden sväller*
5. Dynamiska knappar: setEventListener (continue-knapp till rätt scen)
*dessa knappar styr js-logik utifrån element som skapas i föregående scener (HTML > JS > HTML > JS...)*
6. Central spellogik: updateScene tar spelaren genom manuset
*utnyttjar verktygen i 4 och manuset i 2 för att löpande skapa spelet*
7. Starta körning, DOM-output. Hindrar också script innan formuläret laddats
*centrala event-lyssnaren, läser av input, kör ålderskoll-logik och exekverar output med ny text + knapp*
