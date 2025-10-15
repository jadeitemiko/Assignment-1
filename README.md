# Assignment-1
inlämningsuppgift DAN25S - Skriptspråk och databashantering, 60 yhp
Påbörjat minispel med html, css och javascript

## Innehållsförteckning
- Sitens uppbyggnad: HTML + CSS
- Spelets logik: JS

### Sitens uppbyggnad: HTML + CSS
1) index.html är en splash-page med inline css, för att lättare kunna bygga ut spelet
2) game.html är den huvudsakliga sidan för spelet, där spelare både kan mata in värde till js
och som dynamiskt förändras utifrån javascript från app.js
3) credits.html är credits för alla bilder som är fria att använda med attribution.

**Header** = För att spelsidan skall kunna bli lång, men det går att komma tillbaks till start
har jag valt att göra en fast header som alltid syns. Efter att användare har angivit sitt namn i den,
syns också "playerName" (kommer från formulärdata) och "playerLevel" (startar på 1) i headern.
Länkar också alltid hem, vilket är games.html

**Main** = Det första innehållet ligger på game.html när sidan laddas. Det är en ruta med ett Orakel som kommer finnas
kvar med olika innehåll under spelets gång samt ett startformulär. Utseendet definieras i CSS via klasser.

**Footer** = Statisk information som finns på alla sidor och inte förändras. Länkar till skolan + credits-sidan.

### Spelets logik: JS
Just nu har spelet endast 3 scener, men jag har försökt skapa en logik som gör att det är lätt att expandera.
Jag har även försökt göra koden återanvändningsbar och förberedd för att lägga "manuset" i en databas.
Spelets scener är:
- 1.1 Ready for Adventure?
- 1.2 Explore the village

I 1.1. får spelaren först instruktioner av oraklet och anger sedan sitt namn och sin ålder i ett formulär. Detta sparas i js
När spelaren matar in sina uppgifter, genomförs en ålderskontroll. Om spelaren är under 13 år, får de "träna hemma" först.
Detta görs genom en enkel while-loop, som matar ut en ny rad för varje år spelaren behöver vara hemma och öva.
Html-formuläret förhindrar också negativa tal och att text skrivs i sifferfältet, så att js-koden inte behöver bli så komplex.

I 1.2. får spelaren startutrustning (som i framtid scener kan uppgraderas) och deras level visas i headern.
För att spelfigurerna ska tilltala spelaren korrekt samt att ålderskontrollen ska kunna genomföras, sparas namn, ålder och level som globala variabler.
För att knappen "Continue" alltid skall leda till rätt scen, även om spelet blir mer komplext, sparas även vilken scen spelet är på
i en global variabel. På detta sätt kan olika vägar programmeras in.
