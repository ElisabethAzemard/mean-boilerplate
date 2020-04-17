/* SERVICE IMPORTS */
let CryptoJS = require("crypto-js");

/* SERVICE DEFINITION */
const encryptData = (input, type = 'string') => {
    let output = undefined;

    // switch data type
    switch(type){
        case 'string':
        output = CryptoJS.AES.encrypt(input, process.env.CRYPTO_KEY);
        break;

        case 'object':
        output = CryptoJS.AES.encrypt(JSON.stringify(input), process.env.CRYPTO_KEY);
        break;
    }

    // return crypted output
    return output.toString();
}

const decryptData = (item, ...inputs) => {
    // loop on values
    for( let value of inputs ){
        // loop on object
        for( let prop in item ){
            if(value === prop){
                let crypted  = CryptoJS.AES.decrypt(item[prop].toString(), process.env.CRYPTO_KEY);
                item[prop] = crypted.toString(CryptoJS.enc.Utf8);
            }
        }
    }

    // return decrypted item
    return item;
}

/* SERVICE FUNCTIONS EXPORT */
module.exports = {
    encryptData,
    decryptData
};
