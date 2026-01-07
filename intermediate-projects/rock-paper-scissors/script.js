// Game state
let playerScore = 0;
let computerScore = 0;
let totalGames = 0;
let wins = 0;
let losses = 0;
let ties = 0;
let currentStreak = 0;
let bestStreak = 0;
let gameHistory = [];
let gameMode = 'classic'; // classic, best-of-5, first-to-10

// Choice icons
const icons = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Game logic: what beats what
const rules = {
    rock: 'scissors',     // rock beats scissors
    paper: 'rock',        // paper beats rock
    scissors: 'paper'     // scissors beats paper
};

function setGameMode(mode) {
    gameMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Reset game
    newGame();
}

function playGame(playerChoice) {
    // Generate computer choice
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomIndex];
    
    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);
    
    // Update scores
    if (result === 'win') {
        playerScore++;
        wins++;
        currentStreak++;
        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
        }
    } else if (result === 'lose') {
        computerScore++;
        losses++;
        currentStreak = 0;
    } else {
        ties++;
        currentStreak = 0;
    }
    
    totalGames++;
    
    // Add to history
    gameHistory.unshift({
        player: playerChoice,
        computer: computerChoice,
        result: result
    });
    
    // Keep only last 10 games
    if (gameHistory.length > 10) {
        gameHistory.pop();
    }
    
    // Update display
    displayResult(playerChoice, computerChoice, result);
    updateScoreboard();
    updateStats();
    updateHistory();
    updateStreak();
    
    // Check for game mode completion
    checkGameMode();
}

function determineWinner(player, computer) {
    // Tie
    if (player === computer) {
        return 'tie';
    }
    
    // Win: player's choice beats computer's choice
    if (rules[player] === computer) {
        return 'win';
    }
    
    // Lose: computer wins
    return 'lose';
}

function displayResult(playerChoice, computerChoice, result) {
    // Show result area
    const resultArea = document.getElementById('resultArea');
    resultArea.classList.remove('hidden');
    
    // Display choices
    document.getElementById('playerChoice').textContent = icons[playerChoice];
    document.getElementById('computerChoice').textContent = icons[computerChoice];
    
    // Display result message
    const resultMessage = document.getElementById('resultMessage');
    const resultDescription = document.getElementById('resultDescription');
    
    resultMessage.classList.remove('win', 'lose', 'tie');
    
    if (result === 'win') {
        resultMessage.textContent = 'You Win! 🎉';
        resultMessage.classList.add('win');
        resultDescription.textContent = getWinMessage(playerChoice, computerChoice);
    } else if (result === 'lose') {
        resultMessage.textContent = 'You Lose! 😢';
        resultMessage.classList.add('lose');
        resultDescription.textContent = getWinMessage(computerChoice, playerChoice);
    } else {
        resultMessage.textContent = "It's a Tie! 🤝";
        resultMessage.classList.add('tie');
        resultDescription.textContent = `Both chose ${playerChoice}`;
    }
}

function getWinMessage(winner, loser) {
    const messages = {
        rock: {
            scissors: 'Rock crushes Scissors',
            paper: 'Paper covers Rock'
        },
        paper: {
            rock: 'Paper covers Rock',
            scissors: 'Scissors cuts Paper'
        },
        scissors: {
            paper: 'Scissors cuts Paper',
            rock: 'Rock crushes Scissors'
        }
    };
    
    return messages[winner][loser];
}

function updateScoreboard() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

function updateStats() {
    document.getElementById('totalGames').textContent = totalGames;
    
    // Calculate win rate
    const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    document.getElementById('winRate').textContent = winRate + '%';
    
    document.getElementById('winStreak').textContent = bestStreak;
    document.getElementById('ties').textContent = ties;
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    
    if (gameHistory.length === 0) {
        historyList.innerHTML = '<div style="color: #999; padding: 20px;">Play a game to see history</div>';
        return;
    }
    
    historyList.innerHTML = gameHistory.map(game => `
        <div class="history-item ${game.result}">
            <div class="history-icon">${icons[game.player]}</div>
            <div>${game.result === 'win' ? 'WIN' : game.result === 'lose' ? 'LOSE' : 'TIE'}</div>
        </div>
    `).join('');
}

function updateStreak() {
    const streakElement = document.getElementById('streak');
    const streakCount = document.getElementById('streakCount');
    
    if (currentStreak >= 3) {
        streakElement.classList.remove('hidden');
        streakCount.textContent = currentStreak;
    } else {
        streakElement.classList.add('hidden');
    }
}

function checkGameMode() {
    let gameOver = false;
    let message = '';
    
    if (gameMode === 'best-of-5') {
        if (playerScore === 3 || computerScore === 3) {
            gameOver = true;
            message = playerScore === 3 ? 'You won best of 5! 🏆' : 'Computer won best of 5!';
        }
    } else if (gameMode === 'first-to-10') {
        if (playerScore === 10 || computerScore === 10) {
            gameOver = true;
            message = playerScore === 10 ? 'You reached 10 first! 🏆' : 'Computer reached 10 first!';
        }
    }
    
    if (gameOver) {
        setTimeout(() => {
            alert(message);
            newGame();
        }, 500);
    }
}

function newGame() {
    playerScore = 0;
    computerScore = 0;
    updateScoreboard();
    
    // Hide result area
    document.getElementById('resultArea').classList.add('hidden');
}

function resetStats() {
    if (confirm('Are you sure you want to reset all statistics?')) {
        playerScore = 0;
        computerScore = 0;
        totalGames = 0;
        wins = 0;
        losses = 0;
        ties = 0;
        currentStreak = 0;
        bestStreak = 0;
        gameHistory = [];
        
        updateScoreboard();
        updateStats();
        updateHistory();
        updateStreak();
        
        document.getElementById('resultArea').classList.add('hidden');
    }
}

// Initialize display
updateScoreboard();
updateStats();
updateHistory();