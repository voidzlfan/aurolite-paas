import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, history } from 'umi';
import ProCard, { StatisticCard } from '@ant-design/pro-card';

import { EditOutlined } from '@ant-design/icons';

import styles from './index.less';

const { Statistic, Divider } = StatisticCard;

const tabs = [
  { key: 'all', tab: '全部' },
  { key: 'online', tab: '在线' },
  { key: 'offline', tab: '离线' },
  { key: 'exception', tab: '异常' },
];

const Project = (props) => {
  const { dispatch, projects, submitting } = props;
  // console.log('props', props);
  // console.log(props.projects);
  //console.log('submitting',submitting);

  const [tab, setTab] = useState('all');

  useEffect(() => {
    dispatch({
      type: 'project/fetchProject',
      payload: { status: 'all' },
    });
  }, []);

  const projectItem = projects.map((item) => (
    <StatisticCard.Group
      bordered
      key={item.projectId}
      className={styles.project}
      //onClick={() => history.push('accountManage')} 跳转项目页
      //layout='center'
    >
      <StatisticCard
        statistic={{
          title: item.projectName,
          value: item.subProjectTitle,
        }}
      />
      <Divider />

      <StatisticCard
        statistic={{
          title: '设备总数',
          value: item.totalDevices,
        }}
      />
      <StatisticCard
        statistic={{
          title: '在线',
          value: item.online,
        }}
      />
      <StatisticCard
        statistic={{
          title: '离线',
          value: item.offline,
        }}
      />
      <StatisticCard
        statistic={{
          title: '异常',
          value: item.exception,
        }}
      />
      {/* <StatisticCard
        //bordered
        //layout='center'
        statistic={{
          // title: '异常',
          // value: item.exception,
          value: '',
          icon: <EditOutlined />,
        }}
      /> */}

      <StatisticCard title={<EditOutlined style={{marginTop: '32px'}}/>}>

      </StatisticCard>

    </StatisticCard.Group>
  ));

  return (
    <PageContainer subTitle="2021-03-23 星期二 欢迎进入奥莱paas平台">
      <ProCard
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
    </PageContainer>
  );
};

export default connect(({ project, loading }) => ({
  projects: project.projects,
  submitting: loading.effects['project/fetchProject'],
}))(Project);
