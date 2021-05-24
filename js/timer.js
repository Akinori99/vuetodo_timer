(()=>{
'use strict';

// 変数定義
let timer = document.getElementById('timer');
let min1 = document.getElementById('min1');
let sec1 = document.getElementById('sec1');
let min10 = document.getElementById('min10');
let sec10 = document.getElementById('sec10');
let reset = document.getElementById('reset');
let start = document.getElementById('start');

let startTime;
let timeLeft;
let timeToCountDown = 0 ;
let timerId;
let isRunning = false;

// 時間取得・表示
function updateTimer(t){
  let d = new Date(t);
  let m = d.getMinutes();
  let s = d.getSeconds();
  m = ('0' + m).slice(-2);
  s = ('0' + s).slice(-2);
  timer.textContent = m + ':' + s;
  if (timeLeft > 0) {
    document.title = `残り  ${m + ':' + s}`;
  }else if(timeLeft === 0){
    document.title = '終了！';
  }
}

// カウントダウン
function countDown(){
  timerId = setTimeout(()=>{
    timeLeft = timeToCountDown - (Date.now() - startTime);
    if(timeLeft < 0){
      isRunning = false;
      start.textContent = 'スタート';
      clearTimeout(timerId);
      timeLeft = 0;
      timeToCountDown = 0 ;
      updateTimer(timeLeft);
      return;
    }
    updateTimer(timeLeft);
    countDown();
  },10);
}

// スタートボタン
start.addEventListener('click',()=>{
  if(isRunning === false){
    isRunning = true;
    start.textContent = 'ストップ';
    startTime = Date.now();
    countDown();
  }else{
    isRunning = false;
    start.textContent = 'スタート'
    timeToCountDown = timeLeft;
    clearTimeout(timerId);
  }
});

// ＋1分ボタン
min1.addEventListener('click',()=>{
  if(isRunning === true){
    return;
  }
  timeToCountDown += 60 * 1000;
  if(timeToCountDown >= 60 * 60 * 1000){
    timeToCountDown = 0 ;
  }
  updateTimer(timeToCountDown);
});

// ＋10分ボタン
min10.addEventListener('click',()=>{
  if(isRunning === true){
    return;
  }
  timeToCountDown += 60 * 1000 * 10;
  if(timeToCountDown >= 60 * 60 * 1000){
    timeToCountDown = 0 ;
  }
  updateTimer(timeToCountDown);
});

// ＋1秒ボタン
sec1.addEventListener('click',()=>{
  if(isRunning === true){
    return;
  }
  timeToCountDown += 1000;
  if(timeToCountDown >= 60 * 60 * 1000){
    timeToCountDown = 0 ;
  }
  updateTimer(timeToCountDown);
});

// ＋10秒ボタン
sec10.addEventListener('click',()=>{
  if(isRunning === true){
    return;
  }
  timeToCountDown += 1000 * 10;
  if(timeToCountDown >= 60 * 60 * 1000){
    timeToCountDown = 0 ;
  }
  updateTimer(timeToCountDown);
});

// リセットボタン
reset.addEventListener('click',()=>{
  timeToCountDown = 0 ;
  updateTimer(timeToCountDown);
});

})();
