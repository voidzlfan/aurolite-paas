const treeData = [
  {
    title: '学校',
    key: '0-0',
    children: [
      {
        title: '教学楼',
        key: '0-0-0',
        //disabled: true,
        children: [
          {
            title: 'A栋',
            key: '0-0-0-0',
            children: [
              {
                title: '1楼',
                key: '1-563',
              },
              {
                title: '2楼楼',
                key: '1-123',
                exception: true,
              },
            ],
          },
          {
            title: 'B栋',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: '饭堂',
        key: '0-0-1',
        children: [
          {
            title: '1L',
            key: '0-0-1-0',
          },
        ],
      },

      {
        title: '体育馆',
        key: '0-sadsa1',
        children: [
          {
            title: '1L',
            key: '0-wqeq-1-0',
          },
        ],
      },
      {
        title: '音乐室',
        key: '0-e235rg1',
        children: [
          {
            title: '1L',
            key: '0adasd0',
          },
        ],
      },
    ],
  },
];

export default {
  'GET /api/structure': { data: treeData },
};
