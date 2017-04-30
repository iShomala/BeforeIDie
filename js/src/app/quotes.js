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
        let quotes = _.map(Quotes.loaded, 'quote')
        typeQuotes(quotes);
    }
}

$(function() {
    Quotes.init();
})

function typeQuotes(quotes) {

    let sentences = quotes.length != 0 ? quotes : _.map(Quotes.loaded, 'quote');

    var text = sentences.shift();
    var quote = document.getElementById('quote');

    return Promise.resolve(text)
        .then(typeLetters)
        .then(() => delay(2000))
        .then(() => text)
        .then(deleteLetters)
        .then(() => delay(300))
        .then(() => sentences)
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
