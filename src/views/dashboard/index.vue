<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome {{ name }}!</div>
    <div class="dashboard-timer">{{ nowTime }}</div>
    <el-divider></el-divider>
    <div class="dashboard-todo">
      <div>您可能想要</div>
      <ul class="dashboard-todo-nav">
        <li>
          <div class="dashboard-todo-nav-card">
            <router-link to="/">连接数据库</router-link>
          </div>
        </li>
        <li>
          <div class="dashboard-todo-nav-card">
            <router-link to="/">查看数据库</router-link>
          </div>
        </li>
        <li>
          <div class="dashboard-todo-nav-card">
            <router-link to="/">指令编写</router-link>
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
      nowTime: new Date()
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
      'name'
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
  &-timer {
    //margin: 20px 0 0 20px;
    float: right;
    font-size: 12px;
  }
}
.dashboard-todo-nav {
  margin-left: -30px;
  li{
    float: left;
    width: 33.3%;
    box-sizing: border-box;
    padding: 0 38px;
    list-style: none;
  }
  &-card {
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    border: 1px solid #eaeefb;
    text-align: center;
  }
}

</style>
