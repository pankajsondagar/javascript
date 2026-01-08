// Quiz questions database
const questionBank = {
    easy: [
        {
            question: "What is the capital of France?",
            answers: ["London", "Berlin", "Paris", "Madrid"],
            correct: 2,
            category: "Geography"
        },
        {
            question: "How many days are in a week?",
            answers: ["5", "6", "7", "8"],
            correct: 2,
            category: "General Knowledge"
        },
        {
            question: "What color is the sky on a clear day?",
            answers: ["Green", "Blue", "Red", "Yellow"],
            correct: 1,
            category: "Science"
        },
        {
            question: "How many legs does a spider have?",
            answers: ["6", "8", "10", "12"],
            correct: 1,
            category: "Science"
        },
        {
            question: "What is 10 + 5?",
            answers: ["12", "13", "15", "20"],
            correct: 2,
            category: "Math"
        },
        {
            question: "Which animal is known as 'Man's Best Friend'?",
            answers: ["Cat", "Dog", "Horse", "Rabbit"],
            correct: 1,
            category: "General Knowledge"
        },
        {
            question: "How many continents are there?",
            answers: ["5", "6", "7", "8"],
            correct: 2,
            category: "Geography"
        },
        {
            question: "What is the largest ocean?",
            answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correct: 3,
            category: "Geography"
        },
        {
            question: "What is 5 × 4?",
            answers: ["15", "20", "25", "30"],
            correct: 1,
            category: "Math"
        },
        {
            question: "Which planet is closest to the Sun?",
            answers: ["Venus", "Earth", "Mercury", "Mars"],
            correct: 2,
            category: "Science"
        }
    ]
};

// Game state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let selectedAnswer = null;
let difficulty = 'easy';
let questions = [];
let answers = [];
let startTime;
let questionTimes = [];

function setDifficulty(level) {
    difficulty = level;
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function startQuiz() {
    // Shuffle and select questions
    questions = shuffleArray([...questionBank[difficulty]]).slice(0, 10);
    
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    answers = [];
    questionTimes = [];
    
    // Show quiz screen
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('quizScreen').classList.add('active');
    
    // Update total questions
    document.getElementById('totalQuestions').textContent = questions.length;
    
    // Load first question
    loadQuestion();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Update question info
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionText').textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Display answers
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.textContent = answer;
        answerDiv.onclick = () => selectAnswer(index);
        answersContainer.appendChild(answerDiv);
    });
    
    // Reset state
    selectedAnswer = null;
    document.getElementById('btnNext').disabled = true;
    
    // Start timer
    startTimer();
    startTime = Date.now();
}

function startTimer() {
    timeLeft = 15;
    updateTimerDisplay();
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    const timeLeftElement = document.getElementById('timeLeft');
    
    timeLeftElement.textContent = timeLeft;
    
    timerElement.classList.remove('warning', 'danger');
    if (timeLeft <= 5) {
        timerElement.classList.add('danger');
    } else if (timeLeft <= 10) {
        timerElement.classList.add('warning');
    }
}

function selectAnswer(index) {
    // Prevent selecting after time up
    if (timeLeft <= 0) return;
    
    selectedAnswer = index;
    
    // Update UI
    document.querySelectorAll('.answer').forEach((answer, i) => {
        answer.classList.remove('selected');
        if (i === index) {
            answer.classList.add('selected');
        }
    });
    
    // Enable next button
    document.getElementById('btnNext').disabled = false;
}

function timeUp() {
    selectedAnswer = null;
    checkAnswer();
}

function nextQuestion() {
    clearInterval(timerInterval);
    checkAnswer();
}

function checkAnswer() {
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;
    
    // Calculate time taken
    const timeTaken = 15 - timeLeft;
    questionTimes.push(timeTaken);
    
    // Calculate points (faster = more points)
    let points = 0;
    if (isCorrect) {
        const timeBonus = Math.max(0, timeLeft) * 2;
        points = 100 + timeBonus;
        score += points;
    }
    
    // Store answer
    answers.push({
        question: question.question,
        selectedAnswer: selectedAnswer !== null ? question.answers[selectedAnswer] : 'No answer',
        correctAnswer: question.answers[question.correct],
        isCorrect: isCorrect,
        points: points
    });
    
    // Show correct/incorrect
    const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach((element, index) => {
        element.classList.add('disabled');
        if (index === question.correct) {
            element.classList.add('correct');
        }
        if (index === selectedAnswer && !isCorrect) {
            element.classList.add('incorrect');
        }
    });
    
    // Move to next question or show results
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function showResults() {
    clearInterval(timerInterval);
    
    // Hide quiz screen, show results
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');
    
    // Calculate stats
    const correctCount = answers.filter(a => a.isCorrect).length;
    const incorrectCount = answers.length - correctCount;
    const percentage = Math.round((correctCount / questions.length) * 100);
    const avgTime = (questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length).toFixed(1);
    
    // Display score
    document.getElementById('finalScore').textContent = percentage;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('incorrectAnswers').textContent = incorrectCount;
    document.getElementById('totalPoints').textContent = score;
    document.getElementById('avgTime').textContent = avgTime + 's';
    
    // Set score circle color and message
    const scoreCircle = document.getElementById('scoreCircle');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsMessage = document.getElementById('resultsMessage');
    
    scoreCircle.classList.remove('excellent', 'good', 'average', 'poor');
    
    if (percentage >= 80) {
        scoreCircle.classList.add('excellent');
        resultsTitle.textContent = 'Excellent! 🏆';
        resultsMessage.textContent = 'You really know your stuff!';
    } else if (percentage >= 60) {
        scoreCircle.classList.add('good');
        resultsTitle.textContent = 'Good Job! 👍';
        resultsMessage.textContent = 'You did pretty well!';
    } else if (percentage >= 40) {
        scoreCircle.classList.add('average');
        resultsTitle.textContent = 'Not Bad! 📚';
        resultsMessage.textContent = 'Keep practicing to improve!';
    } else {
        scoreCircle.classList.add('poor');
        resultsTitle.textContent = 'Keep Trying! 💪';
        resultsMessage.textContent = 'Practice makes perfect!';
    }
    
    // Show review
    displayReview();
}

function displayReview() {
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';
    
    answers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        const resultIcon = answer.isCorrect ? '✅' : '❌';
        
        reviewItem.innerHTML = `
            <div class="review-question">${resultIcon} Question ${index + 1}: ${answer.question}</div>
            <div class="review-answer ${answer.isCorrect ? 'correct' : 'incorrect'}">
                Your answer: ${answer.selectedAnswer}
            </div>
            ${!answer.isCorrect ? `
                <div class="review-answer correct">
                    Correct answer: ${answer.correctAnswer}
                </div>
            ` : ''}
            <div style="font-size: 12px; color: #999; margin-top: 4px;">
                Points earned: ${answer.points}
            </div>
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
}

function restartQuiz() {
    document.getElementById('resultsScreen').classList.remove('active');
    document.getElementById('startScreen').style.display = 'block';
}