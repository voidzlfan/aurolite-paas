//模拟数据库数据
const data = [
  {
    id: 123456,
    name: '范志林1',
    account: 17875305743,
    role: 'manager',
    created_at: '2020-05-26T02:13:47Z',
    updated_at: '2020-05-26T02:13:47Z',
    closed_at: null,
    author_association: 'NONE',
  },
  {
    id: 1234567,
    name: '范志林2',
    account: 17875305743,
    role: 'manager',
    created_at: '2020-05-26T02:13:47Z',
    updated_at: '2020-05-26T02:13:47Z',
    closed_at: null,
    author_association: 'NONE',
  },
  {
    id: 12345167,
    name: '范志林3',
    account: 17875305743,
    role: 'manager',
    created_at: '2020-05-26T02:13:47Z',
    updated_at: '2020-05-26T02:13:47Z',
    closed_at: null,
    author_association: 'NONE',
  },
  {
    id: 12344567,
    name: '范志林4',
    account: 17875305743,
    role: 'manager',
    created_at: '2020-05-26T02:13:47Z',
    updated_at: '2020-05-26T02:13:47Z',
    closed_at: null,
    author_association: 'NONE',
  },
];

export default {
  'GET /api/account/search': {data: data[1]},

  'GET /api/account/getAccList': {
    data,
  },
};
