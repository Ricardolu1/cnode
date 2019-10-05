<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="slide" class="slide"></router-view>
      <router-view name="main" class="center"></router-view>
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
*{
  margin:0;
  padding:0;
}


#app {
  
}
.main{
  margin:0 auto;
  position: relative;
}
.center{
  width: 1065px;
  position:absolute;
  top:15px;
  left:77px;
}
.slide{
  position:absolute;
  width: 290px;
  top:15px;
  right:75px;
}

</style>
