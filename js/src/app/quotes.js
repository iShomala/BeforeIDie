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
        let quotes = _.shuffle(Quotes.loaded);
        typeQuotes(quotes);
    }
}

$(function() {
    Quotes.init();
})

function typeQuotes(_quotes) {

    let quotes = _quotes.length != 0 ? _quotes : _.shuffle(Quotes.loaded);
    let quote = quotes.shift();

    var fakeQuoteEl = $('#fake-quote');
    fakeQuoteEl.text(quote.quote);
    $('#quote').css('min-height', fakeQuoteEl.height());

    $('#totalCount').text(Quotes.loaded.length);

    $('#currentCount').fadeOut(300, function() {
        $(this).text(Quotes.loaded.length - quotes.length).fadeIn(300);
    });

    $('#author').fadeOut(500, function() {
        $(this).text(quote.author).fadeIn(500);
    });

    return Promise.resolve(quote.quote)
        .then(typeLetters)
        .then(() => delay(2000))
        .then(() => quote.quote)
        .then(deleteLetters)
        .then(() => delay(300))
        .then(() =>  quotes)
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
