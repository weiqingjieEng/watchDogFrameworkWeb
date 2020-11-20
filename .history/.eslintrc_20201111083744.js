module.exports = {
  root: false,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-undef': 'off',
    'indent': ['off',2],
    'semi': 'off',
    'quotes': [1, 'single'],
    'comma-spacing': [2, {
      'before': false,
      'after': false
    }],
    'no-trailing-spaces': 2
  }
}
