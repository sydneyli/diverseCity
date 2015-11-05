'use strict';

var React = require('react');
var TestComponent = require('../components/TestComponent');

console.log('logging in');
React.render(React.createElement(TestComponent, null), document.getElementById("body"));