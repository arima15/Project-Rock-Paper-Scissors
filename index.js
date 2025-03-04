function getComputerChoice()
{
    const choices = ['rock','paper','scissors'];
    const random = Math.floor(Math.random()* 3);
    return choices[random];
}

const getHumanChoice = () => {
    let choice = prompt('Enter your choice: ');
    return choice.toLowerCase();
};

let humanScore = 0;
let computerScore = 0;

function Compare(player1, player2){
    console.log(`Computer score: ${player2}`);
    console.log(`Human score: ${player1}`);

    if(player1 === player2){
        return 'The result is a tie!';
    }
    else if(player1 > player2){
        return 'You win!'; 
    }    
    else{
        return 'You lose!';
    }
}

function playRound(humanChoice, computerChoice){

    console.log(`Computer chose: ${computerChoice}`);
    if (humanChoice === computerChoice){
        return 'It is a tie!';
    }
    switch(`${humanChoice}-${computerChoice}`){
        case 'rock-scissors':
        case 'paper-rock':
        case 'scissors-paper':
            humanScore++;
            return 'You win!';
        case 'rock-paper':
        case 'paper-scissors':
        case 'scissors-rock':
            computerScore++;
            return 'You lose!';
    }
}

console.log();
console.log(Compare(humanScore, computerScore));