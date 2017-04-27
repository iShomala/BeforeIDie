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
        let quotes = _.map(this.loaded, 'quote');
        return Promise.resolve(quotes)
            .then(typeQuotes)
    }
}

$(function() {
    Quotes.init();
})

function repeatQuotes(sentences) {
    typeQuotes(sentences);
    return Promise.resolve(sentences)
        .then(repeatQuotes)
}

function typeQuotes(sentences) {
    if (!sentences) return;

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

    return delay(75)
        .then(() => sentence.slice(1))
        .then(typeLetters)
}

function deleteLetters(sentence) {
    if (!sentence) return;
    let temp = quote.innerHTML
    quote.innerHTML = temp.slice(0, temp.length - 1);

    return delay(50)
        .then(() => {
            return Promise.resolve(quote.innerHTML);
        })
        .then(deleteLetters)
}

function delay(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t)
    });
}
