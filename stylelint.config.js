module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order'
  ],
  plugins: [
    'stylelint-value-no-unknown-custom-properties',
    'stylelint-at-rule-no-children',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-media-use-custom-media',
    'stylelint-order'
  ],
  rules: {
    'csstools/value-no-unknown-custom-properties': true,
    'csstools/media-use-custom-media': 'always-known',
    'plugin/declaration-block-no-ignored-properties': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'import', 'local']
      }
    ],
    'comment-empty-line-before': 'never',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['screen', 'apply', 'tailwind']
      }
    ],
    'no-descending-specificity': null
  },
  ignoreFiles: ['./node_modules/**', './coverage/**', './static/**', './.nuxt/**']
}
