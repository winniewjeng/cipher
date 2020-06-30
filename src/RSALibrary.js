/* global BigInt */

export default {

  /** generatePublicKey
   * @param {BigInt} - number of bits that of the binary key
   * @return {Number} - key
   */
  generatePublicKey(bits) {
    let key = "";
    // generate a random public key N
    for (let i = 0; i < bits; ++i) {
      key = key.concat(Math.round(Math.random())); // generate random bit and append to key
    }
    return parseInt(key, 2);
  },

  /** areCoprime - recursively find the gcd of two numbers
   * @param {Number}
   * @param {Number}
   * @return {Bool}
   */
  gcd(p, q) {
    if (p === 0 || q === 0) return 0;
    if (p === q) return p;
    if (p > q) return this.gcd(p - q, q);
    return this.gcd(p, q - p);
  },

  /** areCoprime
   * @param {Number}
   * @param {Number}
   * @return {Bool}
   */
  areCoprime(p, q) {
    if (this.gcd(p, q) === 1) {
      return true;
    }
    return false;
  },


  /** findFactorPairs
   * @param {Number} 
   * @return {Array of pair-valued array} - factor pairs
   */
  findFactorPairs(num) {
    let pairs = [];
    for (let i = 2; i < Math.sqrt(num); ++i) { // trivialize cases where i = 1 or i = num / i
      if (num % i === 0) { // i is a factor of num
        pairs.push([i, num / i]);
      }
    }
    return pairs;
  },

  /** strToAsciiArr - converts plain text to ascii array (in decimal)
   * @param text {String}
   * @return {char Array}
   */
  strToAsciiArr: (msg) => {
    let ascii = [];
    for (let i = 0; i < msg.length; ++i) {
      if (msg.charCodeAt(i) >= 32 && msg.charCodeAt(i) <= 127) {
        ascii.push(msg.charCodeAt(i));
      } else {
        ascii.push(" ");
      }
    }
    // console.log(ascii.join(" "));
    return ascii;
  },

  /** isPrime
   * @param {Number}
   * @return {bool}
   */
  isPrime: (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; ++i) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  },

  /** fermat - applies fermat's little theorem with values a, p, n to yield a congruence
   * @param a {Number} - base, the msg in ascii representation
   * @param p {Number} - exponent, the encryption key e or decryption key d
   * @param n {Number} - modulus, n, which value determines the base's ceiling and bit size
   * @return {Number}
   */
  fermat: (a, p, n) => {
    return Number((BigInt(a) ** ((p) % (BigInt(n) - 1n))) % BigInt(n));
  },

  /** numToChar
   * @param {Number Array} 
   * @return {char Array}
   */
  numToChar: (arr) => {
    return String.fromCharCode(...arr);
  },

  /** encrypt - takes a msg of ascii array and converts it to encrypted msg array
   * @param text {String}
   * @param ekey {BigInt}
   * @return {char array}
   */
  encrypt(str, key) {
    console.log(
      this.strToAsciiArr(str).map((asciiChar) => {
        return this.fermat(asciiChar, key, 128);
      })
    );
  }

}