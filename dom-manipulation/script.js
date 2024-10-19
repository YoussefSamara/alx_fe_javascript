// Step 2: Array of quotes
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspiration" },
  { text: "Good things come to people who wait, but better things come to those who go out and get them.", category: "Success" }
];

// Step 3: Function to show a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Display quote and category
  quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;
}

// Step 4: Add new quote dynamically
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  // Validate input
  if (quoteText && quoteCategory) {
    // Add new quote to array
    quotes.push({ text: quoteText, category: quoteCategory });
    alert('New quote added!');
  } else {
    alert('Please enter both quote text and category.');
  }

  // Clear form fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);

// Show an initial random quote when the page loads
document.addEventListener('DOMContentLoaded', showRandomQuote);
