var fakeSlowNetwork;

(function () {
  var lsKey = 'fake-slow-network'
  var networkFakeDiv = document.querySelector('.network-fake')
  var checkbox = networkFakeDiv.querySelector('input')

  fakeSlowNetwork = Number(localStorage.getItem(lsKey)) || 0

  networkFakeDiv.style.display = 'block'
  checkbox.checked = !!fakeSlowNetwork

  checkbox.addEventListener('change', function () {
    localStorage.setItem(lsKey, Number(checkbox.checked))
    location.reload()
  })
}())

var storyDiv = document.querySelector('.story')
function wait (ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

function get (url) {
  // Return a new promise.
  // We do all the work within the constructor callback.
  var fakeNetworkWait = wait(3000 * Math.random() * fakeSlowNetwork)

  var requestPromise = new Promise(function (resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest()
    req.open('get', url)

    req.onload = function () {
      // 'load' triggers for 404s etc
      // so check the status
      if (req.status === 200) {
        // Resolve the promise with the response text
        resolve(req.response)
      } else {
        // Otherwise reject with the status text
        reject(Error(req.statusText))
      }
    }

    // Handle network errors
    req.onerror = function () {
      reject(Error('Network Error'))
    }

    // Make the request
    req.send()
  })

  return Promise.all([fakeNetworkWait, requestPromise]).then(function (results) {
    return results[1]
  })
}

export function getJson (url) {
  return get(url).then(JSON.parse)
}

export function addHtmlToPage (content) {
  var div = document.createElement('div')
  div.innerHTML = content
  storyDiv.appendChild(div)
}

export function addTextToPage (content) {
  var p = document.createElement('p')
  p.textContent = content
  storyDiv.appendChild(p)
}
