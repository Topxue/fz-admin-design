export const createDeptOptions = {
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'TreeSelect',
      model: 'parentId',
      label: '上级组织',
      options: {
        value: '',
        placeholder: '请选择上级组织',
        options: [],
        rules: {
          required: true,
          message: '请选择上级组织'
        }
      }
    },
    {
      type: 'Input',
      model: 'name',
      label: '组织名称',
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入组织名称',
        rules: {
          required: true,
          message: '请输入组织名称'
        }
      }
    },
    {
      type: 'InputNumber',
      model: 'sort',
      label: '显示排序',
      options: {
        value: 1,
        min: 1,
        rules: {
          required: true,
          message: '请输入显示排序'
        }
      }
    },
    {
      type: 'Select',
      model: 'leaderUserId',
      label: '负责人',
      options: {
        value: '',
        options: [],
        allowClear: true,
        fieldNames: {
          label: 'nickname',
          value: 'id'
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
    }
  ]
}
