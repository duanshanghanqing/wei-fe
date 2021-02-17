<template>
  <div>
    <h2 :class="{ black: true, yellow: true }">使用 class 对象</h2>
    <h2 :class="['black', 'yellow']">使用class 数组</h2>
    <h2 :style="{color: 'red', fontSize: '40px'}">使用 style</h2>
  </div>
</template>

<script>
export default {
  name: 'ClassStyle',
  data() {
    return {}
  },
  mounted() {}
}
</script>
