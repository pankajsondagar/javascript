// Set max date to today
document.getElementById('birthdate').max = new Date().toISOString().split('T')[0];

function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    
    if (!birthdateInput) {
        alert('Please enter your birth date!');
        return;
    }
    
    const birthdate = new Date(birthdateInput);
    const today = new Date();
    
    // Calculate age
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    
    // Adjust if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    
    // Calculate exact days
    const oneDay = 24 * 60 * 60 * 1000;
    const daysDiff = Math.floor((today - birthdate) / oneDay);
    
    // Calculate months
    let months = monthDiff;
    if (months < 0) {
        months += 12;
    }
    
    // Display results
    document.getElementById('ageOutput').textContent = `You are ${age} years old`;
    document.getElementById('detailsOutput').textContent = 
        `That's approximately ${months} months since your last birthday, or ${daysDiff.toLocaleString()} days total!`;
    
    document.getElementById('result').classList.add('show');
}