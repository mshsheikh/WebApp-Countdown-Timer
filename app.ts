document.addEventListener("DOMContentLoaded", () => {
    let countdown: number | null = null;
    let remainingTime: number = 0;

    const timerDisplay = document.getElementById('timerDisplay') as HTMLDivElement;
    const durationInput = document.getElementById('durationInput') as HTMLInputElement;
    const setBtn = document.getElementById('setBtn') as HTMLButtonElement;
    const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
    const pauseBtn = document.getElementById('pauseBtn') as HTMLButtonElement;
    const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
    const themeSwitch = document.getElementById('themeSwitch') as HTMLInputElement;

    function updateDisplay(time: number): void {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startCountdown(): void {
        if (countdown !== null) {
            clearInterval(countdown);
        }

        countdown = window.setInterval(() => {
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

    function setTimer(): void {
        const duration = parseInt(durationInput.value, 10);
        if (isNaN(duration) || duration <= 0) {
            alert("Please enter a valid time in seconds.");
            return;
        }
        remainingTime = duration;
        updateDisplay(remainingTime);
    }

    function pauseCountdown(): void {
        if (countdown !== null) {
            clearInterval(countdown as number); // Type assertion here
            countdown = null;
        }
    }

    function resetCountdown(): void {
        if (countdown !== null) {
            clearInterval(countdown as number); // Type assertion here
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
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('night-mode', themeSwitch.checked);
        document.body.classList.toggle('day-mode', !themeSwitch.checked);
    });

    updateDisplay(remainingTime);
});