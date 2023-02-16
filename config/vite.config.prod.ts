import { mergeConfig } from 'vite'
import baseConfig from './vite.config.base'
import configCdnPlugin from './plugin/cdn'
import configCompressPlugin from './plugin/compress'
import configVisualizerPlugin from './plugin/visualizer'
import configArcoResolverPlugin from './plugin/arcoResolver'
import configStyleImportPlugin from './plugin/styleImport'
// import configImageminPlugin from './plugin/imagemin'

export default mergeConfig(
  {
    mode: 'production',
    plugins: [
      configCdnPlugin(),
      configCompressPlugin('gzip'),
      configVisualizerPlugin(),
      configArcoResolverPlugin(),
      configStyleImportPlugin()
      // configImageminPlugin()
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            // chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia']
          }
        }
      },
      chunkSizeWarningLimit: 2000
    }
  },
  baseConfig
)
