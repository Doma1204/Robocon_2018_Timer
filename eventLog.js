let emptyLog = {"timer": { "startTime": 0,
                           "endTime": 0,
                         },
                "event": []};

let log = emptyLog;
let text = "";
let score = 0;
let retry = false;
let retryStartTime = 0;
let lapTime = 1;

let logText;
let scoreText;
let retryText;

function lap() {
  if (timer.started) {
    logEvent("Lap " + lapTime.toString(), false);
    lapTime++;
  }
}

function pass() {
  if (timer.started) {
    score++;
    scoreText.innerHTML = score.toString();
    logEvent("Shuttlecock Pass");
  }
}

function TZ1() {
  if (timer.started) {
    score += 10;
    scoreText.innerHTML = score.toString();
    logEvent("TZ1 in");
  }
}

function TZ2() {
  if (timer.started) {
    score += 15;
    scoreText.innerHTML = score.toString();
    logEvent("TZ2 in");
  }
}

function TZ3() {
  if (timer.started) {
    score += 30;
    scoreText.innerHTML = score.toString();
    logEvent("TZ3 in");
  }
}

function Rongbay() {
  if (timer.started) {
    stopTimer();
    logEvent("Rong bay");
  }
}

function Retry() {
  if (!retry) {
    retry = true;
    retryText.innerHTML = "Retry End";
    retryStartTime = logEvent("Retry Start", false);
  } else {
    retry = false;
    retryText.innerHTML = "Retry Start";

    let diff = timer.currentTime - retryStartTime;
    let second = Math.floor(diff / 1000);
    let millis = diff % 1000;

    logEvent("Retry End (Time: " + second.toString() + "." + millis.toString().charAt(0) + "s)", false);
  }
}

function logEvent(eventString, scoreShow = true) {
  let obj = {};
  obj.timestamp = timer.currentTime;
  obj.score = score;

  let tempText = eventString;
  if (scoreShow) tempText += " (Score: " + score.toString() + ")";

  obj.event = tempText;

  text += timer.timeString + " " + tempText + "\n";
  log.event.push(obj);
  logText.value = text;

  return obj.timestamp;
}
