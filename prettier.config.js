/*
 * Prettier configuration
 *
 * See: https://prettier.io/docs/en/options.html
 */
module.exports = {
  // Prettier defaults
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  // Airbnb defaults
  singleQuote: true /* default: "false" */,
  trailingComma: 'es5' /* default: "none" */,
  endOfLine: 'lf' /* default: "auto" */,
  // Custom overrides
  arrowParens: 'always' /* default: "avoid" */,
};
