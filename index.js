const container = document.querySelector("#container");
const battleLog = document.querySelector("#battle-log");
const playerImage = document.querySelector("#player-image");
const enemyImage = document.querySelector("#enemy-image");
const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");
const result = document.querySelector("#result");

const buttonAudio = document.getElementById("buttonsound");
const gameoverAudio = document.getElementById("gameoversound");
const bgsound = document.getElementById("bgsound");
const fightsound = document.getElementById("fightsound");

// Set audio volumes
bgsound.volume = 0.2;
buttonAudio.volume = 0.1;
gameoverAudio.volume = 0.1;

// Player life bar
let playerfills = document.querySelectorAll(".player-healthbar_fill");
let PlayerHealth = 100;
const maxPlayerHP = 100;
const healthLoss = -20;

function renderPlayerHealth() {
    const percent = PlayerHealth / maxPlayerHP * 100;
    // Update color
    document.documentElement.style.setProperty('--player-bar-fill', '#57e705');
    document.documentElement.style.setProperty('--player-bar-top', '#6aff03');

    if (percent <= 50) { // yellows
        document.documentElement.style.setProperty('--player-bar-fill', '#d6ed20');
        document.documentElement.style.setProperty('--player-bar-top', '#d8ff48');
    }
    if (percent <= 25) { // reds
        document.documentElement.style.setProperty('--player-bar-fill', '#ec290a');
        document.documentElement.style.setProperty('--player-bar-top', '#ff3818');
    }

    playerfills.forEach(fill => {
        fill.style.width = percent + "%";
    });
}

function updatePlayerHealth() {
    PlayerHealth += healthLoss;
    PlayerHealth = PlayerHealth > maxPlayerHP ? maxPlayerHP : PlayerHealth;
    PlayerHealth = PlayerHealth < 0 ? 0 : PlayerHealth;
    renderPlayerHealth();
}

// Computer life bar
let computerfills = document.querySelectorAll(".computer-healthbar_fill");
let ComputerHealth = 100;
const maxComputerHP = 100;

function renderComputerHealth() {
    const percent = ComputerHealth / maxComputerHP * 100;
    // Update color
    document.documentElement.style.setProperty('--computer-bar-fill', '#57e705');
    document.documentElement.style.setProperty('--computer-bar-top', '#6aff03');

    if (percent <= 50) { // yellows
        document.documentElement.style.setProperty('--computer-bar-fill', '#d6ed20');
        document.documentElement.style.setProperty('--computer-bar-top', '#d8ff48');
    }
    if (percent <= 25) { // reds
        document.documentElement.style.setProperty('--computer-bar-fill', '#ec290a');
        document.documentElement.style.setProperty('--computer-bar-top', '#ff3818');
    }

    computerfills.forEach(fill => {
        fill.style.width = percent + "%";
    });
}

function updateComputerHealth() {
    ComputerHealth += healthLoss;
    ComputerHealth = ComputerHealth > maxComputerHP ? maxComputerHP : ComputerHealth;
    ComputerHealth = ComputerHealth < 0 ? 0 : ComputerHealth;
    renderComputerHealth();
}

const PlayerCharacter = document.querySelector("#player");
const ComputerCharacter = document.querySelector("#computer");
const PlayerWeapon = document.querySelector("#player-weapon");
const ComputerWeapon = document.querySelector("#computer-weapon");

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const random = Math.floor(Math.random() * 3);
    return choices[random];
}

function winner(playermove, computermove) {
    if (playermove === computermove) return "draw";
    const LoseTo = { "rock": "paper", "paper": "scissors", "scissors": "rock" };
    if (playermove === LoseTo[computermove]) return "player";
    return "computer";
}

const buttons = Array.from(document.querySelectorAll(".button"));
let gameOver = false;
let alreadyPlayedFight = false;

// Play standing animations
ComputerCharacter.classList.add("animateComputerStanding");
PlayerCharacter.classList.add("animatePlayerStanding");

