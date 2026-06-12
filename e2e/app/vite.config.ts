import angular from '@analogjs/vite-plugin-angular'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Serves the example through the Analog Angular plugin and resolves the package
// to its built FESM output so the e2e exercises the real published artifact.
export default defineConfig({
  plugins: [angular({ tsconfig: resolve(__dirname, 'tsconfig.app.json') })],
  resolve: {
    alias: {
      '@vskstudio/takt-angular': resolve(__dirname, '../../dist/fesm2022/vskstudio-takt-angular.mjs'),
    },
  },
})
