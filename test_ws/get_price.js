var WebSocket = require("ws");
const { JSDOM } = require("jsdom");

// global.document = window.document;

let ws_binance;

function connect() {
    ws_binance = new WebSocket("wss://fstream.binance.com/stream");

    ws_binance.on("open", function open() {
        console.log("Binance WebSocket connected");
        const message = JSON.stringify({
            method: "SUBSCRIBE",
            params: ["btcusdt@bookTicker"],
            id: 1,
        });
        ws_binance.send(message);
    });


    ws_binance.on("message", function incoming(data) {
        let x = JSON.parse(data);
        console.log('data response', x);
    });

    ws_binance.on("close", function close() {
        console.log("Binance WebSocket disconnected, attempting reconnect...");
        setTimeout(() => {
            connect();
        }, 1000);
    });

    ws_binance.on("error", function error(err) {
        console.error("WebSocket error:", err);
    });
}





