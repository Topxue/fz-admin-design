import { reactive } from 'vue'
import { accountValidator, phoneValidator } from '@/utils/validator'

export const createTenantForm = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Input',
      model: 'name',
      label: '租户名',
      options: {
        value: '',
        placeholder: '请输入租户名',
        rules: {
          required: true,
          message: '请输入租户名'
        }
      }
    },
    {
      type: 'Select',
      model: 'packageId',
      label: '租户套餐',
      options: {
        value: '',
        placeholder: '请选择租户套餐',
        options: [],
        fieldNames: {
          label: 'name',
          value: 'id'
        },
        virtualListProps: {
          height: 200
        },
        rules: {
          required: true,
          message: '请选择租户套餐'
        }
      }
    },
    {
      type: 'Input',
      model: 'contactName',
      label: '联系人',
      options: {
        value: '',
        placeholder: '请输入联系人',
        rules: {
          required: true,
          message: '请输入联系人'
        }
      }
    },
    {
      type: 'Input',
      model: 'contactMobile',
      label: '联系人手机号',
      options: {
        value: '',
        placeholder: '请输入联系人手机号',
        rules: {
          validator: phoneValidator
        }
      }
    },
    {
      type: 'Input',
      model: 'username',
      label: '用户账号',
      hidden: false,
      options: {
        value: '',
        placeholder: '请输入用户账号',
        rules: [
          {
            required: true,
            message: '请输入用户账号'
          },
          {
            validator: accountValidator
          }
        ]
      }
    },
    {
      type: 'InputPassword',
      model: 'password',
      label: '用户密码',
      hidden: false,
      options: {
        value: '',
        placeholder: '请输入用户密码',
        rules: {
          required: true,
          message: '请输入用户密码'
        }
      }
    },
    {
      type: 'InputNumber',
      model: 'accountCount',
      label: '账号额度',
      options: {
        value: 1,
        min: 0,
        placeholder: '请输入账号额度',
        rules: {
          required: true,
          message: '请输入账号额度'
        }
      }
    },
    {
      type: 'DatePicker',
      model: 'expireTime',
      label: '过期时间',
      options: {
        value: '',
        placeholder: '请选择过期时间',
        disabledDate: (current: string) => {
          const nowTime = new Date().getTime()
          return Date.parse(current) < nowTime
        },
        rules: {
          required: true,
          message: '请选择过期时间'
        }
      }
    },
    {
      type: 'Input',
      model: 'domain',
      label: '绑定域名',
      options: {
        value: '',
        placeholder: '请输入绑定域名',
        rules: {
          required: true,
          message: '请输入绑定域名'
        }
      }
    },
    {
      type: 'Switch',
      model: 'status',
      label: '租户状态',
      options: {
        value: 1,
        checked: '启用',
        unchecked: '禁用',
        checkedValue: 1,
        uncheckedValue: 0,
        rules: {
          required: true,
          message: '请选择租户状态'
        }
      }
    }
  ]
})

export const createSetMealForm = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Input',
      model: 'name',
      label: '套餐名称',
      options: {
        value: '',
        placeholder: '请输入套餐名称',
        rules: {
          required: true,
          message: '请输入套餐名称'
        }
      }
    },
    {
      type: 'TreeSelect',
      model: 'menuIds',
      label: '菜单权限',
      options: {
        value: [],
        placeholder: '请选择菜单权限',
        allowClear: true,
        allowSearch: true,
        treeCheckable: true,
        loading: true,
        treeCheckedStrategy: 'child',
        options: [],
        fieldNames: {
          key: 'id'
        },
        filterTreeNode: (searchKey: string, nodeItem: any) => {
          return nodeItem.title ? nodeItem.title.indexOf(searchKey) > -1 : false
        }
      }
    },
    {
      type: 'Switch',
      model: 'status',
      label: '状态',
      options: {
        value: 1,
        checked: '启用',
        unchecked: '禁用',
        checkedValue: 1,
        uncheckedValue: 0,
        rules: {
          required: true,
          message: '请选择状态'
        }
      }
    },
    {
      type: 'Textarea',
      model: 'remark',
      label: '备注',
      options: {
        value: '',
        placeholder: '请输入备注'
      }
    }
  ]
})
