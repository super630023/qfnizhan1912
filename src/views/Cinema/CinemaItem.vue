<template>
  <li>
    <h4 style="width:300px">{{data.nm}}</h4>
    <p style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px">{{data.addr}}</p>
  </li>
</template>
<script>
export default {
  props: ['data']
}
</script>
<style lang="scss" scoped>
    li{
      padding:10px;
      width:70%;
    }
</style>
