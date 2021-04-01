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
          },
        ],
      },
      {
        path: '/device/manage',
        name: 'device',
        icon: 'device',
      },
      {
        path: '/systemSetting',
        name: 'systemSetting',
        icon: 'scheduled',
      },
      {
        path: '/system',
        name: 'system',
        icon: 'setting',
      },
      {
        path: '/deviceMonitor',
        name: 'deviceMonitor',
        icon: 'securityScan',
      },
    ],
  },
};
