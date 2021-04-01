import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Space, Image } from 'antd';
import { LayoutOutlined } from '@ant-design/icons';
import { connect } from 'umi';

import SearchTree from './components/SearchTree';
import styles from './index.less';

import noneImg from '../../assets/noneImg.png';

const DeviceMonitor = (props) => {
  const { dispatch, treeData } = props;
  const title = (
    <Space>
      <LayoutOutlined />
      区域结构
    </Space>
  );

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'deviceMonitor/fetchStructure'
      })
    }
  }, []);

  return (
    <PageContainer>
      <ProCard split="vertical" className={styles.cardContainer}>
        <ProCard
          title={title}
          extra={<a type="link" >刷新</a>}
          headerBordered
          colSpan={4}
          bordered
          //className={styles.leftContent}
        >
          <SearchTree treeData={treeData} />
        </ProCard>
        <ProCard bordered colSpan={20} layout="center" className={styles.rightContent}>
          {/* <div className={styles.noneImg}>
            <img src={noneImg} />
            <p>此区域未上传平面图</p>
          </div> */}
          <Image src={noneImg} width={600}/>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default connect(({ deviceMonitor }) => ({
  treeData: deviceMonitor.treeData,
}))(DeviceMonitor);
