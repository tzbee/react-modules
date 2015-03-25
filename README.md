## Description

- A search component composed of:
 - 2 Search bars
 - Submit button
 - Result box


## API

SearchWrapper accepts the following property:

```
onSubmit (function(keyword, engine, cb(err, result)))
```
, called by the component when form is submitted


## Example

```js
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
```
