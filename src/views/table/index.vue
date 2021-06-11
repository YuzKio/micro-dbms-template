<template>
  <div class="app-container">
<!--    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />-->
    <el-form :inline="true">
      <el-form-item style="float: right;">
        <el-button type="primary" @click="dialogFormVisible = true">创建数据表</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="创建数据表" :visible.sync="dialogFormVisible">
      <div style="margin: -20px 0 10px 0">
<!--        数据表名称：-->
        <el-input
          v-model="newTableName"
          placeholder="请输入数据表名称"
          autocomplete="off"
          size="100"
        ></el-input>
      </div>
      <el-form :model="form">
        <el-form-item label="属性" prop="addTimeList">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addSession">添加属性</el-button>
        </el-form-item>
        <div v-for="(item, index) in form.roundTimeList" :key="index">
          <el-form-item
            :label="`属性${index+1}`"
            :prop="`roundTimeList[${index}].attrName`"
            :rules="formRules.roundTimeList0"
          >
            <el-input v-model="item.attrName" placeholder="请输入属性名" style="width: 25%; margin-right: 10px"></el-input>
            <el-select v-model="item.typeName" placeholder="请选择类型" style="width: 25%; margin-right: 10px">
              <el-option label="int" value="int"></el-option>
              <el-option label="float" value="float"></el-option>
              <el-option label="char" value="char"></el-option>
            </el-select>
            <el-input v-model="item.len" placeholder="请输入数据长度" style="width: 25%; margin-right: 15px"></el-input>
            <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="delSession(index)"></el-button>
            <el-checkbox-group v-model="checkList" style="margin-left: 60px">
              <el-checkbox label="NOT NULL"></el-checkbox>
              <el-checkbox label="PRIMARY KEY"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" :rules="formRules.roundTimeList">确 定</el-button>
      </div>
    </el-dialog>
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
      <el-table-column class-name="status-col" label="操作" width="300" align="center">
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
        <template>
          <el-button
            size="small"
          >
            schema
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
      listLoading: true,
      dialogFormVisible: false,
      newTableName: '',
      form: {
        roundTimeList: []
      },
      checkList: [],
      formRules: {
        addTimeList: [
          { required: true, message: '请添加属性', trigger: 'blur' }
        ],
        roundTimeList0: [
          { required: true, message: '请填写属性项', trigger: 'change' }
        ]
      }
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
      const db = {
        db_name: this.$store.getters.databaseName
      }
      getTableList(db).then(response => {
        this.tableData = response.data
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
    },
    addSession() {
      const obj = {
        id: null,
        startTime: '',
        endTime: '',
        timeRange: ['00:00:00', '23:59:59']
      }
      if (this.form.roundTimeList.length < 10) {
        this.form.roundTimeList.push(obj)
      } else {
        this.$message.warning(`最多添加${this.roundTimeList.length}场`)
      }
    },
    delSession(index) {
      this.form.roundTimeList.splice(index, 1)
    }
  }
}
</script>

