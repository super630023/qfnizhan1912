<template>
  <div id="head">
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
      <van-divider id="kong-text">我的订单</van-divider>
      <div>
        <van-grid :column-num="2">
          <van-grid-item
            text="电影"
            icon="stop-circle"
            @click="huanclick"
          />
           <van-grid-item
            text="商城"
            icon="comment-circle"
            @click="huanshopping"
          />
        </van-grid>
      </div>
    </div>

    <div @click="handleclick()">
      <van-nav-bar left-text="优惠券" id="active" >
        <van-icon name="arrow" slot="right" id="kong-icon-right"/>
      </van-nav-bar>
    </div>
    <div>
      <van-nav-bar left-text="折扣卡" id="active">
        <van-icon name="arrow" slot="right" id="kong-icon-right"/>
      </van-nav-bar>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon, List, Divider, Grid, GridItem } from 'vant'
import { mapMutations } from 'vuex'
Vue.use(Grid)
Vue.use(GridItem)
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
    ...mapMutations('tabbar', ['hide', 'show']),
    huanshopping () {
      this.$router.push('/show/232')
    },
    huanclick () {
      this.$router.push('/film')
    },
    handleclick () {
      this.$router.push('/mycoupon')
    },
    handeClick (index) {
      if (index === 0 || (index === 1)) {
        this.$router.push('/Film')
      }
      if (index === 2) {
        this.$router.push('/Cinema')
      }
    },
    handleisShowClick () {
      this.isShow = !this.isShow
    }
  },
  // 路由的钩子函数
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      console.log('重定向到 login页面')
      next('/login')
    }
  },
  beforeRouteUpdate (to, from, next) {

  },

  beforeRouteLeave (to, from, next) {
    next()
  },
  destroyed () {
    this.show()
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
  margin: 13px 0;
  #kong-text{
    margin-bottom: 13px;
  }
  .van-divider{
    margin: 0 auto;
    width: 160px;
    font-size: 15px;
    color: #333;
  }
  .van-grid {
    border: 0;
  }
 .van-grid .van-grid-item:first-child{
    color: #df2d2d;
 }

 .van-grid .van-grid-item:last-child{
    color: #0df3e0;
 }
}
#active{
  background-color: #fff;
  .van-nav-bar__text{
    color: #333;
  }
}
  #kong-icon-right{
  color: #ccc;
}
</style>
