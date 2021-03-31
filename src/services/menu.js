import request from '@/utils/request';

export async function getProjectMenuData() {
  return request('/api/getProjectMenu', {
    method: 'POST',
  });
}
