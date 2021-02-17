<template>
  <div>
    <h2>面试题</h2>
    <ul>
        <li>
            <router-link to="/interview/computed">计算属性</router-link>
        </li>
        <li>
            <router-link to="/interview/classStyle">class样式</router-link>
        </li>
        <li>
            <router-link to="/interview/ifShow">v-if,v-else的用法。v-if，v-show的区别，v-if，v-show的使用场景</router-link>
        </li>
        <li>
            <router-link to="/interview/forList">循环（列表）渲染</router-link>
        </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
