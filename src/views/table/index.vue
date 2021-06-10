<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
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
      <el-table-column class-name="status-col" label="操作" width="220" align="center">
        <template>
          <!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
          <el-button
            size="small"
          >
            查看
          </el-button>
        </template>
        <template>
          <!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
          <el-button
            size="small"
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
import { getTableList } from '@/api/table'

export default {
  data() {
    return {
      filterText: '',
      tableData: null,
      listLoading: true
    }
  },
  created() {
    this.fetchTableData()
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    fetchTableData() {
      this.listLoading = true
      getTableList().then(response => {
        this.tableData = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

