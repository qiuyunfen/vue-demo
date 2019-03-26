<template>
  <div class="content">
    <div v-for="(row,index) in displayItems" :key="index">
      <!-- <next v-for="item in row.displayList" :meta="meta" :key="item.id" :content="item.content"></next> -->
      <div v-for="item in row.displayList" :key="item.id" v-bind:style="'transform: translate3d('+item.meta.offset+'px, 0,0)'" class="div1">{{item.content}}</div>
    </div>
    <div class="div1">
      <div class="l-t"></div>
      <div class="l-b">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    </div>
    <div class="div2">2</div>
    <div class="div3">3</div>
  </div>
</template>
<script>
import Next from './Next.vue'
import Vue from 'vue'
export default {
  name: 'HelloWorld',
  components: {
    Next
  },

  data () {
    return {
      height: 100,
      meta: {
        offset: 0
      },
      displayItems: [
        {
          velocity: 1,
          displayList: [{
            id: '1',
            content: 'asdasdas'
          }, {
            id: '2',
            content: 'asdasdas'
          }, {
            id: '3',
            content: 'asdasdas'
          }]
        },
        {
          velocity: 1,
          displayList: [{
            id: '4',
            content: 'asdasdas'
          }, {
            id: '5',
            content: 'asdasdas'
          }, {
            id: '6',
            content: 'asdasdas'
          }
          ]
        },
        {
          velocity: 1,
          displayList: [
            {
              id: '7',
              content: 'asdasdas'
            }, {
              id: '8',
              content: 'asdasdas'
            }, {
              id: '9',
              content: 'asdasdas'
            }
          ]
        }
      ],
      msg: 'Welcome to Your Vue.js App',
      styleObject: {
        position: 'absolute',
        left: '100%',
        background: 'red',
        width: '100px',
        height: '100px',
        fontSize: '13px',
        transform: 'translate3d(0, 0, 0)'
      }
    }
  },
  created () {
    this.displayItems.forEach(row => {
      row.displayList.forEach(item => {
        Vue.set(item, 'meta', {offset: 0})
      })

    //   row.meta = {
    //       offset: 0
    //   }
    })
    setInterval(() => {
      // this.meta.offset -= 1
      // const value = this.meta.offset - 1
      // this.$set(this.meta, 'offset', value)

      this.displayItems[0].displayList[0].meta.offset -= 1

    //   this.displayItems[0].displayList[0].content = 'xxxx'+Date.now()
    }, 10)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

body,
html {
  height: 100%;
}

.content {
  position: relative;
  height: 100%;
  display: flex;
}

.div1 {
  background-color: aqua;
  width: 400px;
  height: 100%;
  display: inline-block;
}

.l-t {
  height: 140px;
  background-color: brown;
}

.l-b {
  clear: both;
  overflow: hidden;
  height: 100%;
  float: left;
}

.left {
  width: 60px;
  float: left;
  background-color: darkcyan;
  height: 100%;
}

.right {
  width: 340px;
  float: left;
  background-color: chartreuse;
  height: 100%;
}

.div2 {
  background-color: blanchedalmond;
  display: inline-block;
  flex: 1;
}

.div3 {
  background-color: blueviolet;
  width: 400px;
  height: 100%;
  display: inline-block;
}
</style>
