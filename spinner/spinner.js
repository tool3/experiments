'use strict';
// const logUpdate = require('log-update');
const chars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const spinner = process.argv[2] || 'dots';
let i = 0;

const interval = setInterval(() => {
	console.log(chars[i = ++i % chars.length]);
}, 80);

process.on('SIGINT', () => interval.unref());