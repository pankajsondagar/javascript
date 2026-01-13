// Settings
let settings = {
    allowMultiple: false,
    closeOthers: true,
    animateToggle: true,
    persistState: false
};

// Statistics
let stats = {
    toggleCount: 0
};

// Initialize
loadSettings();
loadState();
updateStats();

function toggleAccordion(header) {
    const item = header.parentElement;
    const content = header.nextElementSibling;
    const isOpen = header.classList.contains('active');
    
    // Close others if setting enabled
    if (settings.closeOthers && !settings.allowMultiple && !isOpen) {
        closeAll();
    }
    
    // Toggle current item
    if (isOpen) {
        closeItem(header, content);
    } else {
        openItem(header, content);
    }
    
    // Update statistics
    stats.toggleCount++;
    updateStats();
    
    // Save state if enabled
    if (settings.persistState) {
        saveState();
    }
}

function openItem(header, content) {
    header.classList.add('active');
    content.classList.add('active');
    
    if (settings.animateToggle) {
        // Calculate actual height for smooth animation
        const height = content.scrollHeight;
        content.style.maxHeight = height + 'px';
    }
}

function closeItem(header, content) {
    header.classList.remove('active');
    content.classList.remove('active');
    
    if (settings.animateToggle) {
        content.style.maxHeight = null;
    }
}

function toggleNested(header, event) {
    // Prevent parent accordion from toggling
    event.stopPropagation();
    
    const content = header.nextElementSibling;
    const isOpen = header.classList.contains('active');
    
    if (isOpen) {
        closeItem(header, content);
    } else {
        openItem(header, content);
    }
}

function openAll() {
    const headers = document.querySelectorAll('#mainAccordion > .accordion-item > .accordion-header');
    headers.forEach(header => {
        const content = header.nextElementSibling;
        openItem(header, content);
    });
    updateStats();
    if (settings.persistState) saveState();
}

function closeAll() {
    const headers = document.querySelectorAll('#mainAccordion > .accordion-item > .accordion-header');
    headers.forEach(header => {
        const content = header.nextElementSibling;
        closeItem(header, content);
    });
    updateStats();
    if (settings.persistState) saveState();
}

function toggleAll() {
    const headers = document.querySelectorAll('#mainAccordion > .accordion-item > .accordion-header');
    const allOpen = Array.from(headers).every(h => h.classList.contains('active'));
    
    if (allOpen) {
        closeAll();
    } else {
        openAll();
    }
}

function openFirst() {
    closeAll();
    const firstHeader = document.querySelector('#mainAccordion > .accordion-item > .accordion-header');
    if (firstHeader) {
        const content = firstHeader.nextElementSibling;
        openItem(firstHeader, content);
        updateStats();
        if (settings.persistState) saveState();
    }
}

function resetState() {
    closeAll();
    stats.toggleCount = 0;
    updateStats();
    localStorage.removeItem('accordionState');
}

function updateStats() {
    const items = document.querySelectorAll('#mainAccordion > .accordion-item');
    const openItems = document.querySelectorAll('#mainAccordion > .accordion-item > .accordion-header.active');
    
    document.getElementById('totalItems').textContent = items.length;
    document.getElementById('openItems').textContent = openItems.length;
    document.getElementById('closedItems').textContent = items.length - openItems.length;
    document.getElementById('toggleCount').textContent = stats.toggleCount;
}

function updateSettings() {
    settings.allowMultiple = document.getElementById('allowMultiple').checked;
    settings.closeOthers = document.getElementById('closeOthers').checked;
    settings.animateToggle = document.getElementById('animateToggle').checked;
    settings.persistState = document.getElementById('persistState').checked;
    
    // Update checkboxes based on logic
    if (settings.allowMultiple) {
        settings.closeOthers = false;
        document.getElementById('closeOthers').checked = false;
        document.getElementById('closeOthers').disabled = true;
    } else {
        document.getElementById('closeOthers').disabled = false;
    }
    
    saveSettings();
}

function saveSettings() {
    localStorage.setItem('accordionSettings', JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem('accordionSettings');
    if (saved) {
        settings = JSON.parse(saved);
        document.getElementById('allowMultiple').checked = settings.allowMultiple;
        document.getElementById('closeOthers').checked = settings.closeOthers;
        document.getElementById('animateToggle').checked = settings.animateToggle;
        document.getElementById('persistState').checked = settings.persistState;
        updateSettings();
    }
}

function saveState() {
    const items = document.querySelectorAll('#mainAccordion > .accordion-item');
    const state = {};
    
    items.forEach(item => {
        const id = item.dataset.id;
        const isOpen = item.querySelector('.accordion-header').classList.contains('active');
        state[id] = isOpen;
    });
    
    localStorage.setItem('accordionState', JSON.stringify(state));
}

function loadState() {
    if (!settings.persistState) return;
    
    const saved = localStorage.getItem('accordionState');
    if (saved) {
        const state = JSON.parse(saved);
        
        Object.keys(state).forEach(id => {
            const item = document.querySelector(`[data-id="${id}"]`);
            if (item && state[id]) {
                const header = item.querySelector('.accordion-header');
                const content = header.nextElementSibling;
                openItem(header, content);
            }
        });
        
        updateStats();
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const focused = document.activeElement;
    
    if (focused.classList.contains('accordion-header')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion(focused);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = focused.parentElement.nextElementSibling;
            if (next) {
                next.querySelector('.accordion-header').focus();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = focused.parentElement.previousElementSibling;
            if (prev) {
                prev.querySelector('.accordion-header').focus();
            }
        }
    }
});

// Make headers focusable
document.querySelectorAll('.accordion-header').forEach(header => {
    header.setAttribute('tabindex', '0');
});