const simpleColors = [
    "red", "blue", "green", "purple", "orange", "pink", 
    "brown", "cyan", "magenta", "lime", "navy", "teal",
    "coral", "salmon", "gold", "indigo", "violet", "crimson"
];

function changeColor(mode) {
    let color;
    
    if (mode === 'simple') {
        // Pick a random simple color
        const randomIndex = Math.floor(Math.random() * simpleColors.length);
        color = simpleColors[randomIndex];
        document.getElementById('mode').textContent = 'Mode: Simple Colors';
        
    } else if (mode === 'hex') {
        // Generate random hex color
        color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        document.getElementById('mode').textContent = 'Mode: Hexadecimal';
        
    } else if (mode === 'rgb') {
        // Generate random RGB color
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        color = `rgb(${r}, ${g}, ${b})`;
        document.getElementById('mode').textContent = 'Mode: RGB';
    }
    
    // Apply the color
    document.body.style.backgroundColor = color;
    document.getElementById('colorDisplay').textContent = color;
    
    // Change text color based on brightness for better visibility
    adjustTextColor(color);
}

function adjustTextColor(color) {
    // Convert color to RGB to calculate brightness
    let r, g, b;
    
    if (color.startsWith('#')) {
        // Hex color
        const hex = color.substring(1);
        r = parseInt(hex.substr(0, 2), 16);
        g = parseInt(hex.substr(2, 2), 16);
        b = parseInt(hex.substr(4, 2), 16);
    } else if (color.startsWith('rgb')) {
        // RGB color
        const values = color.match(/\d+/g);
        r = parseInt(values[0]);
        g = parseInt(values[1]);
        b = parseInt(values[2]);
    } else {
        // Named color - create temporary element to get RGB
        const temp = document.createElement('div');
        temp.style.color = color;
        document.body.appendChild(temp);
        const computed = window.getComputedStyle(temp).color;
        document.body.removeChild(temp);
        const values = computed.match(/\d+/g);
        r = parseInt(values[0]);
        g = parseInt(values[1]);
        b = parseInt(values[2]);
    }
    
    // Calculate brightness (0-255)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // If background is dark, use white text
    const container = document.querySelector('.container');
    if (brightness < 128) {
        document.body.style.color = 'white';
    } else {
        document.body.style.color = '#333';
    }
}