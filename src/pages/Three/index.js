import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Card } from 'antd';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>test</Card>
      </PageHeaderWrapper>
    );
  }
}

export default Test;
