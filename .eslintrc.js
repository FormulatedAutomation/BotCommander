/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint.
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
  },
  ignorePatterns: ['node_modules/**'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'standard',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-jest',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
}
