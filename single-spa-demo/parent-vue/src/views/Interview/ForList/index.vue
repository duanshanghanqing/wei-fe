<template>
  <div>
    <p>1.如何便利对象？也可以使用v-for</p>
    <p>2.key的重要性，key不能乱写（如random或index）</p>
    <p>3.v-for和v-if不能一起使用</p>
    <ul>
      <li v-for="(item, index) in ['a', 'b', 'c']" :key="item">{{ item +'-'+ index }}</li>
    </ul>
    <br />
    <ul>
      <li
        v-for="(val, key, index) in {'name': '张三', 'age': 18}"
        :key="val"
      >{{ index }}:{{ key +':'+ val }}</li>
    </ul>
    <p>v-if 和 v-for 在一个标签元素上使用</p>
  </div>
</template>
