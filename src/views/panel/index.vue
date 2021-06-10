<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="60px" style="display: inline-block; width: 50%">
      <el-form-item>
        <el-input
          title="指令编写"
          type="textarea"
          :rows="19"
          placeholder="请输入sql语句"
          v-model="form.textarea"
          style="width: 450px"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">运行</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="display: inline-block; width: 50%"
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="数据表名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" align="center">
        <template>
          <!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
          <el-button
            :type="gray"
            size="small"
          >
            查看
          </el-button>
        </template>
        <template>
          <!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
          <el-button
            :type="gray"
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
export default {
  data() {
    return {
      form: {
        textarea: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
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
</style>

