<template>
  <div class="app-container">
    <el-form>
      <el-form-item style="float: right;">
        <el-button type="primary" @click="dialogFormVisible = true">创建数据表</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="创建数据表" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="formRules">
        <el-form-item prop="newTableName" style="margin: -20px 0 10px 0">
          <el-input
            v-model="form.newTableName"
            placeholder="请输入数据表名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="属性" prop="roundTimeList">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addSession">添加属性</el-button>
        </el-form-item>
        <div v-for="(item, index) in form.attrList" :key="index">
          <el-form-item :label="`属性${index+1}`" style="margin: -10px 0 -10px 0">
            <el-col :span="8">
              <el-form-item
                :prop="`attrList[${index}].attrName`"
                :rules="formRules.attrName"
                label-width="100px"
              >
                <el-input
                  v-model="item.attrName"
                  placeholder="请输入属性名"
                  class="attr-item"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :prop="`attrList[${index}].typeName`"
                :rules="formRules.typeName"
                label-width="100px"
              >
                <el-select
                  v-model="item.typeName"
                  placeholder="请选择类型"
                  class="attr-item"
                >
                  <el-option label="int" value="int"></el-option>
                  <el-option label="float" value="float"></el-option>
                  <el-option label="char" value="char"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :prop="`attrList[${index}].attrLen`"
                :rules="formRules.attrLen"
                label-width="100px"
              >
                <el-input
                  v-model="item.attrLen"
                  placeholder="请输入数据长度"
                  class="attr-item"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-button
            type="danger"
            icon="el-icon-minus"
            circle
            size="mini"
            @click="delSession(index)"
            style="display: inline"
          ></el-button>
          <el-checkbox-group v-model="item.checkList" style="margin: -5px 0 20px 60px">
            <el-checkbox label="NOT NULL"></el-checkbox>
            <el-checkbox label="PRIMARY KEY"></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm()">确 定</el-button>
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
      tableData: null,
      listLoading: true,
      dialogFormVisible: false,
      form: {
        newTableName: '',
        attrList: []
      },
      formRules: {
        newTableName: [{ required: true, message: '请填写数据表名', trigger: 'blur' }],
        roundTimeName: [{ required: true, message: '请添加属性', trigger: 'blur' }],
        attrName: [{ required: true, message: '请填写属性名', trigger: 'blur' }],
        typeName: [{ required: true, message: '请选择类型', trigger: ['change', 'blur'] }],
        attrLen: [{ required: true, message: '请输入长度', trigger: 'blur' }]
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
        db_name: `${this.$store.getters.databaseName}`
      }
      getTableList(db).then(response => {
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
    },
    addSession() {
      const obj = {
        attrName: '',
        typeName: '',
        attrLen: null,
        checkList: []
      }
      this.form.attrList.push(obj)
    },
    delSession(index) {
      this.form.attrList.splice(index, 1)
    },
    handleConfirm() {
      this.dialogFormVisible = false
      console.log(this.form.attrList)
    }
  }
}
</script>

<style scoped lang="scss">
.attr-item {
  width: 100%;
  margin-left: -100px;
  padding-right: -40px
}
</style>
