import { getProjects } from '@/services/project';
const projectModel = {
  namespace: 'project',
  state: {
    projects: [], //项目数
  },
  effects: {
    *fetchProject({ type, payload }, { call, put }) {
      //console.log('model')
      let response;
      // console.log('payload',payload);
      if (payload === undefined || payload.length === 0) {
        response = yield call(getProjects);
      } else {
        response = yield call(getProjects, payload);
      }
      //console.log('response',response);
      yield put({
        type: 'getProjects',
        payload: response,
      });
    },
  },
  reducers: {
    getProjects(state, action) {
      // console.log('reducer');
      // console.log('state', state);
      return {
        ...state,
        projects: action.payload || [],
      };
    },
  },
};
export default projectModel;
