import { defineStore } from 'pinia'
import to from 'await-to-js'
import { FzModal } from 'fz-arco-design'

import router from '@/router'
import { getUserInfo, login } from '@/services/api/user'
import { useRoutesList, useKeepALiveNames, useTagsViewRoutes } from '../index'

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
      role: 'admin',
      permissions: []
    },
    token: ''
  }),

  getters: {
    getToken: (state: UserState) => state.token
  },

  actions: {
    // 获取用户信息
    async getUserInfo() {
      const [error, res]: any = await to(
        getUserInfo({
          token: this.token
        })
      )
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
      this.userInfo.role = params.username === 'admin' ? 'admin' : 'user'

      return res
    },

    // 退出登录
    loginOut() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this

      FzModal.warning({
        title: '提示',
        content: '此操作将退出登录, 是否继续？',
        async onOk() {
          await _this.resetInfo()
          await useRoutesList().clearRoutesList()
          await useKeepALiveNames().clearAllCached()
          await useTagsViewRoutes().clearTagsVieList()

          router.push('/login')
        }
      })
    },

    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // async clearCachedAll() {
    //   await this.resetInfo()
    //   await useRoutesList().clearRoutesList()
    //   await useKeepALiveNames().clearAllCached()
    // },

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
