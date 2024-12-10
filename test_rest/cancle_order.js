const { cancle_order } = require("../helper/binance/api.helper");


const params = {
    symbol: "ETHUSDT",
    orderId: "1469484618",
    type: "LIMIT",
    origClientOrderId: "w34VjtDPX1b7LyY4yWMCdj",
    timestamp: Date.now(),
};

cancle_order(params);

