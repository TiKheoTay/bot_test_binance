const axios = require('axios');

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://testnet.binancefuture.com/fapi/v1/depth?symbol=BTCUSDT',
    headers: {}
};

axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
