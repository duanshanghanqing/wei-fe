<template>
  <div class="app">
    <div>
      <router-link to="/home">home</router-link>
      <router-link to="/login">login</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less" rel="stylesheet/less">
@import "./assets/styles/reset.less";
.app {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
