const config = {
	endPoint: '/quotes.json'
}

var API = {
	getQuotes: function() {
		return fetch(config.endPoint);
	}
}

