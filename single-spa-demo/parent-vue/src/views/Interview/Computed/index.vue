<template>
  <div>
    <h2>computed 有缓存，data不变则不会重新计算</h2>
    <h2>watch 如何深度监听？</h2>
    <h2>watch 监听引用类型，拿不到oldVal</h2>
    <div>
      <p>num {{ num }}</p>
      <p>double1 {{ double1 }}</p>
      <p>double2 {{ double2 }}</p>
      <input type="number" v-model="double2" />
      <br />
      <br />
      <p @click="setName()">{{ name }}</p>
      <p @click="setInfo()">{{ JSON.stringify(info) }}</p>
      <p @click="setAge()">{{ info.age }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Computed',
  data() {
    return {
      num: 20,
      name: '张三',
      info: {
        age: 18
      }
    }
  },
  mounted() {},
  computed: {
    // vue 不允许对象文字中具有相同键的多个属性
    // num() {
    //   return 5
    // },
    // 只要 num 不变，double1 就是有缓存的，每次使用都是从缓存内取，不会重复计算
    double1() {
      return this.num * 2
    },
    double2: {
      // 直接使用 double2 触发 get 方法
      get() {
        console.log('触发get方法')
        return this.num * 2
      },
      // 修改值触发 set 方法
      set(val) {
        console.log(val)
        this.num = val / 2
      }
    }
  },
  watch: {
    // 监听值类型
    name(val, oldval) {
      console.log('watch name', val, oldval)
    },
    info: {
      // 监听引用类型
      handler(val, oldval) {
        console.log('watch info', val, oldval)
        // 1.如果修改的是引用类型，则新值旧值不一样
        // 2.如果修改的是引用类型内的值，则新值旧值一样，内部是指针引用，虽然表面是两个值，其实是一个值，是一个地址
      },
      deep: true // 深度监听
    }
  },
  methods: {
      setName() {
          this.name = '李四'
      },
      setInfo() {
          this.info = {
              name: 'xxx'
          }
      },
      setAge() {
          this.info.age = 19
      }
  }
}
</script>
