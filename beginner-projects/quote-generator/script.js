const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Work" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Dreams" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "Motivation" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "Action" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Success" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Belief" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "Action" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "Persistence" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "Courage" },
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein", category: "Creativity" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt", category: "Limits" },
    { text: "Do not wait to strike till the iron is hot, but make it hot by striking.", author: "William Butler Yeats", category: "Action" },
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "Mindset" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Action" }
];

let lastQuoteIndex = -1;

function generateQuote() {
    let randomIndex;
    
    // Ensure we don't show the same quote twice in a row
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === lastQuoteIndex && quotes.length > 1);
    
    lastQuoteIndex = randomIndex;
    
    const quote = quotes[randomIndex];
    
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = quote.author;
    document.getElementById('category').textContent = quote.category;
}

// Generate a quote on page load
window.onload = generateQuote;