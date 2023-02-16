import { resolve } from 'path'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { viteBuildInfo } from './plugin/info'
import { include, exclude } from './plugin/optimize'

export default defineConfig({
  plugins: [vue(), vueJsx(), svgLoader(), DefineOptions(), viteBuildInfo()],
  optimizeDeps: {
    include,
    exclude
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src')
      },
      {
        find: '@/assets',
        replacement: resolve(__dirname, '../src/assets')
      }
    ],
    extensions: ['.ts', '.js']
  },
  define: {
    'process.env': {}
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/assets/style/breakpoint.less'
          )}";`
        },
        javascriptEnabled: true
      }
    }
  }
})
