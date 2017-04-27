var Quotes = {
    currentPage: 0,
    loaded: null,
    init: function() {
        this.getNew()
            .then((quotes) => {
                this.loaded = quotes;
                this.currentPage += 1;
                console.log('loaded Quotes')
            })
            .then(() => {
                console.log('Start typing')
                    // this.startTyping()
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
        let strings = _.map(this.loaded, 'quote');
        return Promise.resolve(strings)
            .then(function typeItem(strings) {
                    if (!strings) return;

                    var timeouts = [];
                    var text = strings.shift();
                    var quote = document.getElementById('quote');

                    var delay_time = 0;
                    text.split('').forEach(function(letter, i) {
                        delay_time += 75;
                        timeouts.push(setTimeout(function() {
                            quote.innerHTML = quote.innerHTML + letter;
                            if ((i + 1) == text.length) {
                            	setTimeout(function() {
                            		quote.innerHTML = "";
                            		return Promise.resolve(strings).then(typeItem);
                            	}, 2000);
                            }
                        }, delay_time));
                    });
                })
	}
}

$(function() {
    Quotes.init();
})
