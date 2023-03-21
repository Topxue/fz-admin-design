// 操作日志
export const operateColumns = [
  {
    width: 200,
    title: '日志编号',
    dataIndex: 'id',
    align: 'center',
    slotName: 'id'
  },
  {
    title: '操作模块',
    dataIndex: 'module',
    align: 'center',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '操作名',
    dataIndex: 'name',
    align: 'center'
  },
  // {
  //   title: '操作类型',
  //   dataIndex: 'type',
  //   align: 'center',
  //   slotName: 'type'
  // },
  {
    title: '操作人',
    dataIndex: 'userNickname',
    align: 'center',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        placeholder: '请输入操作人'
      }
    }
  },
  {
    title: '操作结果',
    dataIndex: 'resultCode',
    align: 'center',
    slotName: 'resultCode'
  },
  {
    title: '操作结果',
    dataIndex: 'success',
    hidden: true,
    searchOptions: {
      type: 'Select',
      col: { span: 8 },
      options: {
        value: '',
        placeholder: '请选择操作结果',
        options: [
          {
            label: '成功',
            value: 'true'
          },
          {
            label: '失败',
            value: 'false'
          }
        ]
      }
    }
  },
  {
    title: '操作日期',
    dataIndex: 'startTime',
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
    title: '执行时长',
    dataIndex: 'duration',
    align: 'center',
    slotName: 'duration'
  },
  {
    title: '操作',
    slotName: 'optional',
    align: 'center'
  }
]

// 登录日志
export const loginLogerColumns = [
  {
    title: '日志编号',
    dataIndex: 'id',
    align: 'center',
    slotName: 'id'
  },
  // {
  //   title: '用户编号',
  //   dataIndex: 'userId',
  //   align: 'center'
  // },
  {
    title: '用户IP',
    dataIndex: 'userIp',
    align: 'center',
    slotName: 'userIp'
  },
  {
    title: '用户账号',
    dataIndex: 'username',
    align: 'center'
  },
  {
    title: '登录结果',
    dataIndex: 'result',
    align: 'center',
    slotName: 'result'
  },
  {
    title: '链路追踪编号',
    dataIndex: 'traceId',
    align: 'center'
  },
  {
    title: '登录时间',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '操作',
    slotName: 'optional',
    align: 'center'
  }
]
