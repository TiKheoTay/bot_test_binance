const { placeOrder } = require('./api.hepler.js');




const apiKey = "682bbbce283fa7020ff866ca52de28c47b3e9703a40f3b18c5ba0be7c9bd6993";
const secretKey = "3f3c4f64be040d0b48648bba81d0aa5368dfec20388e4f20b2ec113610cdca16";
const params = {
    symbol: "ETHUSDT",
    side: "BUY",
    type: "MARKET",
    quantity: 2,
    timestamp: Date.now()
};

placeOrder(apiKey, secretKey, params);
