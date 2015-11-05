"use strict";

var React = require('react');

var SignInForm = React.createClass({
	displayName: "SignInForm",

	render: function render() {
		return React.createElement(
			"form",
			null,
			React.createElement(
				"h2",
				null,
				"Login"
			),
			React.createElement("input", { type: "text", "class": "user", placeholder: "username" }),
			React.createElement("input", { type: "password", "class": "pass", placeholder: "password" })
		);
	}
});

module.exports = SignInForm;