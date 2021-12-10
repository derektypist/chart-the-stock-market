let stockData = {};

// Socket Connection
const socket = io.connect('https://chart-the-stock-market.ddxps46.repl.co/');

// Query DOM
const symbolInput = document.getElementById('symbol-input');
const getStockBtn = document.getElementById('get-stock-btn');
const stockCanvas = document.getElementById('stock-canvas');
const allElements = document.getElementsByTagName('*');
let loading = true;
