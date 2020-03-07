<template>
  <div>
    <van-nav-bar
      title="猫眼电影"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-tabs v-model="active">
      <van-tab title="美团账号登录">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-form>
      </van-tab>

      <van-tab title="手机验证登录">
        <van-field
          v-model="value"
          center
          clearable
          placeholder="请输入手机码">
          <van-button
          slot="button"
          size="small"
          @click="handleyanClick"
          type="primary">
            发送验证码
          </van-button>
        </van-field>
        <van-cell-group>
          <van-field v-model="smg" placeholder="请输入验证码" />
        </van-cell-group>
      </van-tab>
    </van-tabs>

    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit"
      @click="handleClick()">
        登录
      </van-button>
    </div>

  </div>
</template>
<script>
import Vue from 'vue'

import { Button, Form, Field, NavBar, Toast, Tab, Tabs, Cell, CellGroup } from 'vant'

Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Button)
Vue.use(Field)

export default {
  data () {
    return {
      username: '123456',
      password: '123456',
      active: '2',
      value: '',
      smg: ''
    }
  },

  methods: {
    handleyanClick () {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (reg.test(this.value)) {
        this.smg = '123456'
        this.username = ''
        this.password = ''
      } else {
        alert('输入错误')
        return false
      }
    },
    onClickLeft () {
      Toast('返回')
      this.$router.back()
    },

    onSubmit (values) {
      // console.log('submit', values)
    },
    handleClick () {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (reg.test(this.value)) {
        localStorage.setItem('token', JSON.stringify({ isLogin: true }))
        this.$router.push('/center')
        return
      }
      if (this.username === ('123456') || this.password === ('123456')) {
        localStorage.setItem('token', JSON.stringify({ isLogin: true }))
        this.$router.push('/center')
      } else {
        this.$router.go('/login')
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
div.van-nav-bar{
  background-color: #df2d2d;
  .van-nav-bar__title{
    color: white;
    font-size: 16px;
  }
  .van-nav-bar__text{
    color: white
  }
}
 .van-nav-bar .van-icon{
  color: white;
  font-size: 24px
}
.van-button{
  background: #df2d2d;
  border: 0
}

</style>
