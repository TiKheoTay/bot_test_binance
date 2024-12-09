const ccxt = require("ccxt")
const logger = require("../logger.js");

const exchange = new ccxt.binance({
    apiKey: '682bbbce283fa7020ff866ca52de28c47b3e9703a40f3b18c5ba0be7c9bd6993',
    secret: '3f3c4f64be040d0b48648bba81d0aa5368dfec20388e4f20b2ec113610cdca16',
    'enableRateLimit': true,
    'options': {
        'defaultType': 'future',
    },
});

exchange.setSandboxMode(true);


console.log = (...args) => {
    const message = args.join(' ');
    logger.info('ETH_USDT', 'consoleLog', message);
    process.stdout.write(message + '\n');
};

async function getBalance(btcPrice) {
    try {
        await exchange.fetchTime();
        const balance = await exchange.fetch_balance();
        const total = balance.total;
        console.log(`Balance: ${JSON.stringify(balance, null, 2)}`);

        console.log(`Total USDT: ${(total.BTC - 1) * btcPrice + total.USDT}`);
    } catch (error) {
        console.error(error);

    }
}

async function placeOrder() {
    try {
        const prices = await exchange.fetchOHLCV('ETH/USDT', '1m', undefined, 20);
        const binancePrices = prices.map(price => {
            return {
                timestamp: price[0],
                open: price[1],
                high: price[2],
                low: price[3],
                close: price[4],
                volume: price[5]
            }
        });
        const averagePrice = binancePrices.reduce((acc, price) => acc + price.close, 0) / binancePrices.length;
        const lastPrice = binancePrices[binancePrices.length - 1].close;
        // console.log(binancePrices.map(p => p.close), averagePrice, lastPrice); 

        const side = lastPrice > averagePrice ? 'sell' : 'buy';
        const size = 200;
        const quantity = size / lastPrice;

        if (quantity < 0.001) { // Kiểm tra kích thước đơn hàng
            console.error('Quantity is too small to place an order.');

            return;
        }

        console.log(`averagePrice: ${averagePrice}. lastPrice: ${lastPrice}`);
        const order = await exchange.createMarketOrder('ETH/USDT', side, quantity);
        console.log(order);
        logger.info('ETH_USDT', 'placeOrder', `Order placed: ${JSON.stringify(order)}`);
        const positions = await exchange.fetchPositions();
        console.log(`Current Positions: ${JSON.stringify(positions, null, 2)}`);
        getBalance(lastPrice)



    } catch (error) {
        console.error(error);

    }
}


setInterval(() => {
    getBalance();
    placeOrder();
}, 40000);



