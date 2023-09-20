let coinIdCache = {};

async function getCryptoPrice(coin, currency = 'usd') {
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
