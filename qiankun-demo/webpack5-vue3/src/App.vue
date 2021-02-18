<template>
  <div>
    <p>
      <!--使用 router-link 组件进行导航 -->
      <!--通过传递 `to` 来指定链接 -->
      <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
      <router-link to="/">Go to Home</router-link>
      ---
      <router-link to="/about">Go to About</router-link>
    </p>

    <router-view></router-view>
  </div>
</template>
