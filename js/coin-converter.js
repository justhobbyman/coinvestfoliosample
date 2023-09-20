async function fetchPrice() {
        const coin = document.getElementById('coinSelect').value;
        const currency = document.getElementById('currencySelect').value;
        const amount = parseFloat(document.getElementById('coinAmount').value);

        try {
            const pricePerCoin = await getCryptoPrice(coin, currency);
            const totalPrice = (pricePerCoin * amount).toFixed(4); // 계산된 총 가격도 소수점 4자리까지만 표시
            document.getElementById('priceResult').innerText = `${amount} ${coin.toUpperCase()} = ${totalPrice} ${currency.toUpperCase()}`;
        } catch (error) {
            console.error("Error fetching price:", error);
            document.getElementById('priceResult').innerText = "Error fetching price. Please try again.";
        }
}

async function loadCoinOptions() {
        try {
            const coins = await loadTop50CoinsByVolume();
            const coinSelect = document.getElementById('coinSelect');
            coins.forEach(coin => {
                const option = document.createElement('option');
                option.value = coin.symbol;
                option.textContent = coin.name;
                coinSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading coin options:', error);
        }
}

    window.addEventListener('DOMContentLoaded', loadCoinOptions);


let coinIdCache = {};
const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'KRW', 'JPY', 'CAD', 'AUD']; // Coinpaprika에서 지원하는 통화를 추가합니다.

async function getCryptoPrice(coin, currency = 'usd') {
    if (!SUPPORTED_CURRENCIES.includes(currency.toUpperCase())) {
        throw new Error(`Currency ${currency} is not supported.`);
    }

    if (!coinIdCache[coin]) {
        const coins = await loadAvailableCoins();
        const coinData = coins.find(c => c.symbol.toUpperCase() === coin.toUpperCase());
        if (!coinData) {
            throw new Error(`Cannot find ID for coin: ${coin}`);
        }
        coinIdCache[coin] = coinData.id;
    }

    const coinId = coinIdCache[coin];
    const API_URL = `https://api.coinpaprika.com/v1/tickers/${coinId}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!data.quotes || !data.quotes[currency.toUpperCase()]) {
        throw new Error(`Cannot fetch price for ${coin} in ${currency}`);
    }

    return parseFloat(data.quotes[currency.toUpperCase()].price).toFixed(4);
}


async function loadAvailableCoins() {
    const API_URL = "https://api.coinpaprika.com/v1/tickers";
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.map(coin => ({ id: coin.id, symbol: coin.symbol, name: coin.name }));
}

async function loadTop50CoinsByVolume() {
    const API_URL = "https://api.coinpaprika.com/v1/tickers?limit=50";
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.map(coin => ({ id: coin.id, symbol: coin.symbol, name: coin.name }));
}

window.getCryptoPrice = getCryptoPrice;
window.loadAvailableCoins = loadAvailableCoins;
window.loadTop50CoinsByVolume = loadTop50CoinsByVolume;
