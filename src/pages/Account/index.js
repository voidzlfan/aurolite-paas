import React, { Component } from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { Button, Tag, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import request from '../../utils/request';

import './index.less';

const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: '姓名',
    key: 'name',
    dataIndex: 'name',
    //copyable: true,
    hideInSearch: true,
    ellipsis: true,
    //tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '账号',
    key: 'account',
    dataIndex: 'account',
    copyable: true,
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '角色类型',
    dataIndex: 'role',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: {
        text: '全部',
        //status: 'Default'
      },
      user: {
        text: '使用者',
        //status: 'Error',
      },
      admin: {
        text: '项目管理员',
        //status: 'Success',
      },
      accendant: {
        text: '维修人员',
        //status: 'Processing',
      },
    },
  },

  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        设置
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        删除
      </a>,
      //   <TableDropdown
      //     key="actionGroup"
      //     onSelect={() => action.reload()}
      //     menus={[
      //       { key: 'copy', name: '复制' },
      //       { key: 'delete', name: '删除' },
      //     ]}
      //   />,
    ],
  },
];

const res = {
  data: [
    {
      id: 624556297,
      name: '谢学高',
      account: 13632320650,
      labels: [{ name: 'bug', color: 'error' }],
      role: 'admin',
      locked: false,
      comments: 0,
      created_at: '2020-05-26T02:13:47Z',
      updated_at: '2020-05-26T02:13:47Z',
      closed_at: null,
      author_association: 'NONE',
      user: 'chenshuai2144',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
  ],
  page: 1,
  success: true,
  total: 20,
};

export default () => {
  return (
    <ProTable
      search={{layout: 'inline'}} //这两个设置不起作用
      form={{layout: 'inline'}} //这两个设置不起作用
      className="protable"
      rowKey="id"
      columns={columns}
      request={(params = {}) => res}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="成员管理"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    ></ProTable>
  );
};
