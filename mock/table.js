const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    title: '@sentence(10)',
    'status|1': ['连接', '已连接', '重试'],
    display_time: '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
