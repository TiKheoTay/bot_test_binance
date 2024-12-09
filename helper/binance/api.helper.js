const crypto = require('crypto');
const axios = require('axios');
const { apiKey, secretKey } = require("dotenv").config().parsed;


function signRequest(params) {
    const query = Object.keys(params)
        .sort()
        .map((key) => `${key}=${params[key]}`)
        .join('&');
    return crypto.createHmac('sha256', secretKey).update(query).digest('hex');
}


async function get_balance() {
    const endpoint = '/fapi/v2/account';
    const params = { timestamp: Date.now() };
    params.signature = signRequest(params);

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


async function place_order(symbol, side, quantity, price = null, orderType = 'LIMIT') {
    const endpoint = '/fapi/v1/order';
    const params = {
        symbol,
        side,
        type: orderType,
        quantity,
        timestamp: Date.now(),
    };

    if (orderType === 'LIMIT') {
        params.price = price;
        params.timeInForce = 'GTC';
    }

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
