import { CrownOutlined, LeftOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
export default {
    routes: [
      {
        path: '/admin/sub-page1',
        name: '一级页面',
        icon: <CrownOutlined />,
        component: './Welcome',
      },
      {
        path: '/admin/sub-page2',
        name: '二级页面',
        icon: <UserOutlined />,
        component: './Welcome',
      },
      {
        path: '/admin/sub-page3',
        name: '三级页面',
        icon: <SmileOutlined />,
        component: './Welcome',
      },
    ],
  };