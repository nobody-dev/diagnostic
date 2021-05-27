module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:nuxt/recommended',
    'standard-with-typescript',
    '@nuxtjs/eslint-config-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.vue']
  },
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': ['error', {
      ignoreArgsIfArgsAfterAreUsed: true
    }],
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
