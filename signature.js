const crypto = require('crypto');

const query_string = `timestamp=${Date.now()}`;
const apiSecret = `3f3c4f64be040d0b48648bba81d0aa5368dfec20388e4f20b2ec113610cdca16`;

function signature(query_string) {
    return crypto
        .createHmac('sha256', apiSecret)
        .update(query_string)
        .digest('hex');
}

console.log("hashing the string: ");
console.log(query_string);
console.log("and return:");
console.log(signature(query_string));