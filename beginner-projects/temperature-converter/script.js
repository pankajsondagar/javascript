function convert() {
    const temp = parseFloat(document.getElementById('temperature').value);
    const unit = document.getElementById('unit').value;
    
    if (isNaN(temp)) {
        document.getElementById('celsius').textContent = '--';
        document.getElementById('fahrenheit').textContent = '--';
        document.getElementById('kelvin').textContent = '--';
        return;
    }
    
    let celsius, fahrenheit, kelvin;
    
    // Convert to Celsius first
    if (unit === 'celsius') {
        celsius = temp;
    } else if (unit === 'fahrenheit') {
        celsius = (temp - 32) * 5/9;
    } else if (unit === 'kelvin') {
        celsius = temp - 273.15;
    }
    
    // Convert from Celsius to others
    fahrenheit = (celsius * 9/5) + 32;
    kelvin = celsius + 273.15;
    
    // Display results
    document.getElementById('celsius').textContent = celsius.toFixed(1) + '°';
    document.getElementById('fahrenheit').textContent = fahrenheit.toFixed(1) + '°';
    document.getElementById('kelvin').textContent = kelvin.toFixed(1) + 'K';
}