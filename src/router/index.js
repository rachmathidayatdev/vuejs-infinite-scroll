import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(Router)

const HelloWorld = () => import('@/components/HelloWorld')
const HelloWorldDetail = () => import('@/components/HelloWorldDetail')

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/post',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/post/:id?',
      name: 'HelloWorldDetail',
      component: HelloWorldDetail
    }
  ]
})
