<!-- 组件说明 -->
<template>
  <div class="header">
    <img src="../assets/cnodejs_light.svg"alt="">
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">api</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'Header',
    components: {
      
    },
    data () {
      return {

      };
    },
    methods: {

    },
  }
</script>

<style scoped>
/*@import url()*/
  .header{
    background: #444444;
    height: 50px;;
  }
  img{
    max-width: 120px;
    margin-left:50px;
    margin-top:10px;
  }
  ul{
    list-style-type: none;
    float:right;
    margin: 5px 0;
  }
  li{
    display: inline-block;
    padding: 10px 15px;
  }
  a{
    text-decoration: none;
    color:#ccc;
    font-size: 14px;
    text-shadow: none;
    
  }
</style>