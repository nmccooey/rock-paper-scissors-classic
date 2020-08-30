const playButton = document.querySelector("#play-button");
const menuScreen = document.querySelector("#menu-screen");
const gameScreen = document.querySelector("#game-screen");
const winnerScreen = document.querySelector("#winner-screen");

playButton.addEventListener("click", function(){
    renderGameComponents();
    startGame();
});

// Starts a game.
function startGame() {
    let humanScore = 0;
    let computerScore = 0;

    const weapons = {
        Rock: {weakTo: 'Paper', strongTo: 'Scissors', img: "./images/rock.png"},
        Paper: {weakTo: 'Scissors', strongTo: 'Rock', img: "./images/paper.png"},
        Scissors: {weakTo: 'Rock', strongTo: 'Paper', img: "./images/scissors.png"}
    }

    const gameStatus = document.querySelector("#game-status");
    const battlefield = document.querySelector("#battlefield");
    const humanScoreSpan = document.querySelector("#human-score");
    const computerScoreSpan = document.querySelector("#computer-score");
    const rockButton = document.querySelector(".rock");
    const paperButton = document.querySelector(".paper");
    const scissorsButton = document.querySelector(".scissors");

    rockButton.addEventListener("click", checkWinner);
    paperButton.addEventListener("click", checkWinner);
    scissorsButton.addEventListener("click", checkWinner);


    function checkWinner(event) {
        // Clear out any html in battlefield.
        battlefield.innerHTML = "";

        let humanChoice = event.target.getAttribute("data");
        let humanImage = document.createElement("img");
        humanImage.src = weapons[humanChoice].img;
        humanImage.classList.add("battlefield-img-human");
        battlefield.appendChild(humanImage);

        let computerChoice = Object.keys(weapons)[getRandomInt(3)];
        let computerImage = document.createElement("img");
        computerImage.src = weapons[computerChoice].img;
        computerImage.classList.add("battlefield-img-computer");
        battlefield.appendChild(computerImage);
        
        // Check if human won.
        if (weapons[humanChoice].strongTo == computerChoice) {
            humanScore++;
            if(humanScore == 2) {
                declareWinner("human");
            } else {
                gameStatus.innerText = "You WON this round!";
                gameStatus.style.backgroundColor = "#FFFF00";
            }
            updateScore();
            return;
        }
        
        // Check if computer won.
        if (weapons[humanChoice].weakTo == computerChoice) {
            computerScore++;
            if(computerScore == 2) {
                declareWinner("computer");
            } else {
                gameStatus.innerText = "You LOST this round!";
                gameStatus.style.backgroundColor = "#f04848";
            }
            updateScore();
            return;
        }

        gameStatus.innerText = "It's a Tie!";
        gameStatus.style.backgroundColor = "#3FC8FF";
    }

    // Updates each span with the current score.
    function updateScore() {
        humanScoreSpan.innerHTML = humanScore;
        computerScoreSpan.innerHTML = computerScore;
        return;
    }

    // Declares a winner and prompts user for a new game.
    function declareWinner(winner) {
        gameScreen.style.display = "none";
        winnerScreen.style.display = "flex";
        
        const winnerStatus = document.querySelector(".winner-status");
        const playAgainButton = document.querySelector("#play-again-button");
        if (winner === "human") {
            winnerStatus.innerText = "You WON the GAME!";
            winnerStatus.style.backgroundColor = "#74eb34";
        } else if (winner === "computer") {
            winnerStatus.innerText = "You LOST the GAME!";
            winnerStatus.style.backgroundColor = "#AE191A";
        }
    }
}

// Returns random integer with max exclusive.
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Renders game components to the screen.
function renderGameComponents() {
    //startBackgroundMusic();
    document.querySelector(".rock").addEventListener("click", playSound);
    document.querySelector(".paper").addEventListener("click", playSound);
    document.querySelector(".scissors").addEventListener("click", playSound);

    // Remove menu screen and display the game screen.
    menuScreen.style.display = "none";
    gameScreen.style.display = "flex";
}

// Starts the background music on a loop.
function startBackgroundMusic() {
    let backgroundMusic = new Audio("./music/smile.mp3");
    backgroundMusic.play();
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true;
}

// Plays a sound effect based on what was clicked.
function playSound(event) {
    let choice = event.target.getAttribute('data').toLowerCase();
    let url = "./music/scissors.mp3";
    if (choice === "rock") {
        url = "./music/rock.mp3";
    } else if (choice === "paper") {
        url = "./music/paper.mp3";
    }
    let sound = new Audio(url);
    sound.play();
}