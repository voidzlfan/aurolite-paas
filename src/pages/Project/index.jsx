import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history, Link } from 'umi';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import ProForm, { ModalForm, ProFormText, ProFormSelect, DrawerForm } from '@ant-design/pro-form';
import { Alert, Button, Card } from 'antd';

import { EditOutlined } from '@ant-design/icons';

import styles from './index.less';
import Ribbon from 'antd/lib/badge/Ribbon';

import { DEVICE_ALL, DEVICE_OFF_LINE, DEVICE_EXCEPTION } from '../../utils/constant';
import { setCookie } from '../../utils/cookie';

const { Statistic, Divider } = StatisticCard;

const tabs = [
  { key: 'all', tab: '全部' },
  { key: 'online', tab: '在线' },
  { key: 'offline', tab: '离线' },
  { key: 'exception', tab: '异常' },
];

const staticCardValueStyle = {
  marginTop: -10,
  fontSize: 18,
  fontWeight: 700,
  marginBottom: 8,
  color: '#333',
};

const imgStyle = {
  display: 'block',
  width: 42,
  height: 42,
};

/**
 * 项目管理
 * 根据设备（全部、在线、离线、异常）显示项目列表，修改项目信息
 */
const Project = (props) => {
  const { dispatch, projects } = props;
  // console.log('props', props);
  // console.log(props.projects);

  //当前选中tab
  const [tab, setTab] = useState('all');
  //选中项目信息
  const [project, setProject] = useState({});
  //DrawerForm开关
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);

  //编辑项目按钮回调
  const edit = (e, project) => {
    //console.log('project',project);
    //console.log(e);

    //e.stopPropagation(); //阻止向父级穿透click事件
    setProject(project);
    handleUpdateModalVisible(true);
  };

  //请求所有项目列表
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'project/fetchProject',
        payload: { status: 'all' },
      });
    }
  }, []);

  //tabs切换栏
  const projectItem = projects.map((item) => (
    <StatisticCard.Group bordered key={item.projectId} className={styles.project}>
      <StatisticCard
        className={styles.staticCardTitle}
        statistic={{
          title: (
            <p className={styles.projectLogo}>
              <img
                src="https://static1.tuyacn.com/static/illuminate/_next/static/img/a742e891b53b80993e8e45d6009faf97.png"
                alt=""
              />
            </p>
          ),
          value: item.projectName,
          valueStyle: staticCardValueStyle,
          description: (
            <div className={styles.description}>
              <div>{item.address}</div>
              <div>2021年3月31日</div>
            </div>
          ),
        }}
      />

      <Divider style={{ marginLeft: 50 }} />

      <StatisticCard
        className={styles.projectItem}
        onClick={() => {
          history.push('deviceMonitor');
          setCookie('projectId', item.projectId, 1);
          setCookie('deviceStatus',DEVICE_ALL,1);
        }}
        statistic={{
          //description: item.totalDevices,
          title: '设备总数',
          value: item.totalDevices,
          valueStyle: { color: '#6A9DFF' },
          icon: (
            <img
              style={imgStyle}
              src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
              alt="icon"
            />
          ),
        }}
      />

      {/* <StatisticCard
        className={styles.projectItem}
        statistic={{
          title: '在线>',
          value: item.online,
          valueStyle: { color: '#58B784' },
          icon: (
            <img
              style={imgStyle}
              src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
              alt="icon"
            />
          ),
        }}
      /> */}

      <StatisticCard
        className={styles.projectItem}
        onClick={() => {
          history.push('deviceMonitor');
          setCookie('projectId', item.projectId, 1);
          setCookie('deviceStatus',DEVICE_OFF_LINE,1);
        }}
        statistic={{
          title: '离线>',
          value: item.offline,
          valueStyle: { color: '#F69736' },
          icon: (
            <img
              style={imgStyle}
              src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
              alt="icon"
            />
          ),
        }}
      />

      <StatisticCard
        className={styles.projectItem}
        onClick={() => {
          history.push('deviceMonitor');
          setCookie('projectId', item.projectId, 1);
          setCookie('deviceStatus',DEVICE_EXCEPTION,1);
        }}
        statistic={{
          title: '异常>',
          value: item.exception,
          valueStyle: { color: '#E9767D' },
          icon: (
            <img
              style={imgStyle}
              src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
              alt="icon"
            />
          ),
        }}
      />

      <StatisticCard
        title={
          <EditOutlined
            onClick={(e) => edit(e, item)}
            style={{ marginTop: '32px', pointerEvents: 'auto' }}
          />
        }
      ></StatisticCard>
    </StatisticCard.Group>
  ));

  //渲染弹出框，修改项目信息
  const renderDrawerForm = (
    <DrawerForm
      initialValues={{
        projectName: project.projectName,
        leaderName: project.leaderName,
        leaderMobile: project.leaderMobile,
        address: project.address,
      }}
      onVisibleChange={handleUpdateModalVisible}
      width={500}
      title={'编辑项目'}
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
        name="projectName"
        label="项目名称"
        //tooltip="最长为 24 位"
        placeholder="请输入项目名称"
        //initialValue={project.projectName}
        formItemProps={{
          rules: [
            {
              required: true,
              message: '内容不能为空',
            },
          ],
        }}
      />

      <ProFormText
        span={24}
        name="leaderName"
        label="负责人"
        //tooltip="最长为 24 位"
        placeholder="请输入负责人"
        //initialValue={project.leaderName}
        formItemProps={{
          rules: [
            {
              required: true,
              message: '内容不能为空',
            },
          ],
        }}
      />

      <ProFormText
        span={24}
        name="leaderMobile"
        label="联系方式"
        //tooltip="最长为 24 位"
        placeholder="请输入手机号"
        //initialValue={project.leaderMobile}
        formItemProps={{
          rules: [
            {
              required: true,
              message: '内容不能为空',
            },
          ],
        }}
      />

      <ProFormText
        span={24}
        name="address"
        label="项目地址"
        //tooltip="最长为 24 位"
        placeholder="请输入地址"
        //initialValue={project.address}
        formItemProps={{
          rules: [
            {
              required: true,
              message: '内容不能为空',
            },
          ],
        }}
      />
    </DrawerForm>
  );

  return (
    <PageContainer subTitle="2021-03-23 星期二 欢迎进入奥莱paas平台">
      <Alert
        message="Error Text"
        description="Error Description Error Description Error Description Error Description Error Description Error Description"
        type="info"
        closable
        //  onClose={onClose}
      />
      <ProCard
        className={styles.proCard}
        tabs={{
          activeKey: tab,
          tabPosition: 'top',
          //切换tab dispatch，发起请求
          onChange: (key) => {
            setTab(key);
            dispatch({
              type: 'project/fetchProject',
              payload: { status: key },
            });
          },
          //tabBarGutter: 20,
          //tabBarStyle: {marginLeft: 50}
        }}
        //loading={submitting}
      >
        {tabs.map((item) => (
          <ProCard.TabPane
            key={item.key}
            tab={<span className={styles.tabName}>{item.tab}</span>}
            bordered
          >
            {projectItem}
          </ProCard.TabPane>
        ))}
      </ProCard>
      {renderDrawerForm}
    </PageContainer>
  );
};

export default connect(({ project, loading }) => ({
  projects: project.projects,
  //submitting: loading.effects['project/fetchProject'],
}))(Project);
