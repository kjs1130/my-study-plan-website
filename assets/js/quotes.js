const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Education is not the filling of a pail, but the lighting of a fire.",
        author: "William Butler Yeats"
    },
    {
        text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
        author: "Dr. Seuss"
    },
    {
        text: "Learning is a treasure that will follow its owner everywhere.",
        author: "Chinese Proverb"
    },
    {
        text: "The beautiful thing about learning is that nobody can take it away from you.",
        author: "B.B. King"
    },
    {
        text: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela"
    },
    {
        text: "The only person who is educated is the one who has learned how to learn and change.",
        author: "Carl Rogers"
    },
    {
        text: "Learning never exhausts the mind.",
        author: "Leonardo da Vinci"
    }
];

function updateQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('quoteAuthor');
    
    if (quoteElement && authorElement) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = randomQuote.text;
        authorElement.textContent = `- ${randomQuote.author}`;
    }
}

// Update quote every hour
setInterval(updateQuote, 3600000);

// Initial quote
document.addEventListener('DOMContentLoaded', updateQuote); 