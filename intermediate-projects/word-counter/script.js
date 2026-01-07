const MAX_CHARS = 10000;

function analyzeText() {
    const text = document.getElementById('textInput').value;
    
    // Basic counts
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, '').length;
    
    // Word count (split by whitespace, filter empty)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = text.trim() === '' ? 0 : words.length;
    
    // Sentence count (split by .!?)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;
    
    // Paragraph count (split by newlines)
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length;
    
    // Line count
    const lines = text.split('\n');
    const lineCount = lines.length;
    
    // Space count
    const spaceCount = (text.match(/\s/g) || []).length;
    
    // Average word length
    const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
    const avgWordLength = wordCount > 0 ? (totalWordLength / wordCount).toFixed(1) : 0;
    
    // Longest and shortest words
    let longestWord = '-';
    let shortestWord = '-';
    if (words.length > 0) {
        longestWord = words.reduce((a, b) => a.length > b.length ? a : b);
        shortestWord = words.reduce((a, b) => a.length < b.length ? a : b);
    }
    
    // Unique words
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    
    // Update display
    document.getElementById('wordCount').textContent = wordCount;
    document.getElementById('charCount').textContent = charCount;
    document.getElementById('charNoSpaces').textContent = charNoSpaces;
    document.getElementById('sentenceCount').textContent = sentenceCount;
    document.getElementById('paragraphCount').textContent = paragraphCount;
    document.getElementById('avgWordLength').textContent = avgWordLength;
    
    document.getElementById('longestWord').textContent = longestWord;
    document.getElementById('shortestWord').textContent = shortestWord;
    document.getElementById('avgLength').textContent = avgWordLength + ' characters';
    document.getElementById('uniqueWords').textContent = uniqueWords;
    document.getElementById('lineCount').textContent = lineCount;
    document.getElementById('spaceCount').textContent = spaceCount;
    
    // Character limit indicator
    updateCharLimit(charCount);
    
    // Top words
    updateTopWords(words);
    
    // Reading time
    updateReadingTime(wordCount);
}

function updateCharLimit(count) {
    const limitElement = document.getElementById('charLimit');
    const progressFill = document.getElementById('progressFill');
    
    limitElement.textContent = `${count} / ${MAX_CHARS.toLocaleString()} characters`;
    
    const percentage = (count / MAX_CHARS) * 100;
    progressFill.style.width = Math.min(percentage, 100) + '%';
    
    // Change color based on usage
    limitElement.classList.remove('warning', 'danger');
    if (count > MAX_CHARS * 0.9) {
        limitElement.classList.add('danger');
    } else if (count > MAX_CHARS * 0.75) {
        limitElement.classList.add('warning');
    }
}

function updateTopWords(words) {
    if (words.length === 0) return;
    
    // Count word frequency
    const wordFrequency = {};
    words.forEach(word => {
        const cleaned = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleaned.length > 2) { // Only words longer than 2 chars
            wordFrequency[cleaned] = (wordFrequency[cleaned] || 0) + 1;
        }
    });
    
    // Sort by frequency
    const sorted = Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); // Top 10
    
    // Display
    const topWordsElement = document.getElementById('topWords');
    if (sorted.length === 0) {
        topWordsElement.innerHTML = '<span style="color: #999;">No words found</span>';
        return;
    }
    
    topWordsElement.innerHTML = sorted
        .map(([word, count]) => `
            <span class="word-tag">
                ${word}<span class="count">${count}</span>
            </span>
        `)
        .join('');
}

function updateReadingTime(wordCount) {
    if (wordCount === 0) {
        document.getElementById('readingSlow').textContent = '0m';
        document.getElementById('readingAverage').textContent = '0m';
        document.getElementById('readingFast').textContent = '0m';
        document.getElementById('speakingTime').textContent = '0 minutes';
        return;
    }
    
    // Calculate reading times
    const slowTime = Math.ceil(wordCount / 125);
    const avgTime = Math.ceil(wordCount / 200);
    const fastTime = Math.ceil(wordCount / 300);
    const speakTime = Math.ceil(wordCount / 150);
    
    document.getElementById('readingSlow').textContent = formatTime(slowTime);
    document.getElementById('readingAverage').textContent = formatTime(avgTime);
    document.getElementById('readingFast').textContent = formatTime(fastTime);
    document.getElementById('speakingTime').textContent = formatTime(speakTime);
}

function formatTime(minutes) {
    if (minutes < 1) return '< 1m';
    if (minutes < 60) return minutes + 'm';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function switchTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to clicked tab and its content
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function clearText() {
    document.getElementById('textInput').value = '';
    analyzeText();
}

function toUpperCase() {
    const textarea = document.getElementById('textInput');
    textarea.value = textarea.value.toUpperCase();
    analyzeText();
}

function toLowerCase() {
    const textarea = document.getElementById('textInput');
    textarea.value = textarea.value.toLowerCase();
    analyzeText();
}

function toTitleCase() {
    const textarea = document.getElementById('textInput');
    textarea.value = textarea.value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    analyzeText();
}

function toSentenceCase() {
    const textarea = document.getElementById('textInput');
    let text = textarea.value.toLowerCase();
    
    // Capitalize first letter after .!?
    text = text.replace(/(^\w|[.!?]\s+\w)/g, match => match.toUpperCase());
    
    textarea.value = text;
    analyzeText();
}

function copyText() {
    const textarea = document.getElementById('textInput');
    textarea.select();
    document.execCommand('copy');
    
    // Visual feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

// Initialize
analyzeText();