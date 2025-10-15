//globala variabler som skall sparas genom spelet
let playerName = "";
let playerAge = 0;
let currentScene = '1.1';
//spelaren anger namn och ålder, currentScene kollar var i spelet man befinner sig

//Spelets MANUS - bör flyttas till separat fil längre fram och anropas via json
const gameScenes = {
  '1.1': {
    // SCENE 1.1 Prologue: Ready for adventure?
    h2: "1.1 Ready for Adventure?",
    oracleText: {
      p1: "Welcome adventurer. I am <span class='note'>the Oracle</span>.",
      p2: "The stars have told me that you might be the <span class='note'>The Hero of Prophecy</span>.",
      p3: "Our world needs you. Monsters have always roamed the deep woods and caves, but now encroach on defenceless villages. If you are the one chosen by the stars, begin your jorney to save the world.",
    },
    showOracle: true
  },
  '1.2': {
    // SCENE 1.2 Prologue: Equip yourself!
    h2: "1.2 Explore the village",
    showOracle: true,
    oracleText: {
      p1: "Before you face dangers, you must <span class='note'>gather equipment</span>. Through the game, you can find many items.",
      p2: "But begin by asking your friends in the village for help.",
    },
    // Funktionen genererar all dynamisk HTML-text
    text: (name) => {
      return `
        <p>You leave your home to explore the village and meet your friendly neighbor.</p>
            <div class="dialog-box">
                <img src="img/horse.png" alt="A friendly rider" class="game-icon">
                <p>"Hello ${name}! I heard you're heading into danger? Take my grandfather's shield to protect yourself. It's a bit beat up, but better than nothing."</p>
            </div>
            <p>As you continue down the village, you meet an elf.</p>
            <div class="dialog-box">
                <img src="img/elf.png" alt="A helpful elf" class="game-icon">
                <p>"Hail ${name}! I heard you are going to battle the monsters? But you can't go unarmed - take my spare dagger."</p>
            </div>
            <p>As you reach the edge of the village, the elf calls out to you:</p>
            <div class="dialog-box">
                <img src="img/quest.png" alt="You have received a quest" class="game-icon">
                <p>"And if you happen to see my cat, please tell it to come home for dinner. I will give you a small reward as thanks!"</p>
            </div>
            <p><img src="img/level.png" alt="Level up icon" class="small-icon">
            <span class="note">Congratulations!</span> You now have a
            <img src="img/dagger.png" alt="Dagger icon" class="small-icon"> and a
            <img src="img/shield.png" alt="Shield icon" class="small-icon">
            </p>`;
    },
    inputHTML: '<button id="continueBtn">Continue</button>',
  },
};


//definiera lokala konstanter som används för DOM-element (namn och ålderkoll)
const setupForm = document.getElementById("setupGame");
const nameInput = document.getElementById("playerName");
const ageInput = document.getElementById("playerAge");
const mainContent = document.getElementById("input-player");
const gameOutputContainer = document.getElementById("game-output");

//gör att "manustext" blir återanvändbar, utifrån scen-id
// setInnerHTML Uppdaterar innerHTML för ett element.
function setInnerHTML(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = content;
  } else {
    console.error(`Error: Element with ID "${elementId}" not found.`);
  }
}

//setupEventListeners skapa knappar (lyssnare) efter att en scen laddas
function setupEventListeners() {
  if (currentScene === '1.2') {
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        alert("Load next scene (1.3).");
      });
    }
  }
}

//updateScene Laddar ny scen baserat på data från gameScenes.
function updateScene(sceneId) {
  const sceneData = gameScenes[sceneId];
  if (!sceneData) return; // Avbryt om scenen inte finns
  currentScene = sceneId; // Uppdatera var i spelet man är

  setInnerHTML('stage-title', sceneData.h2); //rubrik

  //oraklets ruta
  const oracleBox = document.querySelector('.oracle-box');
  oracleBox.style.display = sceneData.showOracle ? 'block' : 'none';
  if (sceneData.showOracle) {
    const textContent = Object.values(sceneData.oracleText).map(p => `<p>${p}</p>`).join('');
    setInnerHTML('oracle-text', `<img src="img/witch.png" alt="The Oracle" class="large-icon">` + textContent);
  }

  // generera scenens innehåll och ev val
  let dynamicContent = '';
  if (sceneData.text) {
    dynamicContent += sceneData.text(playerName, playerAge);
  }
  if (sceneData.inputHTML) {
    dynamicContent += sceneData.inputHTML;
  }

  setInnerHTML('game-output', dynamicContent);
  setInnerHTML('input-player', '');
  setupEventListeners();
}

// stoppa att sidan laddas innan formuläret redo
setupForm.addEventListener("submit", function(event) {
  event.preventDefault();

  //formatering av spelarens input
  playerName = nameInput.value;
  playerAge = parseInt(ageInput.value, 10);

  if (!playerName || playerName.length < 2) {
    alert("Your name most contain at least 2 letters.");
    return;
  }

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
    resultHTML += "As you turn " + playerAge + ", you är ready for adventure!";
  } else {
    resultHTML += "Welcome, " + playerName + "! At " + playerAge + " years old, you are ready for adventure!";
  }
  //skriv ut resultatet av ålderskontroll alt. träning
  resultHTML += "<br><br><button id='continueBtn'>Continue</button>";

  setInnerHTML('game-output', resultHTML);
  setInnerHTML('input-player', '');

  //knapp till nästa scen
  document.getElementById("continueBtn").addEventListener("click", () => {
    updateScene('1.2');
  });
});
