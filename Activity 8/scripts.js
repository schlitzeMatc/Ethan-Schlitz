
const quoteDisplay = document.getElementById("quoteDisplay");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const newQuoteBtn = document.getElementById("newQuoteBtn");

async function fetchQuote() 
{
  try 
  {
    loading.classList.remove("hidden");
    quoteDisplay.classList.add("hidden");
    errorDiv.classList.add("hidden");
    const response = await fetch("https://dummyjson.com/quotes/random");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    displayQuote(data);
  } catch (err) 
  {
    errorDiv.textContent = "Failed to fetch quote. Please try again.";
    errorDiv.classList.remove("hidden");
  } finally 
  {
    loading.classList.add("hidden");
  }
}

function displayQuote(quoteObj) 
{
  const html = 
  `
  <p class="quote-text">"${quoteObj.quote}"</p>
  <p class="quote-author">— ${quoteObj.author}</p>
  `;
  quoteDisplay.innerHTML = html;
  quoteDisplay.classList.remove("hidden");
}

newQuoteBtn.addEventListener("click", fetchQuote);


fetchQuote();
