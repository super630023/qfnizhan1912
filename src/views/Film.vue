<template>
  <div>
    <swiper :key="looplist.length">
      <div class="swiper-slide" v-for="data in looplist" :key="data.bannerId">
        <img :src="data.imgUrl"/>
      </div>
    </swiper>
    <div>
      导航栏
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
import http from '@/util/http'
import swiper from '@/components/Swiper'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      looplist: []
    }
  },
  components: {
    swiper
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  mounted () {
    http.request({
      url: `/gateway?type=2&cityId=${this.cityId}&k=3529285`,
      headers: {
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      // console.log(res.data)

      if (res.data.data) {
        this.looplist = res.data.data
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .swiper-slide{
    img{
      width: 100%;
    }
  }
</style>
