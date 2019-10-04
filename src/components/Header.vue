<!-- 组件说明 -->
<template>
  <div class="header">
    <router-link :to="{name:'root'}">
      <img src="../assets/cnodejs_light.svg"alt="">
    </router-link>
    <ul>
      <li>
        <router-link :to="{name:'root'}"><span>首页</span></router-link>
      </li>
      <li><span>新手入门</span></li>
      <li><span>api</span></li>
      <li><span>关于</span></li>
      <li><span>注册</span></li>
      <li><span>登录</span></li>
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
  span{
    text-decoration: none;
    color:#ccc;
    font-size: 14px;
    text-shadow: none;
    
  }
</style>