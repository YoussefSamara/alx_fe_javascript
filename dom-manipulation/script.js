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

// Function to create the quote form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  
  const quoteInput = document.createElement('input');
  quoteInput.setAttribute('id', 'newQuoteText');
  quoteInput.setAttribute('type', 'text');
  quoteInput.setAttribute('placeholder', 'Enter a new quote');

  const categoryInput = document.createElement('input');
  categoryInput.setAttribute('id', 'newQuoteCategory');
  categoryInput.setAttribute('type', 'text');
  categoryInput.setAttribute('placeholder', 'Enter quote category');

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote);

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Function to add new quote
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

// Show the add quote form when the page loads
document.addEventListener('DOMContentLoaded', () => {
  showRandomQuote(); // Show a random quote on load
  createAddQuoteForm(); // Create and add the form dynamically
});
