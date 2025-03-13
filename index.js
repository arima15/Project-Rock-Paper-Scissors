const container = document.querySelector("#container");
const battleLog = document.querySelector("#battle-log");
const playerImage = document.querySelector("#player-image");
const enemyImage = document.querySelector("#enemy-image");
const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");
const result = document.querySelector("#result");

// Batman-themed choices and their corresponding images
const choices = {
    batman: {
        name: 'Batman',
        beats: 'batarang',
        image: '🦇'
    },
    batarang: {
        name: 'Batarang',
        beats: 'cape',
        image: '🌟'
    },
    cape: {
        name: 'Cape',
        beats: 'batman',
        image: '🦹'
    }
};

function getComputerChoice() {
    const options = Object.keys(choices);
    const random = Math.floor(Math.random() * options.length);
    return options[random];
}

let humanScore = 0;
let computerScore = 0;

function updateScores() {
    score1.textContent = `Batman: ${humanScore}`;
    score2.textContent = `Villain: ${computerScore}`;
    
    if(humanScore === 5) {
        result.textContent = 'Batman saves Gotham City!';
        disableButtons();
    } else if (computerScore === 5) {
        result.textContent = 'Gotham has fallen to darkness!';
        disableButtons();
    }
}

function disableButtons() {
    const buttons = document.querySelectorAll('.battle-btn');
    buttons.forEach(button => button.disabled = true);
}

function playRound(humanChoice, computerChoice) {
    const human = choices[humanChoice];
    const computer = choices[computerChoice];
    
    // Update character images
    playerImage.textContent = human.image;
    enemyImage.textContent = computer.image;
    
    // Battle log messages
    battleLog.innerHTML = `
        <div>Batman chose: ${human.name}</div>
        <div>Villain chose: ${computer.name}</div>
    `;

    if (humanChoice === computerChoice) {
        battleLog.innerHTML += '<div>The battle continues...</div>';
        return;
    }

    if (human.beats === computerChoice) {
        humanScore++;
        battleLog.innerHTML += '<div>Batman gains the upper hand!</div>';
    } else {
        computerScore++;
        battleLog.innerHTML += '<div>The villain strikes back!</div>';
    }

    updateScores();
}

// Event Listeners
const buttons = document.querySelectorAll('.battle-btn');
buttons.forEach((button) => { 
    button.addEventListener("click", () => {
        const human = button.id;
        const computer = getComputerChoice();
        playRound(human, computer);
    });
});

// Initialize scores
updateScores();