import to from 'await-to-js'
import { defineStore } from 'pinia'
import { FzModal } from 'fz-arco-design'

import router from '@/router'
import {
  getUserInfo,
  login,
  LoginData,
  refreshTokenApi,
  RefreshTokenResult
} from '@/services/api/user'
import { useRoutesList, useKeepALiveNames, useTagsViewRoutes } from '@/stores'

const userStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: {
      user: {
        avatar: '',
        id: '',
        nickname: ''
      },
      roles: [],
      permissions: []
    },
    accessToken: '',
    expiresTime: '',
    userId: '',
    refreshToken: ''
  }),

  getters: {
    getToken: (state: UserState) => state.accessToken
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
    async login(params: LoginData) {
      const [error, res] = await to(login(params))
      if (error) return

      this.setInfo({ ...res.data })
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
          router.push('/login')

          await _this.resetInfo()
          await useRoutesList().clearRoutesList()
          await useKeepALiveNames().clearAllCached()
          await useTagsViewRoutes().clearTagsVieList()
        }
      })
    },

    /** 刷新`token` */
    handRefreshToken(data: { refreshToken: string }) {
      console.log(data, 'refreshToken...')

      // eslint-disable-next-line no-async-promise-executor
      return new Promise<RefreshTokenResult>(async (resolve, reject) => {
        const [error, res] = await to(refreshTokenApi(data))
        if (error) return reject(error)
        console.log(res)

        this.setInfo({ ...res.data })
        resolve(res)
      })
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
        storage: window.localStorage
      }
    ]
  }
})

export default userStore
