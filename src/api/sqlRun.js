import request from '@/utils/request'

export function runSql(params) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://39.105.24.214/crud/RunQueries',
    method: 'post',
    params
  })
}
