<template>
  <div>
    <div class="title">
        <div class="left" @click="handleChangePage('/city')">{{cityName}}</div>
        <div>影院</div>
        <div class="right" ><i class="iconfont icon-search" @click="handleChangePage('/cinema/search')"></i></div>
    </div>

    <div class="select">
        <div @click="isAreaShow=!isAreaShow" :class="isAreaShow?'active':''">{{current}}</div>
        <div class="select1" @click="isAreaShow1=!isAreaShow1" :class="isAreaShow1?'active':''">{{brand}}</div>
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
      current: '全城', // 选中是哪个区
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
        interactive: false // 1.8.0 新增
      },
      click: true // 支持click事件
    })

    // disptch 到 vuex中action
    if (this.cinemaList.length === 0) {
      this.$store.dispatch('cinema/getCinemaAction', this.cityId).then(res => {
        console.log('异步结束，已经存到vuex')
        Toast.clear()
      })
    } else {
      console.log('cinema', '使用缓存')
      Toast.clear()
    }
    this.$store.dispatch('cinema/getCityAction')
  },
  methods: {
    handleArea (data) {
      // 改变current值， current值改变， 计算属性自动计算一遍
      this.current = data.name
      this.isAreaShow = false
    },
    handleArea1 (data) {
      // 改变current值， current值改变， 计算属性自动计算一遍
      this.brand = data.name
      this.isAreaShow1 = false
    },
    handleChangePage (path) {
      if (path === '/city') {
        // 清空共享状态 vuex cinemaList
        this.setCinemaList([])
      }
      this.$router.push(path) // 跳转路径
    },

    handleClick (id) {
      console.log(id)
    },

    ...mapMutations('cinema', ['setCinemaList', 'setCityList'])
  },

  computed: {
    ...mapState('cinema', ['cinemaList', 'cityList']),
    ...mapState('city', ['cityName', 'cityId']),
    // 所有区的计算属性

    arealist () {
      // 对象=>里面的某个属性
      var newarr = this.cityList[0]
      // 利用set结构进行数组去重，Array.from 把类数组结构转换成数组结构
      var arealist = [...Array.from(new Set(newarr))]
      return arealist
    },
    arealist1 () {
      // 对象=>里面的某个属性
      var newarr1 = this.cityList[1]
      // 利用set结构进行数组去重，Array.from 把类数组结构转换成数组结构
      var arealist1 = [...Array.from(new Set(newarr1))]
      return arealist1
    },
    // 根据选择的不同区域，过滤出相应区域的影院
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
    background: white;
    z-index:10;
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
