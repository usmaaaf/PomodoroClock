
var audio = document.getElementById("motivational-audio");
var clock = document.getElementById('time-clock');
var clockyStatus = document.getElementById('clock-status');
var buttons = document.getElementsByTagName("button");
var startStopToggle = document.getElementById('start-stop-toggle');
var resetButton = document.getElementById("reset");
var sessionTime = document.getElementById('session-length');
var breakTime = document.getElementById('break-length');
var sessionInSeconds = parseInt(sessionTime.innerHTML) * 60;
var fillSession = parseInt(sessionTime.innerHTML) * 60;
var fillBreak = parseInt(breakTime.innerHTML) * 60;
var breakInSeconds = parseInt(breakTime.innerHTML) * 60;
var filling;
var fillWaqt;
var fillhalWaqt;
console.log(audio, clock, clockyStatus, buttons, startStopToggle, resetButton, sessionTime, breakTime, sessionInSeconds, breakInSeconds  );

function formatTime(time) {
    var seconds = time % 60;
    var mins = (time - seconds) / 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return mins + ":" + seconds;
}

function updateSessionAndBreak() {
    sessionInSeconds = parseInt(sessionTime.innerHTML) * 60;
    breakInSeconds = parseInt(breakTime.innerHTML) * 60;
}


/**
  * @param {string} targetId
  * @param {integer} increment_innerHTML can be 1 for increasing or -1 for decreasing
  */
function updateCounter(targetId, increment_innerHTML) {
    var currentVal, newVal;
    var target = document.getElementById(targetId);
    currentVal = parseInt(target.innerHTML);

    if (currentVal <= 1 || currentVal >= 60) {
        newVal = currentVal;
    }
    else {
        newVal = currentVal + increment_innerHTML; // no need to parseString here
        target.innerHTML = newVal;
    
    }

    
    updateSessionAndBreak();

    if (targetId === "session-length") {
        clock.innerHTML = formatTime(newVal * 60);
    }
}

function stopTimer() {
    for (var i = 1; i < 999; i++) {
        window.clearInterval(i);
    }
}

function startTimer() {
    clockyStatus.innerHTML = "Session";
    var sessionStart = setInterval(sessionTimer, 1000);
    var breakStart;

    function sessionTimer() {
        if (sessionInSeconds >= 1) {
            sessionInSeconds--;
            filling = 450 * sessionInSeconds/fillWaqt;
            console.log(filling);
            filler();
            clock.innerHTML = formatTime(sessionInSeconds);
        } else if (sessionInSeconds <= 0) {
            clearInterval(sessionStart);
            audio.play();
            clockyStatus.innerHTML = "Break";
            breakStart = setInterval(breakTimer, 1000);
        }
    }

    function breakTimer() {
        if (breakInSeconds >= 1) {
            breakInSeconds--;
            filling = 450 * breakInSeconds/fillhalWaqt;
            console.log(filling);
            filler2();
            clock.innerHTML = formatTime(breakInSeconds);
        } else if (breakInSeconds <= 0) {
            clearInterval(breakStart);
            audio.load();
            updateSessionAndBreak();
            startTimer();

        }
    }

}


function filler() {


    $('#color-fill').css({
        "background-color": "#323a5e",
        "width": "120%",
        "height": filling + "px"
      });    
}

function filler2() {
    $('#color-fill').css({
        "background-color": "#99cc00",
        "width": "120%",
        "height": filling + "px"
      });
}


startStopToggle.onclick = function () {
    var i;
    if (startStopToggle.innerHTML === "Stop") {
        startStopToggle.innerHTML = "Start";
        
        stopTimer();
        for (i = 0; i <= 3; i++) {
            buttons[i].disabled = false;
        }
        audio.pause();
        audio.load();
    } else {
        fillWaqt = sessionInSeconds;
        fillhalWaqt = breakInSeconds;
        console.log(fillhalWaqt, fillWaqt);
        startTimer();
        startStopToggle.innerHTML = "Stop";
        for (i = 0; i <= 3; i++) {
            buttons[i].disabled = true;
        }
    }
};

resetButton.onclick = function () {
    if (startStopToggle.innerHTML === "Stop") {
        startStopToggle.click();
    }
    document.getElementById('session-length').innerHTML = "25";
    document.getElementById('break-length').innerHTML = "5";
    clock.innerHTML = "25:00";
    updateSessionAndBreak();

};
