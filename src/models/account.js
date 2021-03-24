import { getAccountList } from '@/services/account';
const accountModel = {
  namespace: 'account',
  state: {
    accountList: [],
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
