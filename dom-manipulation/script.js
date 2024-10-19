let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Simulated server URL
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverUrl);
    const serverQuotes = await response.json();

    // Simulate conflict resolution: server data takes precedence
    serverQuotes.forEach(serverQuote => {
      const existingQuoteIndex = quotes.findIndex(q => q.id === serverQuote.id);
      if (existingQuoteIndex > -1) {
        // Update existing quote if conflict
        quotes[existingQuoteIndex] = serverQuote;
      } else {
        // Add new quote if it doesn't exist
        quotes.push(serverQuote);
      }
    });

    // Save updated quotes to local storage
    saveQuotes();
    alert('Quotes updated from server successfully!');
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
  }
}

// Periodically check for updates from the server
setInterval(fetchQuotesFromServer, 30000); // Check every 30 seconds

// Send quotes to the server
async function sendQuotesToServer() {
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quotes),
    });

    if (response.ok) {
      alert('Quotes sent to the server successfully!');
    } else {
      alert('Failed to send quotes to the server.');
    }
  } catch (error) {
    console.error('Error sending quotes to server:', error);
  }
}

// Populate category filter dropdown
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories

  // Clear existing categories
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  // Populate the dropdown with categories
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Load last selected filter from local storage
  const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
  categoryFilter.value = lastSelectedCategory;
  filterQuotes(); // Apply filter immediately
}

// Show random quote function
function showRandomQuote() {
  const filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length === 0) {
    alert("No quotes available for the selected category.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>${randomQuote.category}</em></p>`;

  // Save the last displayed quote to session storage
  sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
}

// Get quotes filtered by selected category
function getFilteredQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  if (selectedCategory === 'all') {
    return quotes;
  }
  return quotes.filter(quote => quote.category === selectedCategory);
}

// Filter quotes based on selected category
function filterQuotes() {
  const filteredQuotes = getFilteredQuotes();
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // Display first quote from the filtered list
  if (filteredQuotes.length > 0) {
    quoteDisplay.innerHTML = `<p>${filteredQuotes[0].text}</p><p><em>${filteredQuotes[0].category}</em></p>`;
  } else {
    quoteDisplay.innerHTML = '<p>No quotes available in this category.</p>';
  }

  // Save selected category to local storage
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);
}

// Create form for adding a new quote
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

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
  // Generate a new ID for the quote
  const newId = quotes.length > 0 ? Math.max(quotes.map(q => q.id)) + 1 : 1;

  if (quoteText && quoteCategory) {
    quotes.push({ id: newId, text: quoteText, category: quoteCategory });
    saveQuotes(); // Save to local storage
    sendQuotesToServer(); // Send updated quotes to server
    populateCategories(); // Update category list
    alert('New quote added!');
  } else {
    alert('Please enter both quote text and category.');
  }

  // Clear form fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

// Export quotes to JSON file
function exportToJsonFile() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load last viewed quote from session storage if available
function loadLastQuote() {
  const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
  if (lastQuote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${lastQuote.text}</p><p><em>${lastQuote.category}</em></p>`;
  }
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);

// Show the add quote form and load initial data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  createAddQuoteForm();
  populateCategories(); // Populate category dropdown
  loadLastQuote(); // Load the last viewed quote from session storage
});
