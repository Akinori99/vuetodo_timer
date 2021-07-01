(() => {
  'use strict';

  // ------変数・関数宣言------
  let timer = document.getElementById('timer');
  let min1 = document.getElementById('min1');
  let sec1 = document.getElementById('sec1');
  let min10 = document.getElementById('min10');
  let sec10 = document.getElementById('sec10');
  let reset = document.getElementById('reset');
  let start = document.getElementById('start');

  let startTime;
  let timeLeft;
  let timeToCountDown = 0;
  let timerId;
  let isRunning = false;

  function updateTimer(t) {
    let d = new Date(t);
    let m = d.getMinutes();
    let s = d.getSeconds();
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    timer.textContent = m + ':' + s;
    document.title = `残り  ${m + ':' + s}`;
  }

  function countDown() {
    timerId = setTimeout(() => {
      timeLeft = timeToCountDown - (Date.now() - startTime);
      if (timeLeft < 0) {
        isRunning = false;
        start.textContent = 'スタート';
        clearTimeout(timerId);
        timeLeft = 0;
        timeToCountDown = 0;
        updateTimer(timeLeft);
        return;
      }
      updateTimer(timeLeft);
      countDown();
    }, 10);
  }

  // ------各ボタン処理------
  min1.addEventListener('click', () => {
    if (isRunning === true) {
      return;
    }
    timeToCountDown += 60 * 1000;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  min10.addEventListener('click', () => {
    if (isRunning === true) {
      return;
    }
    timeToCountDown += 60 * 1000 * 10;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  sec1.addEventListener('click', () => {
    if (isRunning === true) {
      return;
    }
    timeToCountDown += 1000;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  sec10.addEventListener('click', () => {
    if (isRunning === true) {
      return;
    }
    timeToCountDown += 1000 * 10;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  start.addEventListener('click', () => {
    if (isRunning === false) {
      isRunning = true;
      start.textContent = 'ストップ';
      startTime = Date.now();
      countDown();
    } else {
      isRunning = false;
      start.textContent = 'スタート'
      timeToCountDown = timeLeft;
      clearTimeout(timerId);
    }
  });

  reset.addEventListener('click', () => {
    timeToCountDown = 0;
    updateTimer(timeToCountDown);
  });

})();