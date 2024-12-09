const crypto = require('crypto');
const axios = require('axios');
const { apiKey, secretKey } = require("dotenv").config().parsed;
async function getServerTime() {
    const response = await axios.get('https://testnet.binancefuture.com/fapi/v1/time');
    return response.data.serverTime;
}

function signRequest(params) {
    const queryString = Object.keys(params)

        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
    console.log('Query String:', queryString);
    const signature = crypto.createHmac('sha256', secretKey).update(queryString).digest('hex');
    console.log('Generated Signature:', signature);
    return signature;
}



async function get_balance() {
    const endpoint = '/fapi/v2/balance';
    const params = {};
    params.timestamp = await getServerTime();
    params.signature = signRequest(params);
    console.log(params)
    try {
        const response = await axios.get(`https://testnet.binancefuture.com${endpoint}`, {
            headers: { 'X-MBX-APIKEY': apiKey },
            params,
        });
        console.log('Account Balance:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


async function place_order(symbol, side, type, quantity, price) {
    const endpoint = '/fapi/v1/order';
    const params = {
        symbol: symbol,
        side: side,
        type: type,
        quantity: quantity,

    };
    params.timestamp = await getServerTime();
    if (type === 'LIMIT') {
        params.price = price;
        params.timeInForce = 'GTC';
    }
    Object.keys(params).forEach((key) => {
        if (params[key] === undefined) {
            delete params[key];
        }
    });
    console.log(params)
    params.signature = signRequest(params);

    try {
        const response = await axios.post(`https://testnet.binancefuture.com${endpoint}`, null, {
            headers: { 'X-MBX-APIKEY': apiKey },
            params,
        });
        console.log('Order Response:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


async function getOrderStatus(symbol, orderId) {
    const endpoint = '/fapi/v1/order';
    const params = {
        symbol,
        orderId,
        timestamp: Date.now(),
    };
    params.signature = signRequest(params);

    try {
        const response = await axios.get(`https://testnet.binancefuture.com${endpoint}`, {
            headers: { 'X-MBX-APIKEY': apiKey },
            params,
        });
        console.log('Order Status:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function cancle_order(params) {
    const endpoint = '/fapi/v1/order';
    params.timestamp = Date.now();
    params.signature = signRequest(params);

    try {
        const response = await axios.delete(`https://testnet.binancefuture.com${endpoint}`, {
            headers: {
                'X-MBX-APIKEY': apiKey,
            },
            params,
        });
        console.log('Cancel Order Response:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


async function query_order(params) {
    const endpoint = '/fapi/v1/allOrders';
    params.timestamp = Date.now();
    params.signature = signRequest(params);

    try {
        const response = await axios.get(`https://testnet.binancefuture.com${endpoint}`, {
            headers: { 'X-MBX-APIKEY': apiKey },
            params,
        });
        console.log('Orders List:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    get_balance,
    place_order,
    getOrderStatus,
    cancle_order,
    query_order,
};
