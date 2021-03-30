import request from '@/utils/request';

export async function getProjects(params) {
  //console.log('services');
  return request(`/api/project?status=${params.status}`);
}
