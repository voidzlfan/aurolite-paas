import request from '@/utils/request';

export async function getProjects(params) {
  return request('/api/projects');
}
