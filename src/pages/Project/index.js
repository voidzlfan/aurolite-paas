import React, { Component, useEffect } from 'react';
import { PageContainer, PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage, connect } from 'umi';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { Button } from 'antd';

import './index.less';

const { Statistic, Divider } = StatisticCard;

const tabs = [
  { key: '1', title: '全部', value: 10, total: true },
  { key: '2', status: 'default', title: '在线', value: 5 },
  { key: '3', status: 'processing', title: '离线', value: 3 },
  { key: '4', status: 'error', title: '异常', value: 1 },
];

const renderProject = () => {
  return (
      <StatisticCard.Group bordered className="project" onClick={(values)=> console.log(values)}>
        <StatisticCard
          statistic={{
            title: '全部',
            tip: '帮助文字',
            value: 10,
          }}
        />
        <Divider />
        <StatisticCard
          statistic={{
            title: '未发布',
            value: 5,
            status: 'default',
          }}
        />
        <StatisticCard
          statistic={{
            title: '发布中',
            value: 3,
            status: 'processing',
          }}
        />
        <StatisticCard
          statistic={{
            title: '发布异常',
            value: 2,
            status: 'error',
          }}
        />
        <StatisticCard
          statistic={{
            title: '发布成功',
            value: '-',
            status: 'success',
          }}
        />
      </StatisticCard.Group>
  );
};

const Project = (props) => {
  const { dispatch } = props;
  console.log('props', props);
  console.log(props.projects);

  useEffect(() => {
    dispatch({
      type: 'project/fetchProject',
      //payload: { ...values, type },
    });
  }, []);

  return (
    <PageContainer subTitle="2021-03-23 星期二 欢迎进入奥莱paas平台">
      <ProCard
        tabs={{
          onChange: (key) => {
            console.log(key);
            console.log(props.projects);
          },
          size: 'large',
        }}
      >
        {tabs.map((item) => {
          return (
            <ProCard.TabPane
              key={item.key}
              tab={<div style={{ width: 100, textAlign: 'center' }}>{item.title}</div>}
            >
              {renderProject()}
            </ProCard.TabPane>
          );
        })}
      </ProCard>
    </PageContainer>
  );
};

export default connect(({ project }) => ({
  projects: project.projects,
}))(Project);
