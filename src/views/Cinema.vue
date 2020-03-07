<template>
  <div>
    <div class="title">
        <div class="left" @click="handleChangePage('/city')" style="margin-left:10px">{{cityName}}</div>
        <div >影院</div>
        <div class="right" ><i class="iconfont icon-search" @click="handleChangePage('/cinema/search')" style="margin-right:10px"></i></div>
    </div>

    <div class="select">
        <div @click="isAreaShow=!isAreaShow;isAreaShow1=false" :class="isAreaShow?'active':''">{{current}}</div>
        <div class="select1" @click="isAreaShow1=!isAreaShow1;isAreaShow=false" :class="isAreaShow1?'active':''">{{brand}}</div>
        <div>特色</div>
    </div>

    <div class="area" v-show="isAreaShow">
      <ul>
        <li v-for="data in arealist" :key="data.id" @click="handleArea(data)"
        :class="data.name===current?'active':''">
          {{data.name}}
        </li>
      </ul>
    </div>
    <div class="area1" v-show="isAreaShow1">
      <ul>
        <li v-for="data in arealist1" :key="data.id" @click="handleArea1(data)"
        :class="data.name===brand?'active':''">
          {{data.name}}
          <span>{{data.count}}</span>
        </li>
      </ul>
    </div>

    <div class="content"  :class="isAreaShow||isAreaShow1?'active1':''" :style="{height:scrollHeight} ">
        <ul v-if="computedDatalist.length">
          <cinema-item v-for="data in computedDatalist" :key="data.cinemaId"
          :data="data" @click.native="handleClick(data.id)"
          ></cinema-item>
        </ul>
        <div v-else>
          暂无符合条件的影院
        </div>
    </div>
  </div>
</template>
<script>
import cinemaItem from './Cinema/CinemaItem'
import { mapState, mapMutations } from 'vuex' // mapState 是vuex提供的切割函数，
import Vue from 'vue'
import { Toast } from 'vant'
import BetterScroll from 'better-scroll'
Vue.use(Toast)

export default {
  data () {
    return {
      // datalist:[],
      isAreaShow: false,
      isAreaShow1: false,
      current: '全城',
      brand: '品牌',
      scrollHeight: '0px'
    }
  },
  components: {
    cinemaItem
  },

  beforeMount () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay: true, // 是否显示背景遮罩层
      duration: 0 // 不会消失
    })
  },
  mounted () {
    this.scrollHeight = document.documentElement.clientHeight - 80 - 50 + 'px'
    // 初始化betterscroll
      new BetterScroll('.content', {//eslint-disable-line
      scrollbar: {
        fade: true,
        interactive: false
      },
      click: true // 支持click事件
    })

    // disptch 到 vuex中action
    if (this.cinemaList.length === 0) {
      this.$store.dispatch('cinema/getCinemaAction', this.cityId).then(res => {
        // console.log('异步结束，已经存到vuex')
        Toast.clear()
      })
    } else {
      // console.log('cinema', '使用缓存')
      Toast.clear()
    }
    this.$store.dispatch('cinema/getCityAction')
  },
  methods: {
    handleArea (data) {
      this.current = data.name
      this.isAreaShow = false
    },
    handleArea1 (data) {
      this.brand = data.name
      this.isAreaShow1 = false
    },
    handleChangePage (path) {
      if (path === '/city') {
        // 清空共享状态 vuex cinemaList
        this.setCinemaList([])
      }
      this.$router.push(path)
    },

    handleClick (id) {
      // console.log(id)
      this.$router.push(`/show/${id}`)
    },

    ...mapMutations('cinema', ['setCinemaList', 'setCityList'])
  },

  computed: {
    ...mapState('cinema', ['cinemaList', 'cityList']),
    ...mapState('city', ['cityName', 'cityId']),

    arealist () {
      var newarr = this.cityList[0]

      var arealist = [...Array.from(new Set(newarr))]
      return arealist
    },
    arealist1 () {
      var newarr1 = this.cityList[1]

      var arealist1 = [...Array.from(new Set(newarr1))]
      return arealist1
    },

    computedDatalist () {
      if ((this.current === '全城' || this.current === '全部') && (this.brand === '品牌' || this.brand === '全部')) return this.cinemaList

      if (this.brand === '品牌' || this.brand === '全部') {
        return this.cinemaList.filter(item => item.addr.includes(this.current))
      } else if (this.current === '全城' || this.current === '全部') {
        return this.cinemaList.filter(item => item.nm.includes(this.brand))
      } else {
        return this.cinemaList.filter(item => item.nm.includes(this.brand) && item.addr.includes(this.current))
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .active{
    color:red !important;
  }
  .active1{
    background: #cccccc !important;
  }
  .title{
    display: flex;
    position:fixed;
    top:0px;
    left:0px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #df2d2d;
    z-index:10;
    font-weight:bold;
    color: white;
    div{
      flex:1;
      text-align: center;
    }
    .left{
      text-align: left;
    }
    .right{
      text-align: right;
    }
  }

  .select{
    display: flex;
    position:fixed;
    top:40px;
    left:0px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: white;
    z-index: 10;
    div{
      flex:1;
      text-align: center;
    }
    .select1{
      border-left: 1px solid red;
      border-right: 1px solid red;
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
    }
  }
  .content{
    position: relative;
    top:80px;
    height:300px;
    overflow:hidden;
    div{
      margin-top: 40px;
      height: 50px;
      width: 200px;
      margin: 0 auto;
      text-align: center;
      line-height: 50px;
    }
  }

  .area{
    position:fixed;
    top:80px;
    left:0px;
    width: 100%;
    background: white;
    z-index:10;
    ul{
      display: flex;
      flex-wrap: wrap;
      z-index:10;
      li{
        width: 25%;
        padding:5px;
        box-sizing: border-box;
        text-align: center;
        // border:1px solid gray;
      }
    }
  }

.area1{
    position:fixed;
    top:80px;
    left:0px;
    width: 100%;
    height: 300px;
    overflow: scroll;
    background: white;
    z-index:10;
    ul{
      li{
        padding:10px 20px;
        border-bottom: 1px solid #e5e5e5;
        span{
          float: right;
          padding-right: 20px;
        }
      }
    }
  }
</style>
