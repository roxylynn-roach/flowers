let growth = 1;
let health = 3;
let lastWatered = Date.now();
let petals = 0;
let growthPoints = 0;
let growthNeeded = [0, 3, 5, 7, 0];
let lastTreated = 0;
let treatCooldown = 3 * 60 * 60 * 1000; // every 3 hours


function loadGame() {
  let savedGrowth = localStorage.getItem("growth");
  let savedHealth = localStorage.getItem("health");
  let savedLastWatered = localStorage.getItem("lastWatered");

  let savedPetals = localStorage.getItem("petals");

  let savedGrowthPoints = localStorage.getItem("growthPoints");

  let savedLastTreated = localStorage.getItem("lastTreated");

if (savedLastTreated !== null) {
  lastTreated = Number(savedLastTreated);
}

  if (savedGrowthPoints !== null) {
    growthPoints = Number(savedGrowthPoints);
  }

  if (savedPetals !== null) {
    petals = Number(savedPetals);
  }

  if (savedGrowth !== null) {
    growth = Number(savedGrowth);
  }

  if (savedHealth !== null) {
    health = Number(savedHealth);
  }

  if (savedLastWatered !== null) {
    lastWatered = Number(savedLastWatered);
  }

  checkPlantHealth();
  updatePlant("Your dahlia is waiting.");
}

function saveGame() {
  localStorage.setItem("growth", growth);
  localStorage.setItem("growthPoints", growthPoints);
  localStorage.setItem("health", health);
  localStorage.setItem("lastWatered", lastWatered);
  localStorage.setItem("petals", petals);
  localStorage.setItem("lastTreated", lastTreated);
}

function checkPlantHealth() {
  let now = Date.now();
  let oneDay = 24 * 60 * 60 * 1000;

  let daysWithoutWater = Math.floor((now - lastWatered) / oneDay);

  health = 3 - daysWithoutWater;

  if (health < 0) {
    health = 0;
  }
}

function getHealthState() {
  if (health === 3) {
    return "healthy";
  } else if (health > 0) {
    return "dying";
  } else {
    return "dead";
  }
}

function growOneStage() {
  if (growth < 4) {
    growth = growth + 1;
  }

  saveGame();
  updatePlant("Dev mode: grew one stage.");
}


function updatePlant(message) {
  let flower = document.getElementById("flower");
  let messageBox = document.getElementById("message");
  let stageBanner = document.getElementById("stage-banner");
    document.getElementById("stage-banner");
  let state = getHealthState();

  let petalBox = document.getElementById("petal-box");
    petalBox.textContent = "Petals: " + petals;

  let healthBar = document.getElementById("health-bar");
  let growthBar = document.getElementById("growth-bar");

    healthBar.style.width = (health / 3) * 100 + "%";
    growthBar.style.width = (growthPoints / growthNeeded[growth]) * 100 + "%";
    if (growth === 4) {
  growthBar.style.width = "100%";
    } else {
  growthBar.style.width =
    (growthPoints / growthNeeded[growth]) * 100 + "%";
    }

  if (growth === 1) {
  stageBanner.textContent =
    "Stage 1: Sprout";
    }

    else if (growth === 2) {
  stageBanner.textContent =
    "Stage 2: Budding";
    }

    else if (growth === 3) {
  stageBanner.textContent =
    "Stage 3: Blossoming";
    }

    else {
  stageBanner.textContent =
    "Stage 4: Full Bloom";
    }
  flower.src = "flower_health_images/stage_" + growth + "_" + state + ".png";

  messageBox.textContent = message;
  updateTreatButton();
}

function waterFlower() {
  if (health < 3) {
    health = health + 1;
  }

  lastWatered = Date.now();

  saveGame();
  updatePlant("The dahlia drank some water.");
}

