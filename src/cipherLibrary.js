/*
 * getKeyLength - generate a random number in the range between minLength and maxLength, inclusive
 * @param minLength {number}
 * @param maxLength {number}
 * @return {number}
 */
function getKeyLength(minLength, maxLength) {
    return Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
}
/*
 * countCipherRows - counts the number of rows required by column cipher
 * @param text {string}
 * @param keyLength {number}
 * @return {string}
 */
function countCipherRows(text, keyLength) {
    return text.length % keyLength === 0 ? Math.floor(text.length / keyLength) : Math.floor(text.length / keyLength) + 1;
}

export default {
    /*
     * generateKey - creates a unique key of a certain length, as determined by min/maxLength
     * @param minLength {number}
     * @param maxLength {number}
     * @return {string}
     */
    generateKey(minLength, maxLength) {
        let keyLength = getKeyLength(minLength, maxLength);
        let possibleKey = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
        let key = [];
        for (let i = 0; i < keyLength; ++i) {
            // rangeMax is the last index of the possibleKey array, which shrinks with each loop
            let rangeMax = possibleKey.length - 1 - i;
            // lastKeyElem holds value of last item on the possibleKey str, which shrinks with each loop
            let lastKeyElem = possibleKey[rangeMax];
            // index returns an index position of the possibleKey
            let index = Math.floor(Math.random() * rangeMax);
            // add possibleKey[index] to key array
            key.push(possibleKey[index]);
            // swap possibleKey[index] and possibleKey[rangeMax]
            possibleKey[index] = lastKeyElem;
        }
        return key.join("");
    },

    /*
     * decrypt - indicates the order of cipher column to extract
     * @param key {string}
     * @return {number array} 
     */
    keyOrder(key) {
        let order = [];
        // console.log(key);
        const sortedKey = key.split("").sort();
        for (let i = 0; i < key.length; ++i) {
            let idx = key.indexOf(sortedKey[i]);
            // console.log(sortedKey[i]);
            order.push(idx);
        }
        return order;
    },

    /*
     * encrypt - encrypt the message
     * @param msg {string} 
     * @param key {string}
     * @return {string} 
     */
    encrypt(msg, key) {
        let encrypted = [];
        let rows = countCipherRows(msg, key.length);
        let order = this.keyOrder(key);
        console.log(key);
        for (let i = 0; i < order.length; ++i) {
            let msgWalker = order[i];
            // console.log(msgWalker);
            for (let j = 0; j < rows; ++j) {
                if (!msg[msgWalker]) {
                    encrypted.push(" ");
                } else {
                    encrypted.push(msg[msgWalker]);
                }
                msgWalker += key.length;
            }
        }
        return encrypted.join("");
    },
    /*
     * decrypt - decrypt the encryptedMsg
     * @param encryptedMsg {string} 
     * @param key {string}
     * @return {string} 
     */
    decrypt(encryptedMsg, key) {
        let decrypted = new Array(encryptedMsg.length);
        let rows = countCipherRows(encryptedMsg, key.length);
        let order = this.keyOrder(key);

        let encryptedMsgWalker = 0;
        for (let i = 0; i < order.length; ++i) {
            let decryptedMsgWalker = order[i];
            for (let j = 0; j < rows; ++j) {
                decrypted[decryptedMsgWalker] = encryptedMsg[encryptedMsgWalker];
                decryptedMsgWalker += key.length;
                encryptedMsgWalker++;
            }
        }
        return decrypted.join("");
    },

}