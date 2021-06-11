import request from '@/utils/request'

export function getTableList() {
  return request({
    url: '/vue-admin-template/table/',
    method: 'get'
  })
}
