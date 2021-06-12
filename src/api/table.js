import request from '@/utils/request'

export function getTableList(params) {
  return request({
    url: '/vue-admin-template/table/',
    // url: 'http://39.105.24.214/ShowTables',
    method: 'get',
    params
  })
}
