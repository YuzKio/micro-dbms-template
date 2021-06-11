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
            :type="statusFilter[statusOfDB[scope.$index]]"
            size="small"
            @click="connectDatabase(scope.$index)"
            :disabled="btnBoolean[scope.$index]"
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
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       '已连接': 'success',
  //       '连接': 'primary',
  //       '重试': 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  data() {
    return {
      list: null,
      listLoading: true,
      statusOfDB: [],
      statusFilter: {
        '已连接': 'success',
        '连接': 'primary',
        '重试': 'danger'
      },
      btnBoolean: []
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
        if (this.$store.getters.databaseName === this.list[i].title) {
          this.statusOfDB[i] = '已连接'
          this.btnBoolean[i] = true
        } else {
          this.statusOfDB[i] = '连接'
          this.btnBoolean[i] = false
        }
      }
    },
    createDatabase() {
      this.$prompt('请输入数据库名', '创建数据库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    connectDatabase(index) {
      const db = {
        db_name: this.list[index].title
      }
      connect(db).then(response => {
        // this.$forceUpdate()
        for (let i = 0; i < this.list.length; i++) {
          if (this.statusOfDB[i] === '已连接') {
            this.$set(this.statusOfDB, i, '连接')
            this.btnBoolean[i] = false
          }
        }
        this.$set(this.statusOfDB, index, '已连接')
        this.btnBoolean[index] = true
        this.$store.dispatch('database/changeDatabase', this.list[index].title)
      }).catch(() => {
        // this.$forceUpdate()
        this.$set(this.statusOfDB, index, '重试')
        this.btnBoolean[index] = false
      })
    },
    dropDatabase(index) {
      const db = {
        db_name: this.list[index].title
      }
      drop(db).then(response => {
        this.$message({
          type: 'success',
          message: `数据库${db.db_name}已删除`,
          showClose: true
        })
      })
    }

  }
}
</script>
