<template>
  <div class="detail-container">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(name, index) in tableName"
        :key="index"
        :label="name"
        :name="name"
      >
        <el-table
          v-loading="listLoading"
          element-loading-text="Loading"
          :data="list.data"
          style="width: 100%"
          max-height="450"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column
            v-for="attrName in list.attrName"
            :key="attrName"
            fixed
            :prop="attrName"
            :label="attrName"
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
                @click.native.prevent="deleteRow(scope.$index)"
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
import { getTableDetail, deleteItem } from '@/api/detail'
import { getTableList } from '@/api/table'

export default {
  name: 'Detail',
  data() {
    return {
      tableName: [],
      activeName: '',
      list: {
        attrName: [],
        data: []
      },
      listLoading: false
    }
  },
  created() {
    this.fetchTableName()
  },
  methods: {
    fetchTableName() {
      this.listLoading = true
      const db = {
        db_name: `${this.$store.getters.databaseName}`
      }
      getTableList(db).then(response => {
        const tableData = response.data
        this.tableName = tableData.map(obj => {
          return obj.title
        })
        this.listLoading = false
        if (this.$route.query.activeName != null) {
          this.activeName = this.$route.query.activeName
          // this.fetchTableDetailData(this.activeName)
        } else {
          this.activeName = this.tableName[0]
        }
        this.fetchTableDetailData(this.activeName)
      })
    },
    fetchTableDetailData(table) {
      const query = {
        db_name: `${this.$store.getters.databaseName}`,
        tb_name: `${table}`
      }
      getTableDetail(query).then(response => {
        this.list = response.data[0]
        this.listLoading = false
      })
    },
    deleteRow(index, rows) {
      const drop = {
        db_name: `${this.$store.getters.databaseName}`,
        tb_name: this.activeName,
        record: this.list.data[index]
      }
      deleteItem(drop).then(response => {
        this.fetchTableDetailData(this.activeName)
        this.$message({
          type: 'success',
          message: `数据项删除成功`,
          showClose: true
        })
      })
    },
    handleClick(tab) {
      this.fetchTableDetailData(tab.name)
    }
  }
}
</script>

<style scoped>

</style>
