<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome {{ name }}!</div>
    <div class="dashboard-info">
      <div class="dashboard-status">
        <span>现在连接的数据库：</span>
        <span v-if="!this.databaseName.length">无</span>
        <span v-else>{{ databaseName }}</span>
      </div>
      <div class="dashboard-timer">{{ nowTime }}</div>
    </div>
    <el-divider></el-divider>
    <div class="dashboard-todo">
      <ul class="dashboard-todo-nav">
        <li>
          <div class="dashboard-todo-nav-card">
            <img src="@/assets/home_images/connect_pic.png" />
            <div>
              <router-link to="/database">连接数据库</router-link>
            </div>
          </div>
        </li>
        <li>
          <div class="dashboard-todo-nav-card">
            <img src="@/assets/home_images/manage_pic.png" />
            <div @click="handleClickManage()">
              <span>管理数据表</span>
            </div>
          </div>
        </li>
        <li>
          <div class="dashboard-todo-nav-card" @click="handleClickSql()">
            <img src="@/assets/home_images/sql_pic.png" />
            <div>
              <router-link to="/sql/index">指令编写</router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      nowTime: new Date(),
      isConnected: false
    }
  },
  methods: {
    handleClickManage() {
      if (this.databaseName) {
        this.$router.push('/database/table')
      } else {
        this.$message({
          type: 'error',
          message: '请先连接数据库！',
          showClose: true
        })
        this.$router.push('/database')
      }
    },
    handleClickSql() {
      if (this.databaseName) {
        this.$router.push('/sql/index')
      } else {
        this.$message({
          type: 'error',
          message: '请先连接数据库！',
          showClose: true
        })
        this.$router.push('/database')
      }
    }
  },
  mounted() {
    const _this = this
    this.timer = setInterval(() => {
      _this.nowTime = new Date()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'databaseName'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-info {
    padding-top: 10px;
    margin-bottom: -10px;
  }
  &-status {
    display: inline-block;
  }
  &-timer {
    //margin: 20px 0 0 20px;
    display: inline-block;
    float: right;
    font-size: 12px;
  }
}
.dashboard-todo-nav {
  margin: 40px 0 0 -30px;
  li{
    float: left;
    width: 33.3%;
    box-sizing: border-box;
    padding: 0 38px;
    list-style: none;
    display: table;
  }
  &-card {
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    //border: 1px solid #eaeefb;
    border-radius: 3px;
    text-align: center;
    position: relative;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    //transition: all .3s ease-in-out;
    img {
      width: 160px;
      height: 120px;
      margin: 50px 0 40px;
    }
    div {
      color: #fff;
      line-height: 43px;
      height: 45px;
      border: 1px solid #eaeefb;
      border-radius: 5px;
      background: #409EFF;
      margin: 0 35px;
      &:hover {
        cusor: pointer;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

</style>
