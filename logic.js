let gameScreen = document.getElementById("gameScreen");
let mario = document.getElementById("mario");
let canoVerde = document.getElementById("canoVerde");
let timer = document.getElementById("timer");
let startScreen = document.getElementById("startScreen");
let startBtn = document.getElementById("startBtn");
let again = document.getElementById("again");
let againBtn = document.getElementById("againBtn");
let notAgainBtn = document.getElementById("notAgainBtn");
let colisao = 0;
let body = document.getElementById("body");

class MarioGame {
  pular() {
    mario.classList.add("jump");
    setTimeout(() => mario.classList.remove("jump"), 1000);
    console.log("pulei!");
  }

  checarColisao() {
    let marioTop = parseInt(
      window.getComputedStyle(mario).getPropertyValue("top")
    );
    let canoLeft = parseInt(
      window.getComputedStyle(canoVerde).getPropertyValue("left")
    );
    if (marioTop > 145 && canoLeft >= 60 && canoLeft <= 135) {
      colisao++;
      window.alert("GAME OVER");
      gameScreen.classList.add("hide");
      timer.classList.add("hide");
      again.classList.remove("hide");
      again.classList.add("showAgain");
      body.classList.add("img");
    }
  }

  cronômetro() {
    let segundos = 15; //"zerei o tempo"
    timer.innerText = "00:16"; //zerei a div

    let intervalId = setInterval(() => {
      if (segundos >= 10) {
        timer.innerText = "00:" + segundos; //segundos na tela
      } else {
        timer.innerText = "00:0" + segundos; //segundos na tela
      }

      if (colisao > 0) {
        //testo se houve colisão
        clearInterval(intervalId); //se colidir, o timer para de repetir
      }

      if (segundos <= 0 && colisao <= 0) {
        window.alert("PARABÉNS!!!! VOCÊ GANHOU!!!");
        gameScreen.classList.add("hide");
        timer.classList.add("hide");
        again.classList.remove("hide");
        again.classList.add("showAgain");
        body.classList.add("img");
        clearInterval(intervalId);
      }
      segundos--;
      console.log("teste");
    }, 1000);
  }

  start() {
    startScreen.classList.add("hide");
    body.classList.remove("img");
    gameScreen.classList.remove("hide");
    timer.classList.remove("hide");
    again.classList.remove("showAgain");
    again.classList.add("hide");
  }

  notAgain() {
    startScreen.classList.remove("hide");
    startScreen.classList.add("showStart");
    timer.classList.add("hide");
    gameScreen.classList.add("hide");
    again.classList.remove("showAgain");
    again.classList.add("hide");
  }
}

let mariogame = new MarioGame();

gameScreen.addEventListener("click", (event) => mariogame.pular()); //pula com o click

setInterval(mariogame.checarColisao, 100); //checando colisão a cada 100ms

startBtn.addEventListener("click", () => {
  colisao = 0;
  mariogame.start();
  mariogame.cronômetro();
});

notAgainBtn.addEventListener("click", () => {
  colisao = 0;
  mariogame.notAgain();
});

againBtn.addEventListener("click", () => {
  colisao = 0;
  mariogame.start();
  mariogame.cronômetro();
});
