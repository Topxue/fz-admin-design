import { defineStore } from 'pinia'

import Watermark from '@/utils/watermark'
import defaultSettings from '@/config/setting'
import usePrimaryColor from '@/hooks/usePrimaryColor'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    appConfig: {
      ...defaultSettings
    }
  }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    }
  },

  actions: {
    updateSettings(partial: { appConfig: Partial<AppState['appConfig']> }) {
      // @ts-ignore-next-line
      this.$patch(partial)
    },

    changeThemeColor(dark: boolean) {
      this.appConfig.isDark = dark
      usePrimaryColor(this.appConfig.primary)
      document.body.setAttribute('arco-theme', dark ? 'dark' : '')
    },

    changePrimaryColor(color: string) {
      this.appConfig.primary = color
      usePrimaryColor(color)
    },

    // 切换布局
    changeLayout(model: string) {
      this.appConfig.layout = model
    },

    // 设置灰色模式
    setGrayscale(state: boolean) {
      this.appConfig.isGrayscale = state
      if (state) this.appConfig.isInvert = false

      const appEle = document.querySelector('html')
      appEle.setAttribute(
        'style',
        `filter: grayscale(${this.appConfig.isGrayscale ? 1 : 0})`
      )
    },

    // 色弱模式
    setInvert(state: boolean) {
      this.appConfig.isInvert = state
      if (state) this.appConfig.isGrayscale = false

      const appEle = document.querySelector('html')
      appEle.setAttribute(
        'style',
        `filter: invert(${this.appConfig.isInvert ? '80%' : '0%'})`
      )
    },

    setWatermark(state: boolean) {
      this.appConfig.isWartermark = state
      this.appConfig.isWartermark
        ? Watermark.set(this.appConfig.wartermarkText)
        : Watermark.del()
    },

    changeWartermarkText(wartermarkText: string) {
      this.appConfig.wartermarkText = wartermarkText

      this.appConfig.isWartermark
        ? Watermark.set(wartermarkText)
        : Watermark.del()
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: '__APP_CONFIG__',
        storage: window.localStorage,
        paths: ['appConfig']
      }
    ]
  }
})

export default useAppStore
