import request from '@/utils/request';

export async function getMenuData() {
  return request('/api/getMenu', {
    method: 'POST',
  });
}

export async function getProjectMenuData() {
  return request('/api/getProjectMenu', {
    method: 'POST',
  });
}
