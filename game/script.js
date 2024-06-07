const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let grade1=0;
let time=0;
var score=document.getElementById("score");
var st=document.getElementById("st");
function flipCard() {
  // 剛剛沒配對成功的話，就把牌蓋起來
  if (lockBoard) return;

  // 避免翻同一張牌當做第二張
  if (this === firstCard) return;
  
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this; // this => the clicked card
    return;
  }

  secondCard = this;
  grade1=grade1+1;
  score.innerHTML="翻牌次數："+grade1;
  checkForMatch();
}
//score.innerHTML="翻牌次數：<br>"+grade;
function checkForMatch() {
  // 如果牌組配對成功 => isMatch
  // 就不可以再點擊那組牌 => disableCards()
  // 配對錯誤就把該牌組蓋起來 => unflipCards()
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if(isMatch){
	  disableCards();
	  time=time+1;
	  if(time==9){
		 st.innerHTML="狀態：完成"; 
		 clearInterval(timerInterval);
	  }
	  else{
		 st.innerHTML="狀態：未完成"; 
	  }
  }
  else{
	  unflipCards();
  }
  
}

function disableCards() {
  // 移除監聽事件，釋放記憶體
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  // 把牌蓋起來
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));

const form = document.getElementById('next');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const score = document.getElementById('score').value;
	  
	  localStorage.setItem('status', time);
	  localStorage.setItem('grade1', grade1);
	  localStorage.setItem('time1', seconds);
      window.location.href = 'test1.html';
    });
	

  // Timer variables
  let timerElement = document.getElementById("timer");
  let seconds = 0;
  let timerInterval;

  // Function to update the timer
  function updateTimer() {
    seconds++;
    timerElement.textContent = "Time: " + seconds + "s";
  }

  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);


