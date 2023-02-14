import { successResponseWrap } from '@/utils/setup-mock'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: () => {
      return successResponseWrap({
        token: '__IVES_TETS_TOKEN__'
      })
    }
  },
  {
    url: '/api/user/info',
    method: 'post',
    response: () => {
      return successResponseWrap({
        name: '薛伟鹏',
        avatar: 'https://s2.loli.net/2022/10/31/6SzsNWChtIHkj5b.jpg',
        email: 'ivewxue@email.com',
        job: 'frontend',
        jobName: '前端搬砖师',
        organization: 'Frontend',
        organizationName: '前端',
        location: 'jinan',
        locationName: '济南',
        introduction: '以人为镜可以明得失，以代码为镜可以通逻辑。',
        personalWebsite: 'https://my-blog-github.vercel.app/',
        phone: '176****3639',
        registrationDate: '2022-10-31 09:27:00',
        accountId: '15012312300',
        certification: 1,
        role: 'admin'
      })
    }
  },
  {
    url: '/api/user/menu',
    method: 'post',
    response: () => {
      const menuList = [
        {
          path: '/home',
          name: 'home',
          component: 'home/index',
          meta: {
            title: '首页',
            isLink: '',
            isHide: false,
            isKeepAlive: true,
            isAffix: true,
            isIframe: false,
            roles: ['admin', 'common'],
            icon: 'iconfont icon-shouye'
          },
          children: []
        },
        {
          path: '/system',
          name: 'system',
          component: 'layout/routerView/parent',
          redirect: '/system/menu',
          meta: {
            title: '系统管理',
            isLink: '',
            isHide: false,
            isKeepAlive: true,
            isAffix: true,
            isIframe: false,
            roles: ['admin'],
            icon: 'iconfont icon-xitongshezhi'
          },
          children: [
            {
              path: '/system/menu',
              name: 'systemMenu',
              component: 'system/menu/index',
              meta: {
                title: '菜单管理',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                isAffix: true,
                isIframe: false,
                roles: ['admin'],
                icon: 'iconfont icon-caidan'
              }
            },
            {
              path: '/system/user',
              name: 'systemUser',
              component: 'system/user/index',
              meta: {
                title: '用户管理',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                isAffix: true,
                isIframe: false,
                roles: ['admin'],
                icon: 'iconfont icon-icon-'
              }
            }
          ]
        },
        {
          path: '/limits',
          name: 'limits',
          component: 'layout/routerView/parent',
          redirect: '/limits/frontEnd',
          meta: {
            title: '权限管理',
            isLink: '',
            isHide: false,
            isKeepAlive: true,
            isAffix: true,
            isIframe: false,
            roles: ['admin', 'common'],
            icon: 'iconfont icon-quanxian'
          },
          children: [
            {
              path: '/limits/backEnd',
              name: 'limitsBackEnd',
              component: 'layout/routerView/parent',
              meta: {
                title: '后端控制',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                isAffix: true,
                isIframe: false,
                roles: ['admin', 'common']
              },
              children: [
                {
                  path: '/limits/backEnd/page',
                  name: 'limitsBackEndEndPage',
                  component: 'limits/backEnd/page/index',
                  meta: {
                    title: '页面权限',
                    isLink: '',
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: true,
                    isIframe: false,
                    roles: ['admin', 'common']
                  }
                }
              ]
            }
          ]
        },
        {
          path: '/menu',
          name: 'menu',
          component: 'layout/routerView/parent',
          redirect: '/menu/menu1',
          meta: {
            title: '菜单嵌套',
            isLink: '',
            isHide: false,
            isKeepAlive: true,
            isAffix: true,
            isIframe: false,
            roles: ['admin', 'common'],
            icon: 'iconfont icon-caidan'
          },
          children: [
            {
              path: '/menu/menu1',
              name: 'menu1',
              component: 'layout/routerView/parent',
              redirect: '/menu/menu1/menu11',
              meta: {
                title: '菜单1',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                isAffix: true,
                isIframe: false,
                roles: ['admin', 'common'],
                icon: 'iconfont icon-caidan'
              },
              children: [
                {
                  path: '/menu/menu1/menu11',
                  name: 'menu11',
                  component: 'menu/menu1/menu11/index',
                  meta: {
                    title: '菜单11',
                    isLink: '',
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: true,
                    isIframe: false,
                    roles: ['admin', 'common'],
                    icon: 'iconfont icon-caidan'
                  }
                },
                {
                  path: '/menu/menu1/menu12',
                  name: 'menu12',
                  component: 'layout/routerView/parent',
                  redirect: '/menu/menu1/menu12/menu121',
                  meta: {
                    title: '菜单2',
                    isLink: '',
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: true,
                    isIframe: false,
                    roles: ['admin', 'common'],
                    icon: 'iconfont icon-caidan'
                  },
                  children: [
                    {
                      path: '/menu/menu1/menu12/menu121',
                      name: 'menu121',
                      component: 'menu/menu1/menu12/menu121/index',
                      meta: {
                        title: '菜单21',
                        isLink: '',
                        isHide: false,
                        isKeepAlive: true,
                        isAffix: true,
                        isIframe: false,
                        roles: ['admin', 'common'],
                        icon: 'iconfont icon-caidan'
                      }
                    }
                  ]
                },
                {
                  path: '/menu/menu1/menu13',
                  name: 'menu13',
                  component: 'menu/menu1/menu13/index',
                  meta: {
                    title: '菜单3',
                    isLink: '',
                    isHide: false,
                    isKeepAlive: true,
                    isAffix: true,
                    isIframe: false,
                    roles: ['admin', 'common'],
                    icon: 'iconfont icon-caidan'
                  }
                }
              ]
            },
            {
              path: '/menu/menu2',
              name: 'menu2',
              component: 'menu/menu2/index',
              meta: {
                title: '菜单2',
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                isAffix: true,
                isIframe: false,
                roles: ['admin', 'common'],
                icon: 'iconfont icon-caidan'
              }
            }
          ]
        },
        {
          path: '/personal',
          name: 'personal',
          component: 'personal/index',
          meta: {
            title: '个人中心',
            isLink: '',
            isHide: false,
            isKeepAlive: true,
            isAffix: true,
            isIframe: false,
            roles: ['admin', 'common'],
            icon: 'iconfont icon-gerenzhongxin'
          }
        },
        // {
        //   path: '/link',
        //   name: 'layoutLinkView',
        //   component: 'layout/routerView/link',
        //   meta: {
        //     title: '外部链接',
        //     isLink: 'https://arco.design/vue/docs/start',
        //     isHide: false,
        //     isKeepAlive: false,
        //     isAffix: true,
        //     isIframe: false,
        //     roles: ['admin'],
        //     icon: 'iconfont icon-caozuo-wailian'
        //   }
        // },
        {
          path: '/iframesOne',
          name: 'layoutIfameView',
          component: 'layout/routerView/iframes',
          meta: {
            title: '内嵌Iframe',
            isLink:
              'https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E6%B7%BB%E5%8A%A0%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1',
            isHide: false,
            isKeepAlive: true,
            isAffix: true,
            isIframe: true,
            roles: ['admin'],
            icon: 'iconfont icon-neiqianshujuchucun'
          }
        }
      ]
      return successResponseWrap(menuList)
    }
  }
]
