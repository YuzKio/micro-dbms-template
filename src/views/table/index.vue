<template>
  <div class="app-container">
    <el-form>
      <el-form-item style="float: right;">
        <el-button type="primary" @click="dialogFormVisible = true">创建数据表</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="创建数据表" :visible.sync="dialogFormVisible" @open="validatePrepare">
      <el-form :model="form" ref="form" :rules="formRules">
        <el-form-item prop="newTableName" style="margin: -20px 0 20px 0">
          <el-input
            v-model="form.newTableName"
            placeholder="请输入数据表名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="属性" prop="attr" :rules="formRules.attr">
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addSession">添加属性</el-button>
        </el-form-item>
        <div v-for="(item, index) in form.attrList" :key="index">
          <el-form-item :label="`属性${index+1}`" style="display: inline; margin: -10px 0 -10px 0">
            <el-col :span="6">
              <el-form-item
                :prop="`attrList[${index}].attrName`"
                :rules="formRules.attrName"
              >
                <el-input
                  v-model="item.attrName"
                  placeholder="请输入属性名"
                  class="attr-item"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                :prop="`attrList[${index}].typeName`"
                :rules="formRules.typeName"
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
            <el-col :span="6">
              <el-form-item
                :prop="`attrList[${index}].attrLen`"
                :rules="formRules.attrLen"
              >
                <el-input
                  v-model="item.attrLen"
                  placeholder="请输入数据长度"
                  class="attr-item"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button
                type="danger"
                icon="el-icon-minus"
                circle
                size="mini"
                @click="delSession(index)"
              ></el-button>
            </el-col>
          </el-form-item>

          <el-checkbox-group v-model="item.checkList" style="margin: 15px 0 20px 60px">
            <el-checkbox label="NOT NULL" @change="checked => handleNotNullChange(checked, index)"></el-checkbox>
            <el-checkbox label="PRIMARY KEY" @change="checked => handlePrimaryChange(checked, index)"></el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm(form)">确 定</el-button>
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
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleDetail(scope.$index)"
          >
            查看
          </el-button>
          <el-button
            size="small"
            @click="handleSchema(scope.row.title)"
          >
            模式
          </el-button>
          <el-button
            type="info"
            size="small"
            plain
            @click="handleDelete(scope.row.title)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="数据表模式" :visible.sync="dialogSchemaVisible" width="80%">
      <el-table
        v-loading="listLoading"
        :data="schemaList.data"
      >
        <el-table-column
          v-for="(name, index) in schemaList.attrName"
          :key="index"
          align="center"
          :label="name"
          :prop="name"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getTableList, createTable, deleteTable, descTable } from '@/api/table'
import { isNum } from '@/utils/validate'

export default {
  data() {
    return {
      validForm: false,
      tableData: null,
      schemaList: {
        attrName: [],
        data: []
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogSchemaVisible: false,
      form: {
        newTableName: '',
        attrList: []
      },
      formRules: {
        newTableName: [{ required: true, message: '请填写数据表名', trigger: 'blur' }],
        attr: [{ required: true, message: '请添加属性', trigger: 'blur' }],
        attrName: [{ required: true, message: '请填写属性名', trigger: 'blur' }],
        typeName: [{ required: true, message: '请选择类型', trigger: ['change', 'blur'] }],
        attrLen: [
          { required: true, message: '请填写属性长度', trigger: 'blur' },
          { validator: isNum, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (!this.$store.getters.databaseName) {
      this.$message({
        type: 'error',
        message: '请先连接数据库！',
        showClose: true
      })
      this.$router.push('/database')
    } else {
      this.fetchTableData()
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    fetchTableData() {
      this.listLoading = true
      const db = {
        db_name: `${this.$store.getters.databaseName}`
      }
      getTableList(db).then(response => {
        this.tableData = response.data
        this.listLoading = false
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
    handleConfirm(formName) {
      this.$nextTick(() => {
        console.log(this.$refs[formName])
      })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let sendData = {}
          sendData.dbName = `${this.$store.getters.databaseName}`
          sendData.newTableName = this.form.newTableName
          sendData.attrs = this.form.attrList
          sendData = JSON.stringify(sendData)
          createTable(sendData).then(response => {
            this.fetchTableData()
            this.$message({
              type: 'success',
              message: `数据表创建成功`,
              showClose: true
            })
            this.form.newTableName = ''
            this.form.attrList = []
            this.dialogFormVisible = false
          }).catch(() => {
            this.$message({
              type: 'error',
              message: `数据表创建失败`,
              showClose: true
            })
          })
        } else {
          this.$message({
            type: 'error',
            message: `请完成表单！`,
            showClose: true
          })
        }
      })
    },
    handleDelete(name) {
      const table = {
        tb_name: name,
        db_name: `${this.$store.getters.databaseName}`
      }
      deleteTable(table).then(response => {
        this.fetchTableData()
        this.$message({
          type: 'success',
          message: `数据表删除成功`,
          showClose: true
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: `数据表删除失败`,
          showClose: true
        })
      })
    },
    handleDetail(index) {
      alert(index)
    },
    handleSchema(name) {
      this.listLoading = true
      const table = {
        tb_name: name,
        db_name: `${this.$store.getters.databaseName}`
      }
      descTable(table).then(response => {
        this.schemaList = Object.assign({}, response.data)
        this.dialogSchemaVisible = true
      }).catch(() => {
        this.$message({
          type: 'error',
          message: `请重试`,
          showClose: true
        })
      })
      this.listLoading = false
    },
    handleNotNullChange(checked, index) {
      if (!checked) {
        this.form.attrList[index].checkList = []
      }
    },
    handlePrimaryChange(checked, index) {
      if (checked) {
        this.form.attrList[index].checkList = ['NOT NULL', 'PRIMARY KEY']
      }
    },
    validatePrepare() {
      console.log(this.$refs[this.form])
    }
  }
}
</script>

<style scoped lang="scss">
.attr-item {
  width: 100%;
  padding-right: 20px
}
</style>
