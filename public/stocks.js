let stockData = {};

// Socket Connection
const socket = io.connect('https://chart-the-stock-market.freecodecamp.rocks/');

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
        display: true,
        onClick: function(evt,item) {
          deleteStock(item.text);
        },
        onHover: function() {
          stockCanvas.style.cursor = 'pointer';
        },
        labels: {
          fontColor: 'black'
        },
      },
      hover: {
        onHover: function() {
          stockCanvas.style.cursor = 'default';
        }
      }
    }
});

// From Server
socket.on('stopLoading', doneLoading);

socket.on('updateStockData', function(newStockData) {
  stockData = JSON.parse(newStockData);
  let datasets = [];
  const stockSymbols = Object.keys(stockData);
  const colors = ['white','black','#666'];
  let stockDays;

  // Check the length of the keys of stockSymbols
  if (Object.keys(stockSymbols).length === 0) {
    myChart.data.datasets = {};
    myChart.update();
    doneLoading();
  } else {
    stockSymbols.forEach((symbol, i) => {
      // Create array of Days
      stockDays = Object.keys(stockData[symbol]);
      let stockValues = [];

      // Create array of Prices at Close
      stockDays.forEach((day) => {
        stockValues.push(stockData[symbol][day]["4. close"]);
      });

      // Create object to push to datasets - to use in the chart
      let tempDataset = {};
      tempDataset.data = stockValues.reverse();
      tempDataset.label = symbol;
      tempDataset.borderColor = colors[i];
      tempDataset.fill = false;
      datasets.push(tempDataset);
    });

    // Send data to chart
    myChart.data.labels = stockDays.reverse();
    myChart.data.datasets = datasets;
    myChart.update();

    doneLoading();
  }
});
