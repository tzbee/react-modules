// Callback function to pass to the component
var getResults = function(keyword, engine, cb) {
	var results = ['My inputs', 'are', keyword, 'and', engine];
	cb(null, results);
};

// Render the page
React.render(React.createElement(SearchWrapper, {onSubmit: getResults}), document.getElementById('content'));