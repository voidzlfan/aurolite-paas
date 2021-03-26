import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  DrawerForm,
  ProFormColorPicker,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { Form, Popconfirm, Button, Card, message, Popover, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'umi';

import styles from './index.less';
import { getAccList, delAccount } from '@/services/account';

import CreateForm from './components/CreateForm';
import ProjectList from './components/Project';

/**
 * 账号管理
 * 功能：管理当前账号权限下所有子账号，CRUD
 */
const Account = (props) => {
  console.log('props', props);
  const { accountList, dispatch } = props;
  //console.log('accountList', accountList);

  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [projectPermissions, setProjectPermissions] = useState(false);

  const [acc, setAcc] = useState({});

  const [form] = Form.useForm();

  const onSetting = (text, record, _, action) => {
    setAcc(record);
    handleUpdateModalVisible(true);
  };

  const onConfirm = async (text, record, _, action) => {
    console.log('text', text);
    console.log('record', record);
    console.log('action', action);
    const res = await delAccount();
    if (res) {
      action.reload();
    }
  };

  //模拟项目数据
  let projectList = [1, 2, 3, 4, 5, 6];
  const allProjectList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const content = allProjectList.map((item) => {
    return (
      <div key={item} className={styles.projectMan}>
        <span>{item}</span>
        <PlusOutlined
          onClick={(item) => {
            console.log('add');
            //dispatch
          }}
        />
      </div>
    );
  });

  const columns = [
    {
      dataIndex: 'id',
      //valueType: 'indexBorder',
      //width: 48,
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {
        hidden: true,
      },
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
      //order: 1,
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
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'date',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
        hidden: true,
      },
    },
    {
      title: '角色类型',
      dataIndex: 'role',
      filters: true,
      onFilter: true,
      //order: 2,

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
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            //action.startEditable?.(record.id);
            onSetting(text, record, _, action);
          }}
        >
          设置
        </a>,
        <Popconfirm
          key="popconfirm"
          title={`您确定删除该子账号吗?`}
          okText="是"
          cancelText="否"
          onConfirm={() => onConfirm(text, record, _, action)}
        >
          <a>删除</a>
        </Popconfirm>,
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
          title={() => (
            <Button type="primary" onClick={handleModalVisible}>
              + 新增子账号
            </Button>
          )}
          formRef={form}
          rowKey="id"
          columns={columns}
          params={{ pageSize: 10 }}
          request={async (params) => {
            console.log('params', params);
            const response = await getAccList(params);
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
          pagination={{ pageSize: 10 }}
          size="large"
          //search={false}
          // renderFormItem={(
          //   item,
          //   { type, defaultRender, formItemProps, fieldProps, ...rest },
          //   form,
          // ) => {
          //   if (type === 'form') {
          //     return null;
          //   }
          //   const status = form.getFieldValue('account');
          //   console.log('status', status);
          //   if (status !== 'open') {
          //     return <Input {...fieldProps} placeholder="请输入account" />;
          //   }
          //   return defaultRender(_);
          // }}
        />
      </ProCard>

      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            // const success = await handleAdd(value);

            // if (success) {
            //   handleModalVisible(false);

            //   if (actionRef.current) {
            //     actionRef.current.reload();
            //   }
            // }
            console.log('value', value);
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>

      <DrawerForm
        onVisibleChange={handleUpdateModalVisible}
        width={400}
        title={'权限设置：' + acc.account}
        visible={updateModalVisible}
        onFinish={async () => {
          //acc存储当前记录信息
          handleUpdateModalVisible(false);
          message.success('设置成功');
          return true;
        }}
        drawerProps={{
          destroyOnClose: true,
        }}
      >

          <ProFormText
            span={24}
            name="name"
            label="名称"
            //tooltip="最长为 24 位"
            placeholder="请输入名称"
            initialValue={acc.name}
            formItemProps={{
              rules: [
                {
                  required: true,
                  message: '内容不能为空',
                },
              ],
            }}
          />



          <ProFormSelect
            options={[
              {
                value: 'user',
                label: '使用者',
              },
              {
                value: 'manager',
                label: '项目管理员',
              },
              {
                value: 'accendant',
                label: '维修人员',
              },
            ]}
            span={24}
            //width="md"
            name="role"
            label="角色类型"
            initialValue={acc.role}
            required={true}
            allowClear={false}
          />



          <Row>
            <Col span={12}>
              <Card
                title={<div className={styles.cardTitle}>项目权限</div>}
                extra={
                  <Popover content={content} trigger="click" placement="right">
                    <Button type="link">添加</Button>
                  </Popover>
                }
                //style={{ width: 330 }}
              >
                {projectList.map((item) => {
                  return (
                    
                    <div key={item} className={styles.projectMan}>
                      <span>{item}</span>
                      <DeleteOutlined onClick={() => console.log('delete')} />
                    </div>
                  );
                })}
              </Card>
            </Col>
          </Row>

      </DrawerForm>
    </PageContainer>
  );
};

export default connect(({ account }) => {
  const { accountList } = account;
  //console.log(accountList);
  return { accountList };
})(Account);
