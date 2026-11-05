import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['src/stores/**/*.js', 'src/views/**/*.vue'],
      reporter: ['text', 'html', 'lcov'],
    },
  },
})
