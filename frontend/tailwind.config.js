const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8ecdff',
          400: '#59b0ff',
          500: '#3992ff', // Main primary color
          600: '#1c74f2',
          700: '#1960e1',
          800: '#1c4fb7',
          900: '#1c4590',
          950: '#142c5e',
        },
        // Secondary accent color for success states and approvals
        success: {
          50: '#edfcf2',
          100: '#d6f9e2',
          200: '#b0f1c6',
          300: '#7ee5a6',
          400: '#45d580',
          500: '#23b95f', // Main success color
          600: '#159847',
          700: '#13773c',
          800: '#155e34',
          900: '#134e2d',
        },
        // Warning colors for alerts and pending states
        warning: {
          50: '#fff9eb',
          100: '#ffefc6',
          200: '#ffdd87',
          300: '#ffc44e',
          400: '#ffa726', // Main warning color
          500: '#ff8800',
          600: '#e46a00',
          700: '#bd4c02',
          800: '#983b08',
          900: '#7c320b',
        },
        // Error colors for rejections and issues
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f77171',
          500: '#ef4444', // Main error color
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Neutral colors for text and backgrounds
        gray: colors.slate,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'], // Changed from Cal Sans to Inter since Cal Sans might not be installed
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0, 0, 0, 0.05), 0 0 1px 0 rgba(0, 0, 0, 0.15)',
        dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    preflight: false,
  }
};