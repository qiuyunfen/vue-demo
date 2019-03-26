import Vue from 'vue'
import Router from 'vue-router'
import PromiseComponent from '@/components/promise/PromiseComponent'
import PromiseExample from '@/components/PromiseApplication/PromiseExample'
import PromiseAllExample from '@/components/PromiseApplication/PromiseAllExample'
import PromiseBestExample from '@/components/PromiseApplication/PromiseBestExample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/promise',
      name: 'PromiseComponent',
      component: PromiseComponent
    },
    {
      path: '/promise-example',
      name: 'PromiseExample',
      component: PromiseExample
    },
    {
      path: '/promise-all-example',
      name: 'PromiseAllExample',
      component: PromiseAllExample
    },
    {
      path: '/promise-best-example',
      name: 'PromiseBestExample',
      component: PromiseBestExample
    }
  ]
})
