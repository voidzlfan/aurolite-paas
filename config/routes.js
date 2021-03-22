export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/project',
              },
              {
                path: '/project',
                name: 'project',
                icon: 'project',
                component: './Project',
              },
              {
                path: '/account',
                name: 'account.manage',
                icon: 'user',
                component: './Account',
              },
              // {
              //   path: '/list',
              //   name: 'list.table-list',
              //   icon: 'table',
              //   component: './TableList',
              // },
              //以下两项为自定义菜单
              // {
              //   path: '/project',
              //   name: 'project',
              //   icon: 'project',
              //   component: './Project',
              // },
              // {
              //   path: '/account',
              //   name: 'account.manage',
              //   icon: 'user',
              //   component: './Project',
              // },
              //---------
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
