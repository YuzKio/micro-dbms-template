const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    title: '@sentence(5)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/',
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
