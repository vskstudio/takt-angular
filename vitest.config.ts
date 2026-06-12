/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    // AnalogJS recommends inlining for proper Angular ESM interop.
    server: { deps: { inline: ['@analogjs/vitest-angular'] } },
  },
})
