const { cancle_order } = require("../helper/binance/api.helper");


const params = {
    symbol: "ETHUSDT",
    orderId: "1468878183",
    type: "LIMIT",
    origClientOrderId: "It2Ay5vWYQ9pj59sYL8Vz3",
    timestamp: Date.now(),
};

cancle_order(params);

