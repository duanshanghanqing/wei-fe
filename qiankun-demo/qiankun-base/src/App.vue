<template>
  <div class="app">
    <div>
      <!-- 基座中可以放自己的路由 -->
      <router-link to="/home">Base-Home</router-link>
      <!-- 引用其他子应用 -->
      <router-link to="/vue2">vue2应用</router-link>
      <router-link to="/react">react应用</router-link>
      <router-link to="/vue3">vue3应用</router-link>
      <router-link to="/webpack5-vue3">webpack5-vue3应用</router-link>
    </div>
    <!-- 显示基座自己的路由 -->
    <router-view></router-view>
    <!-- 显示vue应用节点 -->
    <div id="vue2"></div>
    <!-- 显示react应用节点 -->
    <div id="react"></div>
    <!-- 显示vue3应用节点 -->
    <div id="vue3"></div>
    <!-- 显示webpack5-vue3应用节点 -->
    <div id="webpack5-vue3"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
