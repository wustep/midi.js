const assert = require('assert');
const root = require('../build/root').default;

assert.strictEqual(typeof root, 'object', 'root export should be an object');
console.log('root.spec.js passed');
