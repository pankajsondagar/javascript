let currentUnit = 'metric';

function switchUnit(unit) {
    currentUnit = unit;
    
    // Update button states
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update unit labels and placeholders
    if (unit === 'metric') {
        document.getElementById('weightUnit').textContent = 'kg';
        document.getElementById('heightUnit').textContent = 'cm';
        document.getElementById('weight').placeholder = 'Enter weight in kg';
        document.getElementById('height').placeholder = 'Enter height in cm';
        
        // Reset to single height input
        document.getElementById('heightWrapper').innerHTML = `
            <input type="number" id="height" placeholder="Enter height in cm" step="0.1" min="0">
            <span class="unit-label" id="heightUnit">cm</span>
        `;
    } else {
        document.getElementById('weightUnit').textContent = 'lbs';
        document.getElementById('weight').placeholder = 'Enter weight in lbs';
        
        // Change to feet and inches
        document.getElementById('heightWrapper').innerHTML = `
            <input type="number" id="heightFeet" placeholder="Feet" step="1" min="0" class="secondary-input">
            <input type="number" id="heightInches" placeholder="In" step="1" min="0" max="11" class="secondary-input">
        `;
    }
    
    // Clear inputs and results
    clearErrors();
    document.getElementById('results').classList.remove('show');
}

function validateInputs() {
    let isValid = true;
    clearErrors();
    
    // Validate weight
    const weight = parseFloat(document.getElementById('weight').value);
    if (isNaN(weight) || weight <= 0) {
        showError('weightError', 'Please enter a valid weight greater than 0');
        document.getElementById('weight').classList.add('error');
        isValid = false;
    } else if (currentUnit === 'metric' && (weight < 20 || weight > 300)) {
        showError('weightError', 'Weight should be between 20-300 kg');
        document.getElementById('weight').classList.add('error');
        isValid = false;
    } else if (currentUnit === 'imperial' && (weight < 44 || weight > 660)) {
        showError('weightError', 'Weight should be between 44-660 lbs');
        document.getElementById('weight').classList.add('error');
        isValid = false;
    }
    
    // Validate height
    if (currentUnit === 'metric') {
        const height = parseFloat(document.getElementById('height').value);
        if (isNaN(height) || height <= 0) {
            showError('heightError', 'Please enter a valid height greater than 0');
            document.getElementById('height').classList.add('error');
            isValid = false;
        } else if (height < 50 || height > 250) {
            showError('heightError', 'Height should be between 50-250 cm');
            document.getElementById('height').classList.add('error');
            isValid = false;
        }
    } else {
        const feet = parseInt(document.getElementById('heightFeet').value);
        const inches = parseInt(document.getElementById('heightInches').value);
        
        if (isNaN(feet) || feet < 0) {
            showError('heightError', 'Please enter valid feet');
            document.getElementById('heightFeet').classList.add('error');
            isValid = false;
        } else if (feet < 3 || feet > 8) {
            showError('heightError', 'Height should be between 3-8 feet');
            document.getElementById('heightFeet').classList.add('error');
            isValid = false;
        }
        
        if (isNaN(inches) || inches < 0 || inches > 11) {
            showError('heightError', 'Inches should be between 0-11');
            document.getElementById('heightInches').classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error');
    });
}

function calculateBMI() {
    if (!validateInputs()) {
        return;
    }
    
    let weight, heightInMeters, bmi;
    
    if (currentUnit === 'metric') {
        weight = parseFloat(document.getElementById('weight').value);
        const heightInCm = parseFloat(document.getElementById('height').value);
        heightInMeters = heightInCm / 100;
    } else {
        // Convert imperial to metric
        const weightLbs = parseFloat(document.getElementById('weight').value);
        weight = weightLbs * 0.453592; // lbs to kg
        
        const feet = parseInt(document.getElementById('heightFeet').value);
        const inches = parseInt(document.getElementById('heightInches').value) || 0;
        const totalInches = (feet * 12) + inches;
        heightInMeters = totalInches * 0.0254; // inches to meters
    }
    
    // BMI Formula: weight(kg) / height(m)²
    bmi = weight / (heightInMeters * heightInMeters);
    
    displayResults(bmi, weight, heightInMeters);
}

