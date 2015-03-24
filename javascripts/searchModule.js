var TextInput = React.createClass({
	handleChange: function(e) {
		 var value = e.target.value;
		 this.props.handleChange(value);
    },
	render: function() {
		return <input onChange={this.handleChange} className={this.props.className} type='text' />
	}
});

var SearchBox = React.createClass({
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
		return 	<div className='searchBox'>
					<form action='' onSubmit={this.onSubmit} >
						<TextInput handleChange={this.onKeywordChange} className='keyword' />
						<TextInput handleChange={this.onEngineChange} className='engine' />
						<input value='OK' className='searchButton' type='submit'/>
					</form>
				</div>
    }
});

var ResultList = React.createClass({
	render: function() {
		return <ul>{this.props.results.map(function(result, index) {
			return	<li className='result'>{++index + ' - '}<a href={result}>{result}</a></li>;		
		})}</ul>;
	}
});

var Loader = React.createClass({
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
		return <div className='loader'>LOADING..{this.state.threeDots? '.' : ''}</div>;
	}
});

var SearchWrapper = React.createClass({
	getInitialState: function() {
		return {results: [], loading: false};
	},
	onSubmit: function(keyword, engine) {
		var url = this.props.createURL(keyword, engine);
		this.setState({loading: true});
		
		$.getJSON(url, function(results) {
			this.setState({results: results, loading: false});
		}.bind(this)).fail(function() {
   			 this.setState({results: ['FAIL'], loading: false});
  		}.bind(this));
	},
	render: function() {
		return 	<div className='searchWrapper'>
					<SearchBox onSubmit={this.onSubmit} />
					{this.state.loading ? <Loader /> : <ResultList results={this.state.results} />}
				</div>;
	}
});
