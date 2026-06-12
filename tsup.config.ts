import { defineConfig } from 'tsup'

// Only the framework-agnostic custom element ships through tsup: a single
// self-contained CDN bundle with core inlined. The Angular library itself is
// built by ng-packagr (proper FESM + Angular package format).
export default defineConfig({
  entry: { 'element/index': 'src/element/index.ts' },
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  clean: false,
  noExternal: ['@vskstudio/takt-core'],
})
