<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="slide"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
import Article from './components/Article'
import SlideBar from './components/SlideBar'


 


export default {
  name: 'App',
  components:{
    Header,
    PostList,
    Article,
    SlideBar
  },
  data(){
    return {
      
    }
  }
}
</script>

<style>
#app {

}
.main{
  margin:0 auto;
}
</style>
