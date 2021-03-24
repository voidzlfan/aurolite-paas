import request from '@/utils/request';
export async function getAccountList(params = {}) {
  console.log('services receive params', params);
  return request(`/api/account/search?role=${params.role}&account=${params.account}`);
}

export async function getAccList(params) {
  console.log('services params',params);
  return request(`/api/account/getAccList?page=${params.page}&pageSize=${params.pageSize}`);
}


export async function delAccount(params) {
    console.log('services params',params);
    return request(`/api/account/del`);
  }
  
