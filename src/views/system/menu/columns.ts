export const columns = [
  {
    title: '菜单名称',
    dataIndex: 'meta.title',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入菜单名称'
      }
    }
  },
  {
    title: '图标',
    dataIndex: 'meta.icon',
    slotName: 'icon',
    align: 'center'
  },
  {
    title: '权限标识',
    dataIndex: 'meta.permission',
    slotName: 'permission',
    align: 'center'
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    align: 'center',
    slotName: 'path'
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'meta.status',
    slotName: 'status',
    searchOptions: {
      type: 'Select',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '菜单状态',
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
    }
  },
  {
    title: '权重',
    align: 'center',
    dataIndex: 'sort',
    slotName: 'sort'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    align: 'center',
    slotName: 'optional'
  }
]
