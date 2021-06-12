import request from '@/utils/request'

export function getTableList(params) {
  return request({
    // url: '/vue-admin-template/table/',
    url: 'http://39.105.24.214/table/ShowTables',
    method: 'get',
    params
  })
}

export function createTable(params) {
  return request({
    // url: '/vue-admin-template/table/',
    url: 'http://39.105.24.214/table/CreateTable',
    method: 'post',
    params
  })
}

export function deleteTable(params) {
  return request({
    url: 'http://39.105.24.214/table/CreateTable',
    method: 'get',
    params
  })
}
