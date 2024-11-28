import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      xs: '0px',
      sm: '580px',
      660: '660px',
      md: '900px',
      lg: '1200px',
      1160: '1160px',
      xl: '1536px',
    },
    extend: {
      aspectRatio: {
        'comic-cover-aspect-ratio': '1000/900',
        'comic-banner-aspect-ratio': '1920/900',
        'comic-logo-aspect-ratio': '800/450',

        'comic-issue-cover-aspect-ratio': '690/1000',
        'comic-issue-signature-aspect-ratio': '380/240',

        'creator-banner-aspect-ratio': '1920/900',
        'creator-avatar-aspect-ratio': '500/500',
        'creator-logo-aspect-ratio': '800/450',
      },
      fontSize: {
        xxs: ['10px', '1.25'],
        xs: ['12px', '1.25'],
        sm: ['14px', '1.25'],
        base: ['16px', '1.4'],
        lg: ['18px', '1.4'],
        xl: ['20px', '1.4'],
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
      },
      letterSpacing: {
        '0096': '0.096px',
        '008': '0.08px',
        '0064': '0.064px',
        '0048': '0.048px',
        '004': '0.04px',
        '0032': '0.032px',
        '024': '0.24px',
      },
      lineHeight: {
        '1/2': '0.5',
      },
      colors: {
        grey: {
          50: '#ebedf3',
          100: '#c2c5ce',
          200: '#777d8c',
          300: '#414756',
          400: '#2f333e',
          500: '#1f222a',
          600: '#15171c', // main
          700: '#12141c',
          900: '#212121',
        },
        green: {
          100: '#88C169',
          400: '#5fe1a2',
          500: '#49c187', // main
          600: '#34a26d',
          genesis: '#08CC77',
          accent: '#07BD74',
        },
        yellow: {
          50: '#fffce3',
          200: '#FFF387',
          400: '#fff174',
          500: '#fceb54', // main
          600: '#cabc41',
        },
        orange: {
          100: '#FFBF78',
          200: '#FC835D',
          300: '#E15456',
          400: '#F2CA63',
          500: '#e9a860', //main
        },
        red: {
          100: '#cf5656',
          500: '#e3635b', // main
        },
        blue: {
          100: '#87C7E4',
          500: '#3926b4', // main
        },
        purple: {
          100: '#FFABC4',
          500: '#8377f2', // main
        },
        pink: {
          500: '#c413e0', // main
        },
        'important-color': '#fceb54',
        'text-color': '#fafafa',
        'text-black': '#17191D',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        3: '3px 3px 3px #15171c',
        'issue-cover': '6px 6px 0px 0px #000',
      },
      gradientColorStopPositions: {
        '36%': '36%',
        '72%': '72%',
      },
      backgroundPosition: {
        '0-top': '0 top',
      },
      transitionProperty: {
        height: 'height',
      },
      fontFamily: {
        satoshi: ['var(--font-satoshi)'],
        obviouslyNarrow: ['var(--font-obviously-narrow)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
} satisfies Config

export default config
