const container = document.querySelector("#container");

const div1 = document.createElement("div");
const div2 = document.createElement("div");
const div3 = document.createElement("div");

const score1 = document.createElement("div");
const score2 = document.createElement("div");
const result = document.createElement("div");

function getComputerChoice()
{
    const choices = ['rock','paper','scissors'];
    const random = Math.floor(Math.random()* 3);
    return choices[random];
}

/*const getHumanChoice = () => {
    let choice = prompt('Enter your choice: ');
    return choice.toLowerCase();
}; */

let humanScore = 0;
let computerScore = 0;
function Compare(player1, player2){

    score1.textContent = `Human: ${humanScore}`;
    score2.textContent = `Computer: ${computerScore}`;
    
    if(player1 == 5){
        result.textContent = 'The human wins!'; 
    }    
    else if (player2 == 5){
        result.textContent = 'The computer wins!';
    }
}

function playRound(humanChoice, computerChoice){
    div1.textContent = `You chose: ${humanChoice}`;
    div2.textContent = `Computer chose: ${computerChoice}`;

    if (humanChoice === computerChoice){
        div3.textContent = 'It is a tie!';
    }
    switch(`${humanChoice}-${computerChoice}`){
        case 'rock-scissors':
        case 'paper-rock':
        case 'scissors-paper':
            humanScore++;
            div3.textContent = 'You win!';
        case 'rock-paper':
        case 'paper-scissors':
        case 'scissors-rock':
            computerScore++;
            div3.textContent = 'You lose!';
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => { 
    button.addEventListener("click", () => {
        const human = button.id;
        const computer = getComputerChoice();
        playRound(human,computer);
        Compare(humanScore,computerScore);
    });
});

container.appendChild(div1);
container.appendChild(div2);
container.appendChild(div3);

container.appendChild(score1);
container.appendChild(score2);
container.appendChild(result);