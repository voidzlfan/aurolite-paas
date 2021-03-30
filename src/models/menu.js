import { getMenuData, getProjectMenuData } from '@/services/menu';
const menuModel = {
  namespace: 'menu',
  state: {
    menuData: [],
    loading: true,
  },
  effects: {
    *fetchMenu(_, { call, put }) {
      const response = yield call(getMenuData);
      yield put({
        type: 'saveMenuData',
        payload: response.data,
      });
    },

    *fetchProjectMenu(_, { call, put }) {
      const response = yield call(getProjectMenuData);
      yield put({
        type: 'saveMenuData',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveMenuData(state, action) {
      return {
        ...state,
        menuData: action.payload || [],
        loading: false,
      };
    },
  },
};
export default menuModel;
