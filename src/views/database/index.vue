<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item style="float: right;">
        <el-button type="primary" @click="createDatabase">创建数据库</el-button>
        <el-button @click="deleteDatabase">删除数据库</el-button>
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
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status | statusFilter"
            size="small"
          >
            {{ scope.row.status }}
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
import { getList } from '@/api/database'

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
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    createDatabase() {
      this.$prompt('请输入数据库名', '创建数据库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    deleteDatabase() {
      this.$prompt('请输入数据库名', '删除数据库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    }

  }
}
</script>
