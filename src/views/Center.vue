<template>
  <div>
    center
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger" @click="handleClick()">危险按钮</van-button>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>

    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">11111</div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light">22222</div></el-col>
    </el-row>

    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button, Swipe, SwipeItem } from 'vant'
import axios from 'axios'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Button)

export default {
  mounted () {
    axios.get('/ajax/filterCinemas?ci=10&optimus_uuid=C71F30C05D4811EA955213B16E54E79E40FAB32AD7FC457EA198380F39DC7547&optimus_risk_level=71&optimus_code=10').then(res => {
      console.log(res.data)
    })
  },
  methods: {
    handleClick () {
      console.log('click-button')
      var date = new Date(1583343910752)
      // 格式化日期
      var dateTime = date.toLocaleString()
      console.log(dateTime)
    }
  },
  // 路由的钩子函数
  beforeRouteEnter (to, from, next) {
    // ...
    // console.log("拦截")
    if (localStorage.getItem('token')) {
      next()
    } else {
      console.log('重定向到 login页面')
      next('/login')
    }
  },

  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate', '/detail/1111-->/detail/222222')
  },

  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    // ...
    next()
  }
}
</script>
<style lang="scss" scoped>
  .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

</style>
