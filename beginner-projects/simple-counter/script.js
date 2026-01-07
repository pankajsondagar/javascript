let counter = 0;
let totalChanges = 0;

function updateDisplay() {
    const display = document.getElementById('counterDisplay');
    display.textContent = counter;
    
    // Add animation
    display.classList.add('changed');
    setTimeout(() => {
        display.classList.remove('changed');
    }, 200);
    
    // Update color based on value
    display.classList.remove('positive', 'negative', 'zero');
    if (counter > 0) {
        display.classList.add('positive');
    } else if (counter < 0) {
        display.classList.add('negative');
    } else {
        display.classList.add('zero');
    }
    
    // Update stats
    totalChanges++;
    document.getElementById('totalChanges').textContent = totalChanges;
}

function increase() {
    const customValue = parseInt(document.getElementById('customValue').value) || 1;
    counter += customValue;
    updateDisplay();
}

function decrease() {
    const customValue = parseInt(document.getElementById('customValue').value) || 1;
    counter -= customValue;
    updateDisplay();
}

function reset() {
    counter = 0;
    updateDisplay();
}

function addCustom() {
    const customValue = parseInt(document.getElementById('customValue').value);
    if (isNaN(customValue)) {
        alert('Please enter a valid number!');
        return;
    }
    counter += customValue;
    updateDisplay();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        increase();
    } else if (e.key === 'ArrowDown') {
        decrease();
    } else if (e.key === 'r' || e.key === 'R') {
        reset();
    }
});