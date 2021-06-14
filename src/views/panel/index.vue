<template>
  <div class="app-container container">
    <el-form ref="form" :model="form" label-width="60px" style="display: inline-block; width: 50%;">
      <el-form-item>
        <el-input
          v-model="form.textarea"
          title="指令编写"
          type="textarea"
          :rows="19"
          placeholder="请输入sql语句"
          style="width: 450px; margin:0 10px 0 -20px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">运行</el-button>
        <el-button @click="onCancel">重置</el-button>
        <span style="margin-left: 50px">当前连接数据库：{{ this.$store.getters.databaseName }}</span>
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
        max-height="420"
        style="display: inline-block; width: 100%;"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column
          v-for="item in list.attrName"
          :key="item"
          fixed
          align="center"
          :label="item"
          :prop="item"
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
      },
      status: '',
      list: {
        attrName: [],
        data: []
      },
      listLoading: false,
      showTable: false
    }
  },
  methods: {
    onSubmit() {
      const query = {
        db_name: `${this.$store.getters.databaseName}`,
        queries: (this.form.textarea).replace(/[\r\n]/g, '')
      }
      runSql(JSON.stringify(query)).then(response => {
        this.status = response.info
        this.list = response.data[0]
        this.showTable = !!this.list
        this.$message('submit!')
      })
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
  width:100%;
  margin: 0 20px;
  box-sizing:border-box;
  border: 1px solid #DCDFE6;
}
.showRes{
  /*padding:20px 100px;*/
  box-sizing: border-box;
  width: 100%;
  height: 8%;
  padding: 10px 20px;
  color: white;
  background-color:lightskyblue;
}

</style>

