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
              // {
              //   path: '/overview',
              //   name: 'project',
              //   children: [
              //     {
              //       path: '/overview/daily',
              //       name: 'project',
              //       children: null,
              //       authority: null,
              //     },
              //   ],
              //   authority: ['admin', 'user'],
              // },
              // {
              //   path: '/function',
              //   name: 'project',
              //   children: [
              //     {
              //       path: '/function/sign',
              //       name: 'project',
              //       children: null,
              //       authority: null,
              //     },
              //     {
              //       path: '/function/task',
              //       name: 'project',
              //       children: null,
              //       authority: ['admin'],
              //     },
              //     {
              //       path: '/function/pay',
              //       name: 'project',
              //       children: null,
              //       authority: ['admin'],
              //     },
              //   ],
              //   authority: null,
              // },


              {
                path: '/',
                redirect: '/projectManage',
              },
              {
                path: '/projectManage',
                name: 'project',
                component: './Project',
              },
              {
                path: '/accountManage',
                name: 'account.manage',
                component: './Account',
              },
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
