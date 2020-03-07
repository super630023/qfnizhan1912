<template>
    <div>
        <van-nav-bar title="我的优惠券"  left-arrow @click-left="onClickLeft">
            <van-icon name="ellipsis" slot="right"     @click="handleisShowClick"/>
        </van-nav-bar>
        <van-list v-show="isShow">
            <van-cell v-for="(item,index) in list" :key="index" :title="item" @click="handeClick(index)"/>
        </van-list>
    </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Icon, List, Toast } from 'vant'
Vue.use(Toast)
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
    onClickLeft () {
      Toast('返回')
      this.$router.back()
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
.van-nav-bar .van-icon{
  color: white;
  font-size: 24px
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
</style>
