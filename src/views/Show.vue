<template>
    <div>
        <van-nav-bar :title="nav.nm" left-arrow @click-left="onClickLeft" >
          <van-icon name="ellipsis" slot="right" @click="handleisShowClick"/>
        </van-nav-bar>
        <van-list v-show="isShow">
          <van-cell v-for="(item,index) in list"
          :key="index" :title="item" @click="handeClick(index)"/>
        </van-list>

        <div>
          <div class="herder">
            <div class="header-top">
              <span class="kong-nav">
                <span @click="onKong">猫眼电影 </span> > {{nav.nm}}</span>
            </div>

              <van-row  type="flex">
                <van-icon name="location-o" size="24" id="kong-icon"/>
                <van-col span="20">
                  <p class="kong-devtoso">{{ nav.nm}}</p>
                  <p class="kong-devtosolo">{{ nav.addr}}</p>
                </van-col>
              </van-row>
          </div>
        </div>

        <div>
          <div>
            <div class="k-headasd" style="height: 10px; background-color: #f0f0f0;"></div>
          </div>
          <div id="tuan-list">
            <ul>
              <li v-for="(item,index) in datalist" :key="index">
                <img :src="item.imageUrl.replace('w.h','128.0')" alt="">
                <div class="huan-nav">{{item.title}}</div>
                <div class="kong-hesover">{{item.curNumberDesc}}</div>
                <div class="huan-price">￥{{item.price}}</div>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import { NavBar, Toast, Col, Row, Icon } from 'vant'
Vue.use(Icon)
Vue.use(Col)
Vue.use(Row)
Vue.use(NavBar)
Vue.use(Toast)

export default {
  data () {
    return {
      datalist: [],
      nav: [],
      list: ['首页', '电影', '影院'],
      isShow: false
    }
  },
  methods: {
    onKong () {
      this.$router.push('/film')
    },
    onClickLeft () {
      Toast('返回')
      this.$router.back()
    },
    handleisShowClick () {
      this.isShow = !this.isShow
    },
    handeClick (index) {
      if (index === 0 || (index === 1)) {
        this.$router.push('/Film')
      }
      if (index === 2) {
        this.$router.push('/Cinema')
      }
    }
  },
  mounted () {
    axios.get('/ajax/cinemaDetail?cinemaId=232&optimus_uuid=650959A05E8E11EA86368DE7C885C7A019C2EFB8D33D436A8FA7FD77D18243D4&optimus_risk_level=71&optimus_code=10').then(res => {
      console.log(res.data)
      this.nav = res.data.cinemaData
      this.datalist = res.data.dealList.dealList
    })
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
.van-nav-bar .van-icon{
  color: white;
  font-size: 24px
}

.herder{
  box-sizing: border-box;
  width: 100%;
  height: 103px;
  .header-top{
    width: 100%;
    height: 29px;
    padding: 10px 0 0 15px;
    box-sizing: border-box;
    .kong-nav{
    color: #777;
    font-size: 14px;
    }
  }
}
.van-row{
  height: 42px;
  margin: 15px 90px 15px 15px;
  #kong-icon{
    position: absolute;
    right: 0;
    color: #0df3e0;
    width: 70px;
    height: 31px;
    border-left: 1px solid #d8d8d8;
    text-align: center;
  }
  .kong-devtoso{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .kong-devtosolo{
    color: #999;
    font-size: 13px;
    margin: 3px 0 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
#tuan-list{
  li{
    overflow: hidden;
    padding: 5px;
    img{
      float: left;
      width: 92px;
    }
    .huan-nav{
      font-size: 14px;
      color: #333;
      overflow: hidden;
    }
    .huan-price{
      color: #f03d37;
      font-size: 16px;
    }
    .kong-hesover{
      float: right;
      color: #999;
      font-size: 12px;
    }
  }
}
</style>
