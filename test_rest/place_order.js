const { place_order } = require("../helper/binance/api.helper");



const params = {
    symbol: "ETHUSDT",
    side: "BUY",
    type: "LIMIT",
    quantity: 1,
    price: 2000,

};

place_order(params.symbol, params.side, params.type, params.quantity, params.price);

