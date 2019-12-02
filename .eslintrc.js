module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    "react": {
      "version": "detect"
    }
  },
  rules: {
    'no-extra-boolean-cast': 0,
    'no-unreachable': 1,
    'react/no-deprecated': 1,
    'react/self-closing-comp': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 1,
    'spaced-comment': [0],
    'class-methods-use-this': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'no-restricted-syntax': 0,
    'react/jsx-closing-tag-location': 0,
    'arrow-parens': 0,
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0,
    'jsx-a11y/img-redundant-alt': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'no-mixed-operators': 0,
    'react/no-array-index-key': 0,
    'no-unused-vars': 1,
    'space-before-blocks': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-return-assign': 0,
    'no-case-declarations': 0,
    'function-paren-newline': 0,
    'react/prop-types': [0],
    'no-console': 'off',
    'no-class-assign': 'off',
  },
};
