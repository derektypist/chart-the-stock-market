let stockData = {};

// Socket Connection
const socket = io.connect('https://chart-the-stock-market.ddxps46.repl.co/');

// Query DOM
const symbolInput = document.getElementById('symbol-input');
const getStockBtn = document.getElementById('get-stock-btn');
const stockCanvas = document.getElementById('stock-canvas');
const allElements = document.getElementsByTagName('*');
let loading = true;
startLoading();

// Local Functions
function startLoading() {
  loading = true;
  for (let i=0; i<allElements.length; i++) {
    allElements[i].classList.add('wait');
  }
}

function doneLoading() {
  for (let i=0; i<allElements.length; i++) {
    allElements[i].classList.remove('wait');
  }
  loading = false;
}

function emitNewStock() {
  if (!loading) {
    startLoading();
    // Convert symbol to upper case
    socket.emit('newStock', {
      symbol: symbolInput.value.toUpperCase()
    });
  }
}

function deleteStock(symbol) {
  if (!loading) {
    startLoading();
    socket.emit('deleteStock', {
      symbol: symbol
    });
  }
}

getStockBtn.addEventListener('click', emitNewStock);
symbolInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    emitNewStock();
  }
});

// Chart Configuration
let myChart = new Chart(document.getElementById('stock-canvas'), {
  type: line,
  data: {},
    options: {
      scales: {
        xAxes:[{
          gridLines:{
            color: '#A09998'
          },
          ticks:{
            fontColor: 'black'
          }
        }],
        yAxes:[{
          gridLines:{
            color: '#A09998'
          },
          ticks: {
            fontColor: 'black'
          },
          scaleLabel: {
            display: true,
            labelString: 'Price (GBP)'
          }
        }],
      },
      responsive: false,
      legend: {
        display: true
      }
    }
});
