import vue from '@vitejs/plugin-vue'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig({ ...viteConfig, plugins: [] }, defineConfig({
  plugins: [vue({
    template: { transformAssetUrls: { includeAbsolute: false } },
  })],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
}))
