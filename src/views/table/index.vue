<template>
  <div class="app-container">
<!--    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />-->
    <el-form :inline="true">
      <el-form-item style="float: right;">
        <el-button type="primary" @click="createTable()">创建数据表</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据表名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="元组长度" width="80">
        <template slot-scope="scope">
          {{ scope.row.tupleLen }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="属性数" width="80">
        <template slot-scope="scope">
          {{ scope.row.attrCount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="索引数" width="80">
        <template slot-scope="scope">
          {{ scope.row.indexCount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="记录数" width="80">
        <template slot-scope="scope">
          {{ scope.row.recordCount }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="220" align="center">
        <template>
          <el-button
            size="small"
          >
            查看
          </el-button>
        </template>
        <template>
          <el-button
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getTableList } from '@/api/table'
import { create } from '@/api/database'

export default {
  data() {
    return {
      filterText: '',
      tableData: null,
      listLoading: true
    }
  },
  created() {
    // if (!this.$store.getters.databaseName) {
    //   this.$message({
    //     type: 'error',
    //     message: '请先连接数据库！',
    //     showClose: true
    //   })
    //   this.$router.push('/database')
    // } else {
    //   this.fetchTableData()
    // }
    this.fetchTableData()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    // filterNode(value, data) {
    //   if (!value) return true
    //   return data.label.indexOf(value) !== -1
    // },
    fetchTableData() {
      this.listLoading = true
      getTableList().then(response => {
        this.tableData = response.data.items
        this.listLoading = false
      })
    },
    createTable() {
      this.$prompt('请输入数据表名', '创建数据表', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[A-Za-z]\w+$/,
        inputErrorMessage: '以英文字符开头，不包含除大小写字母、下划线和数字以外的符号'
      }).then(({ value }) => {
        const db = {
          db_name: value
        }
        create(db).then(response => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: `数据库创建成功`,
            showClose: true
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: `数据库创建失败`,
            showClose: true
          })
        })
      })
    }
  }
}
</script>

