<template>
  <div class="app-container container">
    <el-form ref="form" :model="form" label-width="60px" style="display: inline-block; width: 50%">
      <el-form-item>
        <el-input
          v-model="form.textarea"
          title="指令编写"
          type="textarea"
          :rows="19"
          placeholder="请输入sql语句"
          style="width: 450px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">运行</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
    <div class = "result">
      <div class = "showRes">
        {{status}}
      </div>
      <el-table
        v-if="showTable"
        v-loading="listLoading"
        :data="list.data"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        style="display: inline-block; max-width: 90%"
      >
        <el-table-column
          v-for="item in list.attrNum"
          :key="item"
          fixed
          align="center"
          :label="item"
          :prop="item"
          width="100"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { runSql } from '@/api/sqlRun'

export default {
  data() {
    return {
      form: {
        textarea: ''
        // reset: false
      },
      status: '更新成功',
      list: {
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
      showTable: true,
      listLoading: false
    }
  },
  methods: {
    onSubmit() {
      runSql(this.form.textarea).then(response => {
        this.status = response.data.message
        this.list = response.data.items
        if (this.list) { this.showTable = true }
      })
      this.$message('submit!')
    },
    onCancel() {
      this.form.textarea = ' '
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
el-form-item {
  padding-left: -20px;
}

.container{
  display: flex;
  justify-content: space-between;
}
.result{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width:100%;
  padding:0 20px;
  box-sizing:content-box;
}
.showRes{
  padding:20px 100px;
  background-color:lightskyblue;
}

</style>

