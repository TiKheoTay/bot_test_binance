const { place_order } = require("../helper/binance/api.helper");



const params = {
    symbol: "ETHUSDT",
    side: "BUY",
    quantity: 1,
    price: 2000,
    orderType: "LIMIT"
};

place_order(params.symbol, params.side, params.quantity, params.price, params.orderType);

