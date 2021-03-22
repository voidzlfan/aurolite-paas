import React, { Component } from 'react';
import { PageContainer, PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { FormattedMessage, connect } from 'umi';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
const { Divider } = StatisticCard;

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    //this.props.location.pathname = '/project';
  };

  render() {
    //console.log("project",this.props);
    return (
      <PageContainer title="项目管理" subTitle="2021-03-22 星期一 欢迎进入商照管理平台">
        <ProCard
          tabs={{
            defaultActiveKey: '1',
          }}
        >
          <ProCard.TabPane key="1" tab={<div>全部</div>}>
            {/* <StatisticCard.Group bordered className='project'>
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
            </StatisticCard.Group> */}
            <Button onClick={() => this.handleClick}>切换路由</Button>
          </ProCard.TabPane>
          <ProCard.TabPane key="2" tab="离线">
            内容二
          </ProCard.TabPane>
          <ProCard.TabPane key="3" tab="异常">
            内容三
          </ProCard.TabPane>
        </ProCard>
      </PageContainer>
    );
  }
}

export default connect()(Project);
