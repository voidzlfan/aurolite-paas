import { getStructure } from './service';
const structureModel = {
  namespace: 'deviceMonitor',
  state: {
    treeData: [],
  },
  effects: {
    *fetchStructure(_, { call, put }) {
      const response = yield call(getStructure);
      yield put({
        type: 'saveStructure',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveStructure(state, action) {
      return {
        ...state,
        treeData: action.payload || [],
      };
    },
  },
};
export default structureModel;
