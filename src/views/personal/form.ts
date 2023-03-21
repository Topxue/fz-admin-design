import { phoneValidator } from '@/utils/validator'

// 基本资料
export const baseInfoForm = {
  config: {
    btnPosition: 'left',
    submitText: '保存',
    resetText: '关闭'
  },
  list: [
    {
      type: 'Input',
      model: 'nickname',
      label: '用户昵称',
      col: { span: 14 },
      options: {
        value: '',
        placeholder: '请输入用户昵称'
      }
    },
    {
      type: 'Input',
      model: 'mobile',
      label: '手机号',
      col: { span: 14 },
      options: {
        value: '',
        placeholder: '请输入手机号',
        rules: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            validator: phoneValidator
          }
        ]
      }
    },
    {
      type: 'Input',
      model: 'email',
      label: '邮箱',
      col: { span: 14 },
      options: {
        value: '',
        placeholder: '请输入邮箱',
        rules: [
          {
            required: true,
            message: '请输入邮箱'
          },
          {
            type: 'email',
            message: '邮箱格式不正确'
          }
        ]
      }
    },
    {
      type: 'Radio',
      model: 'sex',
      label: '性别',
      col: { span: 14 },
      options: {
        value: 1,
        placeholder: '请选择性别',
        options: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 0
          }
        ],
        rules: [
          {
            required: true,
            message: '请选择性别'
          }
        ]
      }
    }
  ]
}

// 修改密码
export const passwordForm = {
  config: {
    btnPosition: 'left',
    submitText: '保存',
    resetText: '关闭'
  },
  list: [
    {
      type: 'InputPassword',
      model: 'oldPassword',
      label: '旧密码',
      col: { span: 14 },
      options: {
        value: '',
        placeholder: '请输入旧密码',
        rules: {
          required: true,
          message: '请输入旧密码'
        }
      }
    },
    {
      type: 'InputPassword',
      model: 'newPassword',
      label: '新密码',
      col: { span: 14 },
      options: {
        value: '',
        placeholder: '请输入新密码',
        rules: {
          required: true,
          message: '请输入新密码'
        }
      }
    },
    {
      type: 'InputPassword',
      model: 'confirmPassword',
      label: '确认密码',
      col: { span: 14 },
      options: {
        value: '',
        placeholder: '请输入确认密码',
        rules: [
          {
            required: true,
            message: '请输入确认密码'
          }
        ]
      }
    }
  ]
}
