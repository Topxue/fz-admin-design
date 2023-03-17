import { reactive } from 'vue'

export const createPostForm = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Input',
      model: 'name',
      label: '岗位名称',
      options: {
        value: '',
        placeholder: '请输入岗位名称',
        rules: {
          required: true,
          message: '请输入岗位名称',
          triggerValidate: 'input'
        }
      }
    },
    {
      type: 'Input',
      model: 'code',
      label: '岗位编码',
      options: {
        value: '',
        placeholder: '请输入岗位编码',
        rules: {
          required: true,
          message: '请输入岗位编码',
          triggerValidate: 'input'
        }
      }
    },
    {
      type: 'InputNumber',
      model: 'sort',
      label: '岗位顺序',
      options: {
        value: 1,
        min: 1,
        placeholder: '请输入岗位顺序',
        rules: {
          required: true,
          message: '请输入岗位顺序',
          triggerValidate: 'input'
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
        uncheckedValue: 0
      }
    },
    {
      type: 'Textarea',
      model: 'remark',
      label: '备注',
      options: {
        value: '',
        placeholder: '备注'
      }
    }
  ]
})