function displayResults(bmi, weight, heightInMeters) {
    // Show results section
    document.getElementById('results').classList.add('show');
    
    // Display BMI value
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    
    // Determine category and get info
    const categoryInfo = getBMICategory(bmi);
    
    const categoryElement = document.getElementById('bmiCategory');
    categoryElement.textContent = categoryInfo.name;
    categoryElement.className = 'bmi-category ' + categoryInfo.class;
    
    const bmiValueElement = document.getElementById('bmiValue');
    bmiValueElement.className = 'bmi-value ' + categoryInfo.class;
    
    // Update health message
    document.getElementById('healthMessage').textContent = categoryInfo.message;
    document.getElementById('healthInfo').style.borderLeftColor = categoryInfo.color;
    
    // Position indicator on chart
    positionIndicator(bmi);
    
    // Calculate healthy weight range (BMI 18.5 - 25)
    const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyWeight = 25 * (heightInMeters * heightInMeters);
    
    const weightUnit = currentUnit === 'metric' ? 'kg' : 'lbs';
    const displayMinWeight = currentUnit === 'metric' ? minHealthyWeight : minHealthyWeight / 0.453592;
    const displayMaxWeight = currentUnit === 'metric' ? maxHealthyWeight : maxHealthyWeight / 0.453592;
    
    document.getElementById('minWeight').textContent = displayMinWeight.toFixed(1) + ' ' + weightUnit;
    document.getElementById('maxWeight').textContent = displayMaxWeight.toFixed(1) + ' ' + weightUnit;
    
    // Weight status
    document.getElementById('weightStatus').textContent = categoryInfo.name;
    
    // Calculate difference to healthy weight
    let difference = 0;
    if (bmi < 18.5) {
        difference = minHealthyWeight - weight;
        document.getElementById('weightDifference').textContent = '+' + (currentUnit === 'metric' ? difference : difference / 0.453592).toFixed(1) + ' ' + weightUnit;
    } else if (bmi > 25) {
        difference = weight - maxHealthyWeight;
        document.getElementById('weightDifference').textContent = '-' + (currentUnit === 'metric' ? difference : difference / 0.453592).toFixed(1) + ' ' + weightUnit;
    } else {
        document.getElementById('weightDifference').textContent = '0 ' + weightUnit;
    }
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return {
            name: 'Underweight',
            class: 'category-underweight',
            color: '#3498db',
            message: 'Your BMI is below the healthy range. Consider consulting with a healthcare provider about healthy ways to gain weight.'
        };
    } else if (bmi >= 18.5 && bmi < 25) {
        return {
            name: 'Normal Weight',
            class: 'category-normal',
            color: '#2ecc71',
            message: 'Your BMI is in the healthy range. Maintain your current lifestyle with regular exercise and a balanced diet.'
        };
    } else if (bmi >= 25 && bmi < 30) {
        return {
            name: 'Overweight',
            class: 'category-overweight',
            color: '#f39c12',
            message: 'Your BMI is above the healthy range. Consider adopting a more active lifestyle and balanced nutrition.'
        };
    } else {
        return {
            name: 'Obese',
            class: 'category-obese',
            color: '#e74c3c',
            message: 'Your BMI indicates obesity. It\'s recommended to consult with a healthcare provider for personalized advice.'
        };
    }
}

function positionIndicator(bmi) {
    const indicator = document.getElementById('bmiIndicator');
    const maxBMI = 40;
    let percentage;
    
    if (bmi <= maxBMI) {
        percentage = (bmi / maxBMI) * 100;
    } else {
        percentage = 100;
    }
    
    indicator.style.left = percentage + '%';
}

function resetCalculator() {
    document.getElementById('weight').value = '';
    if (currentUnit === 'metric') {
        document.getElementById('height').value = '';
    } else {
        document.getElementById('heightFeet').value = '';
        document.getElementById('heightInches').value = '';
    }
    document.getElementById('results').classList.remove('show');
    clearErrors();
}