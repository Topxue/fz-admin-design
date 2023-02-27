import { loadEnv, mergeConfig } from 'vite'
import baseConfig from './vite.config.base'

const { VITE_PORT } = loadEnv('development', './')

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: false,
      port: VITE_PORT,
      host: '0.0.0.0',
      fs: {
        strict: true
      }
    },
    plugins: []
  },
  baseConfig
)
