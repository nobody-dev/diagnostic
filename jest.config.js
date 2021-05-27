module.exports = {
  setupFiles: [
    '<rootDir>/tests/unit/jest.setup.ts'
  ],
  watchman: false,
  moduleDirectories: [
    'node_modules',
    'pages',
    'layouts',
    'components',
    'features'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'vue',
    'json'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(css|postcss)$': 'identity-obj-proxy'
  },
  testMatch: ['<rootDir>/tests/unit/**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/layouts/**/*.vue',
    '<rootDir>/features/**/*.ts',
    '<rootDir>/pages/**/*.vue'
  ],
  globals: {
    'vue-jest': {
      hideStyleWarn: true,
      experimentalCSSCompile: true
    }
  }
}
