const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading(){

loader.hidden = false;
quoteContainer.hidden = true;
}

//hide loading
function complete(){
    loader.hidden = true;
quoteContainer.hidden = false;
}


//Function show Quote
function newQuote() {

    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //checking if the author is null / blank
    if (!quote.author){
        author.Text.textContent = 'Unknown';
    }
    else{
        authorText.textContent = quote.author;
    }
    
    //check quote length to adjust
    if (quote.text.length > 120)
    {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }

    //Set the Quote, hide loader
    quoteText.textContent = quote.text;
    complete();

}

// Get Quotes from API
async function getQuotes(){
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        //Catch error here
    }
}

//tweet a quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);


//On Load
getQuotes();
