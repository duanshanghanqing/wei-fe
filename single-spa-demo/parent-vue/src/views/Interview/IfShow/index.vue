<template>
  <div>
      <!--  v-if 是通过渲染逻辑判断显示不显示的 -->
      <!-- 切换显示隐藏不频繁用 v-if -->
      <div v-if="type === 'a'">a</div>
      <div v-else-if="type === 'b'">b</div>
      <div v-else>c</div>

      <br/>
      <br/>
      <!-- v-show 会渲染dom，是通过 display 来实现显示还是不显示的 -->
      <!-- 切换显示隐藏频繁用 v-show-->
      <div v-show="type === 'a'">v-show</div>
      <div v-show="type === 'b'">v-show</div>
  </div>
</template>
<script>
export default {
    name: 'IfShow',
    data() {
        return {
            type: 'a'
        }
    }
}
</script>
