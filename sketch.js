function setup() {
  timerText = document.getElementById("Timer");
  scoreText = document.getElementById("Score");
  logText = document.getElementById("logText");
  retryText = document.getElementById("Retry");
  noCanvas();
}

function clearAll() {
  resetTimer();
  eventLog = {};
  score = 0;
  lapTime = 0;
  scoreText.innerHTML = "0";
  text = "";
  logText.value = "";
}

function keyPressed() {
  switch (keyCode) {
    case 81: lap(); break; // Q
    case 87: pass(); break; // W
    case 69: Retry(); break; // E
    case 82: Rongbay(); break; // R
    case 83: startTimer(); break; // S
    case 49: TZ1(); break; // 1
    case 50: TZ2(); break; // 2
    case 51: TZ3(); break; // 3
    default: break;
  }
}
