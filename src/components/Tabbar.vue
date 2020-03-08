<template>
  <nav>
    <ul>
      <router-link tag="li" :to="data.path" v-for="data in navlist"
      :key="data.text" activeClass="kerwinactive">
        <i class="iconfont" :class="data.icon"></i>
        <span>{{data.text}}</span>
      </router-link>
    </ul>
  </nav>
</template>
<script>
export default {

  data () {
    return {
      navlist: [
        {
          path: '/film',
          text: '电影',
          icon: 'icon-video'
        },
        {
          path: '/cinema',
          text: '影院',
          icon: 'icon-category'
        },
        {
          path: '/center',
          text: '我的',
          icon: 'icon-account'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
  .kerwinactive{
    color:red;
  }

  nav{
    z-index:10;
    position: fixed;
    left:0px;
    bottom: 0px;
    width: 100%;
    height: 50px;
    background: white;
    ul{
      display: flex;
      li{
        flex:1;
        line-height:25px;
        text-align: center;
        display: flex;
        flex-direction: column;
        i{
          font-size: 20px !important;

        }
      }
    }
  }
</style>
