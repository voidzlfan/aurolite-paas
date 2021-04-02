const treeData = [
  {
    title: '学校',
    key: '1',
    exception: true,
    children: [
      {
        title: '教学楼',
        key: '1-0',
        //disabled: true,
        children: [
          {
            title: 'A栋',
            key: '1-0-0',
            children: [
              {
                title: '1L',
                key: '1-0-0-0',
                children: [
                  {
                    title: 'room1',
                    key: '1-0-0-0-0',
                  }
                ]
              },
              {
                title: '2L',
                key: '1-0-0-1',
                
              },
            ],
          },
          {
            title: 'B栋',
            key: '1-0-1',
          },
        ],
      },
      {
        title: '饭堂',
        key: '1-1',
        children: [
          {
            title: '1L',
            key: '1-1-0',
          },
          {
            title: '2L',
            key: '1-1-1',
          },
        ],
      },

      {
        title: '体育馆',
        key: '1-2',
        children: [
          {
            title: '1L',
            key: '1-2-0',
          },
          {
            title: '2L',
            key: '1-2-1',
          },
          {
            title: '3L',
            key: '1-2-2',
          },
        ],
      },
      {
        title: '音乐室',
        key: '1-3',
        children: [
          {
            title: '1L',
            key: '1-3-0',
          },
          {
            title: '2L',
            key: '1-3-1',
          },
        ],
      },
    ],
  },
];

export default {
  'GET /api/structure': { data: treeData },
};
