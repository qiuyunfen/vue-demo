
function run (generator) {
  const gen = generator()

  return new Promise((resolve, reject) => {
    function auto (value) {
      const info = gen.next(value)
      if (info.done) {
        resolve(info.value)
      }
      Promise.resolve(info.value).then(value => auto(value))
    }
    auto()
  })
}
const wait = value => new Promise((resolve, reject) => setTimeout(() => resolve(value), 10))
run(function* getFoo () {
  const a = yield wait('1')
  console.log(a)
  const b = yield '2'
  console.log(b)
}).then(() => {
  console.log('3')
})
