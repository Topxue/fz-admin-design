import { mergeConfig } from 'vite'
// import eslint from 'vite-plugin-eslint'
import baseConfig from './vite.config.base'

import { viteMockServe } from 'vite-plugin-mock'

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true
      }
    },
    plugins: [
      viteMockServe({
        mockPath: 'mock', //mock文件地址
        // localEnabled: !!process.env.USE_MOCK, // 开发打包开关
        // prodEnabled: !!process.env.USE_CHUNK_MOCK // 生产打包开关
        // logger: false, //是否在控制台显示请求日志
        supportTs: true
      })
    ]
  },
  baseConfig
)
