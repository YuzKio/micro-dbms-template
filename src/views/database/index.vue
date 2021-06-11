<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item style="float: right;">
        <el-button type="primary" @click="createDatabase()">创建数据库</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据库名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            :type="'连接' | statusFilter"
            size="small"
            @click="connectDatabase(scope.$index)"
          >
            {{ statusOfDB[scope.$index] }}
          </el-button>
          <el-button
            size="small"
            @click="dropDatabase(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="上次连接时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, connect, drop } from '@/api/database'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '已连接': 'success',
        '连接': 'primary',
        '重试': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      statusOfDB: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
        this.initStatus()
      })
    },
    initStatus() {
      const len = this.list.length
      for (let i = 0; i < len; i++) {
        this.statusOfDB[i] = '连接'
      }
    },
    createDatabase() {
      this.$prompt('请输入数据库名', '创建数据库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    connectDatabase(index) {
      const test = {
        db_name: this.list[index].title
      }
      connect(test).then(response => {
        // this.$forceUpdate()
        this.$set(this.statusOfDB, index, '已连接')
        var x = document.getElementById(index)
        x.style = 'success'
      }).catch(() => {
        this.$forceUpdate()
        this.$set(this.statusOfDB, index, '重试')
        var x = document.getElementById(index)
        x.style = 'danger'
      })
    },
    dropDatabase(title) {
      drop(title).then(response => {
        this.$message({
          type: 'success',
          message: `数据库${title}已删除`,
          showClose: true
        })
      })
    }

  }
}
</script>
