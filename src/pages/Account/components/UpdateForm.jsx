import React, { Component } from 'react';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  DrawerForm,
} from '@ant-design/pro-form';

const UpdateForm = (props) => {
  return (
    <DrawerForm
      onVisibleChange={handleUpdateModalVisible}
      title={'权限设置：' + acc.account}
      visible={updateModalVisible}
      onFinish={async () => {
        message.success('提交成功');
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />

        <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
      </ProForm.Group>
    </DrawerForm>
  );
};

export default UpdateForm;
