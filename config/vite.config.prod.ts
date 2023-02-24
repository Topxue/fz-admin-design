import { mergeConfig } from 'vite'
import { resolve } from 'path'

import baseConfig from './vite.config.base'
import { cdn } from './plugin/cdn'
import configCompressPlugin from './plugin/compress'
import configVisualizerPlugin from './plugin/visualizer'
import configArcoResolverPlugin from './plugin/arcoResolver'
import configStyleImportPlugin from './plugin/styleImport'
import removeConsole from 'vite-plugin-remove-console'

// import configImageminPlugin from './plugin/imagemin'

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '..', dir)
}

export default mergeConfig(
  {
    mode: 'production',
    plugins: [
      cdn,
      removeConsole(),
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configArcoResolverPlugin(),
      configStyleImportPlugin()
      // configImageminPlugin()
    ],
    build: {
      sourcemap: false,
      rollupOptions: {
        input: {
          index: pathResolve('index.html')
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
          // manualChunks: {
          //   arco: ['@arco-design/web-vue'],
          //   vue: ['vue', 'vue-router', 'pinia']
          // }
        }
      },
      chunkSizeWarningLimit: 2000
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false
    }
  },
  baseConfig
)
