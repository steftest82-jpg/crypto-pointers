import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D97706',
          50: '#FEF9EC',
          100: '#FDF0CA',
          200: '#FBDE8A',
          300: '#F9C84A',
          400: '#F0A920',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        secondary: {
          DEFAULT: '#B45309',
          50: '#FEF3E2',
          100: '#FDDCAB',
          200: '#FBC473',
          300: '#E8960A',
          400: '#CA7C08',
          500: '#B45309',
          600: '#92400E',
          700: '#78350F',
          800: '#5F2A0D',
          900: '#451A03',
        },
        accent: {
          DEFAULT: '#FCD34D',
          50: '#FFFDF0',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FCD34D',
          500: '#FACC15',
          600: '#EAB308',
          700: '#CA8A04',
          800: '#A16207',
          900: '#854D0E',
        },
        bg: {
          DEFAULT: '#FFFBEB',
          dark: '#FEF3C7',
          darker: '#FDE68A',
        },
        text: {
          DEFAULT: '#451A03',
          light: '#78350F',
          lighter: '#92400E',
          muted: '#A16207',
        },
      },
      fontFamily: {
        sans: [
          '"Fira Sans"',
          '"Gill Sans"',
          '"Optima"',
          '"Segoe UI"',
          '"Calibri"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        heading: [
          '"Fira Sans"',
          '"Gill Sans"',
          '"Optima"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"Fira Code"',
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'title': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
        'subtitle': ['1.5rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(69, 26, 3, 0.07), 0 10px 20px -2px rgba(69, 26, 3, 0.04)',
        'card': '0 4px 25px -5px rgba(69, 26, 3, 0.1), 0 10px 30px -5px rgba(69, 26, 3, 0.06)',
        'elevated': '0 10px 40px -10px rgba(69, 26, 3, 0.15), 0 20px 50px -10px rgba(69, 26, 3, 0.08)',
        'glow-primary': '0 0 20px rgba(217, 119, 6, 0.3)',
        'glow-accent': '0 0 20px rgba(252, 211, 77, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #451A03 0%, #78350F 40%, #B45309 80%, #D97706 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FDE68A 100%)',
        'gradient-cta': 'linear-gradient(135deg, #D97706 0%, #B45309 50%, #92400E 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255, 251, 235, 0) 60%, rgba(255, 251, 235, 0.15) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#451A03',
            '--tw-prose-headings': '#451A03',
            '--tw-prose-lead': '#78350F',
            '--tw-prose-links': '#D97706',
            '--tw-prose-bold': '#451A03',
            '--tw-prose-counters': '#B45309',
            '--tw-prose-bullets': '#D97706',
            '--tw-prose-hr': '#FDE68A',
            '--tw-prose-quotes': '#78350F',
            '--tw-prose-quote-borders': '#D97706',
            '--tw-prose-captions': '#92400E',
            '--tw-prose-code': '#B45309',
            '--tw-prose-pre-code': '#FEF3C7',
            '--tw-prose-pre-bg': '#451A03',
            '--tw-prose-th-borders': '#FDE68A',
            '--tw-prose-td-borders': '#FEF3C7',
            color: '#451A03',
            maxWidth: 'none',
            a: {
              color: '#D97706',
              fontWeight: '600',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(217, 119, 6, 0.3)',
              textUnderlineOffset: '3px',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#B45309',
                textDecorationColor: '#B45309',
              },
            },
            'h1, h2, h3, h4': {
              fontFamily: '"Fira Sans", "Gill Sans", "Optima", ui-sans-serif, system-ui, sans-serif',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              color: '#451A03',
            },
            h1: {
              fontSize: '2.25rem',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '1.5rem',
            },
            h2: {
              fontSize: '1.75rem',
              lineHeight: '1.25',
              marginTop: '2.5rem',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid #FDE68A',
            },
            h3: {
              fontSize: '1.375rem',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '0.75rem',
            },
            h4: {
              fontSize: '1.125rem',
              lineHeight: '1.4',
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              lineHeight: '1.8',
            },
            li: {
              marginTop: '0.375rem',
              marginBottom: '0.375rem',
              lineHeight: '1.75',
            },
            'ul > li::marker': {
              color: '#D97706',
            },
            'ol > li::marker': {
              color: '#B45309',
              fontWeight: '600',
            },
            blockquote: {
              fontStyle: 'italic',
              fontWeight: '500',
              color: '#78350F',
              borderLeftWidth: '4px',
              borderLeftColor: '#D97706',
              backgroundColor: 'rgba(252, 211, 77, 0.1)',
              borderRadius: '0 0.75rem 0.75rem 0',
              padding: '1rem 1.5rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:last-of-type::after': {
              content: 'none',
            },
            code: {
              color: '#B45309',
              backgroundColor: 'rgba(252, 211, 77, 0.2)',
              borderRadius: '0.375rem',
              padding: '0.125rem 0.375rem',
              fontSize: '0.875em',
              fontWeight: '500',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            pre: {
              backgroundColor: '#451A03',
              color: '#FEF3C7',
              borderRadius: '1rem',
              padding: '1.25rem 1.5rem',
              overflow: 'auto',
              border: '1px solid rgba(180, 83, 9, 0.2)',
            },
            hr: {
              borderColor: '#FDE68A',
              marginTop: '2.5rem',
              marginBottom: '2.5rem',
            },
            table: {
              fontSize: '0.9375rem',
            },
            thead: {
              borderBottomColor: '#D97706',
            },
            'thead th': {
              color: '#451A03',
              fontWeight: '700',
              padding: '0.75rem 1rem',
            },
            'tbody td': {
              padding: '0.75rem 1rem',
            },
            'tbody tr': {
              borderBottomColor: '#FEF3C7',
            },
            img: {
              borderRadius: '1rem',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            strong: {
              color: '#451A03',
              fontWeight: '700',
            },
            em: {
              color: '#78350F',
            },
          },
        },
        lg: {
          css: {
            h2: {
              fontSize: '2rem',
            },
            h3: {
              fontSize: '1.5rem',
            },
            p: {
              lineHeight: '1.85',
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
