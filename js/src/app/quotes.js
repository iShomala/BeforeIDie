var Quotes = {
    currentPage: 0,
    loaded: null,
    init: function() {
        this.getNew()
            .then((quotes) => {
                console.log('Start')
                this.loaded = quotes;
                this.currentPage += 1;
            })
            .then(() => {
                this.type();
            })
    },
    getNew: function() {
        return fetch('/quotes.json')
            .then((response) => response.json())
            .then((response) => response.data);
    },
    startTyping: function() {
        let strings = _.map(this.loaded, 'quote');
        $('#quote').typeIt({
            strings: strings,
            speed: 150,
            autoStart: false,
            lifeLike: true,
            breakLines: false,
            startDelete: true,
            breakDelay: 3000
        });
    },
    type: function() {
        let quotes = _.map(Quotes.loaded, 'quote');
        let authors = _.map(Quotes.loaded, 'author');
        typeQuotes({quotes: quotes, authors: authors});
    }
}

$(function() {
    Quotes.init();
})

function typeQuotes(payload) {

    let sentences = payload.quotes.length != 0 ? payload.quotes : _.map(Quotes.loaded, 'quote'); // restart loop if quotes have finished
    var authors = payload.authors.length != 0 ? payload.authors : _.map(Quotes.loaded, 'author');
    
    var text = sentences.shift();
    var author = authors.shift();

    var quote = $('#quote');
    var fakeQuote = $('#fake-quote');
    fakeQuote.text(text);
    quote.css('min-height', fakeQuote.height());

    $('#author').fadeOut(500, function() {
        $(this).text(author).fadeIn(500);
    });

    return Promise.resolve(text)
        .then(typeLetters)
        .then(() => delay(2000))
        .then(() => text)
        .then(deleteLetters)
        .then(() => delay(300))
        .then(() => {
            return {
                quotes: sentences, 
                authors: authors
            }
        })
        .then(typeQuotes)
}

function typeLetters(sentence) {
    if (!sentence) return;

    var letter = sentence[0];
    quote.innerHTML = quote.innerHTML + letter;

    return delay(getRandomInt(20, 175))
        .then(() => sentence.slice(1))
        .then(typeLetters)
}

function deleteLetters(sentence) {
    if (!sentence) return;
    let temp = quote.innerHTML
    quote.innerHTML = temp.slice(0, temp.length - 1);

    return delay(50)
        .then(() => quote.innerHTML)
        .then(deleteLetters)
}

function delay(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t)
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
