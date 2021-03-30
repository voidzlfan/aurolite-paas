import {
  PartitionOutlined,
  SettingOutlined,
  ScheduleOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';

export default {

  routes: [
    {
      path: '/room/manage',
      name: 'room',
      icon: <PartitionOutlined />,
      routes: [
        {
          path: '/room/manage/setting',
          name: 'setting',
          component: './Welcome',
        },
      ],
    },
    {
      path: '/device/manage',
      name: 'device',
      icon: <SettingOutlined />,
      component: './Welcome',
    },
    {
      path: '/systemSetting',
      name: 'systemSetting',
      icon: <ScheduleOutlined />,
      component: './Welcome',
    },
    {
      path: '/system',
      name: 'system',
      icon: <SettingOutlined />,
      component: './Welcome',
    },
    {
      path: '/deviceMonitor',
      name: 'deviceMonitor',
      icon: <SecurityScanOutlined />,
      component: './Welcome',
    },
  ],
};
