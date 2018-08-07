module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  globals: {
    Promise: true,
  },
  parserOptions: {
    ecmaVersion: 5,
  },
  plugins: ['node'],
  rules: {
    indent: 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: ['error', 'always'],
  },
};
