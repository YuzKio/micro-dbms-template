import request from '@/utils/request'

export function getList(params) {
  return request({
    // url: '/vue-admin-template/table/list',
    url: 'http://39.105.24.214/database/ShowDatabases',
    method: 'get',
    params
  })
}

export function create(params) {
  return request({
    url: 'http://39.105.24.214/database/CreateDatabase',
    method: 'get',
    params
  })
}

export function connect(params) {
  return request({
    url: 'http://39.105.24.214/database/UseDatabase',
    method: 'get',
    params
  })
}

export function drop(params) {
  return request({
    url: 'http://39.105.24.214/database/DropDatabase',
    method: 'get',
    params
  })
}
