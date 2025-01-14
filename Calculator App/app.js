function appendValue(value) {
    const display = document.getElementById('display');
    display.value += value;
}

function calculate() {
    try {
      const display = document.getElementById('display');
      const resultInWords = document.getElementById('result-in-words');
  
      const result = eval(display.value); // Perform the calculation
      display.value = result; // Show numeric result
  
      // Convert the result to words
      resultInWords.textContent = numberToWords(result);
    } catch (error) {
      alert('Invalid calculation');
      clearDisplay();
    }
  }
  
function clearDisplay() { //Remove the result
    document.getElementById('display').value = '';
    document.getElementById('result-in-words').textContent = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function switchFeature(feature) { //Switch tabs
    document.querySelectorAll('.feature').forEach(el => el.classList.remove('active'));
    document.getElementById(feature).classList.add('active');
}

document.addEventListener("DOMContentLoaded", function() {
  const amountInput = document.getElementById('amount');
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');
  const resultDiv = document.getElementById('result');
  const convertButton = document.getElementById('convertButton');

  // Fetch and populate currency options
  fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => response.json())
    .then(data => {
      const currencies = Object.keys(data.rates);
      currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.text = currency;
        fromCurrency.appendChild(option1);

          const option2 = document.createElement('option');
          option2.value = currency;
          option2.text = currency;
          toCurrency.appendChild(option2);
      });
    });

    // Perform currency conversion
    convertButton.addEventListener('click', () => {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === '' || isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => {
                resultDiv.textContent = 'Error fetching exchange rates. Please try again later.';
            });
        });
    });

    //perform unit conversion
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


  //stock price
  async function getStockPrice() {
    const symbol = document.getElementById('stock-symbol').value;
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=ON8Y9RZ2N45HPEW4`);
    const data = await response.json();
    const price = data['Global Quote']['05. price'];
  
    document.getElementById('stock-result').innerText = `Current Price: $${price}`;
  }

  //crypto conversion

  function convertCrypto() {
    const cryptoInput = document.getElementById('cryptoInput').value;
    const cryptoSelect = document.getElementById('cryptoSelect').value;
    const fiatSelect = document.getElementById('fiatSelect').value;

    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSelect}&vs_currencies=${fiatSelect}`)
        .then(response => response.json())
        .then(data => {
            const priceInFiat = data[cryptoSelect][fiatSelect.toLowerCase()];
            const result = cryptoInput * priceInFiat;
            document.querySelector('.result').style.display = '';   
            document.getElementById('conversionValue').textContent = `1 ${cryptoSelect.toUpperCase()} = ${priceInFiat} ${fiatSelect.toUpperCase()}`;
            document.getElementById('conversionResult').textContent = `${result.toFixed(2)} ${fiatSelect.toUpperCase()}`;
        })
        .catch(error => console.error('Error fetching data:', error));
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

//Function to shows calculated results in words e.g 3000/three thousand
function numberToWords(num) {
    const ones = [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    ];
    const teens = [
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
      'seventeen', 'eighteen', 'nineteen',
    ];
    const tens = [
      '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
    ];
    const thousands = ['', 'thousand', 'million', 'billion', 'trillion'];
  
    if (num === 0) return 'zero';
  
    function convertChunk(num) {
      let result = '';
  
      if (num >= 100) {
        const hundred = Math.floor(num / 100);
        result += `${ones[hundred]} hundred `;
        num %= 100;
      }
  
      if (num >= 11 && num <= 19) {
        result += `${teens[num - 11]} `;
      } else if (num >= 10 || num > 0) {
        if (num >= 20) {
          const ten = Math.floor(num / 10);
          result += `${tens[ten]} `;
          num %= 10;
        }
        if (num > 0) {
          result += `${ones[num]} `;
        }
      }
  
      return result.trim();
    }
  
    let result = '';
    let chunkIndex = 0;
  
    while (num > 0) {
      const chunk = num % 1000;
  
      if (chunk > 0) {
        const chunkText = convertChunk(chunk);
        result = `${chunkText} ${thousands[chunkIndex]} ${result}`.trim();
      }
  
      num = Math.floor(num / 1000);
      chunkIndex++;
    }
  
    return result.trim();
  }
  

function displayResultInWords(result) {
  const words = numberToWords(result);
  document.getElementById('result-in-words').innerText = `(${words})`;
}

//Register SW

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(()=>
    {
        console.log('Service Worker Registered');
    });
}