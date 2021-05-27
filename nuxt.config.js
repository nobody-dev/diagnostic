module.exports = {
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    './assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://composition-api.nuxtjs.org
    '@nuxtjs/composition-api'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/LinusBorg/portal-vue
    'portal-vue/nuxt',
    // Doc: https://github.com/nuxt-community/gtm-module
    '@nuxtjs/gtm'
  ],
  gtm: {
    id: process.env.NUXT_ENV_GTM_ID,
    enabled: true,
    debug: process.env.DEBUG === '1'
  },
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,tsx,js,jsx,vue}'
      }
    }
  },
  tailwindcss: {
    exposeConfig: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    loaders: {
      cssModules: {
        importLoaders: 2,
        localsConvention: 'camelCase',
        modules: {
          localIdentName: '[name]__[local]_[hash:base64:4]'
        }
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend (config) {
      /**
       * Setup rules for images
       */
      const imagesRule = config.module.rules.find(rule => rule.test.test('.svg'))

      imagesRule.test = /\.(png|jpe?g|gif|webp)$/
      imagesRule.use = [
        {
          loader: 'url-loader',
          options: {
            limit: 1024
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true
            },
            optipng: {
              enabled: false
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false
            },
            webp: {
              quality: 75
            }
          }
        }
      ]

      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /external/,
            loader: 'file-loader',
            options: { esModule: false }
          },
          {
            resourceQuery: /data/,
            loader: 'url-loader',
            options: { esModule: false }
          },
          {
            resourceQuery: /raw/,
            loader: 'raw-loader',
            options: { esModule: false }
          },
          {
            loader: 'vue-svg-loader',
            options: {
              esModule: false,
              svgo: {
                plugins: [{ removeDimensions: false }, { removeViewBox: false }]
              }
            }
          }
        ]
      })
    }
  }
}
