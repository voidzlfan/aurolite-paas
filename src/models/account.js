import { getAccountList } from '@/services/account';
const accountModel = {
  namespace: 'account',
  state: {
    accountList: [], //所有的账号,包含该账号下项目权限的数组
    projectList: [], //所有的项目数
  },
  effects: {
    *search({ payload, type }, { call, put }) {
        console.log('payload',payload);
        console.log('type',type);
        const response = yield call(getAccountList,payload);
        console.log('model deal response',response.data);
        yield put({
            type: 'showAccountList',
            payload: response.data,
        })
      },
  },
  reducers: {
    showAccountList(state, action) {
    //   console.log('state',state);
      return {
        ...state,
        accountList: action.payload || [],
      };
    },
  },
};
export default accountModel;
