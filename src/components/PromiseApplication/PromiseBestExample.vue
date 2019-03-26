<template>
  <div>
    <div class="network-fake">
      <label>
        <input type="checkbox"> Fake network delay
      </label>
    </div>
    <div class="story"></div>
    <svg class="spinner" viewBox="0 0 100 100" width="20" height="20">
      <circle cx="50" cy="50" r="42" transform="rotate(-90,50,50)"></circle>
    </svg>
  </div>
</template>
<script>
const Promise = require('lie')

export default {
  name: 'promise-best-example',
  data () {
    return {
      fakeSlowNetwork: null
    }
  },
  mounted () {
    this.initalPage()
    this.requestStory()
  },
  methods: {
    // step 3
    requestStory () {
      this.getJson('../../../static/story.json').then(story => {
        this.addHtmlToPage(story.heading)
        return story.chapterUrls.map(this.getJson).reduce((chain, chapterPromise) => {
          return chain.then(() => {
            return chapterPromise
          }).then(chapter => {
            this.addHtmlToPage(chapter.html)
          })
        }, Promise.resolve())
      }).then(() => {
        this.addTextToPage('All done')
      }).catch((err) => {
        this.addTextToPage('Argh, broken: ' + err.message)
      }).then(() => {
        document.querySelector('.spinner').style.display = 'none'
      })
    },
    initalPage () {
      var lsKey = 'fake-slow-network'
      var networkFakeDiv = document.querySelector('.network-fake')
      console.log(networkFakeDiv)
      var checkbox = networkFakeDiv.querySelector('input')

      this.fakeSlowNetwork = Number(localStorage.getItem(lsKey)) || 0

      networkFakeDiv.style.display = 'block'
      checkbox.checked = !!this.fakeSlowNetwork

      checkbox.addEventListener('change', function () {
        localStorage.setItem(lsKey, Number(checkbox.checked))
        location.reload()
      })
    },
    wait (ms) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms)
      })
    },
    get (url) {
      var fakeNetworkWait = this.wait(3000 * Math.random() * this.fakeSlowNetwork)

      var requestPromise = new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest()
        req.open('get', url)

        req.onload = function () {
          if (req.status === 200) {
            resolve(req.response)
          } else {
            reject(Error(req.statusText))
          }
        }

        req.onerror = function () {
          reject(Error('Network Error'))
        }

        req.send()
      })

      return Promise.all([fakeNetworkWait, requestPromise]).then(function (results) {
        return results[1]
      })
    },
    getJson (url) {
      return this.get(url).then((response) => {
        return JSON.parse(response)
      })
    },
    addHtmlToPage (content) {
      var storyDiv = document.querySelector('.story')
      var div = document.createElement('div')
      div.innerHTML = content
      storyDiv.appendChild(div)
    },
    addTextToPage (content) {
      var storyDiv = document.querySelector('.story')
      var p = document.createElement('p')
      p.textContent = content
      storyDiv.appendChild(p)
    }
  }
}
</script>
<style lang="less" scoped>
@-webkit-keyframes spin {
  to {
    stroke-dashoffset: -264;
  }
}

@keyframes spin {
  to {
    stroke-dashoffset: -264;
  }
}

.spinner circle {
  fill: none;
  stroke: slategray;
  stroke-width: 16;
  stroke-linecap: round;
  stroke-dasharray: 0, 0, 70, 194;
  stroke-dashoffset: 0;
  animation: spin 1s infinite linear;
  -webkit-animation: spin 1s infinite linear;
}

html {
  font-family: sans-serif;
  line-height: 1.5;
  font-size: 14px;
}
h1 {
  font-family: Cambria, Georgia, serif;
  font-size: 2em;
  line-height: 1.3em;
  margin: 0 0 0.5em;
}
.network-fake {
  display: none;
  margin-bottom: 1em;
}
input {
  vertical-align: middle;
}
</style>
