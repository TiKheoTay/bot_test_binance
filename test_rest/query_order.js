const { queryOrdersBinance } = require("../helper/binance/api.helper");

const params = {
    symbol: "BTCUSDT",
    limit: 10,
    timestamp: Date.now(),
};

queryOrdersBinance(params);
