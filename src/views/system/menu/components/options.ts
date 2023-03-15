import { reactive } from 'vue'

export const formOptions = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'TreeSelect',
      model: 'parentId',
      label: '父级菜单',
      options: {
        value: '',
        placeholder: '请选择父级菜单',
        options: []
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
      type: 'Input',
      model: 'permission',
      label: '权限标识',
      tooltip: 'system:user:list',
      options: {
        value: ''
      }
    },
    {
      type: 'InputNumber',
      model: 'sort',
      label: '菜单排序',
      options: {
        value: 1,
        min: 0
      }
    },
    {
      type: 'Input',
      model: 'linkUrl',
      label: '链接地址',
      options: {
        value: '',
        disabled: true,
        placeholder: '外链/内嵌时的链接地址（http:xxx.com）'
      }
    },
    {
      type: 'Radio',
      model: 'hidden',
      label: '显示状态',
      tooltip: '选择隐藏时，路由将不会出现在侧边栏，可以被访问',
      options: {
        value: 'false',
        options: [
          {
            label: '显示',
            value: 'false'
          },
          {
            label: '隐藏',
            value: 'true'
          }
        ]
      }
    },
    {
      type: 'Radio',
      model: 'status',
      label: '启用状态',
      tooltip: '选择禁用时，路由将不会出现在侧边栏，也不能被访问',
      options: {
        value: 1,
        options: [
          {
            label: '启用',
            value: 1
          },
          {
            label: '禁用',
            value: 0
          }
        ]
      }
    },
    {
      type: 'Radio',
      model: 'keepAlive',
      label: '页面缓存',
      options: {
        value: 'false',
        options: [
          {
            label: '缓存',
            value: 'true'
          },
          {
            label: '不缓存',
            value: 'false'
          }
        ]
      }
    },
    {
      type: 'Radio',
      model: 'affix',
      label: '是否固定',
      options: {
        value: 'false',
        options: [
          {
            label: '固定',
            value: 'true'
          },
          {
            label: '不固定',
            value: 'false'
          }
        ]
      }
    },
    {
      type: 'Radio',
      model: 'link',
      label: '是否外链',
      options: {
        value: 'false',
        options: [
          {
            label: '是',
            value: 'true'
          },
          {
            label: '否',
            value: 'false'
          }
        ],
        onChange: (val: string) => {
          const target = formOptions.list.find(
            (item) => item.model === 'linkUrl'
          )
          if (target) {
            target.options.disabled = val !== 'true'
          }
        }
      }
    },
    {
      type: 'Radio',
      model: 'iframe',
      label: '是否内嵌',
      options: {
        value: 'false',
        options: [
          {
            label: '是',
            value: 'true'
          },
          {
            label: '否',
            value: 'false'
          }
        ],
        onChange: (val: string) => {
          const target = formOptions.list.find(
            (item) => item.model === 'linkUrl'
          )
          if (target) {
            target.options.disabled = val !== 'true'
          }
        }
      }
    }
  ]
})

export const createBtnFormOptions = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Input',
      model: 'title',
      label: '按钮名称',
      options: {
        value: '',
        placeholder: '请输入按钮名称',
        rules: {
          required: true,
          message: '请输入按钮名称'
        }
      }
    },
    {
      type: 'Input',
      model: 'permission',
      label: '权限标识',
      tooltip: 'system:button:add',
      options: {
        value: '',
        rules: {
          required: true,
          message: '请输入权限标识'
        }
      }
    },
    {
      type: 'InputNumber',
      model: 'sort',
      label: '按钮排序',
      options: {
        value: 1,
        min: 1
      }
    },
    {
      type: 'Switch',
      model: 'status',
      label: '状态',
      options: {
        value: true,
        checked: '启用',
        unchecked: '禁用'
      }
    }
  ]
})
