// Character sets for password generation
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function updateLength() {
    const slider = document.getElementById('lengthSlider');
    document.getElementById('lengthValue').textContent = slider.value;
}

function generatePassword() {
    const length = parseInt(document.getElementById('lengthSlider').value);
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    // Validation: At least one character type must be selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('Please select at least one character type!');
        return;
    }
    
    // Build the character pool based on selections
    let charPool = '';
    if (includeUppercase) charPool += charSets.uppercase;
    if (includeLowercase) charPool += charSets.lowercase;
    if (includeNumbers) charPool += charSets.numbers;
    if (includeSymbols) charPool += charSets.symbols;
    
    // Generate password
    let password = '';
    for (let i = 0; i < length; i++) {
        // Get random character from pool
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }
    
    // Display password
    const display = document.getElementById('passwordDisplay');
    display.textContent = password;
    display.classList.remove('empty');
    
    // Update strength meter
    calculateStrength(password, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    
    // Reset copy button
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.textContent = 'Copy';
    copyBtn.classList.remove('copied');
}

function calculateStrength(password, length, hasUpper, hasLower, hasNum, hasSym) {
    let strength = 0;
    
    // Length contribution (0-40 points)
    if (length >= 16) strength += 40;
    else if (length >= 12) strength += 30;
    else if (length >= 8) strength += 20;
    else strength += 10;
    
    // Variety contribution (0-60 points, 15 each)
    if (hasUpper) strength += 15;
    if (hasLower) strength += 15;
    if (hasNum) strength += 15;
    if (hasSym) strength += 15;
    
    // Display strength
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    strengthFill.style.width = strength + '%';
    
    if (strength <= 40) {
        strengthFill.className = 'strength-fill strength-weak';
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#e74c3c';
    } else if (strength <= 70) {
        strengthFill.className = 'strength-fill strength-medium';
        strengthText.textContent = 'Medium';
        strengthText.style.color = '#f39c12';
    } else {
        strengthFill.className = 'strength-fill strength-strong';
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#2ecc71';
    }
}

function copyPassword() {
    const passwordText = document.getElementById('passwordDisplay').textContent;
    
    if (passwordText === 'Your password will appear here') {
        alert('Please generate a password first!');
        return;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(passwordText).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        alert('Failed to copy password');
        console.error('Copy failed:', err);
    });
}

// Generate a password on page load
window.onload = () => {
    generatePassword();
};