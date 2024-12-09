const { query_order } = require("../helper/binance/api.helper");

const params = {
    symbol: "ETHUSDT",
    limit: 10,
    timestamp: Date.now(),
};

query_order(params);
