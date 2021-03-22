import request from '@/utils/request';

export async function getMenuData() {
  return request('/api/account/get_menu', {
    method: 'POST',
  });
}