function feedFlower() {
  let now = Date.now();

  if (now - lastTreated < treatCooldown) {
    updatePlant("The dahlia is still full. Try again later.");
    return;
  }

  lastTreated = now;

  if (growth === 4) {
    saveGame();
    updatePlant("The dahlia is fully grown.");
    return;
  }

  growthPoints = growthPoints + 1;

  if (growthPoints >= growthNeeded[growth]) {
    growth = growth + 1;
    growthPoints = 0;

    saveGame();
    updatePlant("The dahlia grew to the next stage.");
  } else {
    saveGame();
    updatePlant("The dahlia enjoyed a treat.");
  }
}

function playMusic() {
  updatePlant("The dahlia sways gently to the music.");
}

function testOneDay() {
  let oneDay = 24 * 60 * 60 * 1000;

  lastWatered = Date.now() - oneDay;

  checkPlantHealth();
  saveGame();
  updatePlant("Dev test: 1 day passed.");
}

function testThreeDays() {
  let oneDay = 24 * 60 * 60 * 1000;

  lastWatered = Date.now() - (3 * oneDay);

  checkPlantHealth();
  saveGame();
  updatePlant("Dev test: 3 days passed.");
}

function sellFlower() {
  if (growth === 4) {
    petals = petals + 10;

    growth = 1;
    health = 3;
    lastWatered = Date.now();

    saveGame();
    updatePlant("You sold the full bloom for 10 petals.");
  } else {
    updatePlant("This dahlia is not ready to sell yet.");
  }
}

function updateTreatButton() {

  let treatButton =
    document.getElementById("treat-button");

  let now = Date.now();

  let timeLeft =
    treatCooldown - (now - lastTreated);

  if (timeLeft > 0) {

    treatButton.disabled = true;

    let hours =
  Math.floor(
    timeLeft / (1000 * 60 * 60)
  );

let minutes =
  Math.floor(
    (timeLeft % (1000 * 60 * 60))
    / (1000 * 60)
  );

let seconds =
  Math.floor(
    (timeLeft % (1000 * 60))
    / 1000
  );

treatButton.textContent =
  hours + "h "
  + minutes + "m "
  + seconds + "s";

  } else {

    treatButton.disabled = false;

    treatButton.textContent = "Treat";
  }
}

function showMain() {

  document
    .getElementById("main-screen")
    .classList.remove("hidden");

  document
    .getElementById("menu-screen")
    .classList.add("hidden");

  document
    .getElementById("updates-screen")
    .classList.add("hidden");
}

function showMenu() {

  document
    .getElementById("main-screen")
    .classList.add("hidden");

  document
    .getElementById("menu-screen")
    .classList.remove("hidden");

  document
    .getElementById("updates-screen")
    .classList.add("hidden");
}

function showUpdates() {

  document
    .getElementById("main-screen")
    .classList.add("hidden");

  document
    .getElementById("menu-screen")
    .classList.add("hidden");

  document
    .getElementById("updates-screen")
    .classList.remove("hidden");
}

function updateTreatTimer() {
  let timer = document.getElementById("treat-timer");
  let now = Date.now();
  let timeLeft = treatCooldown - (now - lastTreated);

  if (timeLeft <= 0) {
    timer.textContent = "Treat ready!";
    return;
  }

  let hours = Math.floor(timeLeft / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  timer.textContent = "Next treat: " + hours + "h " + minutes + "m";
}

setInterval(function () {

  updateTreatButton();
  updateBackground();


}, 1000);

function updateBackground() {

  let hour = new Date().getHours();

  let container =
    document.querySelector(".container");

  if (hour >= 6 && hour < 12) {

    container.style.backgroundImage =
      'url("backgrounds/background_morning.png")';

  } else if (hour >= 12 && hour < 18) {

    container.style.backgroundImage =
      'url("backgrounds/background_day.png")';

  } else if (hour >= 18 && hour < 21) {

    container.style.backgroundImage =
      'url("backgrounds/background_evening.png")';

  } else {

    container.style.backgroundImage =
      'url("backgrounds/background_night.png")';
  }
}

//updateBackground();

loadGame();