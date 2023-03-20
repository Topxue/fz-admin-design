/**
 * 租户列表
 */
export const tenantListColumns = [
  {
    title: '租户编号',
    align: 'center',
    dataIndex: 'id',
    slotName: 'id'
  },
  {
    title: '租户名',
    align: 'center',
    dataIndex: 'name',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入租户名'
      }
    }
  },
  {
    title: '租户套餐',
    align: 'center',
    dataIndex: 'systemTenant',
    slotName: 'systemTenant'
  },
  {
    title: '联系人',
    align: 'center',
    dataIndex: 'contactName',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入联系人'
      }
    }
  },
  {
    title: '联系手机',
    align: 'center',
    dataIndex: 'contactMobile',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入联系手机'
      }
    }
  },
  {
    title: '账号额度',
    align: 'center',
    dataIndex: 'accountCount',
    slotName: 'accountCount'
  },
  {
    title: '过期时间',
    align: 'center',
    dataIndex: 'expireTime'
  },
  {
    title: '绑定域名',
    align: 'center',
    dataIndex: 'domain',
    slotName: 'domain'
  },
  {
    title: '租户状态',
    align: 'center',
    dataIndex: 'status',
    slotName: 'status',
    searchOptions: {
      type: 'Select',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请选择租户状态',
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
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    searchOptions: {
      type: 'RangePicker',
      col: { span: 8 },
      options: {
        value: [],
        allowClear: true
      }
    }
  },
  {
    title: '操作',
    align: 'center',
    slotName: 'optional'
  }
]

/**
 * 租户套餐
 */
export const tenantMealColumns = [
  {
    title: '套餐编号',
    dataIndex: 'id',
    align: 'center',
    slotName: 'id'
  },
  {
    title: '套餐名称',
    dataIndex: 'name',
    align: 'center',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入套餐名称'
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    slotName: 'status',
    searchOptions: {
      type: 'Select',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请选择套餐状态',
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
    title: '备注',
    dataIndex: 'remark',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    searchOptions: {
      type: 'RangePicker',
      col: { span: 8 },
      options: {
        value: []
      }
    }
  },
  {
    title: '操作',
    align: 'center',
    slotName: 'optional'
  }
]
