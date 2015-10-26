var React = require('react');

var TestComponent = React.createClass({
	_pickColor: function(state) {
		var color;
		switch(state) {
			case 'open':
				color = 'red';
				break;
			case 'closed':
				color = 'green';
				break;
			default:
				color = '#889CFF';
		}

		return color;
	},

	render: function() {
		return (
			<div className="issue-state"> Hello, world </div>
		);
	}
});


