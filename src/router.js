import Vue from 'vue'
import Router from 'vue-router'
import BooksApp from './views/books-app.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'books',
      component: BooksApp
    }
  ]
})
