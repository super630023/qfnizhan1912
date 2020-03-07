<template>
  <div v-if="filminfo" class="detail">

    <m-title v-title="40" @back="handleBack">
      {{filminfo.name}}
    </m-title>

    <img :src="filminfo.poster"/>
    <h4>{{filminfo.name}}{{filminfo.filmType.name}}</h4>
    <p>{{filminfo.premiereAt | dateFilter}}上映</p>
    <div :class="isActive?'synopsis':''">
      {{filminfo.synopsis}}
    </div>
    <button @click="isActive=!isActive">button</button>
    <h4>演职人员</h4>
    <swiper :kerwindata="{
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true
    }" kerwinclass="actor">
      <div class="swiper-slide" v-for="(data,index) in filminfo.actors"
      :key="index">
        <img :src="data.avatarAddress"/>
      </div>
    </swiper>
    <h4 @click="isPhotoShow=true">剧照</h4>
    <swiper :kerwindata="{
      slidesPerView: 2,
      spaceBetween: 10,
      freeMode: true
    }" kerwinclass="photo">
      <div class="swiper-slide" v-for="(data,index) in filminfo.photos" :key="data" @click="handlePreview(index)">
        <img :src="data"/>
      </div>
    </swiper>

    <photo v-show="isPhotoShow" :list="filminfo.photos" @event="handlePreview($event)">
      <m-title @back="handlePhotoShow">
        剧照 ( {{filminfo.photos.length}} )
      </m-title>
    </photo>

  </div>
</template>
<script>
import http from '@/util/http'
import swiper from '@/components/Swiper'
import photo from './Detail/Photo'
import Vue from 'vue'
import { ImagePreview, Dialog } from 'vant'
Vue.use(ImagePreview).use(Dialog)

export default {

  data () {
    return {
      filminfo: null,
      isActive: true,
      isShow: false,
      isPhotoShow: false
    }
  },
  components: {
    swiper,
    photo
  },
  methods: {
    handleBack () {
      this.$router.back()
    },
    handlePhotoShow () {
      this.isPhotoShow = false
    },
    handlePreview (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left',
        onClose () {

        }
      })
    }
  },
  beforeMount () {
    Dialog.confirm({
      title: '该影片没有排期',
      message: '弹窗内容',
      confirmButtonText: '同意',
      cancelButtonText: '拒绝'
    }).then(() => {
      this.$router.back()
    }).catch(() => {

    })
  },
  mounted () {
    // console.log(this.$route.params.kerwinid, '利用id去请求接口数据')

    http.request({
      url: `/gateway?filmId=${this.$route.params.kerwinid}&k=893882`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data)
      this.filminfo = res.data.data.film
    })
  }
}
</script>
<style scoped lang="scss">
img{
  width:100%;
}
.synopsis{
  height:40px;
  overflow:hidden;
}
.detail{
  margin-bottom:50px;
}
</style>
