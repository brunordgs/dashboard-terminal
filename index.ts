import { box, log, screen } from 'blessed';
const contrib = require('blessed-contrib');

var screenDashboard = screen({
	smartCSR: true,
});

// Server log box
var logScreen = log({
	parent: screenDashboard,
	label: 'Server log',
	content: '',
	top: 0,
	right: 0,
	width: '50%',
	height: '100%',
	border: 'line',
	scrollable: true,
});

// Server utilization
var serverUtilization = contrib.bar({
	label: 'Server utilization (%)',
	top: 0,
	left: 0,
	width: '50%',
	height: '50%',
	barWidth: 10,
	barSpacing: 20,
	maxHeight: 100,
	scrollX: 15,
	border: 'line',
});

screenDashboard.append(serverUtilization);

serverUtilization.setData({
	titles: ['Billing (%)', 'Cart (%)'],
	data: [13, 42],
});

// Status billing
var statusBilling = box({
	parent: screenDashboard,
	label: 'Billing status',
	content: '',
	top: '50%+1',
	left: 0,
	width: '50%',
	height: '25%',
	border: 'line',
	style: {
		bg: '#50fa7b',
	},
});

// Status cart
var statusCart = box({
	parent: screenDashboard,
	label: 'Cart status',
	content: '',
	bottom: 0,
	left: 0,
	width: '50%',
	height: '25%',
	border: 'line',
	style: {
		bg: '#50fa7b',
	},
});

setInterval(() => {
	const billingRandomValue = Math.floor(Math.random() * 99 - 1 + 1) + 1;
	const cartRandomValue = Math.floor(Math.random() * 99 - 1 + 1) + 1;

	logScreen.log('Billing alert - ' + billingRandomValue);
	logScreen.log('Cart alert - ' + cartRandomValue);

	serverUtilization.setData({
		titles: ['Billing (%)', 'Cart (%)'],
		data: [billingRandomValue, cartRandomValue],
	});

	if (billingRandomValue < 10) {
		statusBilling.style.bg = '#ff5555';
	} else if (cartRandomValue < 10) {
		statusCart.style.bg = '#ff5555';
	}
}, 1000);

// Exit app handler
screenDashboard.key(['escape', 'q'], () => process.exit(0));

// Render dashboard screen
screenDashboard.render();
