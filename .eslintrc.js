module.exports = {
  env: {
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Promise: true,
  },
  parserOptions: {
    ecmaVersion: 5,
  },
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
