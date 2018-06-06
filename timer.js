let timer = {"started": false,
             "startTime": 0,
             "currentTime": 0,
             "endTime": 0,
             "timeString": "00:00.000",
             "minutes": 3};

let interval;
let timerText;


function countDownTimer() {
  timer.currentTime = new Date().getTime();

  if (timer.currentTime >= timer.endTime) {
    timerText.innerHTML = "00:00.000";
    timer.started = false;
    timer.timerString = "00:00.000"
    clearInterval(interval);
    setTimeout(() => timerText.innerHTML = "00:00.000", 1);
  }

  let diff = timer.endTime - timer.currentTime;

  let millis = diff % 1000;
  let second = Math.floor(diff / 1000);
  let minute = Math.floor(second / 60);
  second = second - minute * 60;

  timer.timeString = fillZero(minute, 2) + ":" + fillZero(second, 2) + "." + fillZero(millis, 3);
  timerText.innerHTML = timer.timeString;
}

function startTimer() {
  if (!timer.started) {
    timer.started = true;
    timer.startTime = new Date().getTime();
    timer.minutes = 3;
    timer.endTime = timer.startTime + timer.minutes * 60000;
    interval = setInterval(countDownTimer, 1);

    log.timer.startTime = timer.startTime;
    log.timer.endTime = timer.endTime;
  }
}

function stopTimer() {
  timer.started = false;
  clearInterval(interval);
}

function resetTimer() {
  timer.started = false;
  timer.startTime = 0;
  timer.currentTime = 0;
  timer.endTime = 0;
  clearInterval(interval);
  timerText.innerHTML = "00:00.000";
}

function fillZero(number, padding) {
  return ("0".repeat(padding) + number).slice(-padding);
}
