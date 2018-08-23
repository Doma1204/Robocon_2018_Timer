let timer = {started: false,
             startTime: 0,
             currentTime: 0,
             endTime: 0,
             CountDown: true,
             timeString: "00:00.000",
             timerStyle: "MSm",
             minutes: 3,
             seconds: 0};

let interval;


function countTimer() {
  timer.currentTime = new Date().getTime();

  if (timer.currentTime >= timer.endTime || !timer.started) {
    timer.started = false;
    clearInterval(interval);
    writeTimer();
    return;
  }

  let diff = timer.CountDown ? timer.endTime - timer.currentTime : timer.currentTime - timer.startTime;

  let millis = diff % 1000;
  let second = Math.floor(diff / 1000);
  let minute = Math.floor(second / 60);
  second = second - minute * 60;

  writeTimer(minute, second, millis);
}

function startTimer() {
  if (!timer.started) {
    timer.started = true;
    timer.startTime = new Date().getTime();
    timer.endTime = timer.startTime + timer.minutes * 60000 + timer.seconds * 1000;
    interval = setInterval(countTimer, 1);

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
  writeTimer(timer.CountDown ? timer.minutes : 0, timer.CountDown ? timer.seconds : 0, 0);
}

function setTimerCountWhat() {
  if (!timer.started) {
    timer.CountDown = document.querySelector('input[name="CountWhat"]:checked').value == "CountDown";
    writeTimer(timer.CountDown ? timer.minutes : 0, timer.CountDown ? timer.seconds : 0, 0);
  } else {
    document.getElementById(timer.CountDown ? "CountDown" : "CountUp").checked = true;
  }
}

function setTimerTime() {
  if (!timer.started) {
    timer.minute = document.getElementById("Minutes").value;
    timer.second = document.getElementById("Seconds").value;
    writeTimer(timer.CountDown ? timer.minutes : 0, timer.CountDown ? timer.seconds : 0, 0);
  } else {
    document.getElementById("Minutes").value = timer.minutes;
    document.getElementById("Seconds").value = timer.seconds;
  }
}

function setTimerStyle() {
  if (!timer.started) {
    timer.timerStyle = document.querySelector('input[name="TimerStyle"]:checked').value;
    writeTimer(timer.CountDown ? timer.minutes : 0, timer.CountDown ? timer.seconds : 0, 0);
  } else {
    switch (timer.timerStyle) {
      case "MSm": document.getElementById("MSm").checked = true; break;
      case "MS":  document.getElementById("MS").checked = true; break;
      case "S":   document.getElementById("S").checked = true; break;
    }
  }
}

function writeTimer(minute, second, millis) {
  switch (timer.timerStyle) {
    case "MSm": timer.timeString = fillZero(minute, 2) + ":" + fillZero(second, 2) + "." + fillZero(millis, 3); break;
    case "MS":  timer.timeString = fillZero(minute, 2) + ":" + fillZero(second, 2); break;
    case "S":   timer.timeString = fillZero(minute * 60 + second, 3);
  }

  timerText.innerHTML = timer.timeString;
}

function fillZero(number, padding) {
  return ("0".repeat(padding) + number).slice(-padding);
}
