const SUCCESS_CODE = 10000
const ADMIN_TOKEN = '__ADMIN_TOKEN__'
const USER_TOKEN = '__USER_TOKEN__'

// 管理员菜单
const adminRoutes = [
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
      roles: ['admin', 'user'],
      icon: 'IconHome'
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
      isAffix: false,
      isIframe: false,
      roles: ['admin'],
      icon: 'IconSettings'
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
          isAffix: false,
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
          isAffix: false,
          isIframe: false,
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/params',
    name: 'params',
    component: 'layout/routerView/parent',
    redirect: '/params/common',
    meta: {
      title: '路由参数',
      isLink: '',
      isHide: false,
      isKeepAlive: false,
      isAffix: false,
      isIframe: false,
      roles: ['admin', 'user'],
      icon: 'IconApps'
    },
    children: [
      {
        path: '/params/common',
        name: 'paramsCommon',
        component: 'params/common/index',
        meta: {
          title: '普通路由',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user'],
          icon: 'iconfont icon-shouye'
        }
      },
      {
        path: '/params/common/detail',
        name: 'paramsCommonDetail',
        component: 'params/common/common-detail',
        meta: {
          title: '普通路由参数详情',
          isLink: '',
          isHide: true,
          isKeepAlive: false,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user'],
          icon: 'iconfont icon-shouye'
        }
      },
      {
        path: '/params/dynamic',
        name: 'paramsDynamic',
        component: 'params/dynamic/index',
        meta: {
          title: '动态路由',
          isLink: '',
          isHide: false,
          isKeepAlive: false,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user']
        }
      },
      {
        path: '/params/dynamic/details/:t/:id',
        name: 'paramsDynamicDetails',
        component: 'params/dynamic/detail',
        meta: {
          title: '动态路由参数详情',
          isLink: '',
          isHide: true,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin'],
          icon: 'iconfont icon-select'
        }
      }
    ]
  },
  {
    path: '/permission',
    name: 'permission',
    component: 'layout/routerView/parent',
    redirect: '/permission/page',
    meta: {
      title: '权限管理',
      isLink: '',
      isHide: false,
      isKeepAlive: false,
      isAffix: false,
      isIframe: false,
      roles: ['admin', 'user'],
      icon: 'IconExperiment'
    },
    children: [
      {
        path: '/permission/permission-page',
        name: 'PermissionPage',
        component: 'permission/permission-page',
        meta: {
          title: '页面权限',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user'],
          icon: 'iconfont icon-shouye'
        }
      },
      {
        path: '/permission/permission-button',
        name: 'PermissionButton',
        component: 'permission/permission-button',
        meta: {
          title: '按钮权限',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user'],
          icon: 'iconfont icon-shouye'
        }
      }
    ]
  },
  {
    path: '/able',
    name: 'able',
    // component: '/able/icon-select',
    // component: 'layout/routerView/parent',
    // redirect: '/able/icon-select',
    meta: {
      title: '功能',
      isLink: '',
      isHide: false,
      isKeepAlive: false,
      isAffix: false,
      isIframe: false,
      roles: ['admin', 'user'],
      icon: 'IconApps'
    },
    children: [
      {
        path: '/able/icon-select',
        name: 'IconSelect',
        component: 'able/icon-select/index',
        meta: {
          title: '图标选择器',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user']
        }
      },
      {
        path: '/able/print',
        name: 'Print',
        component: 'able/print/index',
        meta: {
          title: '打印',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user']
        }
      },
      {
        path: '/able/pdf',
        name: 'Pdf',
        component: 'able/pdf',
        meta: {
          title: 'PDF预览',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user']
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
      isAffix: false,
      isIframe: false,
      roles: ['admin', 'user'],
      icon: 'iconfont icon-gerenzhongxin'
    }
  },
  {
    path: '/link',
    name: 'layoutLinkView',
    component: 'layout/routerView/link',
    meta: {
      title: '外部链接',
      isLink: 'https://arco.design/vue/docs/start',
      isHide: false,
      isKeepAlive: false,
      isAffix: false,
      isIframe: false,
      roles: ['admin'],
      icon: 'IconLink'
    }
  },
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
      isAffix: false,
      isIframe: true,
      roles: ['admin'],
      icon: 'iconfont icon-neiqianshujuchucun'
    }
  }
]

// 用户菜单

