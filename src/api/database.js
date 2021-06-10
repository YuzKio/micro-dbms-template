import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    // url: 'http://39.105.24.214/Query?query=show database;',
    method: 'get',
    params
  })
}
