//below targeting html elements through DOM
const quotePara = document.querySelector('.quote')
const newQuote = document.querySelector('.new_quote')
const author = document.querySelector('.author')
const loader = document.querySelector('.loadervisible')
const tweet = document.querySelector('.fa-twitter-square')
const card = document.querySelector('.card')
const apiURL = 'https://type.fit/api/quotes' // A constant for API URL
let apiQuotes = [] //this array will be used store the quotes array received during api response


//Below we are adding a loader functionality
const loading = () => {
    card.className += ' hideCard'
    loader.classList.remove('hiddenloader')
}
const completeLoad = () => {
    loader.classList.add('hiddenloader')
    card.classList.remove('hideCard')
}
//Below function will display the quotes in targeted p tag 

const displayQuotes = () => {
    loading()
    //below we are generating a random quote through global apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    //Checking the text size of quote that we can adjust style of font-size as per the text length
    if (quote.text.length >= 100)
        quotePara.classList.add('long-quote')
    else
        quotePara.classList.remove('long-quote')


    if (!quote.author) { //Checking whether the author field in quote is empty ot not and if then init 'Unknown' As a string to author element
        author.textContent = 'Unknown';
    } else {
        author.textContent = quote.author;
    }
    quotePara.textContent = `${quote.text}` //initializing quote para with randomly generated quote in quote var
    setTimeout(completeLoad, 500)
}
//Below we are fetching the quotes that we received from API
const getQuotes = async () => {
    loading()
    try {
        const response = await fetch(apiURL)
        apiQuotes = await response.json()
        displayQuotes() //Calling it for displaying quotes in new_quote tag in html
    } catch (error) {
        //if error raised then console.error
        console.error(`(something went wrong) Error ${error}`)
    }

}
//Below function will tweet quotes
const tweetQuotes = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotePara.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}
//calling for fetching all quotes array through array called apiQuotes
getQuotes()
//Below event handler will print new quotes in quotes paragraph
newQuote.addEventListener('click', displayQuotes)
tweet.addEventListener('click', tweetQuotes)