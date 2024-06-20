let currentTime = 0;
let totalTime = 0;
let interval;
let breakInterval;
let isOnBreak = false;

const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

function startTimer() {
    if (isOnBreak) return;
    clearInterval(interval);
    interval = setInterval(() => {
        currentTime++;
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    if (isOnBreak) return;
    clearInterval(interval);
    totalTime += currentTime;
    currentTime = 0;
    updateDisplay();
    startBreakTimer();
}

function startBreakTimer() {
    isOnBreak = true;
    let breakTime = Math.floor(totalTime / 3);
    breakInterval = setInterval(() => {
        if (breakTime <= 0) {
            clearInterval(breakInterval);
            isOnBreak = false;
            document.title = "Flowmodoro Timer"; // Reset title when break ends
            return;
        }
        breakTime--;
        updateBreakDisplay(breakTime);
    }, 1000);
}

function updateDisplay() {
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = `Total: ${formatTime(totalTime)}`;
    updateTitle();
}

function updateBreakDisplay(breakTime) {
    currentTimeDisplay.textContent = `Break: ${formatTime(breakTime)}`;
    document.title = `Break: ${formatTime(breakTime)}`;
}

function updateTitle() {
    document.title = `Timer: ${formatTime(currentTime)}`;
}

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
