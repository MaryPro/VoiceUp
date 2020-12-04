let num, array, width, context, logo, myElements, analyser, src, height, ball, ballHeight, scoreDiv;

const body = document.querySelector('body');
const section = document.querySelector('section');
const firstLine = document.querySelector('.firstLine');
const secondLine = document.querySelector('.secondLine');
const thirdLine = document.querySelector('.thirdLine');
const square = document.querySelectorAll('.square');
const startBtn = document.querySelector('#startBtn');
const left = document.querySelector('.left');
const leaderBoard = document.querySelector('.leaderBoard');
// const addName = document.querySelector('.addName')
const nameInput = document.querySelectorAll('.name')
const botLine = document.querySelector('.botLine')
// const topLine = document.querySelector('.topLine')
const gameField = document.querySelector('.gameField')
const main = document.querySelector('main');
const scoreDivMob = document.querySelector('.scoreDivMob');
const btns = document.querySelector('.btns');

const clientWidth = document.body.clientWidth;
let score = 0
let username = ''

if(clientWidth > 992){
  nameInput[1].value = localStorage.getItem('name');
}else{
  nameInput[0].value = localStorage.getItem('name');
}

//количество столбцов
num = 1;
array = new Uint8Array(num * 2);
width = 10;

startBtn.addEventListener('click', function () {
  botLine.classList.add('delayForMob')
  
  if(clientWidth > 992){
    username = nameInput[1].value
  }else{
    username = nameInput[0].value
  }

  if(username.trim()){
    localStorage.setItem('name', username)
  } else if (!username.trim() && localStorage.getItem('name')) {
    username = localStorage.getItem('name')
  } else {
    username = 'NoName'
  }

  left.innerText = ''
  left.innerText += `Name: ${username}`

  scoreDiv = document.createElement('div');
  scoreDiv.className = 'scoreDiv';
  left.appendChild(scoreDiv);
  scoreDiv.innerHTML = `Score: ${score}`
  
  scoreDivMob.innerHTML = `Score: ${score}`

  if (context) return;
  //удалим заголовок клик со страницы
  startBtn.classList.add('hidden')
  logo = document.createElement('div');
  logo.className = 'logo';
  logo.style.minWidth = width + 'px';
  section.insertBefore(logo, secondLine);
  // section.appendChild(logo);

  ball = document.createElement('div');
  ball.className = 'ball';
  ball.style.background = 'blue';
  // ball.style.minWidth = width+'px';
  logo.appendChild(ball);

  //поместим весь список элементов в новую переменную
  myElements = document.getElementsByClassName('logo');
  //создадим аудиоконтекст
  context = new AudioContext();
  //создаем аналайзер
  analyser = context.createAnalyser();
  //делаем запрос на захват звука с микрофона
  navigator.mediaDevices.getUserMedia({
    //нужно аудио - выставляем на тру
    audio: true
    // в случае успеха передаем поток в переменную stream
  }).then(stream => {
    src = context.createMediaStreamSource(stream);
    //соединяем с аналайзером
    src.connect(analyser);
    //Если хотите что бы звук выводился на колонки \ динамики подключите analyser к выходу
    analyser.connect(context.destination);
    loop();

  })
})

function loop() {
  if (myElements) {
    //создаем рекурсию, будет создавать себя примерно 60 раз в секунду
    window.requestAnimationFrame(loop);
    //получаем данные частот с помощью analyser
    analyser.getByteFrequencyData(array);
    //переберем все элементы из массива myElements и каждому будем задавать высоту
    for (let i = 0; i < num; i++) {
      // в height записываем значение частоты
      height = array[i + num] * 2.5;
      //получаем высоту элемента
      myElements[i].style.minHeight = height + 'px';
    }

    let coords1 = firstLine.getBoundingClientRect();
    let coords2 = secondLine.getBoundingClientRect();
    let coords3 = thirdLine.getBoundingClientRect();
    let coordsBall = ball.getBoundingClientRect();
    let botLineCoords = botLine.getBoundingClientRect();
    // let topLineCoords = topLine.getBoundingClientRect();

    //проверка на вхождение в зону

    if (coordsBall.x >= coords1.x - 70 && coordsBall.x <= coords1.x + 70 && coordsBall.y >= coords1.y - 70 && coordsBall.y <= coords1.y + 100) {
      firstLine.classList.add('hidden')
      score++
    } else if (coordsBall.x >= coords2.x - 70 && coordsBall.x <= coords2.x + 70 && coordsBall.y >= coords2.y - 70 && coordsBall.y <= coords2.y + 100) {
      secondLine.classList.add('hidden')
      score++
    } else if (coordsBall.x >= coords3.x - 70 && coordsBall.x <= coords3.x + 70 && coordsBall.y >= coords3.y - 70 && coordsBall.y <= coords3.y + 100) {
      thirdLine.classList.add('hidden')
      score++
    } else if (coordsBall.x >= botLineCoords.x - 70 && coordsBall.x <= botLineCoords.x + 70 && coordsBall.y >= botLineCoords.y - 70 && coordsBall.y <= botLineCoords.y + 50) {
      gameOver()
      addLeaderBoard({ username, score })
      myElements = ''
    }

    if (coords1.x > 1500 || coords1.x > clientWidth) {
      firstLine.classList.remove('hidden')
    }
    if (coords2.x > 1500 || coords2.x > clientWidth) {
      secondLine.classList.remove('hidden')
    }
    else if (coords3.x > 1500 || coords3.x > clientWidth) {
      thirdLine.classList.remove('hidden')
    }

    scoreDiv.innerText = `Score: ${score}`
    scoreDivMob.innerHTML = `Name: ${username}`
    scoreDivMob.innerText += `\n Score: ${score}`

  }

}

function gameOver() {
  botLine.classList.remove('delayForMob')
  gameField.innerHTML = ''
  const gameOverDiv = document.createElement('div');
  gameOverDiv.className = 'gameOverDiv col xl8 offset-xl2 l8 offset-l2 m6 offset-m3 s10 offset-s1 center-align valign-wrapper';
  gameField.appendChild(gameOverDiv);
  gameOverDiv.innerText = `GAME OVER
  Your score: ${score}
  `
  startBtn.classList.remove('hidden')
  startBtn.value = 'New Game'
  startBtn.addEventListener('click', () => {
    location.reload()
  })

}

async function addLeaderBoard(data) {
  // leaderBoard.innerHTML += `<li class="place"> ${nameInput.value} - ${score} </li>`
  // const {username: {value: username}} = e.target;
  const response = await fetch('/addUser', {
    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data)
  })
  const addToLeaderBoard = await response.json()
}
