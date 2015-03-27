var TextInput = React.createClass({displayName: "TextInput",
	handleChange: function(e) {
		 var value = e.target.value;
		 this.props.handleChange(value);
    },
	render: function() {
		return React.createElement("input", {onChange: this.handleChange, className: this.props.className, type: "text"})
	}
});

var SearchBox = React.createClass({displayName: "SearchBox",
    onKeywordChange: function(userInput) {
    	this.setState({keyword: userInput});
    },
    onEngineChange:function(userInput) {
    	this.setState({engine: userInput});
    },
	onSubmit: function(e) {
		var keyword = this.state.keyword;
		var engine = this.state.engine;

		this.props.onSubmit(keyword, engine);
		e.preventDefault();
	},
	render: function() {
		return 	React.createElement("div", {className: "searchBox"}, 
					React.createElement("form", {action: "", onSubmit: this.onSubmit}, 
						React.createElement(TextInput, {handleChange: this.onKeywordChange, className: "keyword"}), 
						React.createElement(TextInput, {handleChange: this.onEngineChange, className: "engine"}), 
						React.createElement("input", {value: "OK", className: "searchButton", type: "submit"})
					)
				)
    }
});

var ResultList = React.createClass({displayName: "ResultList",
	render: function() {
		return React.createElement("div", {className: "resultBox"}, React.createElement("ul", null, this.props.results.map(function(result, index) {
			return	React.createElement("li", {className: "result"}, ++index + ' - ', React.createElement("a", {href: result}, result));		
		})));
	}
});

var Loader = React.createClass({displayName: "Loader",
	getInitialState: function() {
		return {threeDots: false};
	},
	componentDidMount: function() {
		this.props.refreshIntervalId = setInterval(function() {
			this.setState({threeDots: !this.state.threeDots});	
		}.bind(this), 500);
	},
	componentWillUnmount:function() {
		clearInterval(this.props.refreshIntervalId);
	},
	render: function() {
		return React.createElement("div", {className: "loader"}, "LOADING..", this.state.threeDots? '.' : '');
	}
});

var Error = React.createClass({displayName: "Error",
	render: function() {
		return React.createElement("div", {className: "error"}, this.props.message);
	}
});


var SearchWrapper = React.createClass({displayName: "SearchWrapper",
	getInitialState: function() {
		return {results: [], loading: false, error: {status:false, message: ''}};
	},
	onSubmit: function(keyword, engine) {
		this.setState({loading: true});
		
		this.props.onSubmit(keyword, engine, function(err, results) {
			this.setState({error: err ? {status:true, message: err.message} : {status:false, message: ''}, results: results, loading: false});
		}.bind(this));
	},
	render: function() {
		return 	React.createElement("div", {className: "searchWrapper"}, 
					React.createElement(SearchBox, {onSubmit: this.onSubmit}), 
					this.state.loading ? React.createElement(Loader, null) 
						: this.state.error.status ? React.createElement(Error, {message: this.state.error.message})
						: React.createElement(ResultList, {results: this.state.results})
				);
	}
});

return SearchWrapper;
