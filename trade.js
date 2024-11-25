// Define the stock data (example PH stocks)
const stockData = {
  ALI: { name: "Ayala Land", price: 30 },
  AC: { name: "Ayala Corporation", price: 800 },
  JFC: { name: "Jollibee Foods", price: 200 },
  SM: { name: "SM Investments", price: 1000 },
  TEL: { name: "PLDT Inc.", price: 1300 },
  SMPH: { name: "SM Prime", price: 36 },
  MBT: { name: "Metrobank", price: 50 },
  BDO: { name: "BDO Unibank", price: 130 },
  GLO: { name: "Globe Telecom", price: 2200 },
  MEG: { name: "Megaworld Corporation", price: 3.5 },
};

// Load data from local storage or initialize
let availableBalance =
  parseFloat(localStorage.getItem("availableBalance")) || 10000;
let ownedStocks = JSON.parse(localStorage.getItem("ownedStocks")) || {};

// Save data to local storage
function saveData() {
  localStorage.setItem("availableBalance", availableBalance);
  localStorage.setItem("ownedStocks", JSON.stringify(ownedStocks));
}

// Update available balance display
function updateBalance() {
  document.getElementById("availableBalance").textContent =
    availableBalance.toFixed(2);
}

// Update stock ownership display
function updateStockOwnership(stockSymbol) {
  const ownedQuantity = ownedStocks[stockSymbol] || 0;
  document.getElementById(`owned-${stockSymbol}`).textContent = ownedQuantity;
}

// Buy stock function
function buyStock(stockSymbol) {
  const stock = stockData[stockSymbol];
  const quantity = prompt(
    `How many shares of ${stock.name} would you like to buy?`
  );

  if (quantity && !isNaN(quantity) && quantity > 0) {
    const totalCost = stock.price * quantity;
    if (totalCost <= availableBalance) {
      ownedStocks[stockSymbol] =
        (ownedStocks[stockSymbol] || 0) + parseInt(quantity);
      availableBalance -= totalCost;
      saveData();
      alert(`You bought ${quantity} shares of ${stock.name}`);
      updateBalance();
      updateStockOwnership(stockSymbol);
    } else {
      alert("Insufficient balance to make the purchase.");
    }
  } else {
    alert("Invalid quantity.");
  }
}

// Sell stock function
function sellStock(stockSymbol) {
  const stock = stockData[stockSymbol];
  const quantity = prompt(
    `How many shares of ${stock.name} would you like to sell?`
  );

  if (quantity && !isNaN(quantity) && quantity > 0) {
    const ownedQuantity = ownedStocks[stockSymbol] || 0;
    if (quantity <= ownedQuantity) {
      const totalSale = stock.price * quantity;
      ownedStocks[stockSymbol] -= parseInt(quantity);
      availableBalance += totalSale;
      saveData();
      alert(`You sold ${quantity} shares of ${stock.name}`);
      updateBalance();
      updateStockOwnership(stockSymbol);
    } else {
      alert("You do not have enough shares to sell.");
    }
  } else {
    alert("Invalid quantity.");
  }
}

// Initial render
updateBalance();
Object.keys(stockData).forEach((stockSymbol) =>
  updateStockOwnership(stockSymbol)
);
