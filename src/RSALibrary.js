/* global BigInt */

export default {
  /** generatePublicKey
   * @param {BigInt} - number of bits of the binary key
   * @return {Number} - key
   */
  generatePublicKey(bits) {
    let key_2 = "";
    let key_10 = "";
    // generate a random public key N
    for (let i = 0; i < bits; ++i) {
      key_2 = key_2.concat(Math.round(Math.random())); // generate random bit 0 or 1 and append to key
    }
    key_10 = parseInt(key_2, 2);
    this.findViableFactorPairs(BigInt(key_10));
    this.findViableFactorPairs(key_10);
    return key_10; // output in decimal; parseInt(string, radix)
  },

  // /** gcd - finds greatest common divisor - has error "too many recursions "*/
  // gcd(p, q) {
  //   if (p === 0n || q === 0n) return 0;
  //   if (p === q) return p;
  //   if (p > q) return this.gcd(p - q, q);
  //   return this.gcd(p, q - p);
  // },

  // iterative approach
  gcd(a, b) {
    if (b > a) {
      let temp = a;
      a = b;
      b = temp;
    }
    while (true) {
      if (b === 0n) return a;
      a %= b;
      if (a === 0n) return b;
      b %= a;
    }
  },

  /** areCoprime */
  areCoprime(p, q) {
    return this.gcd(p, q) === 1n;
  },

  /** BigInt_sqrt: BigInt equivalence of Math.sqrt() for numbers */
  BigInt_sqrt(b) {
    if (b < 0n) throw "square root of negative numbers is not supported";
    if (b < 2n) return b;
    function newtonIteration(n, x0) {
      const x1 = (n / x0 + x0) >> 1n;
      if (x0 === x1 || x0 === x1 - 1n) {
        return x0;
      }
      return newtonIteration(n, x1);
    }
    return newtonIteration(b, 1n);
  },

  /** findViableFactorPairs: eliminate [1, b] and [n,n]
   * @param {BigInt}
   * @return {Array of pair-valued array} - factor pairs
   */
  findViableFactorPairs(b) {
    let pairs = [];
    for (let i = 2n; i < this.BigInt_sqrt(b); ++i) {
      // trivialize cases where i = 1 or i = num / i
      if (b % i === 0n) {
        // i is a factor of num
        pairs.push([i, b / i]);
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

  /** isPrime */
  isPrime: (num) => Math.isPrime(num),

  /** fermat - applies fermat's little theorem with values a, p, n to yield a congruence
   * @param a {Number} - base, the msg in ascii representation
   * @param p {Number} - exponent, the encryption key e or decryption key d
   * @param n {Number} - modulus, n, which value determines the base's ceiling and bit size
   * @return {Number}
   */
  fermat: (a, p, n) => Number(BigInt(a) ** (p % (BigInt(n) - 1n)) % BigInt(n)),

  /** numToChar */
  numToChar: (arr) => String.fromCharCode(...arr),

  /** totient */
  totient: (p, q) => (p - 1n) * (q - 1n),

  /** pickEncryptionKey */
  pickEncryptionKey(t, N) {
    let e;
    do {
      e = Math.floor(Math.random() * Math.floor(Number(t)));
      let bigE = BigInt(e);
      // console.log(this);
      // console.log(this.areCoprime(bigE, t));
    } while (
      e === 1 ||
      !this.areCoprime(BigInt(e), t) ||
      !this.areCoprime(BigInt(e), N)
    );
    return e;
  },

  /** pickDecryptionKey - find the modular inverse d of e in (mod t), where de = 1 (mod t)
   */
  pickDecryptionKey(e, t) {
    let d = 1n;
    let count = 0;
    let rr = Math.floor(Math.random() * 30 + 20); // pick the nth number of d, n = 20 to 50
    for (; (BigInt(e) * d) % t !== 1n || count < rr; d++) {
      if ((BigInt(e) * d) % t === 1n) {
        count++;
      }
    }
    return d;
  },

  /** encrypt - takes a msg of ascii array and converts it to encrypted msg array
   * @param text {String}
   * @param ekey {BigInt}
   * @return {char array}
   */
  encrypt: (str, key) => {
    this.strToAsciiArr(str).map((asciiChar) => {
      return this.fermat(asciiChar, key, 128);
    });
  },
};
