const path = require('path');
const { defineConfig } = require('vite');
const packages = require('./package.json');
const dts = require('vite-plugin-dts');

export default defineConfig({
  plugins: [
    dts(),
  ],
  // 配置选项
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: packages.name,
      formats: ['es', 'umd'],
    },
    minify: 'terser' // 混淆器
  },
});
