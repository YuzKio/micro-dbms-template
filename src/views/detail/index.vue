<template>
  <div class="detail-container">
    <el-tabs type="border-card">
      <el-tab-pane v-for="table in list" :key="table.name" :label="table.name">
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="table.data"
          style="width: 100%"
          max-height="250"
        >
          <el-table-column
            v-for="name in table.attrNum"
            :key="name"
            fixed
            :prop="name"
            :label="name"
            width="150"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, table.name)"
              >
                删除数据
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getTableDetailList, deleteItem } from '@/api/detail'

export default {
  name: 'Detail',
  data() {
    return {
      list: [{
        name: '表1',
        attrNum: ['date', 'name', 'province', 'city', 'address', 'zip'],
        data: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎2',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎3',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎4',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎5',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎6',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎7',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      },
      {
        name: '表2',
        attrNum: ['date', 'name', 'province', 'city', 'address'],
        data: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎2',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎3',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎4',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎5',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎6',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎7',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }],
      listLoading: false
    }
  },
  created() {
    // this.fetchTableDetailData()
  },
  methods: {
    fetchTableDetailData() {
      getTableDetailList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    deleteRow(table, index, rows) {
      deleteItem(table, index).then(response => {
        rows.splice(index, 1)
      })
    }
  }
}
</script>

<style scoped>

</style>
