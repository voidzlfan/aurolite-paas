import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { connect } from 'umi';
import { Card, Button, Form, Input, Space, Select, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const Account = (props) => {
  console.log(props);

  const { dispatch } = props;

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

  return (
    <PageContainer>
      <ProCard>
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
      </ProCard>

      <ProCard ghost style={{ marginTop: 20, marginBottom: 20 }}>
        <Button type="primary" icon={<PlusOutlined />}>
          新增子账号
        </Button>
      </ProCard>
      <ProCard ghost>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ showQuickJumper: true, pageSize: 1, showSizeChanger: true, }}
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
