import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-brand-purple-500',
    'text-brand-purple-400',
    'bg-brand-cyan-500',
    'text-brand-cyan-400',
    'bg-green-100',
    'text-green-700',
    'bg-red-100',
    'text-red-700',
    'bg-blue-100',
    'text-blue-700',
    'bg-purple-100',
    'text-purple-700',
    'bg-amber-100',
    'text-amber-700',
    'border-l-purple-500',
    'border-l-cyan-500',
    'border-l-emerald-500',
    'border-l-gold-500',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        arabic: ['var(--font-arabic)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient':
          'linear-gradient(135deg, rgb(139 92 246) 0%, rgb(6 182 212) 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        brand: {
          purple: {
            300: 'rgb(196 181 253)',
            400: 'rgb(167 139 250)',
            500: 'rgb(139 92 246)',
            600: 'rgb(124 58 237)',
            700: 'rgb(109 40 217)',
          },
          cyan: {
            300: 'rgb(103 232 249)',
            400: 'rgb(34 211 238)',
            500: 'rgb(6 182 212)',
            600: 'rgb(8 145 178)',
          },
        },
        surface: {
          DEFAULT: 'rgb(9 9 11)',
          card: 'rgb(17 17 20)',
          hover: 'rgb(24 24 27)',
          border: 'rgb(39 39 42)',
          borderHover: 'rgb(63 63 70)',
        },
        ink: {
          primary: 'rgb(250 250 250)',
          secondary: 'rgb(161 161 170)',
          muted: 'rgb(82 82 91)',
        },
        emerald: {
          400: 'rgb(52 211 153)',
          500: 'rgb(16 185 129)',
        },
        rose: {
          400: 'rgb(251 113 133)',
          500: 'rgb(244 63 94)',
        },
        gold: {
          400: 'rgb(250 204 21)',
          500: 'rgb(234 179 8)',
        },
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
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        'orb-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -20px) scale(1.1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'orb-drift': 'orb-drift 8s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
