<template>
  <div>xxxx</div>
</template>

<script>
var Promise = require('lie')

export default {
  name: 'promose-component',
  data () {
    return {}
  },
  created () {
    // this.promiseTest1();
    // this.promoseTest2()
    // this.promiseTest3();
    // this.promiseTest4()
    // this.promiseTest5()
    this.test()
  },
  methods: {
    promiseTest1 () {
      console.log(Promise)
      new Promise(resolve => {
        console.log(1)
        debugger
        resolve(3)
        Promise.resolve().then(() => console.log(4))
      }).then(num => {
        console.log(num)
      })
      console.log(2)
    },
    promoseTest2 () {
      debugger
      // Promise.resolve(1)
      //   .then(2)
      //   .then(() => Promise.resolve(3));
      Promise.resolve(1).then(2)
    },
    promiseTest3 () {
      try {
        throw Error('error')
      } catch (e) {
        console.log(e.message)
      }
      debugger
      let thenable = {
        then: function (resolve, reject) {
          resolve(42)
        }
      }

      let p1 = Promise.resolve(thenable)
      p1.then(function (value) {
        console.log(value) // 42
      })
    },
    doSomething (v) {
      console.log(v)
    },
    promiseTest4 () {
      // promise的执行顺序，详见markdown
      return new Promise((resolve, reject) => {
        this.doSomething(1)
        resolve(3)
      })
      .then(this.doSomething)
      .then(this.doSomething(2))
    },
    promiseTest5 () {
      return new Promise((resolve, reject) => {
        this.doSomething(1)
        setTimeout(() => resolve(3), 0)
      }).then(this.doSomething).then(this.doSomething(2))
    },
    test(){
      debugger
      var p = new Promise((resolve, reject) => {
        setTimeout(() => { resolve(1) }, 1000)
      })
      p = p.then(() => console.log(4))
      console.log(p)
    }
  }
}
</script>
