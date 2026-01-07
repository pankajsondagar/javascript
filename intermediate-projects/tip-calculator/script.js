// State variables
let billAmount = 0;
let tipPercentage = 15;
let numberOfPeople = 1;

function selectTip(percentage) {
    // Update state
    tipPercentage = percentage;
    
    // Clear custom input
    document.getElementById('customTip').value = '';
    
    // Update active button
    document.querySelectorAll('.tip-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Recalculate
    calculateTip();
}

function selectCustomTip() {
    const customValue = parseFloat(document.getElementById('customTip').value);
    
    if (customValue && customValue >= 0) {
        tipPercentage = customValue;
        
        // Remove active class from preset buttons
        document.querySelectorAll('.tip-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        calculateTip();
    }
}

function changePeople(change) {
    numberOfPeople += change;
    
    // Prevent going below 1
    if (numberOfPeople < 1) {
        numberOfPeople = 1;
    }
    
    // Update display
    document.getElementById('peopleCount').textContent = numberOfPeople;
    
    // Recalculate
    calculateTip();
}

function calculateTip() {
    // Get bill amount
    billAmount = parseFloat(document.getElementById('billAmount').value) || 0;
    
    // Calculate tip
    const tipAmount = billAmount * (tipPercentage / 100);
    
    // Calculate total
    const totalAmount = billAmount + tipAmount;
    
    // Calculate per person amounts
    const tipPerPerson = tipAmount / numberOfPeople;
    const totalPerPerson = totalAmount / numberOfPeople;
    
    // Update display
    document.getElementById('tipAmount').textContent = '$' + tipAmount.toFixed(2);
    document.getElementById('totalAmount').textContent = '$' + totalAmount.toFixed(2);
    document.getElementById('tipPerPerson').textContent = '$' + tipPerPerson.toFixed(2) + ' per person';
    document.getElementById('totalPerPerson').textContent = '$' + totalPerPerson.toFixed(2) + ' per person';
}

function roundUp() {
    if (billAmount === 0) return;
    
    // Calculate current total
    const tipAmount = billAmount * (tipPercentage / 100);
    const totalAmount = billAmount + tipAmount;
    
    // Round up to nearest dollar
    const roundedTotal = Math.ceil(totalAmount);
    
    // Calculate new tip amount needed
    const newTipAmount = roundedTotal - billAmount;
    
    // Calculate new tip percentage
    const newTipPercentage = (newTipAmount / billAmount) * 100;
    
    // Update custom tip input
    document.getElementById('customTip').value = newTipPercentage.toFixed(1);
    
    // Update state and recalculate
    tipPercentage = newTipPercentage;
    
    // Remove active class from preset buttons
    document.querySelectorAll('.tip-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    calculateTip();
}

function roundTip() {
    if (billAmount === 0) return;
    
    // Calculate current tip
    const tipAmount = billAmount * (tipPercentage / 100);
    
    // Round tip to nearest dollar
    const roundedTip = Math.round(tipAmount);
    
    // Calculate new tip percentage
    const newTipPercentage = (roundedTip / billAmount) * 100;
    
    // Update custom tip input
    document.getElementById('customTip').value = newTipPercentage.toFixed(1);
    
    // Update state and recalculate
    tipPercentage = newTipPercentage;
    
    // Remove active class from preset buttons
    document.querySelectorAll('.tip-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    calculateTip();
}

function resetCalculator() {
    // Reset state
    billAmount = 0;
    tipPercentage = 15;
    numberOfPeople = 1;
    
    // Reset inputs
    document.getElementById('billAmount').value = '';
    document.getElementById('customTip').value = '';
    document.getElementById('peopleCount').textContent = '1';
    
    // Reset tip buttons
    document.querySelectorAll('.tip-btn').forEach((btn, index) => {
        btn.classList.remove('active');
        if (index === 1) { // 15% button
            btn.classList.add('active');
        }
    });
    
    // Reset display
    document.getElementById('tipAmount').textContent = '$0.00';
    document.getElementById('totalAmount').textContent = '$0.00';
    document.getElementById('tipPerPerson').textContent = '$0.00 per person';
    document.getElementById('totalPerPerson').textContent = '$0.00 per person';
}

// Initialize on page load
calculateTip();