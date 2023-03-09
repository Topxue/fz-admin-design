import { reactive } from 'vue'

export const formOptions = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Select',
      model: 'parent',
      label: '父级菜单',
      options: {
        value: '',
        placeholder: '请选择父级菜单',
        options: [
          {
            label: '1231',
            value: '213'
          }
        ]
      }
    },
    {
      type: 'Input',
      model: 'title',
      label: '菜单名称',
      options: {
        value: '',
        placeholder: '请输入菜单名称',
        rules: {
          required: true,
          message: '请输入菜单名称'
        }
      }
    },
    {
      type: 'Input',
      model: 'icon',
      label: '菜单图标',
      options: {
        value: ''
      }
    },
    {
      type: 'Input',
      model: 'name',
      label: '路由名称',
      options: {
        value: '',
        placeholder: '请输入路由名称',
        rules: {
          required: true,
          message: '请输入路由名称'
        }
      }
    },
    {
      type: 'Input',
      model: 'path',
      label: '路由路径',
      options: {
        value: '',
        placeholder: '请输入路由路径',
        rules: {
          required: true,
          message: '请输入路由路径'
        }
      }
    },
    {
      type: 'Input',
      model: 'component',
      label: '组件路径',
      options: {
        value: '',
        placeholder: '请输入组件路径',
        rules: {
          required: true,
          message: '请输入组件路径'
        }
      }
    },
    {
      type: 'Select',
      model: 'roles',
      label: '权限标识',
      options: {
        value: [],
        multiple: true,
        options: [
          {
            label: 'admin',
            value: 'admin'
          },
          {
            label: 'user',
            value: 'user'
          }
        ]
      }
    },
    {
      type: 'InputNumber',
      model: 'order',
      label: '菜单排序',
      options: {
        value: 1,
        min: 0
      }
    },
    {
      type: 'Input',
      model: 'isLink',
      label: '链接地址',
      options: {
        value: '',
        disabled: true,
        placeholder: '外链/内嵌时的链接地址（http:xxx.com）'
      }
    },
    {
      type: 'Radio',
      model: 'isHide',
      label: '显示状态',
      options: {
        value: '1',
        options: [
          {
            label: '显示',
            value: '1'
          },
          {
            label: '隐藏',
            value: '0'
          }
        ]
      }
    },
    {
      type: 'Radio',
      model: 'isKeepAlive',
      label: '页面缓存',
      options: {
        value: '0',
        options: [
          {
            label: '缓存',
            value: '1'
          },
          {
            label: '不缓存',
            value: '0'
          }
        ]
      }
    },
    {
      type: 'Radio',
      model: 'isAffix',
      label: '是否固定',
      options: {
        value: '0',
        options: [
          {
            label: '固定',
            value: '1'
          },
          {
            label: '不固定',
            value: '0'
          }
        ]
      }
    },
    {
      type: 'Radio',
      model: 'isLinked',
      label: '是否外链',
      options: {
        value: '0',
        options: [
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ],
        onChange: (val: string) => {
          const target = formOptions.list.find(
            (item) => item.model === 'isLink'
          )

          if (target) {
            target.options.value = ''
            target.options.disabled = val != '1'

            console.log(target, 'target...')
          }
        }
      }
    },
    {
      type: 'Radio',
      model: 'isIframe',
      label: '是否内嵌',
      options: {
        value: '0',
        options: [
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ]
      }
    }
  ]
})
