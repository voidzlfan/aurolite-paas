import { getProjects } from '@/services/project';
const projectModel = {
  namespace: 'project',
  state: {
    projects: [], //项目数
  },
  effects: {
    *fetchProject(_, { call, put }) {
        console.log('model')
      const response = yield call(getProjects);
      yield put({
        type: 'getProjects',
        payload: response,
      });
    },
  },
  reducers: {
    getProjects(state, action) {
      console.log('reducer');
      console.log('state',state);
      return {
        ...state,
        projects: action.payload || [],
      };
    },
  },
};
export default projectModel;
