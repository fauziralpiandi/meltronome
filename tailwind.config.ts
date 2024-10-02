import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'main-text': 'var(--foreground-color)',
        'main-background': 'var(--background-color)',
      },
      keyframes: {
        'in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'in-reverse': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'in': 'in 500ms both',
        'in-reverse': 'in-reverse 500ms both',
      },
    },
  },
  plugins: [typography],
} satisfies Config
