document.addEventListener("DOMContentLoaded", function () {
    var countdown = null;
    var remainingTime = 0;
    var timerDisplay = document.getElementById('timerDisplay');
    var durationInput = document.getElementById('durationInput');
    var setBtn = document.getElementById('setBtn');
    var startBtn = document.getElementById('startBtn');
    var pauseBtn = document.getElementById('pauseBtn');
    var resetBtn = document.getElementById('resetBtn');
    var themeSwitch = document.getElementById('themeSwitch');
    function updateDisplay(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        timerDisplay.textContent = "".concat(String(minutes).padStart(2, '0'), ":").concat(String(seconds).padStart(2, '0'));
    }
    function startCountdown() {
        if (countdown !== null) {
            clearInterval(countdown);
        }
        countdown = window.setInterval(function () {
            if (remainingTime <= 0) {
                clearInterval(countdown);
                countdown = null;
                alert("Time's up!");
                return;
            }
            remainingTime--;
            updateDisplay(remainingTime);
        }, 1000);
    }
    function setTimer() {
        var duration = parseInt(durationInput.value, 10);
        if (isNaN(duration) || duration <= 0) {
            alert("Please enter a valid time in seconds.");
            return;
        }
        remainingTime = duration;
        updateDisplay(remainingTime);
    }
    function pauseCountdown() {
        if (countdown !== null) {
            clearInterval(countdown); // Type assertion here
            countdown = null;
        }
    }
    function resetCountdown() {
        if (countdown !== null) {
            clearInterval(countdown); // Type assertion here
            countdown = null;
        }
        remainingTime = 0;
        updateDisplay(remainingTime);
    }
    setBtn.addEventListener('click', setTimer);
    startBtn.addEventListener('click', startCountdown);
    pauseBtn.addEventListener('click', pauseCountdown);
    resetBtn.addEventListener('click', resetCountdown);
    // Theme Switch
    themeSwitch.addEventListener('change', function () {
        document.body.classList.toggle('night-mode', themeSwitch.checked);
        document.body.classList.toggle('day-mode', !themeSwitch.checked);
    });
    updateDisplay(remainingTime);
});