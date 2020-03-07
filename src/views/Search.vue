<template>
  <div>
    <div class="query">
       <van-search
          v-model="mytext"
          show-action
          placeholder="请输入搜索关键词"
          @cancel="onCancel"
        />
      <div v-show="mytext">
        <ul v-if="searchDataList.length">

          <cinema-item v-for="data in searchDataList" :key="data.id"
          :data="data"></cinema-item>
        </ul>
        <div v-else>
          没有匹配到影院
        </div>
      </div>
    </div>

    <van-list v-show="!mytext">
        <van-cell v-for="(data, index) in topDataList" :key="index" :title="data.nm" />
    </van-list>
  </div>
</template>

<script>
import cinemaItem from './Cinema/CinemaItem'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Vue from 'vue'
import { Search, List, Cell } from 'vant'
Vue.use(List).use(Cell).use(Search)

export default {
  data () {
    return {
      mytext: ''
    }
  },
  components: {
    cinemaItem
  },
  methods: {
    ...mapMutations('tabbar', ['hide', 'show']), // 把tabbar命名空间的hide,show 截出
    ...mapActions('cinema', ['getCinemaAction']),
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    this.hide()

    if (this.cinemaList.length === 0) {
      this.getCinemaAction()
    } else {
      console.log('search', '使用缓存')
      console.log(this.searchDataList)
    }
  },

  computed: {
    ...mapState('cinema', ['cinemaList']),
    ...mapGetters('cinema', ['topDataList']),
    topDataList () {
      return this.cinemaList.slice(0, 5)
    },
    searchDataList () {
      return this.cinemaList.filter(item => item.nm.includes(this.mytext))
    }
  },

  destroyed () {
    this.show()
  }
}
</script>
