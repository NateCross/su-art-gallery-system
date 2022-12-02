const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require("daisyui"),
    require('tw-elements/dist/plugin'),
    require('tailwindcss-textshadow'),
  ],

  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#cc0000',
        },

      },
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#cc0000',
        }

        // soap: {
        //   "primary": "#CC0000",
        //   "secondary": "#F000B8",
        //   "accent": "#37CDBE",
        //   "neutral": "#3D4451",
        //   "base-100": "#FFFFFF",
        //   "info": "#3ABFF8",
        //   "success": "#36D399",
        //   "warning": "#FBBD23",
        //   "error": "#F87272",
        // },
      },
    ],
  },
};
