<template>
  <div v-bind:style="'transform: translate3d('+meta.offset+'px, 0,0)'" class="div1">{{content}}</div>
</template>
<script>
export default {
  name: 'next',
  props: {
    meta: {
      type: Object,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>
<style scoped>
.div1 {
  position: absolute;
  left: 100%;
  background: red;
  width: 100px;
  height: 100px;
  font-size: 13px;
}
</style>
