<template>
  <div class="main">
    <div class="header"></div>
    <div class="leftMenu"></div>
    <div class="mainWindow">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  mounted() {
    this.$http.get('/pcapi/v2/dictionary/locallanguage').then(data => {
      console.log(data)
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.main {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f7f8f9;
  .header {
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(50, 50, 50, 0.1);
    height: 54px;
    position: relative;
  }
  .leftMenu {
    width: 68px;
    padding-top: 53px;
    position: absolute;
    top: 54px;
    bottom: 0px;
    z-index: 1;
    overflow-y: auto;
    background-color: aqua;
  }
  .mainWindow{
    position: absolute;
    left: 68px;
    top: 70px;
    right: 0;
    bottom: 0;
    background-color: blueviolet;
  }
}
</style>
