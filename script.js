const perguntas = [
    {
        questao: "Qual é o meu nome?",
        respostas: ["Paulo Vinicius", "Vinicius", "Julio"],
        certa: 0
    },
    {
        questao: "Qual é o meu tamanho?",
        respostas: ["1,82m", "2,00m", "1,85m"],
        certa: 2
    },
    {
        questao: "Qual destes não é jogador do Corinthians atual?",
        respostas: ["Charles", "Paolo Guerrero", "Yuri Alberto"],
        certa: 1
    },
    {
        questao: "Qual dia a gente se conheceu?",
        respostas: ["10/10", "15/10", "30/9"],
        certa: 0
    },
    {
        questao: "Qual é a melhor linha do metrô?",
        respostas: ["Coral", "Azul", "Amarela"],
        certa: 1
    },
    {
        questao: "Eu sou alégico a:",
        respostas: ["Glúten", "Nada, cabra macho", "Molusco"],
        certa: 1
    },
    {
        questao: "Qual é a minha melhor característica:",
        respostas: ["Bonito", "Engraçado", "Cheiroso", "Todas as alternativas"],
        certa: 3
    },
    {
        questao: "Eu sou alégico a:",
        respostas: ["Glúten", "Nada, cabra macho", "Molusco"],
        certa: 1
    },
    {
        questao: "Eu sou alégico a:",
        respostas: ["Glúten", "Nada, cabra macho", "Molusco"],
        certa: 1
    },
    {
        questao: "A quem pertence meu coração?",
        respostas: ["Ricardão", "Julia", "Ana"],
        certa: 1
    }
];

let indice = 0;
let pontuacao = 0;

const questionDiv = document.getElementById('question');
const answersDiv = document.getElementById('answers');
const resultDiv = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const finalDiv = document.getElementById('final');
const finalScore = document.getElementById('finalScore');

// Adicione um elemento para mostrar o prêmio
let premioSpan = document.createElement('span');
premioSpan.id = "premio";
finalDiv.appendChild(premioSpan);

function mostrarPergunta() {
    resultDiv.textContent = '';
    nextBtn.classList.add('hide');
    const atual = perguntas[indice];
    questionDiv.textContent = atual.questao;
    answersDiv.innerHTML = '';
    atual.respostas.forEach((resp, i) => {
        const btn = document.createElement('button');
        btn.textContent = resp;
        btn.onclick = () => verificarResposta(i);
        answersDiv.appendChild(btn);
    });
}

function verificarResposta(escolhida) {
    const correta = perguntas[indice].certa;
    if (escolhida === correta) {
        resultDiv.textContent = "AEEEE ACERTOU!";
        pontuacao += 10;
    } else {
        resultDiv.textContent = "Como você errou essa? Tava fácil";
    }
    Array.from(answersDiv.children).forEach(btn => btn.disabled = true);
    nextBtn.classList.remove('hide');
}

nextBtn.onclick = () => {
    indice++;
    if (indice < perguntas.length) {
        mostrarPergunta();
    } else {
        quizFinalizado();
    }
};

function obterPremio(pontos) {
    let texto = "";
    let imagens = [];
    if (pontos === 100) {
        texto = "🏆 Parabéns! Você ganhou o prêmio máximo: Meu coração!";
        imagens = ["img/foto1.jpg", "img/foto2.jpg", "img/foto3.jpg", "img/foto4.jpg"];
    } else if (pontos >= 70) {
        texto = "🥈 Muito bem! Você ganhou um grande abraço!";
        imagens = ["img/foto1.jpg", "img/foto2.jpg", "img/foto3.jpg"];
    } else if (pontos >= 40) {
        texto = "🥉 Você ganhou um sorriso!";
        imagens = ["img/foto1.jpg", "img/foto2.jpg"];
    } else {
        texto = "😅 Precisamos conversar...";
        imagens = ["img/foto1.jpg"];
    }
    return { texto, imagens };
}

function quizFinalizado() {
    document.getElementById('quiz').classList.add('hide');
    finalDiv.classList.remove('hide');
    finalScore.textContent = pontuacao;
    const premio = obterPremio(pontuacao);
    premioSpan.textContent = premio.texto;

    // Mostra todas as imagens do prêmio
    const premioBox = document.getElementById('premioBox');
    premioBox.innerHTML = ""; // Limpa antes
    premio.imagens.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Prêmio";
        img.style.maxWidth = "200px";
        img.style.display = "block";
        img.style.margin = "20px auto";
        premioBox.appendChild(img);
    });
}

// Iniciar quiz
mostrarPergunta();