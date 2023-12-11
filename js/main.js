var quoteParag1 = document.getElementById("quote");
var quoteParag2 = document.getElementById("author");
var copyBtn = document.getElementById("copyButton");
var speechbtn = document.getElementById("speechButton");
var quoteBtn = document.getElementById("newQuoteButton");
var previousBtn = document.getElementById("previousButton");
var tweetBtn = document.getElementById("tweetButton");

var prevRandomNumber = -1;
var previousQuotes = [];
var quotes = [
  {
    quote: "Be yourself; everyone else is already taken.",
    quoteAuthor: "Oscar Wilde",
  },
  {
    quote:
      "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    quoteAuthor: "Marilyn Monroe",
  },
  {
    quote:
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    quoteAuthor: "Albert Einstein",
  },
  {
    quote: "So many books, so little time.",
    quoteAuthor: "Frank Zappa",
  },
  {
    quote: "A room without books is like a body without a soul.",
    quoteAuthor: "Marcus Tullius Cicero",
  },
  {
    quote:
      "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    quoteAuthor: "Bernard M. Baruch",
  },
  {
    quote:
      "You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth.",
    quoteAuthor: "William W. Purkey",
  },
  {
    quote:
      "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    quoteAuthor: "Dr. Seuss",
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    quoteAuthor: "Mae West",
  },
  {
    quote: "Be the change that you wish to see in the world.",
    quoteAuthor: "Mahatma Gandhi",
  },
  {
    quote:
      "In three words I can sum up everything I've learned about life: it goes on.",
    quoteAuthor: "Robert Frost",
  },
  {
    quote:
      "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
    quoteAuthor: "J.K. Rowling, Harry Potter",
  },
];

function generateQuote() {
  do {
    var randomNum = Math.floor(Math.random() * quotes.length);
  } while (randomNum == prevRandomNumber);
  prevRandomNumber = randomNum;
  display(quotes[randomNum]);
  previousQuotes.push({
    quote: quotes[randomNum].quote,
    quoteAuthor: quotes[randomNum].quoteAuthor,
  });
  disablebtn();
}

function showPreviousQuote() {
  if (previousQuotes.length > 1) {
    display(previousQuotes[previousQuotes.length - 2]);
    previousQuotes.pop();
  }
  disablebtn();
}

function display(quote) {
  quoteParag1.innerHTML =
    `<i class="fa-solid fa-quote-left text-danger text-start"></i>` +
    quote.quote +
    `<i class="fa-solid fa-quote-right text-danger text-start"></i>`; 
  quoteParag2.innerHTML = `<i class="fa-solid fa-pen-nib fs-6"></i>`+quote.quoteAuthor;
}

function disablebtn() {
  if (previousQuotes.length == 0 || previousQuotes.length == 1) {
    previousBtn.disabled = true;
  } else {
    previousBtn.disabled = false;
  }

    if (quoteParag1.innerText === "") {
      tweetBtn.disabled = true;
    } else {
      tweetBtn.disabled = false;
    }
}

disablebtn();

function tweet() {
  var currentQuote = quoteParag1.innerText;
  var currentAuthor = quoteParag2.innerText;
  var tweetText = encodeURIComponent(currentQuote + "\n\n" + currentAuthor);
  window.open(
    "https://twitter.com/intent/tweet?text=" + tweetText,
    "Tweet Window"
  );
}

function copyToClipboard() {
  navigator.clipboard.writeText(quoteParag1.innerText);
  copyBtn.classList.add("copied");
  setTimeout(function () {
    copyBtn.classList.remove("copied");
  }, 500);
}

function speakQuote() {
  var utterance = new SpeechSynthesisUtterance(quoteParag1.innerText);
  speechSynthesis.speak(utterance);
}


quoteBtn.addEventListener("click", ()=>{
  generateQuote();
})

tweetBtn.addEventListener("click", () => {
  tweet();
});

previousBtn.addEventListener("click", () => {
  showPreviousQuote();
});

speechbtn.addEventListener("click", () => {
  speakQuote();
});

copyBtn.addEventListener("click", () => {
  copyToClipboard();
});