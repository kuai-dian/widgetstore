const path = require('path');
const { defineConfig } = require('vite');
const dts = require('vite-plugin-dts');

export default defineConfig({
  plugins: [
    dts({
      outputDir: 'dist',
      include: ['lib/*'],
      // exclude: ['src/ignore'],
      staticImport: true,
      insertTypesEntry: true,
      logDiagnostics: true,
    }),
  ],
  // 配置选项
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: "index"
    },
    minify: 'terser' // 混淆器
  },
});
