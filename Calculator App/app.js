function appendValue(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);}
        catch {
            display.value = 'Error'
        }
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

//Register SW

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(()=>
    {
        console.log('Service Worker Registered');
    });
}

function switchFeature(feature) {
    document.querySelectorAll('.feature').forEach(el => el.classList.remove('active'));
    document.getElementById(feature).classList.add('active');
  }

  async function convertCurrency() {
    const amount = document.getElementById('currency-amount').value;
    const from = document.getElementById('currency-from').value;
    const to = document.getElementById('currency-to').value;
  
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const result = amount * rate;
  
    document.getElementById('currency-result').innerText = `Converted Amount: ${result.toFixed(2)} ${to}`;
  }

  function convertUnit() {
    const value = parseFloat(document.getElementById('unit-value').value);
    const type = document.getElementById('unit-type').value;
    let result = '';
  
    if (type === 'length') {
      result = `${value} meters = ${value * 3.281} feet`;
    } else if (type === 'weight') {
      result = `${value} kilograms = ${value * 2.205} pounds`;
    } else if (type === 'temperature') {
      result = `${value}°C = ${(value * 9/5) + 32}°F`;
    }
  
    document.getElementById('unit-result').innerText = result;
  }

  async function getStockPrice() {
    const symbol = document.getElementById('stock-symbol').value;
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=ON8Y9RZ2N45HPEW4`);
    const data = await response.json();
    const price = data['Global Quote']['05. price'];
  
    document.getElementById('stock-result').innerText = `Current Price: $${price}`;
  }

  async function convertCrypto() {
    const amount = document.getElementById('crypto-amount').value;
    const from = document.getElementById('crypto-from').value;
    const to = document.getElementById('crypto-to').value;
  
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`);
    const data = await response.json();
    const rate = data[from][to];
    const result = amount * rate;
  
    document.getElementById('crypto-result').innerText = `Converted Amount: ${result.toFixed(4)} ${to}`;
  }

  let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-info bar from appearing
  e.preventDefault();
  deferredPrompt = e;

  // Show the install banner
  const installBanner = document.getElementById('install-banner');
  installBanner.style.display = 'block';

  // Handle the install button click
  const installButton = document.getElementById('install-button');
  installButton.addEventListener('click', async () => {
    // Show the installation prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      // Reset the deferred prompt
      deferredPrompt = null;

      // Hide the banner
      installBanner.style.display = 'none';
    }
  });
});

// Hide the banner if the app is already installed
window.addEventListener('appinstalled', () => {
  const installBanner = document.getElementById('install-banner');
  installBanner.style.display = 'none';
  console.log('App successfully installed');
});