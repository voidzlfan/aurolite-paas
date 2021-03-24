import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import { Card, Button, Form, Input, Space, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'umi';

const { Option } = Select;

import styles from './index.less';
import { getAccList } from '@/services/account';

/**
 * 账号管理
 * 功能：管理当前账号权限下所有子账号，CRUD
 */
const Account = (props) => {
  console.log('props', props);
  const { accountList, dispatch } = props;

  const [form] = Form.useForm();

  const layout = {
    //labelCol: { span: 8 },
    wrapperCol: { span: 18 },
  };

  // dispatch，发起查询
  const onFinish = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: 'account/search',
        payload: { ...values },
      });
    });
  };

  const search = (
    <Form form={form} {...layout} layout="inline" onFinish={onFinish}>
      <Form.Item label="角色类型" name="role">
        <Select placeholder="请选择角色类型" style={{ width: 200 }} allowClear>
          <Option value="user">使用者</Option>
          <Option value="manager">项目管理员</Option>
          <Option value="accendant">维修人员</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="账号"
        name="account"
        rules={[
          {
            pattern: /^[0-9-]+$/,
            message: '请输入数字',
          },
          { max: 11, message: '最长11位' },
        ]}
      >
        <Input placeholder="请输入要搜索的账号" style={{ width: 200 }} allowClear />
      </Form.Item>
      <Space>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button htmlType="reset">重置</Button>
      </Space>
    </Form>
  );

  const columns = [
    {
      dataIndex: 'id',
      //valueType: 'indexBorder',
      //width: 48,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '姓名',
      key: 'name',
      dataIndex: 'name',
      //copyable: true,
      //hideInSearch: true,
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
      order: 1,
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
      order: 2,

      valueType: 'select',
      valueEnum: {
        user: {
          text: '使用者',
          //status: 'Error',
        },
        manager: {
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

  const addAccount = () => {};


  return (
    <PageContainer>
      {/* <ProCard>{search}</ProCard> */}

      {/* <ProCard ghost style={{ marginTop: 20, marginBottom: 20 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={addAccount}>
          新增子账号
        </Button>
      </ProCard> */}

      <ProCard ghost>
        <ProTable
          formRef={form}
          rowKey="id"
          columns={columns}
          params={{ pageSize: 10 }}
          request={async (params) => {
            const response = await getAccList({
              page: params.current,
              pageSize: params.pageSize,
            });
            return {
              data: response.data,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: true,
              // 不传会使用 data 的长度，如果是分页一定要传
              //total: number,
            };
          }}
          sticky={true}
          toolBarRender={false}
          search={{ layout: 'vertical' }}
          pagination={{  pageSize: 10 }}
          size="large"
        />
      </ProCard>
    </PageContainer>
  );
};

export default connect(({ account }) => {
  const { accountList } = account;
  //console.log(accountList);
  return { accountList };
})(Account);
