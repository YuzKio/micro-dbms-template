<template>
  <div class="detail-container">
    <el-tabs type="border-card">
      <el-tab-pane label="测试">
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="250">
          <el-table-column
            fixed
            prop="date"
            label="日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="300">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="动态表格测试">
        <el-table
          :data="tables"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selectArInfo"
        >
          <el-table-column type="selection" width="45px"></el-table-column>
          <el-table-column label="序号" width="62px" type="index"></el-table-column>
          <template v-for="(col) in tableDatas">
            <el-table-column
              sortable
              :show-overflow-tooltip="true"
              :prop="col.dataItem"
              :label="col.dataName"
              :key="col.dataItem"
              width="124px">
            </el-table-column>
          </template>
          <el-table-column label="操作" width="80" align="center">
            <template>
              <el-button size="mini" class="del-com" @click="delTabColOne()" >
                <i class="iconfont icon-shanchu"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="测试">测试</el-tab-pane>
      <el-tab-pane label="测试">测试</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    selectArInfo(val) {
      this.selectArr = val
    }
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      tables: [{
        xiaoxue: '福兰',
        chuzhong: '加芳',
        gaozhong: '蒲庙',
        daxue: '西安',
        yanjiusheng: '西安',
        shangban: '北京'
      }, {
        xiaoxue: '南坊',
        chuzhong: '礼泉',
        gaozhong: '礼泉',
        daxue: '西安',
        yanjiusheng: '西安',
        shangban: '南坊'
      }, {
        xiaoxue: '马山',
        chuzhong: '加芳',
        gaozhong: '蒲庙',
        daxue: '西安',
        yanjiusheng: '重庆',
        shangban: '北京'
      }],
      tableDatas: [{
        dataItem: 'xiaoxue',
        dataName: '小学'
      }, {
        dataItem: 'chuzhong',
        dataName: '初中'
      }, {
        dataItem: 'gaozhong',
        dataName: '高中'
      }, {
        dataItem: 'daxue',
        dataName: '大学'
      }, {
        dataItem: 'yanjiusheng',
        dataName: '研究生'
      }, {
        dataItem: 'shangban',
        dataName: '上班'
      }]
    }
  }
}
</script>

<style scoped>

</style>
