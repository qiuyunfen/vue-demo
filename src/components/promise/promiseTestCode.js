async function async1 () {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2 () {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})

console.log('script end')

// script start
// VM438:2 async1 start
// VM438:7 async2
// VM438:19 promise1
// VM438:25 script end
// VM438:22 promise2
// VM438:4 async1 end
// undefined
// VM438:13 setTimeout
