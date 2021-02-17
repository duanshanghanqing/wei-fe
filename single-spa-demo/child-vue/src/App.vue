<template>
  <div>
    <router-link to="/home">home</router-link>
    <router-link to="/login">login</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
