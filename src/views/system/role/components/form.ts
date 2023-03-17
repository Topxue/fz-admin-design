import { reactive } from 'vue'

export const createRoleForm = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Input',
      model: 'name',
      label: '角色名称',
      options: {
        value: '',
        placeholder: '请输入角色名称',
        rules: {
          required: true,
          message: '请输入角色名称'
        }
      }
    },
    {
      type: 'Input',
      model: 'code',
      label: '角色标识',
      options: {
        value: '',
        placeholder: '请输入角色标识',
        rules: {
          required: true,
          message: '请输入角色标识'
        }
      }
    },
    {
      type: 'InputNumber',
      model: 'sort',
      label: '角色排序',
      options: {
        value: 1,
        min: 1,
        placeholder: '请输入角色排序',
        rules: {
          required: true,
          message: '请输入角色排序'
        }
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

export const menuPermissonForm = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Input',
      model: 'name',
      label: '角色名称',
      options: {
        value: '',
        disabled: true
      }
    },
    {
      type: 'Input',
      model: 'code',
      label: '角色标识',
      options: {
        value: '',
        disabled: true
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
        treeCheckedStrategy: 'child',
        options: [],
        fieldNames: {
          key: 'id'
        },
        filterTreeNode: (searchKey: string, nodeItem: any) => {
          return nodeItem.title ? nodeItem.title.indexOf(searchKey) > -1 : false
        }
      }
    }
  ]
})

export const dataPermissonForm = reactive({
  config: {
    isHiddenButton: true
  },
  list: [
    {
      type: 'Input',
      model: 'name',
      label: '角色名称',
      options: {
        value: '',
        disabled: true
      }
    },
    {
      type: 'Input',
      model: 'code',
      label: '角色标识',
      options: {
        value: '',
        disabled: true
      }
    },
    {
      type: 'Select',
      model: 'dataScope',
      label: '权限范围',
      options: {
        value: 5,
        options: [
          {
            label: '全部数据权限',
            value: 1
          },
          {
            label: '指定部门数据权限',
            value: 2
          },
          {
            label: '本部门数据权限',
            value: 3
          },
          {
            label: '部门及以下数据权限',
            value: 4
          },
          {
            label: '仅本人数据权限',
            value: 5
          }
        ],
        onChange: (value: number) => {
          const target = dataPermissonForm.list.find(
            (item) => item.model === 'dataScopeDeptIds'
          )

          if (target) {
            target.hidden = value !== 2
          }
        }
      }
    },
    {
      type: 'TreeSelect',
      model: 'dataScopeDeptIds',
      label: '数据权限',
      hidden: true,
      options: {
        value: [],
        allowClear: true,
        allowSearch: true,
        treeCheckable: true,
        treeCheckedStrategy: 'child',
        options: [],
        fieldNames: {
          key: 'id',
          title: 'name'
        },
        filterTreeNode: (searchKey: string, nodeItem: any) => {
          return nodeItem.name ? nodeItem.name.indexOf(searchKey) > -1 : false
        }
      }
    }
  ]
})