const userRoutes = [
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
      roles: ['admin', 'user'],
      icon: 'IconHome'
    },
    children: []
  },
  {
    path: '/params',
    name: 'params',
    component: 'layout/routerView/parent',
    redirect: '/params/common',
    meta: {
      title: '路由参数',
      isLink: '',
      isHide: false,
      isKeepAlive: false,
      isAffix: false,
      isIframe: false,
      roles: ['admin', 'user'],
      icon: 'IconApps'
    },
    children: [
      {
        path: '/params/common',
        name: 'paramsCommon',
        component: 'params/common/index',
        meta: {
          title: '普通路由',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user'],
          icon: 'iconfont icon-shouye'
        }
      },
      {
        path: '/params/common/detail',
        name: 'paramsCommonDetail',
        component: 'params/common/common-detail',
        meta: {
          title: '普通路由参数详情',
          isLink: '',
          isHide: true,
          isKeepAlive: false,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user'],
          icon: 'iconfont icon-shouye'
        }
      },
      {
        path: '/params/dynamic',
        name: 'paramsDynamic',
        component: 'params/dynamic/index',
        meta: {
          title: '动态路由',
          isLink: '',
          isHide: false,
          isKeepAlive: false,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user']
        }
      },
      {
        path: '/params/dynamic/details/:t/:id',
        name: 'paramsDynamicDetails',
        component: 'params/dynamic/detail',
        meta: {
          title: '动态路由参数详情',
          isLink: '',
          isHide: true,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin'],
          icon: 'iconfont icon-select'
        }
      }
    ]
  },
  {
    path: '/permission',
    name: 'permission',
    component: 'layout/routerView/parent',
    redirect: '/permission/page',
    meta: {
      title: '权限管理',
      isLink: '',
      isHide: false,
      isKeepAlive: false,
      isAffix: false,
      isIframe: false,
      roles: ['admin', 'user'],
      icon: 'IconExperiment'
    },
    children: [
      {
        path: '/permission/permission-page',
        name: 'PermissionPage',
        component: 'permission/permission-page',
        meta: {
          title: '页面权限',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user'],
          icon: 'iconfont icon-shouye'
        }
      },
      {
        path: '/permission/permission-button',
        name: 'PermissionButton',
        component: 'permission/permission-button',
        meta: {
          title: '按钮权限',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user'],
          icon: 'iconfont icon-shouye'
        }
      }
    ]
  },
  {
    path: '/able',
    name: 'able',
    component: 'layout/routerView/parent',
    redirect: '/able/icon-select',
    meta: {
      title: '功能',
      isLink: '',
      isHide: false,
      isKeepAlive: false,
      isAffix: false,
      isIframe: false,
      roles: ['admin', 'user'],
      icon: 'IconApps'
    },
    children: [
      {
        path: '/able/icon-select',
        name: 'IconSelect',
        component: 'able/icon-select/index',
        meta: {
          title: '图标选择器',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user']
        }
      },
      {
        path: '/able/print',
        name: 'Print',
        component: 'able/print/index',
        meta: {
          title: '打印',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user']
        }
      },
      {
        path: '/able/pdf',
        name: 'Pdf',
        component: 'able/pdf',
        meta: {
          title: 'PDF预览',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: false,
          isIframe: false,
          roles: ['admin', 'user']
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
      isAffix: false,
      isIframe: false,
      roles: ['admin', 'user'],
      icon: 'iconfont icon-gerenzhongxin'
    }
  },
  {
    path: '/link',
    name: 'layoutLinkView',
    component: 'layout/routerView/link',
    meta: {
      title: '外部链接',
      isLink: 'https://arco.design/vue/docs/start',
      isHide: false,
      isKeepAlive: false,
      isAffix: false,
      isIframe: false,
      roles: ['admin'],
      icon: 'IconLink'
    }
  },
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
      isAffix: false,
      isIframe: true,
      roles: ['admin'],
      icon: 'iconfont icon-neiqianshujuchucun'
    }
  }
]

// eslint-disable-next-line complexity
module.exports = (req, res, next) => {
  /**
   * 登录
   */
  if (req.method === 'POST' && req.path === '/user/login') {
    const username = req.body.username,
      password = req.body.password

    if (username === 'admin' && password === '123456') {
      return res.status(200).json({
        code: SUCCESS_CODE,
        data: {
          token: ADMIN_TOKEN
        }
      })
    } else if (username === 'user' && password === '123456') {
      return res.status(200).json({
        code: SUCCESS_CODE,
        data: {
          token: USER_TOKEN
        }
      })
    } else {
      return res.status(200).json({
        message: '用户名或者密码错误'
      })
    }
  }

  /**
   * 获取用户信息
   */
  if (req.method === 'POST' && req.path === '/user/info') {
    const token = req.body.token

    if (token === '__ADMIN_TOKEN__') {
      return res.status(200).json({
        code: SUCCESS_CODE,
        data: {
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
          role: 'admin',
          permissions: [
            'system:button:add',
            'system:button:edit',
            'system:button:delete',
            'system:button:link'
          ]
        }
      })
    } else {
      return res.status(200).json({
        code: SUCCESS_CODE,
        data: {
          name: 'user',
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
          role: 'user',
          permissions: ['system:button:add', 'system:button:link']
        }
      })
    }
  }

  /**
   * 获取路由菜单
   */
  if (req.method === 'POST' && req.path === '/user/menu') {
    const role = req.body.role
    if (role === 'admin') {
      return res.status(200).json({
        code: SUCCESS_CODE,
        data: adminRoutes
      })
    } else {
      return res.status(200).json({
        code: SUCCESS_CODE,
        data: userRoutes
      })
    }
  }

  next()
}
