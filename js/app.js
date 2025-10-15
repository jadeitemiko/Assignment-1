//globala variabler som skall sparas genom spelet
let playerName = "";
let playerAge = 0;

/* ===
SCENE 1.1
Prologue: Ready for adventure?
=== */

//definiera lokala konstanter som används för namn och ålderskontroll
const setupForm = document.getElementById("setupGame");
const nameInput = document.getElementById("playerName");
const ageInput = document.getElementById("playerAge");
const mainContent = document.getElementById("input-player");
const gameOutputContainer = document.getElementById("game-output");

// stoppa att sidan laddas innan formuläret redo
setupForm.addEventListener("submit", function(event) {
  event.preventDefault();

  playerName = nameInput.value;
  playerAge = parseInt(ageInput.value, 10);

  //spelarnamn måste bestå av minst 2 tecken
  if (!playerName || playerName.length < 2) {
    alert("Your name most contain at least 2 letters.");
    return;
  }
//spelarens ålder måste anges korrekt
  if (isNaN(playerAge) || playerAge < 1 || playerAge > 999) {
    alert("Please enter a valid age (1-999)");
    return;
  }

  //skriv nytt innehåll i den div som kallas game-output
  let resultHTML = "";
  let initialAge = playerAge;

  //ålderskontroll, spelare måste vara minst 13 år för att börja äventyret
  if (playerAge < 13) {
    resultHTML += "Alas, " + playerName + " at " + initialAge + " you are too young for this perilous journey.<br><br>";
    while (playerAge < 13) {
      playerAge = playerAge + 1;
      resultHTML += "<img src='img/level.png' class='small-icon'>" + "You stay at home and train diligently until you turn " + playerAge + "<br><br>";
    }
      resultHTML += "As you turn " + playerAge + ", you are ready for adventure!";
  } else {
    resultHTML += "Welcome, " + playerName + "! At " + playerAge + " years old, you are ready for adventure!";
  }
  //skriv ut resultatet av ålderskontroll alt. träning
  resultHTML += "<br><br><button id='continueBtn'>Continue</button>";
  gameOutputContainer.innerHTML = resultHTML;
  mainContent.innerHTML = "";
  //knapp till nästa scen
  document.getElementById("continueBtn").addEventListener("click", nextScene);
});

/* ===
SCENE 1.2
Prologue: Equip yourself
=== */

function nextScene() {
//töm sidan
  gameOutputContainer.innerHTML = "";

  // 2. Skapa det nya sceninnehållet
  let nextSceneHTML = "";
  nextSceneHTML += "<h2>Stage 2: The Crossroads</h2>";
  nextSceneHTML += "The air is crisp, " + playerName + ". You stand at the edge of the Whispering Woods. You are " + playerAge + " years old.";
  nextSceneHTML += "To the left lies the dark path to the Mountain Pass. To the right, the winding road to the Coastal Village.";

  // 3. Skriv ut det nya innehållet
  gameOutputContainer.innerHTML = nextSceneHTML;
}
