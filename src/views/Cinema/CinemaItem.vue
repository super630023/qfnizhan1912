<template>
  <li>
    dj1111111111111
    <h4>{{data.name}}</h4>
    <p>{{data.address}}</p>
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
