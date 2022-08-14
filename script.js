const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show new quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // Check if Author is blank and replace with Unknown
    authorText.textContent = quote.author ? quote.author : 'Unknown';
    // Check Quote length to determine styling
    // if (quote.text.length >= 50) {
    //     quoteText.classList.add('long-quote');
    // } else {
    //     quoteText.classList.remove('long-quote');
    // }
    quoteText.classList.toggle('long-quote', quote.text.length >=50);

    quoteText.textContent = quote.text;
    removeLoadingSpinner();
    // const quote = localQuotes[Math.floor(Math.random()*localQuotes.length)];
    // console.log(quote);
    
}
// Get Quotes from API  // async moze dzialac kiedykolwiek, i nie przeszkadza w ladowaniu strony
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl='https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl); //nie zadziala response, dopoki dane nie zostana pobrane przez fetch, inaczej bylby error
        apiQuotes = await response.json();
        newQuote();
        throw new Error ('oops');
    } catch (error) {

    }
}
// Tweet Quote
function tweetQuote() {
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On load
getQuotes();
// newQuote();