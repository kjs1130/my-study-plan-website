document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timerDisplay');
    const startButton = document.getElementById('startTimer');
    const stopButton = document.getElementById('stopTimer');
    const resetButton = document.getElementById('resetTimer');
    
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    
    // Format time as HH:MM:SS
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    // Update timer display
    const updateTimer = () => {
        const currentTime = Date.now();
        elapsedTime = startTime ? currentTime - startTime : 0;
        timerDisplay.textContent = formatTime(elapsedTime);
    };
    
    // Start timer
    const startTimer = () => {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTimer, 10);
            isRunning = true;
            
            // Update button states
            startButton.disabled = true;
            stopButton.disabled = false;
            resetButton.disabled = true;
        }
    };
    
    // Stop timer
    const stopTimer = () => {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            
            // Update button states
            startButton.disabled = false;
            stopButton.disabled = true;
            resetButton.disabled = false;
        }
    };
    
    // Reset timer
    const resetTimer = () => {
        stopTimer();
        elapsedTime = 0;
        startTime = null;
        updateTimer();
        resetButton.disabled = true;
    };
    
    // Add event listeners
    if (startButton) {
        startButton.addEventListener('click', startTimer);
    }
    
    if (stopButton) {
        stopButton.addEventListener('click', stopTimer);
        stopButton.disabled = true;
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetTimer);
        resetButton.disabled = true;
    }
    
    // Initial display
    updateTimer();
}); 