import { defineStore } from 'pinia'
import to from 'await-to-js'

import { getUserInfo, login } from '@/services/api/user'

const userStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: {
      name: '',
      avatar: '',
      job: '',
      organization: '',
      location: '',
      email: '',
      introduction: '',
      personalWebsite: '',
      jobName: '',
      organizationName: '',
      locationName: '',
      phone: '',
      registrationDate: '',
      accountId: '',
      certification: '',
      role: ''
    },
    token: ''
  }),

  getters: {
    getToken(state: UserState) {
      return state.token
    }
  },

  actions: {
    // 获取用户信息
    async getUserInfo() {
      const [error, res]: any = await to(getUserInfo())
      if (error) return

      this.setInfo({
        userInfo: res.data
      })
    },

    // 登录
    async login(params: { username: string; password: string }) {
      const [error, res]: any = await to(login(params))
      if (error) return

      this.token = res.data.token

      return res
    },

    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    resetInfo() {
      this.$reset()
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: '__USER_INFO__',
        storage: window.localStorage,
        paths: ['token', 'userInfo']
      }
    ]
  }
})

export default userStore
