const cor = document.querySelector('#rgb-color');
const circlesContainer = document.querySelector('#circulos');
const resposta = document.querySelector('#answer');
const resetGame = document.querySelector('#reset-game');
const pontos = document.querySelector('#score');
const respostaContainer = document.querySelector('#resposta');
const highscore = document.querySelector('#highscore');
pontos.innerText = 0;
highscore.innerText = 0;

function corBase() {
  const n1 = Math.floor(Math.random() * 256);
  const n2 = Math.floor(Math.random() * 256);
  const n3 = Math.floor(Math.random() * 256);
  const corAleatoria = `<strong><span>(</span><span style='color: red'>${n1}</span>, <span style='color: green'>${n2}</span>, <span style='color: blue'>${n3}</span><span>)</span></strong>`; // linha de código usada como referencia de Gabriel Pondaco - Turma 19 - Tribo B //
  cor.innerHTML = corAleatoria;
}
corBase();

function criaCirculos() {
  for (let index = 0; index < 6; index += 1) {
    const div = document.createElement('div');
    div.classList.add('ball');
    circlesContainer.appendChild(div);
  }
}
criaCirculos();

function backgroundCirculos() {
  const filho = circlesContainer.children;
  for (let index = 0; index < filho.length; index += 1) {
    const n01 = Math.floor(Math.random() * 256);
    const n02 = Math.floor(Math.random() * 256);
    const n03 = Math.floor(Math.random() * 256);
    const rgb = `(${n01}, ${n02}, ${n03})`;
    filho[index].style.backgroundColor = `rgb${rgb}`;
  }
  const correto = Math.floor(Math.random() * 6);
  filho[correto].style.backgroundColor = `rgb${cor.innerText}`;
}
backgroundCirculos();

function eventListenerCirculos() {
  const filho = circlesContainer.children;
  for (let index = 0; index < filho.length; index += 1) {
    filho[index].addEventListener('click', () => {
      const corRgb = cor.innerHTML;
      const numeroString = corRgb.replace(/\D/g, '');
      const filhoRgb = filho[index].style.backgroundColor;
      const verificador = filhoRgb.replace(/\D/g, '');
      if (numeroString === verificador) {       
        respostaContainer.innerHTML = `<img src="./acertou.png">
        <p id='answer' style='color: green'>Acertou!</p>`;
        pontos.innerText = parseInt(pontos.innerText, 10) + 3;
        corBase();
        backgroundCirculos();
        maiorPontuação();
      } else {
        respostaContainer.innerHTML = `<img src="./errou.png" style='margin-right: 5px'>
        <p id='answer' style='color: red'>Errou! Tente Novamente</p>`;
        pontos.innerText = 0;
        corBase();
        maiorPontuação();
        backgroundCirculos();
      }
    });
  }
}

eventListenerCirculos();

function resetButton() {
  const n1 = Math.floor(Math.random() * 256);
  const n2 = Math.floor(Math.random() * 256);
  const n3 = Math.floor(Math.random() * 256);
  const corAleatoria = `<strong><span>(</span><span style='color: red'>${n1}</span>, <span style='color: green'>${n2}</span>, <span style='color: blue'>${n3}</span><span>)</span></strong>`;
  cor.innerHTML = corAleatoria;
  pontos.innerText = 0;
  backgroundCirculos();
  respostaContainer.innerHTML = `<p id="answer">Escolha uma cor!</p>`;
}

function maiorPontuação() {
  let pontuaçãoAtual = parseInt(score.innerText);
  let highscoreAtual = parseInt(highscore.innerText);
  if (pontuaçãoAtual > highscoreAtual) {
    highscore.innerText = pontuaçãoAtual;
    salvaHighscore();
  }
}

function salvaHighscore() {
  localStorage.setItem('pontuacao', parseInt(highscore.innerText))
}

function carregaHighscore() {
  if (localStorage.getItem('pontuacao') !== null) {
    highscore.innerText = localStorage.getItem('pontuacao')
  }  
}

resetGame.addEventListener('click', resetButton);

window.onload = carregaHighscore();