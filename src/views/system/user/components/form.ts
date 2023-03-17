import { reactive } from 'vue'
import { accountValidator, phoneValidator } from '@/utils/validator'

export const createUserForm = reactive<any>({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Input',
      model: 'nickname',
      label: '用户姓名',
      options: {
        value: '',
        placeholder: '请输入用户姓名',
        allowClear: true,
        rules: {
          required: true,
          message: '请输入用户姓名',
          validateTrigger: 'blur'
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
        allowClear: true,
        rules: [
          {
            required: true,
            message: '请输入用户账号',
            validateTrigger: 'blur'
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
        allowClear: true,
        rules: {
          required: true,
          message: '请输入用户密码',
          validateTrigger: 'blur'
        }
      }
    },
    {
      type: 'Input',
      model: 'mobile',
      label: '手机号码',
      options: {
        value: '',
        placeholder: '请输入手机号码',
        allowClear: true,
        rules: {
          validator: phoneValidator
        }
      }
    },
    {
      type: 'Input',
      model: 'email',
      label: '邮箱',
      options: {
        value: '',
        placeholder: '请输入邮箱',
        allowClear: true,
        rules: {
          type: 'email',
          message: '邮箱格式不正确'
        }
      }
    },
    {
      type: 'Select',
      model: 'sex',
      label: '用户性别',
      options: {
        value: '',
        placeholder: '请选择用户性别',
        allowClear: true,
        options: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 2
          }
        ]
      }
    },
    {
      type: 'TreeSelect',
      model: 'deptId',
      label: '归属部门',
      options: {
        value: '',
        placeholder: '请选择归属部门',
        allowClear: true,
        allowSearch: true,
        options: [],
        fieldNames: {
          key: 'id',
          title: 'name'
        },
        filterTreeNode: (searchKey: string, nodeItem: any) => {
          return nodeItem.name ? nodeItem.name.indexOf(searchKey) > -1 : false
        }
      }
    },
    {
      type: 'Select',
      model: 'postIds',
      label: '岗位',
      options: {
        value: [],
        multiple: true,
        placeholder: '请选择岗位',
        allowClear: true,
        options: [],
        fieldNames: {
          value: 'id',
          label: 'name'
        }
      }
    }
  ]
})

export const setRoleForm = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Input',
      model: 'nickname',
      label: '用户姓名',
      options: {
        value: '',
        disabled: true
      }
    },
    {
      type: 'Input',
      model: 'username',
      label: '用户账号',
      options: {
        value: '',
        disabled: true
      }
    },
    {
      type: 'Select',
      model: 'roleIds',
      label: '角色',
      options: {
        value: [],
        options: [],
        multiple: true,
        fieldNames: {
          label: 'name',
          value: 'id'
        }
      }
    }
  ]
})