function Battle(e) {
    // Play sounds
    bgsound.play();
    buttonAudio.play();
    if (!alreadyPlayedFight) {
        fightsound.play();
        alreadyPlayedFight = true;
    }

    const PlayerPressed = e.target.id;
    const computerPressed = getComputerChoice();
    const playerWeaponImgClass = PlayerPressed + "-background";
    const computerWeaponImgClass = computerPressed + "-background";

    const roundwinner = winner(PlayerPressed, computerPressed);

    // Disable buttons during animation
    buttons.forEach(btn => btn.removeEventListener("click", Battle));

    // Set weapon positions based on winner
    if (roundwinner === "player") {
        document.documentElement.style.setProperty('--final-computerweapon-position', '210px');
        document.documentElement.style.setProperty('--final-playerweapon-position', '250px');
    } else if (roundwinner === "computer") {
        document.documentElement.style.setProperty('--final-computerweapon-position', '40px');
        document.documentElement.style.setProperty('--final-playerweapon-position', '88px');
    } else {
        document.documentElement.style.setProperty('--final-computerweapon-position', '140px');
        document.documentElement.style.setProperty('--final-playerweapon-position', '140px');
    }

    // Display weapons
    PlayerWeapon.classList.add(playerWeaponImgClass);
    ComputerWeapon.classList.add(computerWeaponImgClass);

    // Animate attacks
    PlayerCharacter.classList.add("animatePlayerAttack");
    ComputerCharacter.classList.add("animateComputerAttack");

    // Handle attack animations
    PlayerCharacter.addEventListener("animationend", function() {
        PlayerCharacter.classList.remove("animatePlayerAttack");
        PlayerWeapon.classList.add("animatePlayerWeapon");
    }, { once: true });

    ComputerCharacter.addEventListener("animationend", function() {
        ComputerCharacter.classList.remove("animateComputerAttack");
        ComputerWeapon.classList.add("animateComputerWeapon");
    }, { once: true });

    // Handle weapon animations and damage
    PlayerWeapon.addEventListener("animationend", function() {
        PlayerWeapon.classList.remove("animatePlayerWeapon");
        PlayerWeapon.classList.remove(playerWeaponImgClass);
        
        if (roundwinner === "player") {
            updateComputerHealth();
            ComputerCharacter.classList.remove("animateComputerStanding");
            ComputerCharacter.classList.add("animateComputerHit");
            ComputerCharacter.addEventListener("animationend", function() {
                ComputerCharacter.classList.remove("animateComputerHit");
                ComputerCharacter.classList.add("animateComputerStanding");
            }, { once: true });
        }

        if (ComputerHealth === 0) {
            ComputerCharacter.classList.remove("animateComputerHit");
            ComputerCharacter.classList.remove("animateComputerStanding");
            gameOver = true;
            bgsound.currentTime = 0;
            gameoverAudio.play();
            document.getElementById('computer').style.backgroundPosition = '-88px -740px';
        }
    }, { once: true });

    ComputerWeapon.addEventListener("animationend", function() {
        ComputerWeapon.classList.remove("animateComputerWeapon");
        ComputerWeapon.classList.remove(computerWeaponImgClass);

        if (roundwinner === "computer") {
            updatePlayerHealth();
            PlayerCharacter.classList.remove("animatePlayerStanding");
            PlayerCharacter.classList.add("animatePlayerHit");
            PlayerCharacter.addEventListener("animationend", function() {
                PlayerCharacter.classList.remove("animatePlayerHit");
                PlayerCharacter.classList.add("animatePlayerStanding");
            }, { once: true });
        }

        if (PlayerHealth === 0) {
            PlayerCharacter.classList.remove("animatePlayerHit");
            PlayerCharacter.classList.remove("animatePlayerStanding");
            gameOver = true;
            bgsound.currentTime = 0;
            gameoverAudio.play();
            document.getElementById('player').style.backgroundPosition = '0px -720px';
        }

        // Re-enable buttons if game is not over
        if (!gameOver) {
            buttons.forEach(btn => btn.addEventListener("click", Battle));
        }
    }, { once: true });
}

// Add click listeners to buttons
buttons.forEach(btn => btn.addEventListener("click", Battle));

// Initialize health bars
renderPlayerHealth();
renderComputerHealth();