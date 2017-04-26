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
            	this.startTyping()
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
    }
}

$(function() {
	Quotes.init();
})