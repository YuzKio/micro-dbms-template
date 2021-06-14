import request from '@/utils/request'

// params是已连接的数据库名
export function getTableDetail(params) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://39.105.24.214/crud/SelectAll',
    method: 'get',
    params
  })
}

export function deleteItem(params) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://39.105.24.214/crud/DeleteRecord',
    method: 'get',
    params
  })
}
