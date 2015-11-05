var React = require('react');

var SignInForm = React.createClass({
	render: function() {
		return (
			<form>
				<h2>Login</h2>
  				<input type="text" class="user" placeholder="username"/>
 				<input type="password" class="pass"placeholder="password"/>
			</form>
		);
	}
});

module.exports = SignInForm;

