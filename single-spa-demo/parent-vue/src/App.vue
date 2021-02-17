<template>
  <div class="app">
    <!-- <router-view></router-view> -->
    <router-link to="/vue">加载vue应用</router-link>
    <div id="vue"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less" rel="stylesheet/less">
@import './assets/styles/reset.less';
.app {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
