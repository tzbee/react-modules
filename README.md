# reactModules

A set of react components

Content atm:

- Search Wrapper component with
 - 2 Search bars
 - Submit button
 - Result box

Simply pass the source url to the search wrapper component and the component will displays 
the link list in the result box on submit.

## API

SearchWrapper accepts the following property:

onSubmit (function(keyword, engine, cb(err, result)))

- is called by the component when form is submitted

## Example

// Callback function to pass to the component
var getSearchResults = function(keyword, engine, cb) {
	var url = '/search' + keyword + (engine ? '?engine=' + engine : '');
	$.getJSON(url, function(results) {
		cb(null, results);
	}).fail(function() {
		cb(new Error('No results available'));
	});
};

// Render the page
React.render(<SearchWrapper onSubmit={getSearchResults} />, document.getElementById('content'))
