export default {
  
  'POST /api/getProjectMenu': {
    code: 0,
    message: 'response successful',
    data: [
      {
        path: '/room/manage',
        name: 'room',
        icon: 'partition',
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
        icon: 'setting',
        component: './Welcome',
      },
      {
        path: '/systemSetting',
        name: 'systemSetting',
        icon: 'scheduled',
        component: './Welcome',
      },
      {
        path: '/system',
        name: 'system',
        icon: 'setting',
        component: './Welcome',
      },
      {
        path: '/deviceMonitor',
        name: 'deviceMonitor',
        icon: 'securityScan',
        component: './Welcome',
      },
    ],
  },
};
