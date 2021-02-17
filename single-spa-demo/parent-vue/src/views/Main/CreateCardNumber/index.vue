<template>
  <div class="CreateCardNumber">
    CreateCardNumber
    <router-link to="/login">login</router-link>
  </div>
</template>

<script>
export default {
  name: 'CreateCardNumber',
  mounted() {
    this.$http.get('/pcapi/v2/dictionary/locallanguage').then((data) => {
      console.log(data)
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "./index.less";
</style>
