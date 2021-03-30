export default {
  'POST /api/getMenu': {
    code: 0,
    message: 'response successful',
    data: [
      {
        path: '/',
        redirect: '/projectManage',
      },
      {
        path: '/projectManage',
        name: 'project',
        icon: 'project',
        component: './Project',
      },
      {
        path: '/accountManage',
        name: 'account.manage',
        icon: 'user',
        component: './Account',
      },
      {
        component: './404',
      },
    ],
  },

  'POST /api/getProjectMenu': {
    code: 0,
    message: 'response successful',
    data: [
      {
        path: '/',
        redirect: '/deviceMonitor',
      },
      {
        path: '/room',
        name: 'room',
        icon: 'partition',
        // routes: [
        //   {
        //     path: '/room/manage/setting',
        //     name: 'setting',
        //     component: './Welcome',
        //   },
        // ],
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
