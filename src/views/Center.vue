<template>
  <div>
     <van-nav-bar title="我的" >
      <van-icon name="ellipsis" slot="right" @click="handleisShowClick"/>
    </van-nav-bar>
    <van-list v-show="isShow">
      <van-cell v-for="(item,index) in list"
      :key="index" :title="item" @click="handeClick(index)"/>
    </van-list>

    <div class="my-title">
      <div class="header">
        <img src="../../public/kong-pic.png" alt="">
      </div>
    </div>

    <div class="container">
      <van-divider>我的订单</van-divider>
      <div>
        <div class="kong-left">
          <van-icon name="stop-circle" />
          <p>电影</p>
        </div>
        <div class="kong-right">
          <van-icon name="comment-circle" />
          <p>商城</p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon, List, Divider } from 'vant'
Vue.use(Divider)
Vue.use(List)
Vue.use(NavBar)
Vue.use(Icon)

export default {
  data () {
    return {
      list: ['首页', '电影', '影院'],
      isShow: false
    }
  },
  methods: {
    handeClick (index) {
      if (index === 0 || (index === 1)) {
        this.$router.push('/Film')
      }
      if (index === 2) {
        this.$router.push('/cinema')
      }
    },
    handleisShowClick () {
      this.isShow = !this.isShow
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
div.van-nav-bar{
  background-color: #df2d2d;
    .van-nav-bar__title {
      color: white
    }
    .van-icon-ellipsis{
    color: white;
    font-size: 35px;
    width: 22.5px;
  }
}
 .van-list{
    position: absolute;
    right: 0;
    width: 90px;
    background-color: #fff;
    z-index: 20;
    box-shadow: -1px 1px 3px #f0f0f0;
    .van-cell{
      text-align: center
    }
  }
.my-title .header{
  background-color: #f03d37;
  height: 150px;
  width: 100%;
  overflow: hidden;
  text-align: center;
  img{
    display: inline-block;
    width: 66px;
    height:66px;
    margin-top:30px;
    border-radius: 50%;
  }
}
.container{
  margin-top: 10px;
  padding: 0 15px;
  .van-divider{
    margin-left: 65px;
    width: 160px;
    font-size: 15px;
    color: #333;
  }
  .kong-left{
    width: 145px;
    height: 92px;
    float: left;
    text-align: center;
    .van-icon{
      font-size: 40px;
      color: #df2d2d
    }
  }
  .kong-right{
    width: 145px;
    height: 92px;
    float: left;
    text-align: center;
    .van-icon{
      font-size: 40px;
      color: #0df3e0
    }
  }
  .van-nav-bar{
    float: left;
  }
}

</style>
