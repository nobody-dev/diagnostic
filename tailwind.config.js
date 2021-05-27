/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    screens: {
      'phone-sm': '320px',
      'phone-md': '360px',
      'phone-lg': '560px',
      tablet: '752px',
      desktop: '880px'
    },

    colors: {
      main: {
        white: '#FFFFFF',
        black: '#222222',
        'deep-blue': '#26364B',
        steel: '#828EA5',
        pink: '#FF3C8A',
        ocean: '#008BD8',
        mist: '#F2F6FB',
        red: '#FF496A',
        green: '#46B25C',
        none: 'transparent'
      },
      secondary: {
        frosty: '#EEF3FF',
        powder: '#FDEEF6',
        windy: '#D7F7FC',
        schavel: '#D5F5E2',
        mint: '#42E3B4',
        purple: '#DE7EE3',
        'pink-brand': '#FF0066',
        'sky-brand': '#00ADEE',
        sunny: '#F9E784',
        buttermilk: '#FFF4BA'
      },
      tertiary: {
        'jazz-jam': '#DA005E',
        'pastel-pink': '#FDCAE0',
        piggy: '#FEA7CB',
        rime: '#CAD6F4',
        niagara: '#A8B8E0',
        'blue-jeans': '#0069C3'
      }
    },

    spacing: {
      none: '0',
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px',
      '5xl': '36px',
      '6xl': '40px',
      '7xl': '48px'
    },

    borderWidth: {
      default: '1px',
      none: '0',
      sm: '1px',
      md: '2px',
      lg: '4px'
    },

    borderRadius: {
      default: '4px',
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '10px',
      full: '9999px'
    },

    boxShadow: {
      default: '0px 2px 24px 0px rgba(26, 61, 107, .08), 0px 0px 2px 0px rgba(38, 54, 75, .08)',
      none: 'none',
      xs: '0px 0px 2px 0px rgba(38, 54, 75, .08)',
      sm: '0px 2px 24px 0px rgba(26, 61, 107, .08), 0px 0px 2px 0px rgba(38, 54, 75, .08)',
      md: '0px 6px 24px 0px rgba(26, 61, 107, .16), 0px 0px 2px 0px rgba(38, 54, 75, .08)',
      lg: '0px 12px 40px 0px rgba(26, 61, 107, .16)',
      xl: '0px 12px 48px 0px rgba(38, 54, 75, .48)'
    },

    fontFamily: {
      display: ['Sb Sans Display', 'sans-serif'],
      body: ['Sb Sans Interface', 'sans-serif']
    },

    fontSize: {
      '2xs': ['11px', '12px'],
      '2xs-ex': ['11px', '16px'],
      xs: ['13px', '16px'],
      sm: ['14px', '16px'],
      'sm-ex': ['14px', '20px'],
      md: ['16px', '20px'],
      'md-ex': ['16px', '24px'],
      lg: ['18px', '24px'],
      xl: ['19px', '24px'],
      '2xl': ['20px', '24px'],
      '3xl': ['21px', '28px'],
      '4xl': ['25px', '32px'],
      '5xl': ['29px', '36px'],
      '6xl': ['31px', '40px'],
      '7xl': ['39px', '48px']
    }
  },
  variants: {},
  plugins: []
}
