import { defineStore } from 'pinia'

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
    updateSettings(partial: Partial<AppState>) {
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
    changeLayout(model: 'vertical' | 'horizontal' | 'mix') {
      this.appConfig.layout = model
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
