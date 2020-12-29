/*
 * ESLint Configuration
 *
 * See: https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'simple-import-sort'],
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': 'error',
    // Custom overrides
    'import/prefer-default-export': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': [
      'error', // Not enforced by airbnb
      // Adapted from https://github.com/lydell/eslint-plugin-simple-import-sort/blob/master/examples/.eslintrc.js
      {
        groups: [
          // Node.js built-in libraries
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Absolute then relative imports
          ['^[^.]', '^\\.'],
          // Style imports
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'no-nested-ternary': 'off',
    'no-bitwise': 'off',
    'func-names': 'off',
    'multiline-comment-style': ['error', 'starred-block'],
  },
};
