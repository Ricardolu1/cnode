import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      components: {
        main:PostList
      }
    },
    {
      path:'/topic/:id$&author=:name',
      name:'post_content',
      components: {
        main: Article,
        slide:SlideBar
      }
    },
    {
      path:'/userinfo/:name',//我的理解是加了冒号，后面跟的是一个变量
      name:'user_info',
      components:{
        main:UserInfo
      }
    },
  ]
})
