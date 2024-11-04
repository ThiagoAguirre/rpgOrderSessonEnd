// Variáveis do Jogo de Memória
const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let cardValues = [...colors, ...colors];
let firstCard, secondCard;
let matches = 0;
let gameStarted = false;
let countdown;

// Embaralha as cartas
cardValues.sort(() => 0.5 - Math.random());

// Renderiza as cartas
const gameContainer = document.getElementById("game-container");
cardValues.forEach(color => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.color = color;
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
});

// Temporizador
let timeRemaining = 40; // 3 minutos em segundos
function startTimer() {
    countdown = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById("timer").textContent = `Tempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeRemaining <= 0) {
            timeRemaining = 60; // Reinicia o tempo para 60 segundos
            alert("Perdeu 15 de vida!");
        }
    }, 1000);
}

// Virar carta
function flipCard() {
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }
    if (this.classList.contains("flipped") || secondCard) return;
    this.classList.add("flipped");
    this.style.backgroundColor = this.dataset.color;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

// Checa se as cartas combinam
function checkMatch() {
    if (firstCard.dataset.color === secondCard.dataset.color) {
        matches++;
        firstCard = null;
        secondCard = null;
        if (matches === colors.length) {
            document.getElementById("message").textContent = "Parabéns! Você encontrou todas as combinações!";
            showQuestion();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.style.backgroundColor = "gray";
            secondCard.style.backgroundColor = "gray";
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

// Mostra a questão matemática
function showQuestion() {
    document.getElementById("question").style.display = "block";
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    document.getElementById("math-question").textContent = `${num1} + ${num2}`;
    document.getElementById("question").dataset.answer = num1 + num2;
}

// Checa a resposta do usuário
function checkAnswer() {
    const answer = document.getElementById("answer").value;
    const correctAnswer = document.getElementById("question").dataset.answer;
    if (answer == correctAnswer) {
        document.getElementById("message").textContent = "Resposta correta! Vamos para a sequência de cores!";
        document.getElementById("question").style.display = "none";
        startColorSequenceGame();
    } else {
        document.getElementById("message").textContent = "Resposta incorreta! Tente novamente!";
    }
}

// Jogo de Sequência de Cores
let colorSequence = [];
let playerSequence = [];

function startColorSequenceGame() {
    document.getElementById("color-sequence-game").style.display = "block";
    generateColorSequence();
}

function generateColorSequence() {
    colorSequence = Array.from({length: 5}, () => colors[Math.floor(Math.random() * colors.length)]);
    displaySequence();
}

function displaySequence() {
    const sequenceContainer = document.getElementById("color-sequence");
    sequenceContainer.innerHTML = '';
    let delay = 0;
    colorSequence.forEach(color => {
        setTimeout(() => {
            const colorDiv = document.createElement("div");
            colorDiv.classList.add("color-button");
            colorDiv.style.backgroundColor = color;
            sequenceContainer.appendChild(colorDiv);
            setTimeout(() => {
                sequenceContainer.removeChild(colorDiv);
            }, 600);
        }, delay);
        delay += 1000;
    });
    setTimeout(promptPlayerSequence, delay);
}

function promptPlayerSequence() {
    const inputContainer = document.getElementById("color-input");
    inputContainer.innerHTML = '';
    playerSequence = [];
    colors.forEach(color => {
        const colorButton = document.createElement("div");
        colorButton.classList.add("color-button");
        colorButton.style.backgroundColor = color;
        colorButton.onclick = () => recordPlayerColor(color);
        inputContainer.appendChild(colorButton);
    });
}

function recordPlayerColor(color) {
    playerSequence.push(color);
    if (playerSequence.length === colorSequence.length) {
        checkPlayerSequence();
    }
}

function checkPlayerSequence() {
    if (JSON.stringify(playerSequence) === JSON.stringify(colorSequence)) {
        document.getElementById("message").textContent = "Parabéns! Você desarmou a bomba!";
        document.getElementById("color-sequence-game").style.display = "none";
        startWireCuttingGame();
    } else {
        document.getElementById("message").textContent = "Sequência incorreta! Tente novamente!";
        playerSequence = [];
    }
}

// Jogo de Corte de Fios
function startWireCuttingGame() {
    document.getElementById("wire-cutting-game").style.display = "block";
    const wiresContainer = document.getElementById("wires-container");
    wiresContainer.innerHTML = '';
    
    // Definindo a sequência de fios (vermelho, vermelho, verde, vermelho, azul)
    const wires = ["red", "red", "green", "red", "blue"];
    wires.forEach((color, index) => {
        const wire = document.createElement("div");
        wire.classList.add("wire");
        wire.style.backgroundColor = color;
        wire.dataset.index = index;
        wire.onclick = () => cutWire(index);
        wiresContainer.appendChild(wire);
    });
}

function cutWire(index) {
    if (index === 2) { // Índice do fio verde entre dois vermelhos
        document.getElementById("message").textContent = "Parabéns! Você cortou o fio certo e desarmou a bomba!";
        document.getElementById("wire-cutting-game").style.display = "none";
        clearInterval(countdown); // Para o temporizador apenas no final do jogo completo
    } else {
        document.getElementById("message").textContent = "Fio errado! Tente novamente.";
    }
}

// Fim de jogo
function gameOver() {
    Array.from(document.getElementsByClassName("card")).forEach(card => {
        card.removeEventListener("click", flipCard);
    });
}
