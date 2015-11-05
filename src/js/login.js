var React = require('react');
var TestComponent = require('../components/TestComponent');

console.log('logging in');
React.render(
	<TestComponent />,
	document.getElementById("body")
);