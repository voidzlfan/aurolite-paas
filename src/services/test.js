import request from '@/utils/request';
export async function test(params) {
  return request('/api/zlfan', {
    method: 'GET',
    data: params,
  });
}

