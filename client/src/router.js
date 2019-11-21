import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import Addquestion from './views/Addquestion.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Detailquestion from './views/Detailquestion.vue'
import Myquestion from "./views/Myquestion.vue"
import Updatequestion from "./views/Updatequestion.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/add',
          name: 'addquestion',
          component: Addquestion
        },
        {
          path:'/detail/:id',
          name: 'detailquestion',
          component: Detailquestion,
          props: true
        },
        {
          path:'/mypost',
          name: 'myquestion',
          component: Myquestion
        },
        {
          path: '/updatequestion/:id',
          name: 'updatequestion',
          props: true,
          component: Updatequestion
        }
      ]
    },
    {
      path: '/login',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: Login
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        }
      ]
    }
  ]
})
